// src/components/Skills.jsx — Skills section: clean tag chips, no progress bars
import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Globe, Terminal } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import skillsData from "../data/skills.json";

// Map icon name strings from JSON to Lucide components
const ICON_MAP = {
  Brain: <Brain size={20} />,
  Cpu: <Cpu size={20} />,
  Globe: <Globe size={20} />,
  Terminal: <Terminal size={20} />,
};

// Chip colors per card theme
const COLOR_CONFIG = {
  blue: {
    header: "bg-blue-600 text-white",
    iconWrap: "bg-white/20 text-white",
    chip: "bg-white text-blue-700 border border-blue-100 hover:bg-blue-50",
    chipFirst: "bg-yellow-400 text-slate-900 border-0 font-bold", // top skill highlight
    dot: "bg-yellow-400",
  },
  yellow: {
    header: "bg-yellow-400 text-slate-900",
    iconWrap: "bg-slate-900/10 text-slate-900",
    chip: "bg-white text-slate-800 border border-yellow-100 hover:bg-yellow-50",
    chipFirst: "bg-blue-600 text-white border-0 font-bold",
    dot: "bg-blue-600",
  },
};

function SkillCard({ category, index }) {
  const config = COLOR_CONFIG[category.color] ?? COLOR_CONFIG.blue;

  return (
    <motion.div
      className="rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Card header */}
      <div className={`${config.header} px-6 py-5 flex items-center gap-3`}>
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${config.iconWrap}`}
        >
          {ICON_MAP[category.icon] ?? <Terminal size={20} />}
        </div>
        <h3 className="font-display font-bold text-base">
          {category.category}
        </h3>

        {/* Skill count badge */}
        <span className="ml-auto text-xs font-display font-semibold opacity-70">
          {category.skills.length} skills
        </span>
      </div>

      {/* Skill chips */}
      <div className="px-6 py-5 flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            className={`
              px-3 py-1.5 rounded-full text-sm font-display font-medium
              transition-transform duration-200 cursor-default select-none
              hover:scale-105 hover:-translate-y-0.5
              dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600
              ${i === 0 ? config.chip : config.chip}
            `}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.15 + i * 0.04 }}
          >
            {/* Star icon only on top skill */}
            {/* {i === 0 && <span className="mr-1">★</span>} */}
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-white dark:bg-slate-900">
      <div className="section-container">
        <SectionTitle
          label="Skills"
          title="Technologies I Work With"
          subtitle="Ordered by proficiency — the ★ chip in each category is my strongest tool."
          align="center"
        />

        {/* 2-column grid on md+, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((category, i) => (
            <SkillCard key={category.category} category={category} index={i} />
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          className="text-center text-slate-400 dark:text-slate-500 font-body text-sm mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Always learning — currently exploring{" "}
          <span className="text-blue-600 dark:text-yellow-400 font-semibold">
            PLC for Automation
          </span>{" "}
          and{" "}
          <span className="text-blue-600 dark:text-yellow-400 font-semibold">
            ROS2 for Robotics
          </span>
          .
        </motion.p>
      </div>
    </section>
  );
}
