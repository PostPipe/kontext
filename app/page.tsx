"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SplashScreen } from "@/components/SplashScreen";
import { Navbar } from "@/components/Navbar";
import { ShufflingLogo } from "@/components/ShufflingLogo";
import PixelBlast from "@/components/PixelBlast";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {!showSplash && (
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />

          {/* ── Hero ── */}
          <section className="relative flex-1 flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-auto">
              <PixelBlast
                variant="square"
                pixelSize={10}
                color="#e2e8f0"
                patternScale={3}
                patternDensity={0.6}
                enableRipples
                rippleSpeed={0.2}
                rippleThickness={0.15}
                rippleIntensityScale={3}
                speed={0.6}
                transparent
                edgeFade={0}
              />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 py-32 flex flex-col md:flex-row items-center justify-between gap-16 pointer-events-none">

              {/* Left: copy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex-1 flex flex-col items-start gap-10 pointer-events-none"
              >
                {/* Badge */}
                <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-black text-white font-pixel text-[9px] uppercase tracking-widest pointer-events-auto">
                  <span className="w-1.5 h-1.5 bg-green-400 inline-block animate-pulse" />
                  v1.0.0 Live
                </span>

                {/* Headline — short, lots of breathing room */}
                <h1 className="text-3xl md:text-5xl font-pixel leading-[1.3] text-black pointer-events-auto">
                  THE MEMORY<br />
                  ENGINE<br />
                  <span className="text-blue-600">FOR AGENTS.</span>
                </h1>

                {/* Sub-copy */}
                <p className="font-mono text-[12px] text-gray-500 max-w-[280px] leading-7">
                  Persistent memory.<br />
                  Context awareness.<br />
                  Self-improving agents.
                </p>

                {/* CTA row */}
                <div className="flex flex-wrap gap-3 pointer-events-auto">
                  <a
                    href="#download"
                    className="flex items-center gap-2 px-5 py-2.5 bg-black text-white font-pixel text-[10px] uppercase
                               border-2 border-black shadow-[4px_4px_0_0_#555] hover:shadow-none 
                               hover:translate-x-1 hover:translate-y-1 transition-all duration-100"
                  >
                    ↓ Download
                  </a>
                  <a
                    href="#docs"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-pixel text-[10px] uppercase
                               border-2 border-black shadow-[4px_4px_0_0_#ccc] hover:shadow-none 
                               hover:translate-x-1 hover:translate-y-1 transition-all duration-100"
                  >
                    Read Docs →
                  </a>
                </div>

                {/* Platform tags */}
                <div className="flex items-center gap-2 font-mono text-[11px] text-gray-400 pointer-events-auto">
                  {["Windows", "macOS", "Linux"].map((p) => (
                    <span key={p} className="px-2 py-0.5 border border-gray-200 bg-gray-50">
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right: animated logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                className="flex-shrink-0 w-[240px] md:w-[320px]"
              >
                <ShufflingLogo className="w-full pointer-events-auto" />
              </motion.div>
            </div>
          </section>

          {/* ── Features Stack (ScrollStack) ── */}
          <section className="relative w-full bg-white z-20">
            <ScrollStack
              itemDistance={100}
              itemStackDistance={30}
              baseScale={0.9}
              itemScale={0.05}
              stackPosition="15%"
              scaleEndPosition="5%"
            >
              <ScrollStackItem itemClassName="bg-black text-white p-12 md:p-24 rounded-t-[3rem] shadow-2xl flex flex-col justify-center min-h-[70vh]">
                <h2 className="text-4xl md:text-6xl font-pixel mb-6">UNLIMITED CONTEXT</h2>
                <p className="font-mono text-gray-400 max-w-2xl text-lg leading-relaxed">
                  Kontext gives your AI agents true long-term memory. It securely stores conversational history, contextual knowledge, and architectural decisions, allowing your agent to recall exact details from days or months ago instantly.
                </p>
              </ScrollStackItem>

              <ScrollStackItem itemClassName="bg-blue-600 text-white p-12 md:p-24 rounded-t-[3rem] shadow-2xl flex flex-col justify-center min-h-[70vh]">
                <h2 className="text-4xl md:text-6xl font-pixel mb-6">SELF-IMPROVING</h2>
                <p className="font-mono text-blue-100 max-w-2xl text-lg leading-relaxed">
                  As your agent works, it automatically learns your preferences, project conventions, and environment quirks. Next time it tackles a task, it already knows exactly how you like things done, removing the need for repetitive prompting.
                </p>
              </ScrollStackItem>

              <ScrollStackItem itemClassName="bg-gray-100 text-black p-12 md:p-24 rounded-t-[3rem] shadow-2xl flex flex-col justify-center min-h-[70vh] border-t border-x border-gray-200">
                <h2 className="text-4xl md:text-6xl font-pixel mb-6 text-black">SEAMLESS INTEGRATION</h2>
                <p className="font-mono text-gray-600 max-w-2xl text-lg leading-relaxed">
                  Designed to work perfectly with any framework or agent architecture. Simply plug the Kontext Engine into your existing workflows with our powerful yet simple API.
                </p>
              </ScrollStackItem>
            </ScrollStack>
          </section>

          {/* ── IDE Showcase ── */}
          <section id="ide-showcase" className="relative w-full bg-zinc-950 text-white py-24 px-8 z-20 rounded-t-[4rem] -mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
            <div className="max-w-6xl mx-auto pt-8">
              <div className="text-center mb-16">
                <span className="font-pixel text-[10px] tracking-widest text-blue-500 uppercase">Integrations</span>
                <h2 className="font-pixel text-2xl md:text-3xl mt-4 text-white">SUPPORTED WORKSPACES</h2>
                <p className="font-mono text-xs text-zinc-400 mt-4 max-w-md mx-auto">
                  Seamlessly plug Kontext into your active agent environments and AI-assisted editors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Antigravity */}
                <div className="group flex flex-col rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-950 border-b border-zinc-900">
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-red-500/80 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-yellow-500/80 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-green-500/80 transition-colors" />
                    <span className="font-mono text-[9px] text-zinc-500 ml-2">antigravity.sh</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="aspect-[4/3] w-full rounded bg-zinc-950 overflow-hidden border border-zinc-800 flex items-center justify-center p-2 mb-4">
                      <img
                        src="/antigravity%20pix.png"
                        alt="Antigravity Workspace"
                        className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-pixel text-xs text-white mb-2">ANTIGRAVITY</h3>
                      <p className="font-mono text-[10px] text-zinc-400 leading-relaxed">
                        Deep context synchronization and project memory hooks for agentic pipelines.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Claude Code */}
                <div className="group flex flex-col rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-950 border-b border-zinc-900">
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-red-500/80 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-yellow-500/80 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-green-500/80 transition-colors" />
                    <span className="font-mono text-[9px] text-zinc-500 ml-2">claude_terminal</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="aspect-[4/3] w-full rounded bg-zinc-950 overflow-hidden border border-zinc-800 flex items-center justify-center p-2 mb-4">
                      <img
                        src="/claude%20code%20pix.png"
                        alt="Claude Code Support"
                        className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-pixel text-xs text-white mb-2">CLAUDE CODE</h3>
                      <p className="font-mono text-[10px] text-zinc-400 leading-relaxed">
                        Inject long-term project knowledge and rule memory into interactive terminal sessions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Codex */}
                <div className="group flex flex-col rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-950 border-b border-zinc-900">
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-red-500/80 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-yellow-500/80 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-green-500/80 transition-colors" />
                    <span className="font-mono text-[9px] text-zinc-500 ml-2">codex_workspace</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="aspect-[4/3] w-full rounded bg-zinc-950 overflow-hidden border border-zinc-800 flex items-center justify-center p-2 mb-4">
                      <img
                        src="/codex%20pix.png"
                        alt="Codex Support"
                        className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-pixel text-xs text-white mb-2">CODEX</h3>
                      <p className="font-mono text-[10px] text-zinc-400 leading-relaxed">
                        Persistent knowledge indexing and decision tracking built for custom model runtimes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Windsurf */}
                <div className="group flex flex-col rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-950 border-b border-zinc-900">
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-red-500/80 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-yellow-500/80 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-green-500/80 transition-colors" />
                    <span className="font-mono text-[9px] text-zinc-500 ml-2">windsurf_editor</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="aspect-[4/3] w-full rounded bg-zinc-950 overflow-hidden border border-zinc-800 flex items-center justify-center p-2 mb-4">
                      <img
                        src="/windsurf%20pix.png"
                        alt="Windsurf Support"
                        className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-pixel text-xs text-white mb-2">WINDSURF</h3>
                      <p className="font-mono text-[10px] text-zinc-400 leading-relaxed">
                        Supercharge your AI-powered Windsurf workspace with persistent agent memory.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Platform Showcase ── */}
          <section id="platform-showcase" className="relative w-full bg-white text-black py-24 px-8 z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
            {/* Pixelated Transition Edge */}
            <div
              className="absolute bottom-full left-0 w-full h-4 z-30 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='16' viewBox='0 0 32 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,16 L0,8 L8,8 L8,0 L24,0 L24,8 L32,8 L32,16 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom'
              }}
            />
            <div className="max-w-6xl mx-auto pt-8">
              <div className="text-center mb-24">
                <span className="font-pixel text-[10px] tracking-widest text-blue-600 uppercase">Platform</span>
                <h2 className="font-pixel text-2xl md:text-3xl mt-4">BUILT FOR INTELLIGENCE</h2>
                <p className="font-mono text-xs text-gray-500 mt-4 max-w-md mx-auto">
                  Experience true agent autonomy through our state-of-the-art context and memory visualizer.
                </p>
              </div>

              <div className="flex flex-col gap-24 lg:gap-32">
                {/* Feature 1 */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  <div className="w-full lg:w-[55%]">
                    <div className="rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.08)] border border-indigo-100/50 bg-gray-50 p-2 transform hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(99,102,241,0.2)] hover:border-indigo-200 transition-all duration-500">
                      <img src="/kontext%20ss%201.png" alt="Memory Graph" className="w-full h-auto rounded-xl border border-gray-100 shadow-sm" />
                    </div>
                  </div>
                  <div className="w-full lg:w-[45%] flex flex-col justify-center">
                    <h3 className="font-pixel text-xl mb-4">VISUALIZE YOUR CONTEXT</h3>
                    <p className="font-mono text-gray-600 leading-relaxed text-sm">
                      Watch as Kontext maps out your project's architecture in real-time. Our semantic engine automatically connects decisions, files, and developer intent into a readable knowledge graph.
                    </p>
                  </div>
                </div>

                {/* Feature 2 (Reversed) */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                  <div className="w-full lg:w-[55%]">
                    <div className="rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.08)] border border-indigo-100/50 bg-gray-50 p-2 transform hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(99,102,241,0.2)] hover:border-indigo-200 transition-all duration-500">
                      <img src="/kontext%20ss%202.png" alt="Agent Rules" className="w-full h-auto rounded-xl border border-gray-100 shadow-sm" />
                    </div>
                  </div>
                  <div className="w-full lg:w-[45%] flex flex-col justify-center">
                    <h3 className="font-pixel text-xl mb-4">DYNAMIC RULE INJECTION</h3>
                    <p className="font-mono text-gray-600 leading-relaxed text-sm">
                      Define custom rules for your agents and watch them adapt. Kontext dynamically injects relevant context into the agent's prompt based on the file they are currently working on.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  <div className="w-full lg:w-[55%]">
                    <div className="rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.08)] border border-indigo-100/50 bg-gray-50 p-2 transform hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(99,102,241,0.2)] hover:border-indigo-200 transition-all duration-500">
                      <img src="/kontext%20ss%203.png" alt="Activity Timeline" className="w-full h-auto rounded-xl border border-gray-100 shadow-sm" />
                    </div>
                  </div>
                  <div className="w-full lg:w-[45%] flex flex-col justify-center">
                    <h3 className="font-pixel text-xl mb-4">HISTORICAL TRACKING</h3>
                    <p className="font-mono text-gray-600 leading-relaxed text-sm">
                      Never lose track of why a decision was made. Kontext keeps a permanent timeline of architectural shifts and coding patterns so your agents always have the full history.
                    </p>
                  </div>
                </div>

                {/* Feature 4 (Reversed) */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                  <div className="w-full lg:w-[55%]">
                    <div className="rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.08)] border border-indigo-100/50 bg-gray-50 p-2 transform hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(99,102,241,0.2)] hover:border-indigo-200 transition-all duration-500">
                      <img src="/kontext%20ss%204.png" alt="Dashboard" className="w-full h-auto rounded-xl border border-gray-100 shadow-sm" />
                    </div>
                  </div>
                  <div className="w-full lg:w-[45%] flex flex-col justify-center">
                    <h3 className="font-pixel text-xl mb-4">COMMAND CENTER</h3>
                    <p className="font-mono text-gray-600 leading-relaxed text-sm">
                      Manage all your active agent workspaces from one beautiful, high-performance interface designed for clarity and speed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Download Section ── */}
          <section id="download-section" className="relative w-full bg-white text-black py-32 px-8 z-40 overflow-hidden">
            {/* Ambient background elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Large radial glow top center */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-blue-100/60 blur-[120px]" />
              {/* Dot grid */}
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
              {/* Accent blobs */}
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/40 blur-[100px] rounded-full" />
              <div className="absolute top-1/2 left-0 w-64 h-64 bg-sky-100/50 blur-[80px] rounded-full" />
            </div>

            <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">

              <div className="mb-6 text-center">
                <span className="font-pixel text-[10px] tracking-widest text-blue-500 uppercase">Install</span>
              </div>

              {/* Big pill badge */}
              <div className="mb-8 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[11px] text-blue-700">v1.0.0 — Stable Release</span>
              </div>

              <div className="mb-6 text-center max-w-full overflow-x-hidden">
                <div className="inline-block">
                  <h2 className="font-pixel text-[3.5vw] md:text-2xl lg:text-3xl text-black typing-container" style={{ borderRightColor: '#000' }}>
                    DOWNLOAD KONTEXT FOR WINDOWS NOW
                  </h2>
                </div>
              </div>

              <p className="font-mono text-sm text-gray-500 mb-20 text-center max-w-lg">
                Bring persistent agent memory to your entire development environment. Install once, remember forever.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">

                {/* Windows Card — Active */}
                <a
                  href="https://github.com/PostPipe/kontext/releases/download/kontext/Kontext-Setup-1.0.0.exe"
                  download
                  className="group relative flex flex-col items-center justify-center p-10 rounded-2xl bg-white border-2 border-black hover:bg-black transition-all duration-300 shadow-[6px_6px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1"
                >
                  <div className="absolute top-4 left-4 bg-black text-white text-[9px] font-pixel px-2 py-1 rounded">LIVE</div>
                  <div className="w-14 h-14 mb-6 text-black group-hover:text-white transition-colors duration-300">
                    <svg viewBox="0 0 88 88" fill="currentColor">
                      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.153-.033-29.716zm42.756-5.962L87.892 0v41.527l-45.136.216V6.44zm-42.723 37.19l35.67.12v35.32l-35.67-5.18v-30.26zm42.755.152l45.103.215V88l-45.103-6.23V43.782z" />
                    </svg>
                  </div>
                  <h3 className="font-pixel text-sm mb-2 group-hover:text-white transition-colors duration-300">WINDOWS</h3>
                  <span className="font-mono text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors duration-300">Download .exe · 64-bit</span>
                </a>

                {/* macOS Card — Disabled */}
                <div className="relative flex flex-col items-center justify-center p-10 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 cursor-not-allowed select-none">
                  <div className="absolute top-4 right-4 font-pixel text-[9px] text-gray-400 bg-gray-100 border border-gray-200 px-2 py-1 rounded">COMING SOON</div>
                  <div className="w-14 h-14 mb-6 text-gray-300">
                    <svg viewBox="0 0 384 512" fill="currentColor">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                  </div>
                  <h3 className="font-pixel text-sm mb-2 text-gray-300">MACOS</h3>
                  <span className="font-mono text-[10px] text-gray-300">Apple Silicon / Intel</span>
                </div>

                {/* Linux Card — Disabled */}
                <div className="relative flex flex-col items-center justify-center p-10 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 cursor-not-allowed select-none">
                  <div className="absolute top-4 right-4 font-pixel text-[9px] text-gray-400 bg-gray-100 border border-gray-200 px-2 py-1 rounded">COMING SOON</div>
                  <div className="w-14 h-14 mb-6 text-gray-300 flex items-center justify-center">
                    {/* Tux Penguin-inspired minimal SVG */}
                    <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="24" cy="16" rx="12" ry="13" />
                      <ellipse cx="24" cy="28" rx="9" ry="7" fill="white" fillOpacity="0.4" />
                      <ellipse cx="20" cy="13" rx="2" ry="2.5" fill="white" />
                      <ellipse cx="28" cy="13" rx="2" ry="2.5" fill="white" />
                      <ellipse cx="20" cy="13.5" rx="1" ry="1.5" fill="#333" />
                      <ellipse cx="28" cy="13.5" rx="1" ry="1.5" fill="#333" />
                      <path d="M21 18 Q24 20 27 18" stroke="white" strokeWidth="1" fill="none" />
                      <path d="M14 30 Q10 38 12 44 L20 42 Q22 36 24 36 Q26 36 28 42 L36 44 Q38 38 34 30" />
                    </svg>
                  </div>
                  <h3 className="font-pixel text-sm mb-2 text-gray-300">LINUX</h3>
                  <span className="font-mono text-[10px] text-gray-300">.deb / .rpm / .AppImage</span>
                </div>

              </div>

              {/* Bottom note */}
              <p className="font-mono text-[11px] text-gray-400 mt-10 text-center">
                Free for personal use · No account required · Open source on GitHub
              </p>
            </div>
          </section>

          <footer id="footer" className="w-full bg-white flex flex-col justify-end pt-16 pb-0 px-8 relative overflow-hidden border-t border-gray-100">
            {/* Top row with links */}
            <div className="flex flex-col md:flex-row items-center justify-between font-mono text-[11px] text-gray-400 relative z-10 w-full mb-12 max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <span className="font-pixel text-xs text-black">KONTEXT</span>
                <span className="text-gray-300">·</span>
                <p>© 2026 Kontext Inc. All rights reserved.</p>
              </div>
              <div className="flex items-center gap-4 pointer-events-auto">
                <span className="font-pixel text-xs text-black uppercase">CONTACT</span>
                <a href="mailto:founder@postpipe.in" className="hover:text-gray-600 transition-colors text-black font-semibold">founder@postpipe.in</a>
              </div>
            </div>

            {/* Massive KONTEXT Branding */}
            <div className="w-full flex justify-center items-end relative z-0 pointer-events-none select-none">
              <h1 className="font-pixel text-[14vw] leading-[0.8] text-zinc-950 m-0 p-0 tracking-tighter translate-y-[1.5vw]">
                KONTEXT
              </h1>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
