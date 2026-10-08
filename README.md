# Happy Birthday Experience — React + Three.js

An interactive birthday website built with **React, Vite, Three.js, React Three Fiber, and Framer Motion**.

The project combines 3D visuals, animated typography, confetti, fireworks, floating balloons, cursor effects, and a small balloon-pop game to create a playful celebration experience.

## Tech Stack

- React 18
- Vite
- Three.js
- React Three Fiber
- Framer Motion
- canvas-confetti
- Custom Canvas animations

## Main Features

- 3D rotating photo ring
- Animated title and motion effects
- Floating balloons
- Background particles
- Cursor trail
- Confetti bursts
- Fireworks animation
- Balloon-pop mini game
- Customizable name, messages, and photos
- Vercel-ready Vite build

## Project Structure

```text
Mr.-Adarsh-Bajpai/
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

Important components include:

- `PhotoOrb` — 3D photo experience
- `KineticTitle` — animated heading
- `FloatingBalloons`
- `BgParticles`
- `CursorTrail`
- `Fireworks`
- `BalloonGame`
- `StatsSection`

## Run Locally

Requirements:

- Node.js
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
npm run preview
```

Vite generates the production build in the `dist/` directory.

## Customization

To adapt the site:

- Update the friend/person name in `src/App.jsx`
- Edit birthday text and messages in `src/App.jsx`
- Replace images in `public/images/`
- Keep the same filenames if you do not want to update image references

## Deployment

The project is compatible with Vercel.

Typical configuration:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

## Author

Built as an interactive celebration project using modern React animation and 3D web technologies.
