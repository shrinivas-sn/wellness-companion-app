# 🌿 Wellness Companion App

A React Native mobile app built with **Expo** for daily wellness tracking — log your steps, water, sleep, and mood, and review your history over time.

---

## 📱 Screen Flow

```
Home → Today's summary, streak counter, motivational quote
Log  → Fill in wellness data + optional photo → Save
History → View all past logs, swipe to delete, pull to refresh
Settings → Set your name and daily goals
```

---

## ✨ Features

- **Home Screen** — Consecutive day streak 🔥, today's summary card, motivational quote from API
- **Log Screen** — Form with validation (steps, water, sleep, mood), optional photo picker
- **History Screen** — FlatList of past entries, swipe-to-delete, pull-to-refresh
- **Settings Screen** — Save your name and daily goals
- **Persistence** — All data stored locally using `AsyncStorage` via a custom `useAsyncStorage` hook

---

## 🧠 State Management

- `useState` for local form and UI state
- Custom `useAsyncStorage` hook wraps AsyncStorage with `loadData` and `saveData`
- All data is stored on-device — no backend required

---

## 🚀 Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/go) app on your phone

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/wellness-companion.git

# 2. Go into the project folder
cd wellness-companion

# 3. Install dependencies
npm install

# 4. Start the app
npx expo start
```

Then scan the QR code with **Expo Go** (Android) or your **Camera app** (iOS).

---

## ⚠️ Known Limitation — Notifications

Daily reminder notifications using `expo-notifications` are **fully implemented in code** but cannot run inside Expo Go due to a platform restriction introduced in **Expo SDK 53**.

To test notifications, use a development build:

```bash
npx expo install expo-dev-client
npx expo run:android
```

---

## 👤 Author

**SHRINIVAS NEMAGOUDAR** — Avantro Labs Internship
