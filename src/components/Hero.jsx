// src/components/Hero.jsx — Full-screen hero with geometric background, animated intro
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import Button from "./ui/Button";
import profile from "../data/profile.json";

// Staggered animation helper
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

// Titles to cycle through (typewriter effect)
const TITLES = [
  "Embedded Systems Engineer",
  "Robotics Programmer",
  "IoT Developer",
  "Firmware Architect",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout;

    if (!isDeleting && displayed === current) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed === "") {
      // Move to next title
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    } else {
      // Type or delete one character
      const speed = isDeleting ? 45 : 90;
      timeout = setTimeout(() => {
        setDisplayed((prev) =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1),
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-900"
    >
      {/* ── Background Geometry ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large blue circle — top right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/5 dark:bg-blue-600/10" />
        {/* Yellow blob — bottom left */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-yellow-400/10 dark:bg-yellow-400/8" />
        {/* Grid dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #2563EB 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Decorative rings */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-blue-200/30 dark:border-blue-800/30" />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full border border-yellow-400/20 dark:border-yellow-600/20 m-8" />
      </div>

      {/* ── Main Content ── */}
      <div className="section-container w-full pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left — Text Content */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          {/* Location badge */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-display font-semibold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
              <MapPin size={13} className="text-blue-500" />
              {profile.location}
            </span>
          </motion.div>

          {/* Main heading */}
          <div>
            <motion.h1
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[1.1] text-slate-900 dark:text-white"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              Hi, I'm{" "}
              <span className="relative">
                <span className="text-blue-600 dark:text-yellow-400">
                  {profile.name.split(" ")[0]}
                </span>
                {/* Yellow underline decoration */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            {/* Typewriter title */}
            <motion.div
              className="mt-4 h-10 flex items-center gap-2"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.35}
            >
              <span className="font-display font-semibold text-xl md:text-2xl text-slate-500 dark:text-slate-400">
                {displayed}
              </span>
              <span className="w-0.5 h-6 bg-blue-600 dark:bg-yellow-400 animate-blink rounded-full" />
            </motion.div>
          </div>

          {/* Short description */}
          <motion.p
            className="font-body text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.45}
          >
            {profile.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 mt-2"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.55}
          >
            <Button
              variant="primary"
              href={`mailto:${profile.email}`}
              size="md"
            >
              <Mail size={18} />
              Contact Me
            </Button>
            <Button
              variant="secondary"
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
            >
              <Download size={18} />
              Download CV
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex items-center gap-4 mt-1"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.65}
          >
            <span className="text-xs font-body text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Find me on
            </span>
            <div className="flex gap-3">
              {[
                {
                  href: profile.github,
                  icon: <Github size={18} />,
                  label: "GitHub",
                },
                {
                  href: profile.linkedin,
                  icon: <Linkedin size={18} />,
                  label: "LinkedIn",
                },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 dark:hover:border-yellow-400 dark:hover:text-yellow-400 transition-all duration-200 hover:scale-110"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — Profile Image */}
        <motion.div
          className="flex justify-center lg:justify-end order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Decorative rings behind image */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-300/40 dark:border-blue-600/30 scale-110 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 scale-125" />

            {/* Profile Image container */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl shadow-blue-500/20 dark:shadow-blue-900/40">
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to initials avatar if image fails to load
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback initials avatar */}
              <div
                className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white font-display font-black text-5xl"
                style={{ display: "none" }}
              >
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            {/* Floating badge — yellow */}
            {/* <motion.div
              className="absolute -bottom-4 -right-4 sm:bottom-2 sm:right-0 px-4 py-2 bg-yellow-400 rounded-2xl shadow-lg shadow-yellow-400/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <p className="font-display font-bold text-sm text-slate-900 whitespace-nowrap">
                {/* 🏆 National Champion */}
            {/* </p> */}
            {/* </motion.div> */}

            {/* Floating badge — blue */}
            {/* <motion.div
              className="absolute -top-4 -left-4 sm:top-4 sm:left-0 px-3 py-1.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <p className="font-display font-bold text-xs text-white">
                {/* GPA 3.65 / 4.00 */}
            {/* </p>  */}
            {/* </motion.div> */}
          </div>
        </motion.div>
      </div>

      {/* ── Scroll Down Indicator ── */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          delay: 1.5,
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="text-xs font-body tracking-widest uppercase">
          Scroll
        </span>
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
