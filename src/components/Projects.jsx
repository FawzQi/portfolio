// src/components/Projects.jsx — Project cards with multi-image gallery support
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, Code2, Images } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";
import ImageGallery from "./ui/ImageGallery";
import projects from "../data/projects.json";

// Gradient placeholders cycle by card index when no images provided
const GRADIENTS = [
  "from-blue-600 to-blue-800",
  "from-yellow-400 to-orange-500",
  "from-blue-500 to-purple-700",
  "from-teal-500 to-blue-600",
  "from-orange-500 to-red-600",
  "from-violet-600 to-blue-700",
];

function ProjectCard({ project, index }) {
  const hasImages = project.images && project.images.length > 0;
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.article
      className="group flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/30 transition-all duration-400"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      layout
    >
      {/* Featured badge
      {project.featured && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-yellow-400 rounded-full text-slate-900 font-display font-bold text-xs shadow-lg">
          <Star size={10} fill="currentColor" />
          Featured
        </div>
      )} */}

      {/* ── Thumbnail / Gallery ─────────────────────────────── */}
      <div className="relative">
        {hasImages ? (
          /* Image gallery — 1 or more images */
          <div className="relative">
            {/* image count badge */}
            {project.images.length > 1 && (
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-display font-semibold pointer-events-none">
                <Images size={11} />
                {project.images.length}
              </div>
            )}
            {project.featured && (
              <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-2.5 py-1 bg-yellow-400 rounded-full text-slate-900 font-display font-bold text-xs shadow-lg pointer-events-none">
                <Star size={10} fill="currentColor" /> Featured
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
          /* Gradient placeholder when no images */
          <div
            className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
          >
            {project.featured && (
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-yellow-400 rounded-full text-slate-900 font-display font-bold text-xs shadow-lg">
                <Star size={10} fill="currentColor" /> Featured
              </div>
            )}
            <span className="font-display font-black text-6xl text-white/20 select-none">
              {project.title[0]}
            </span>
            {/* Hover overlay with GitHub / Demo links */}
            {project.github && (
              <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
                  aria-label="View on GitHub"
                >
                  <Github size={18} />
                </a>
              </div>
            )}
            {project.demo && (
              <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-slate-900 transition-all"
                  aria-label="Live demo"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Card body ───────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors duration-200">
          {project.title}
        </h3>

        <p className="font-body text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-display font-semibold rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="px-2 py-0.5 text-xs font-display font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-2 pt-3 border-t border-slate-100 dark:border-slate-700/60">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-display font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-600 hover:text-white transition-all duration-200 border border-slate-200/60 dark:border-slate-700"
            >
              <Github size={15} /> Code
            </a>
          ) : null}
          {
            project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-display font-semibold bg-yellow-400 text-slate-900 hover:bg-yellow-300 transition-all duration-200"
              >
                <ExternalLink size={15} /> Demo
              </a>
            ) : null
            // <span className="flex-1 flex items-center justify-center py-2 rounded-xl text-sm font-display text-slate-300 dark:text-slate-600 cursor-not-allowed">
            //   No Demo
            // </span>
          }
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  // Collect unique tags (cap at 10 for UI)
  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))].slice(
    0,
    11,
  );

  return (
    <section
      id="projects"
      className="py-24 md:py-32 bg-slate-50/50 dark:bg-slate-800/30"
    >
      <div className="section-container">
        <SectionTitle
          label="Projects"
          title="Things I've Built"
          subtitle="A selection of projects showcasing my range — from embedded firmware to ML pipelines. Click any image to open full screen."
          align="center"
        />

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveFilter(tag);
                setShowAll(false);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-display font-semibold transition-all duration-200 ${
                activeFilter === tag
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:text-blue-600 dark:hover:border-yellow-400 dark:hover:text-yellow-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            className="text-center py-16 text-slate-400 dark:text-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Code2 size={40} className="mx-auto mb-3 opacity-40" />
            <p className="font-body">No projects found for this filter.</p>
          </motion.div>
        )}

        {/* Show more/less */}
        {filtered.length > 6 && (
          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => setShowAll((p) => !p)}>
              {showAll ? "Show Less" : `Show All (${filtered.length})`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
