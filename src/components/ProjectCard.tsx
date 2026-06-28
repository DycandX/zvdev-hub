"use client";

import { useState, useEffect } from "react";

interface Project {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  description: string;
  techStack: string[];
  isCollaborative: boolean;
  statusApi: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [status, setStatus] = useState<"loading" | "online" | "offline" | "unknown">("loading");

  useEffect(() => {
    let active = true;

    async function checkStatus() {
      try {
        // Set a timeout of 4 seconds for the ping request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const response = await fetch(project.statusApi, {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!active) return;

        if (response.ok) {
          const data = await response.json();
          // Assume the API returns { status: "online" | "offline" } or similar
          if (data.status === "online" || data.state === "online" || data.status === "up") {
            setStatus("online");
          } else if (data.status === "offline" || data.state === "offline" || data.status === "down") {
            setStatus("offline");
          } else {
            setStatus("online"); // Default to online if response is OK but structure is different
          }
        } else {
          setStatus("unknown");
        }
      } catch {
        if (!active) return;
        // Graceful degradation: set to unknown if API is down, CORS blocks it, or it times out
        setStatus("unknown");
      }
    }

    checkStatus();

    // Refresh status every 60 seconds
    const intervalId = setInterval(checkStatus, 60000);

    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, [project.statusApi]);

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-emerald-500 shadow-[0_0_10px_#10b981]";
      case "offline":
        return "bg-rose-500 shadow-[0_0_10px_#f43f5e]";
      case "loading":
        return "bg-gray-500 animate-pulse";
      case "unknown":
      default:
        return "bg-amber-500 shadow-[0_0_10px_#f59e0b]";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "online":
        return "Live";
      case "offline":
        return "Offline";
      case "loading":
        return "Checking...";
      case "unknown":
      default:
        return "Unknown";
    }
  };

  const hoverBorderColor = project.isCollaborative
    ? "hover:border-violet-500/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]"
    : "hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]";

  const glowGradient = project.isCollaborative
    ? "group-hover:to-violet-500/10"
    : "group-hover:to-cyan-500/10";

  return (
    <div className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-gray-950/40 p-6 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 ${hoverBorderColor} hover:bg-gray-950/60`}>
      {/* Background glow effect on hover */}
      <div className={`absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 transition-all duration-500 ${glowGradient} group-hover:opacity-100`} />
      
      <div>
        {/* Header: Title and Status */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-200">
            {project.name}
          </h3>
          
          <div className="flex items-center gap-1.5 rounded-full border border-white/5 bg-black/30 py-1 px-2.5 text-xs font-medium text-gray-400">
            <span className={`h-2 w-2 rounded-full ${getStatusColor()} ${status === "online" ? "animate-pulse" : ""}`} />
            <span className="text-[10px] tracking-wider uppercase text-gray-300">{getStatusText()}</span>
          </div>
        </div>

        {/* Subdomain */}
        <p className="mt-1 text-xs font-mono text-cyan-400/80">
          {project.subdomain}
        </p>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-gray-400">
          {project.description}
        </p>
      </div>

      <div className="mt-6">
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md bg-white/5 px-2 py-0.5 text-xs font-medium text-gray-300 ring-1 ring-inset ring-white/10"
            >
              {tech}
            </span>
          ))}
          {project.isCollaborative && (
            <span className="inline-flex items-center rounded-md bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-300 ring-1 ring-inset ring-violet-500/20">
              Collaborative
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-between">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors duration-200"
          >
            Visit App
            <svg
              className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
