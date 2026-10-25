// src/components/Projects.jsx — Engineering Project Catalog
import React, { useState } from "react";
import { Github, ExternalLink, Images, Terminal } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import ImageGallery from "./ui/ImageGallery";
import projects from "../data/projects.json";

function ProjectItem({ project }) {
  const hasImages = project.images && project.images.length > 0;

  return (
    <article className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-colors">
      <div>
        {/* Media */}
        {hasImages ? (
          <div className="relative border-b border-slate-200 dark:border-slate-800">
            {project.images.length > 1 && (
              <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm text-slate-200 text-[10px] font-mono pointer-events-none">
                <Images size={10} />
                {project.images.length}
              </div>
            )}
            <ImageGallery
              images={project.images}
              alt={project.title}
              aspectClass="aspect-video"
              className="rounded-none"
            />
          </div>
        ) : (
          <div className="h-28 bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center font-mono text-xs text-slate-400 gap-1.5 p-4 text-center">
            <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              {project.tags[0]} · {project.tags[1] || "SYSTEM"}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              [Hardware architecture & circuit design]
            </span>
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-base text-slate-900 dark:text-white leading-snug">
              {project.title}
            </h3>
            {project.featured && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Featured
              </span>
            )}
          </div>

          <p className="font-body text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action links */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between font-mono text-xs">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors"
          >
            <Github size={13} />
            Source Code
          </a>
        ) : (
          <span className="text-slate-400 text-[11px]">Internal Project</span>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:underline font-medium"
          >
            <ExternalLink size={13} />
            View Demo
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))].slice(0, 8);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800/80">
      <div className="section-container">
        <SectionTitle
          index="03"
          title="Projects"
          subtitle="Selected firmware, robotics, and hardware projects with code and demonstrations."
        />

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          <span className="text-slate-400 mr-2 flex items-center gap-1">
            <Terminal size={12} /> Filter:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 py-1 rounded transition-colors ${
                activeFilter === tag
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
