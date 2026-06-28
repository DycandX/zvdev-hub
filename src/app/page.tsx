import projects from "@/data/projects.json";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "zvdev.cloud — Ecosystem & Central Hub",
  description: "Pusat kendali dan showcase teknologi modular digital milik Zulvikar Kharisma Nur Muhammad.",
};

export default function Home() {
  // Sort projects so that non-collaborative ones are featured or by relevance
  const featuredProject = projects.find(p => p.id === "hub");
  const regularProjects = projects.filter(p => p.id !== "hub");

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Decorative top background grid/dots */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <Header />

      <main className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Bento Item 1: Main Gateway Info (Spans 2 columns on desktop) */}
          {featuredProject && (
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 via-gray-950/40 to-gray-950/20 p-8 backdrop-blur-md md:col-span-2 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300">
              {/* Internal neon line decoration */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                    Featured Root Gateway
                  </span>
                </div>
                
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {featuredProject.name}
                </h2>
                
                <p className="mt-4 text-base leading-relaxed text-gray-300 max-w-xl">
                  {featuredProject.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 ring-1 ring-inset ring-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-xs text-gray-400 font-mono">
                  Host: <span className="text-gray-300">Vercel Edge Network</span> | DNS: <span className="text-gray-300">Cloudflare Proxy</span>
                </div>
                <a
                  href={featuredProject.url}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-gray-950 hover:bg-cyan-400 transition-colors duration-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  Configure Gateway
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* Bento Item 2: Status Legend / Quick Stats */}
          <div className="rounded-2xl border border-white/5 bg-gray-950/30 p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-white">
                Live Ecosystem Monitor
              </h3>
              <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                Seluruh sub-proyek dipantau secara otomatis oleh Node-Guard. Indikator di bawah ini menunjukkan status operasional saat ini.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-gray-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    Online / Active
                  </span>
                  <span className="text-gray-300 font-mono font-medium">HTTP 200 OK</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-gray-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                    Unknown / CORS Check
                  </span>
                  <span className="text-gray-300 font-mono font-medium">Degraded / Restricted</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-gray-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                    Offline / Inactive
                  </span>
                  <span className="text-gray-300 font-mono font-medium">Timeout / Down</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center sm:text-left">
              <a
                href="https://status.zvdev.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-xs font-semibold text-gray-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-400 transition-all duration-200"
              >
                Buka Dashboard Node-Guard
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bento Items 3-8: Regular Sub-project nodes */}
          {regularProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

        </div>
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-xs text-gray-500 font-mono">
        <p>© {new Date().getFullYear()} zvdev.cloud. All rights reserved.</p>
        <p className="mt-2 text-gray-600">Built using Next.js App Router & Tailwind CSS v4</p>
      </footer>
    </div>
  );
}
