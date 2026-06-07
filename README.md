# 🚀 Personal Portfolio — React + Vite + Tailwind CSS

A modern, responsive personal portfolio website built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Fully optimized for GitHub Pages deployment.

---

## ✨ Features

- **Fully Responsive** — Mobile, tablet, and desktop layouts
- **Dark Mode** — System-aware + toggle, persisted in localStorage
- **Smooth Animations** — Framer Motion for scroll reveals, transitions, and micro-interactions
- **Typewriter Hero** — Cycling animated title in the hero section
- **Filterable Projects** — Filter by technology tag
- **Expandable Timeline** — Click cards to reveal achievement highlights
- **Contact Form** — Ready for Formspree/EmailJS integration
- **Data-Driven** — All content loaded from JSON files — no component edits needed
- **GitHub Actions** — Auto-deploys to GitHub Pages on every push

---

## 🗂️ Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── public/
│   ├── favicon.svg
│   ├── cv.pdf                  # ← Add your CV here
│   └── images/
│       ├── profile.jpg         # ← Add your photo here
│       └── projects/           # ← Add project screenshots
│           ├── edgevision.jpg
│           └── ...
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx      # Reusable button (3 variants)
│   │   │   ├── SectionTitle.jsx# Animated section headings
│   │   │   └── Loader.jsx      # Loading screen
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/                   # ← Edit these to customize content
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   └── experience.json
│   ├── hooks/
│   │   ├── useDarkMode.js
│   │   └── useScrollAnimation.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🛠️ Setup & Development

### 1. Clone and install

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✏️ Customize Your Content

All content lives in `src/data/` — edit JSON files, no component changes needed:

### `profile.json`
```json
{
  "name": "Your Name",
  "title": "Your Job Title",
  "email": "you@example.com",
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourusername",
  "location": "Your City, Country"
}
```

### `projects.json`
Add new projects as objects in the array. Set `"featured": true` to show the ⭐ badge.

### `skills.json`
Organize skills by category. Change `"color"` to `"blue"` or `"yellow"`.

### `experience.json`
Add work (`"type": "work"`) or education (`"type": "education"`) entries.

### Images
- Profile photo: `public/images/profile.jpg`
- Project screenshots: `public/images/projects/<name>.jpg`
- CV: `public/cv.pdf`

---

## 🌐 Deploy to GitHub Pages

### Option A — GitHub Actions (recommended, automatic)

1. **Set the base URL** in `vite.config.js`:
   ```js
   base: '/your-repo-name/',
   ```

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial portfolio"
   git push origin main
   ```

3. **Enable Pages** in your repo:
   - Go to **Settings → Pages**
   - Source: **GitHub Actions**

The workflow in `.github/workflows/deploy.yml` will build and deploy automatically on every push to `main`. ✅

### Option B — Manual deploy with gh-pages

```bash
npm run deploy
```

---

## 📬 Connect the Contact Form

The form is ready — just add your backend. Options:

### Formspree (easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Get your form ID
3. In `Contact.jsx`, replace the simulated submit with:

```js
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
if (res.ok) setStatus('success')
else setStatus('error')
```

### EmailJS
Follow the [EmailJS React guide](https://www.emailjs.com/docs/examples/reactjs/).

---

## 🎨 Tech Stack

| Technology    | Purpose                        |
|---------------|-------------------------------|
| React 18      | UI framework                  |
| Vite 5        | Build tool & dev server        |
| Tailwind CSS 3| Utility-first styling          |
| Framer Motion | Animations & transitions       |
| Lucide React  | Icon library                   |
| GitHub Actions| CI/CD for Pages deployment     |

---

## 📄 License

MIT — free to use, customize, and share.

---

Made with ❤️ and ☕
