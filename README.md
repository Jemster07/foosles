# 🦖 foosles

> A virtual pet game where players manage their Foosle's unpredictable needs through cause-and-effect care mechanics.

[![Framework: Vue 3](https://shields.io)](https://vuejs.org)
[![Language: TypeScript](https://shields.io)](https://typescriptlang.org)
[![Style: Tailwind CSS](https://shields.io)](https://tailwindcss.com)
[![Build Tool: Vite](https://shields.io)](https://vite.dev)

---

## 🎮 Gameplay Mechanics

Foosles revolves around keeping your virtual pet healthy and happy by responding to its real-time demands.

### Phase 1: Core Survival

- **Dynamic Care Requirements** – A backend number generator randomly triggers needs for **feeding**, **rolling**, or **petting**.
- **Time-Driven Checks** – An internal clock object evaluates care triggers on every passing second.
- **Health Depletion** – Providing the wrong care or ignoring your Foosle drops its health stat. Reaching 0 results in a definitive game over.

### Phase 2: Behavioral Trinity (Cause & Effect)

Instead of guessing, your Foosle's animations indicate its current state. Care options interact through an interconnected loop:

- **Petting** – Boosts happiness, but risks triggering hunger or physical shedding.
- **Feeding** – Restores health, but carries a high probability of causing your pet to shed.
- **Rolling** – Cleans up the play area. Rolling while shed is present restores health. Rolling at the wrong time lowers happiness.
- **Shedding Penalty** – Accumulated shed lowers happiness over time. Petting a hungry or shedding Foosle rapidly drains its health.
- **The Danger Zone** – Low happiness triggers rapid shedding. Your Foosle will physically shrink in size, making it significantly harder to save.

---

## 🛠️ Roadmap & TODO

### Core Systems

- [x] Build clock-driven animation
- [ ] Build sprite parser
- [ ] Build random number generator system
- [ ] Build health stat and state rules

### User Interface & Visuals

- [x] Create clock animation
- [ ] Drive sprite animations from random number generator system
- [ ] Build UI interaction buttons
- [ ] Design custom Windows 98 nostalgia theming with Tailwind CSS

### Future Features & Polish

- [ ] Implement local progress saving
- [ ] Refine Foosle animations
- [ ] Add retro audio sound effects
- [ ] Develop customizable numbered clock faces

---

## ⚙️ Development Setup

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm**

### Recommended IDE Setup

- [VS Code](https://visualstudio.com) + [Vue (Official)](https://visualstudio.com) (Make sure to disable Vetur).

### Recommended Browser DevTools

- **Chromium-based (Chrome, Edge, Brave):** [Vue.js devtools](https://google.com) + [Turn on Custom Object Formatter](http://bit.ly).
- **Firefox:** [Vue.js devtools](https://mozilla.org) + [Turn on Custom Object Formatter](https://fxdx.dev).

### Type Support for `.vue` Imports

TypeScript cannot handle type information for `.vue` imports by default. This project replaces the `tsc` CLI with `vue-tsc` for type checking. In your editor, use [Volar](https://visualstudio.com) to make the TypeScript language service aware of `.vue` types.

---

## 🚀 Scripts

### Installation

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with ESLint

```sh
npm run lint
```

For advanced build configurations, see the [Vite Configuration Reference](https://vite.devconfig/).
