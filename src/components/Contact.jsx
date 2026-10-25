// src/components/Contact.jsx — Clean Engineering Contact & Dispatch
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Github, Linkedin, Send, MapPin } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import profile from "../data/profile.json";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      window.location.href = mailtoUrl;
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject || "(no subject)",
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      window.location.href = mailtoUrl;
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#0B0F17]">
      <div className="section-container">
        <SectionTitle
          index="05"
          title="Contact"
          subtitle="Open to junior embedded systems, firmware, and robotics engineering roles."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
              <p className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">EMAIL</p>
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-sm text-sky-600 dark:text-sky-400 font-semibold hover:underline block"
              >
                {profile.email}
              </a>
              <p className="font-body text-xs text-slate-500 mt-1">Direct inquiries welcome.</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">LOCATION</span>
                <span className="text-slate-700 dark:text-slate-200">{profile.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">GITHUB</span>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">
                  @fawzqi
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">LINKEDIN</span>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">
                  in/ahmadfaiqfawwaz
                </a>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                    NAME
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                    EMAIL
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                  SUBJECT
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Opportunity or Question"
                  className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                  className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              {status === "success" && (
                <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                  Message sent. Thank you!
                </p>
              )}
              {status === "error" && (
                <p className="font-mono text-xs text-amber-600 dark:text-amber-400">
                  Direct email dispatch opened in your email client.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                <Send size={13} />
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
