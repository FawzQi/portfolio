// src/components/About.jsx — Systems Engineering Overview & Focus
import React from "react";
import { Cpu, Terminal, Zap, Layers } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import profile from "../data/profile.json";

const FOCUS_ICON_MAP = [
  <Cpu size={18} key="0" />,
  <Terminal size={18} key="1" />,
  <Layers size={18} key="2" />,
  <Zap size={18} key="3" />,
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800/80">
      <div className="section-container">
        <SectionTitle
          index="01"
          title="Background and Technical Focus"
          subtitle="Education, university laboratory assistant roles, and active engineering areas."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Exact bio from profile.json */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-4 font-body text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>{profile.about}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                I assist with lab sessions for digital circuits and telematics courses at ITS, help students with circuit debugging, and work on robot motion software for national competitions.
              </p>
            </div>

            <div className="mt-8 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 font-mono text-xs text-slate-600 dark:text-slate-400">
              <p className="font-semibold text-slate-900 dark:text-slate-200 mb-1">LAB ASSISTANT POSITIONS</p>
              <p>• B401 Robotics Laboratory (Lab Assistant and Practicum Assistant)</p>
              <p>• LAB MIOT (Programming Practicum Assistant for C)</p>
            </div>
          </div>

          {/* Exact Focus Array from profile.json */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.focus.map((focusItem, idx) => (
              <div
                key={focusItem}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
                  {FOCUS_ICON_MAP[idx % FOCUS_ICON_MAP.length]}
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    AREA 0{idx + 1}
                  </span>
                  <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-white leading-snug">
                    {focusItem}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
