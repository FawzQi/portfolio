// src/components/Contact.jsx — Contact section with form and social links
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  MessageSquare,
} from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";
import profile from "../data/profile.json";

// Social / contact link cards
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

// Simple form field component
function Field({ label, id, type = "text", value, onChange, rows, required }) {
  const base =
    "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-body text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 focus:border-transparent transition-all duration-200";

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
          placeholder={`Enter your ${label.toLowerCase()}...`}
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
          placeholder={`Enter your ${label.toLowerCase()}...`}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // NOTE: Replace this with your actual form submission logic.
    // Options: Formspree, EmailJS, Netlify Forms, a custom API endpoint, etc.
    // Example with Formspree:
    //   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form),
    //   })

    // Simulate network delay for demo purposes
    await new Promise((r) => setTimeout(r, 1500));

    // Simulate success (swap with real response check)
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });

    // Reset after 4 seconds
    setTimeout(() => setStatus("idle"), 4000);
  };

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
          {/* Left — Contact info cards (2/5 width on large screens) */}
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
                    className={`flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-md group transition-all duration-300 hover:border-${link.color === "blue" ? "blue-400" : "yellow-400"}/60`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${link.color === "blue" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white" : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-400 group-hover:text-slate-900"} transition-colors duration-300`}
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
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${link.color === "yellow" ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"}`}
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

          {/* Right — Contact form (3/5 width) */}
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

              {/* Success/Error messages */}
              {status === "success" && (
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle
                    size={20}
                    className="text-green-600 flex-shrink-0"
                  />
                  <p className="font-body text-sm text-green-700 dark:text-green-300">
                    Message sent! I'll get back to you within 24 hours. 🎉
                  </p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle
                    size={20}
                    className="text-red-600 flex-shrink-0"
                  />
                  <p className="font-body text-sm text-red-700 dark:text-red-300">
                    Oops! Something went wrong. Please try emailing directly.
                  </p>
                </motion.div>
              )}

              {/* Form */}
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
                  required
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
                  disabled={status === "sending"}
                  className={`mt-2 w-full justify-center ${status === "sending" ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {status === "sending" ? (
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send Message
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
