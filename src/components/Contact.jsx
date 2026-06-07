// src/components/Contact.jsx — Contact form wired to EmailJS → Gmail

import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  MessageSquare,
} from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";
import profile from "../data/profile.json";

// ─── EmailJS config — values come from .env / GitHub Secrets ─
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─── Contact sidebar cards ────────────────────────────────────
const CONTACT_LINKS = [
  {
    icon: <Mail size={22} />,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: "blue",
  },
  {
    icon: <Github size={22} />,
    label: "GitHub",
    value: "@fawzqi",
    href: profile.github,
    color: "yellow",
  },
  {
    icon: <Linkedin size={22} />,
    label: "LinkedIn",
    value: "Ahmad Faiq Fawwaz",
    href: profile.linkedin,
    color: "blue",
  },
  {
    icon: <MapPin size={22} />,
    label: "Location",
    value: profile.location,
    href: null,
    color: "yellow",
  },
];

// ─── Form field component ─────────────────────────────────────
function Field({ label, id, type = "text", value, onChange, rows, required }) {
  const base =
    "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 " +
    "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-body text-sm " +
    "placeholder:text-slate-400 dark:placeholder:text-slate-500 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 " +
    "focus:border-transparent transition-all duration-200";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-display font-semibold text-sm text-slate-700 dark:text-slate-300"
      >
        {label} {required && <span className="text-blue-500">*</span>}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={onChange}
          required={required}
          className={`${base} resize-none`}
          placeholder={`Your ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={base}
          placeholder={`Your ${label.toLowerCase()}...`}
        />
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Main section
// ═════════════════════════════════════════════════════════════
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── Submit: sends via EmailJS → your Gmail inbox ────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    // Guard: warn in dev if keys are missing
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn(
        "[Contact] EmailJS keys not found.\n" +
          "Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, " +
          "VITE_EMAILJS_PUBLIC_KEY to your .env file.",
      );
      setErrMsg("Form not configured yet. Please email me directly.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("sending");
    setErrMsg("");

    try {
      // These template variables must match what you named them
      // in your EmailJS template (e.g. {{from_name}}, {{from_email}} …)
      const templateParams = {
        name: form.name,
        email: form.email,
        subject: form.subject || "(no subject)",
        message: form.message,
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      if (result.status !== 200)
        throw new Error(`EmailJS status: ${result.status}`);

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error("[Contact] EmailJS error:", err);
      // Give the user a helpful message
      const msg = err?.text || err?.message || "";
      if (msg.includes("invalid") || msg.includes("key")) {
        setErrMsg("Configuration error. Please contact me directly by email.");
      } else if (msg.includes("network") || msg.includes("fetch")) {
        setErrMsg("Network error. Check your connection and try again.");
      } else {
        setErrMsg(
          `Failed to send (${msg || "unknown error"}). Please email me directly.`,
        );
      }
      setStatus("error");
      setTimeout(() => setStatus("idle"), 7000);
    }
  };

  const isSending = status === "sending";

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-slate-50/50 dark:bg-slate-800/30"
    >
      <div className="section-container">
        <SectionTitle
          label="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind, or just want to say hi? I'd love to hear from you."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ── Left: contact info ────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="font-body text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-2">
              I'm currently open to new opportunities — freelance, contract, or
              full-time. Reach out and let's chat!
            </p>

            {CONTACT_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-md group transition-all duration-300"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        link.color === "blue"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white"
                          : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-400 group-hover:text-slate-900"
                      }`}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {link.label}
                      </p>
                      <p className="font-body font-medium text-sm text-slate-700 dark:text-slate-200 mt-0.5">
                        {link.value}
                      </p>
                    </div>
                    <span className="ml-auto text-slate-300 dark:text-slate-600 group-hover:text-blue-400 dark:group-hover:text-yellow-400 transition-colors text-lg">
                      →
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        link.color === "yellow"
                          ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                      }`}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {link.label}
                      </p>
                      <p className="font-body font-medium text-sm text-slate-700 dark:text-slate-200 mt-0.5">
                        {link.value}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Right: form ───────────────────────────────── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare
                  size={20}
                  className="text-blue-600 dark:text-yellow-400"
                />
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
                  Send a Message
                </h3>
              </div>

              {/* Success */}
              {status === "success" && (
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-6"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle
                    size={20}
                    className="text-green-600 flex-shrink-0"
                  />
                  <p className="font-body text-sm text-green-700 dark:text-green-300">
                    Message sent to my Gmail! I'll get back to you within 24
                    hours 🎉
                  </p>
                </motion.div>
              )}

              {/* Error */}
              {status === "error" && (
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-6"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle
                    size={20}
                    className="text-red-600 flex-shrink-0"
                  />
                  <div>
                    <p className="font-body text-sm text-red-700 dark:text-red-300">
                      {errMsg}
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-body text-xs text-red-500 dark:text-red-400 underline mt-1 inline-block"
                    >
                      {profile.email}
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Form fields */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label="Email"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Field
                  label="Subject"
                  id="subject"
                  value={form.subject}
                  onChange={handleChange}
                />
                <Field
                  label="Message"
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />

                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={isSending}
                  className={`mt-2 w-full justify-center ${isSending ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSending ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Sending to Gmail...
                    </>
                  ) : (
                    <>
                      <Send size={17} /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
