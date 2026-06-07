// src/components/About.jsx — About Me section with biography and focus areas
import React from "react";
import { motion } from "framer-motion";
import { Zap, Code2, Cpu, Globe } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import profile from "../data/profile.json";

// Icon map for focus areas (add more as needed)
const FOCUS_ICONS = {
  "Edge AI & TinyML": <Zap size={20} />,
  "Embedded Firmware (C/C++)": <Cpu size={20} />,
  "Machine Learning & Deep Learning": <Code2 size={20} />,
  "Robotics & Automation": <Cpu size={20} />,
};

// Stats to show at a glance
const STATS = [
  { value: "2+", label: "Years Experience" },
  { value: "10+", label: "Projects Built" },
  { value: "100+", label: "Students Mentored" },
  { value: "2", label: "National Awards" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-slate-50/50 dark:bg-slate-800/30"
    >
      <div className="section-container">
        <SectionTitle
          label="About Me"
          title="Passion for building at the edge of hardware & AI"
          subtitle="Where circuits meet algorithms — that's where I work best."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Bio text */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="font-body text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
              {profile.about}
            </p>
            <p className="font-body text-slate-500 dark:text-slate-400 leading-relaxed">
              When I'm not writing firmware, I'm mentoring students in digital
              circuits and robotics at ITS labs, reading research on real-time
              systems, or designing custom motion algorithms for the next
              competition season. I believe great embedded engineering is about
              discipline, precision, and understanding the hardware at the
              lowest level.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/50 shadow-sm"
                >
                  <p className="font-display font-black text-3xl text-blue-600 dark:text-yellow-400">
                    {stat.value}
                  </p>
                  <p className="font-body text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Focus areas */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <h3 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-2">
              Main Focus Areas
            </h3>

            {profile.focus.map((area, i) => (
              <motion.div
                key={area}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/50 shadow-sm cursor-default group hover:border-blue-400/50 dark:hover:border-yellow-400/50 transition-colors duration-300"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-yellow-400 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-yellow-400 dark:group-hover:text-slate-900 transition-colors duration-300">
                  {FOCUS_ICONS[area] ?? <Code2 size={20} />}
                </div>

                {/* Label */}
                <span className="font-body font-medium text-slate-700 dark:text-slate-200">
                  {area}
                </span>

                {/* Arrow indicator */}
                <span className="ml-auto text-slate-300 dark:text-slate-600 group-hover:text-blue-400 dark:group-hover:text-yellow-400 transition-colors duration-300">
                  →
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
