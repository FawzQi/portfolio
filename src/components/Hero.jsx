// src/components/Hero.jsx — Industrial Telemetry Hero
import React from "react";
import {
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import profile from "../data/profile.json";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/80"
    >
      {/* Precision Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="section-container w-full relative z-10">
        {/* Telemetry Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              STATUS: AVAILABLE FOR HIRE
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-sky-500" />
              {profile.location}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>DISCIPLINE: EMBEDDED_ROBOTICS</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">
              VI-ROSE ITS (2024–2026)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Credentials & Bio */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-sky-600 dark:text-sky-400 font-semibold mb-2">
                {profile.title}
              </p>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-slate-900 dark:text-white">
                {profile.name}
              </h1>
            </div>

            <p className="font-body text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
              {profile.description}
            </p>

            {/* Spec Matrix from profile.json */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-mono text-xs">
              <div>
                <p className="text-slate-400 text-[10px] uppercase tracking-wider">PRIMARY HARDWARE</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">ESP32 · STM32 · Arduino</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase tracking-wider">ROBOTICS DOMAIN</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Control & Motion</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase tracking-wider">ACADEMIC BASE</p>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">ITS Computer Eng</p>
              </div>
            </div>

            {/* Direct Action Buttons with 44px min-height */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-display font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm"
              >
                <Download size={16} />
                Download CV
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-display font-semibold text-sm hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <Mail size={16} />
                {profile.email}
              </a>

              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-11 h-11 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Hardware Spec & Visual Telemetry */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
              {/* Corner crosshairs */}
              <span className="absolute -top-1.5 -left-1.5 font-mono text-xs text-slate-400 dark:text-slate-600 select-none">+</span>
              <span className="absolute -top-1.5 -right-1.5 font-mono text-xs text-slate-400 dark:text-slate-600 select-none">+</span>
              <span className="absolute -bottom-1.5 -left-1.5 font-mono text-xs text-slate-400 dark:text-slate-600 select-none">+</span>
              <span className="absolute -bottom-1.5 -right-1.5 font-mono text-xs text-slate-400 dark:text-slate-600 select-none">+</span>

              {/* Photo */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800/80 mb-4">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  width="384"
                  height="384"
                  className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-[10px] font-mono text-slate-300 rounded border border-slate-700">
                  ITS // SURABAYA
                </div>
              </div>

              {/* Telemetry rows - strictly from experience.json */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-400">ROLE</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Senior Programmer (2024–2026)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-400">TEAM</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">VI-ROSE ITS</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">NATIONAL RESULT</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">1st Place KRSTI 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
