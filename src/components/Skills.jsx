// src/components/Skills.jsx — Technical Stack & Tooling Matrix
import React from "react";
import SectionTitle from "./ui/SectionTitle";
import skillsData from "../data/skills.json";

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800/80">
      <div className="section-container">
        <SectionTitle
          index="02"
          title="Skills & Tools"
          subtitle="Microcontrollers, programming languages, protocols, and software tools."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.category}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-white">
                    {category.category}
                  </h3>
                  <span className="font-mono text-[10px] text-slate-400">
                    {category.skills.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Hands-on experience
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
