// src/components/Experience.jsx — Timeline with work / education / achievement types + image gallery
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Cpu,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  Trophy,
  Medal,
  BadgeCheck,
  Images,
} from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import ImageGallery from "./ui/ImageGallery";
import experience from "../data/experience.json";

// ─── Icon map ────────────────────────────────────────────────
const ICONS = {
  Brain: <Brain size={17} />,
  Cpu: <Cpu size={17} />,
  GraduationCap: <GraduationCap size={17} />,
  Award: <Award size={17} />,
  Trophy: <Trophy size={17} />,
  Medal: <Medal size={17} />,
  BadgeCheck: <BadgeCheck size={17} />,
};

// ─── Per-type visual config ───────────────────────────────────
const TYPE_CONFIG = {
  work: {
    iconBg: "bg-blue-600 text-white shadow-blue-500/30",
    badge: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    label: "Work",
    orgColor: "text-blue-600 dark:text-blue-400",
    bullet: "bg-blue-400",
    connectorFrom: "from-blue-200 dark:from-blue-800",
  },
  education: {
    iconBg: "bg-yellow-400 text-slate-900 shadow-yellow-400/30",
    badge:
      "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
    label: "Education",
    orgColor: "text-yellow-600 dark:text-yellow-400",
    bullet: "bg-yellow-400",
    connectorFrom: "from-yellow-200 dark:from-yellow-800",
  },
  achievement: {
    iconBg:
      "bg-gradient-to-br from-yellow-400 to-orange-400 text-slate-900 shadow-orange-400/30",
    badge:
      "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
    label: "Achievement",
    orgColor: "text-orange-600 dark:text-orange-400",
    bullet: "bg-orange-400",
    connectorFrom: "from-orange-200 dark:from-orange-800",
  },
};

// ─── Filter tabs ──────────────────────────────────────────────
const TABS = [
  { value: "all", label: "All" },
  { value: "work", label: "💼 Work" },
  { value: "education", label: "🎓 Education" },
  { value: "achievement", label: "🏆 Achievements" },
];

// ─── Single timeline item ─────────────────────────────────────
function TimelineItem({ item, index, isLast }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.work;
  const hasImages = item.images && item.images.length > 0;

  return (
    <motion.div
      className="relative flex gap-4 md:gap-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* ── Spine ─────────────────────────── */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md z-10 ${cfg.iconBg}`}
        >
          {ICONS[item.icon] ?? <Award size={17} />}
        </div>
        {!isLast && (
          <div
            className={`w-px flex-1 mt-2 bg-gradient-to-b ${cfg.connectorFrom} to-transparent`}
          />
        )}
      </div>

      {/* ── Card ──────────────────────────── */}
      <div className="flex-1 pb-10">
        <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          {/* ── Image gallery (shown when images exist) ── */}
          {hasImages && (
            <div className="relative">
              {/* image count badge */}
              {item.images.length > 1 && (
                <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-display font-semibold pointer-events-none">
                  <Images size={11} />
                  {item.images.length}
                </div>
              )}
              <ImageGallery
                images={item.images}
                alt={item.title}
                aspectClass="aspect-video"
                className="rounded-none"
              />
            </div>
          )}

          {/* ── Text content (always visible) ── */}
          <div
            className="p-5 cursor-pointer group"
            onClick={() => setExpanded((p) => !p)}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-base md:text-lg text-slate-800 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors duration-200">
                  {item.title}
                </h3>
                <p
                  className={`font-display font-semibold text-sm mt-0.5 ${cfg.orgColor}`}
                >
                  {item.organization}
                </p>
              </div>
              <span
                className={`self-start flex-shrink-0 px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-wider ${cfg.badge}`}
              >
                {cfg.label}
              </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 mb-3">
              <span className="flex items-center gap-1.5 text-xs font-body text-slate-400 dark:text-slate-500">
                <Calendar size={11} /> {item.period}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-body text-slate-400 dark:text-slate-500">
                <MapPin size={11} /> {item.location}
              </span>
            </div>

            {/* Description */}
            <p className="font-body text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>

            {/* Highlights — expand/collapse */}
            <motion.div
              initial={false}
              animate={{
                height: expanded ? "auto" : 0,
                opacity: expanded ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <ul className="mt-4 flex flex-col gap-2 border-t border-slate-100 dark:border-slate-700/50 pt-4">
                {item.highlights.map((hl, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm font-body text-slate-600 dark:text-slate-300"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px] ${cfg.bullet}`}
                    />
                    {hl}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Toggle hint */}
            <p className="mt-3 text-xs font-display font-semibold text-slate-400 dark:text-slate-500 select-none">
              {expanded ? "▲ collapse" : "▼ show highlights"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────
export default function Experience() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? experience
      : experience.filter((item) => item.type === filter);

  const counts = {
    work: experience.filter((e) => e.type === "work").length,
    education: experience.filter((e) => e.type === "education").length,
    achievement: experience.filter((e) => e.type === "achievement").length,
  };

  return (
    <section
      id="experience"
      className="py-24 md:py-32 bg-white dark:bg-slate-900"
    >
      <div className="section-container">
        <SectionTitle
          label="Experience"
          title="My Journey So Far"
          subtitle="Click any card to reveal highlights. Images expand to full screen."
          align="center"
        />

        {/* Filter tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-1 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 rounded-xl text-sm font-display font-semibold transition-all duration-200 whitespace-nowrap ${
                  filter === tab.value
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-yellow-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {tab.label}
                {tab.value !== "all" && (
                  <span
                    className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                      filter === tab.value
                        ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-yellow-400"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                    }`}
                  >
                    {counts[tab.value]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {filtered.map((item, i) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={i}
              isLast={i === filtered.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
