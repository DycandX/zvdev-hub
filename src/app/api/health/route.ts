import { NextRequest, NextResponse } from "next/server";

// Mapping of project ID to their actual external status monitor endpoints
const EXTERNAL_ENDPOINTS: Record<string, string> = {
  hub: "https://status.zvdev.cloud/api/health/hub",
  portfolio: "https://status.zvdev.cloud/api/health/portfolio",
  synapse: "https://status.zvdev.cloud/api/health/synapse",
  "dev-utils": "https://status.zvdev.cloud/api/health/utils",
  status: "https://status.zvdev.cloud/api/health/guard",
  wontonverse: "https://status.zvdev.cloud/api/health/wonton",
};

// Mock statuses for local development fallback
const MOCK_STATUSES: Record<string, string> = {
  hub: "online",
  portfolio: "online",
  synapse: "online",
  "dev-utils": "online",
  status: "online",
  wontonverse: "offline",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !EXTERNAL_ENDPOINTS[id]) {
    return NextResponse.json(
      { error: "Invalid or missing project ID" },
      { status: 400 }
    );
  }

  const targetUrl = EXTERNAL_ENDPOINTS[id];

  try {
    // Attempt real server-to-server check with a 3-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      next: { revalidate: 30 }, // Cache response for 30 seconds
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        status: data.status || data.state || "online",
      });
    }

    throw new Error(`External server returned status code ${response.status}`);
  } catch (error) {
    // Check if we are in local development to return mock data as fallback
    if (process.env.NODE_ENV === "development") {
      const mockStatus = MOCK_STATUSES[id] || "unknown";
      return NextResponse.json({ status: mockStatus, isMock: true });
    }

    // In production, fail gracefully with offline or unknown status
    return NextResponse.json({
      status: "unknown",
      message: error instanceof Error ? error.message : "Connection failed",
    });
  }
}
