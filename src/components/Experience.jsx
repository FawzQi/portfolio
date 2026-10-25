// src/components/Experience.jsx — Experience and Education
import React, { useState } from "react";
import { MapPin, Images } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import ImageGallery from "./ui/ImageGallery";
import experience from "../data/experience.json";

function ExperienceRow({ item }) {
  const hasImages = item.images && item.images.length > 0;

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900/50 p-6 mb-4 hover:border-slate-400 dark:hover:border-slate-700 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-sky-600 dark:text-sky-400 font-semibold">
            {item.type} · {item.period}
          </span>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-0.5">
            {item.title}
          </h3>
          <p className="font-body text-sm font-semibold text-slate-700 dark:text-slate-300">
            {item.organization}
          </p>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
          <MapPin size={12} />
          {item.location}
        </div>
      </div>

      <p className="font-body text-sm text-slate-600 dark:text-slate-400 leading-relaxed my-4">
        {item.description}
      </p>

      {/* Highlights */}
      {item.highlights && item.highlights.length > 0 && (
        <ul className="space-y-1.5 font-mono text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800/80">
          {item.highlights.map((hl, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-amber-500 font-bold select-none">&gt;</span>
              <span>{hl}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Gallery attachments */}
      {hasImages && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="font-mono text-[11px] text-slate-400 mb-2 flex items-center gap-1">
            <Images size={12} /> Competition and Project Photos:
          </p>
          <div className="max-w-md">
            <ImageGallery
              images={item.images}
              alt={item.title}
              aspectClass="aspect-video"
              className="rounded-lg border border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? experience
      : experience.filter((item) => item.type === filter);

  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800/80">
      <div className="section-container">
        <SectionTitle
          index="04"
          title="Experience & Education"
          subtitle="Work history in robotics teams, laboratory teaching, and competition results."
        />

        {/* Filter */}
        <div className="flex gap-2 mb-8 font-mono text-xs">
          {["all", "work", "achievement", "education"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded uppercase tracking-wider transition-colors ${
                filter === tab
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          {filtered.map((item) => (
            <ExperienceRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
