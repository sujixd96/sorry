# 🤍 Apology — A Cinematic React App

A deeply personal, visually stunning apology website built with React + Vite + Tailwind + Framer Motion + Firebase.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Firebase
Edit `src/firebase.js` and replace the config object with your own values:
```
Go to: https://console.firebase.google.com
→ Create a project
→ Project Settings → Your apps → Add web app
→ Copy the firebaseConfig object
→ Also enable Firestore: Build → Firestore Database → Create database
```

### 3. Run locally
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── LoadingScreen.jsx   # Animated intro loading screen
│   ├── ScrollProgress.jsx  # Top progress bar
│   ├── Particles.jsx       # Canvas floating particle system
│   ├── MusicToggle.jsx     # Ambient music on/off button
│   ├── Hero.jsx            # Typewriter hero section
│   ├── StorySection.jsx    # 3-card scroll-reveal story
│   ├── FeedbackForm.jsx    # Firebase message form
│   └── ChatEntry.jsx       # Private chat login UI
├── firebase.js             # Firebase config (edit this)
├── App.jsx                 # Root layout + page assembly
├── main.jsx                # Entry point
└── index.css               # Global styles + animations
```

---

## 🎨 Design

- **Fonts**: Cormorant Garamond (display) + DM Sans (body)
- **Colors**: Midnight black, deep violet, rose-gold accents
- **Effects**: Glassmorphism, particle system, glow, shimmer, heartbeat pulse
- **Animations**: Framer Motion — fade + slide + scale + blur reveals

---

## 🎵 Music

The music toggle uses a placeholder MP3 URL. Replace `AUDIO_URL` in `MusicToggle.jsx` with your own audio file for best results.

---

## 🔥 Firebase

Messages are saved to the `messages` collection in Firestore with:
- `text` — the message content
- `createdAt` — server timestamp
