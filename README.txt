HAPPY BIRTHDAY WEBSITE — REACT + Three.js + Framer Motion (Vercel-ready)
=========================================================================

Yeh React (Vite) app hai. Tech stack:
  - React 18 + Vite
  - Framer Motion (animations)
  - React Three Fiber + Three.js (3D rotating photo ring on hero)
  - canvas-confetti (confetti bursts)
  - Custom canvas fireworks + balloon-pop mini game

FOLDER STRUCTURE:
  index.html
  src/main.jsx, src/App.jsx, src/index.css
  src/components/  -> PhotoOrb (3D), KineticTitle, FloatingBalloons,
                       BgParticles, CursorTrail, Fireworks, BalloonGame, StatsSection
  public/images/photo1.jpg, photo2.jpg

RUN LOCALLY (isse pehle try karo):
  npm install
  npm run dev
  -> http://localhost:5173 par khulega

BUILD:
  npm run build   (dist/ folder banega)

DEPLOY ON VERCEL (2 tareeke):

1) Sabse aasan (drag & drop):
   - vercel.com par login karo
   - "Add New" -> "Project" -> is poori folder ko drag-drop kar do
     (node_modules/dist mat bhejo, wo .gitignore me already excluded hai)
   - Vercel Vite ko khud-b-khud detect kar lega (Framework Preset: Vite,
     Build Command: npm run build, Output Dir: dist) — kuch change karne
     ki zaroorat nahi
   - Deploy dabao, live link mil jayega

2) CLI se / GitHub se:
   - Is folder ko GitHub repo bana ke push karo, phir Vercel me import karo
   - Ya terminal me: npx vercel --prod

CUSTOMIZE:
   - src/App.jsx me upar FRIEND_NAME variable me apne dost ka naam daal do
   - Text (subtitle, blessings) seedha src/App.jsx me edit kar sakte ho
   - Photos replace karne ke liye public/images/photo1.jpg aur photo2.jpg
     replace kar do (naam same rakhna)

NOTE: Maine yeh code is sandbox me likha hai jahan npm registry tak network
access nahi hai, isliye yahin `npm install` chala ke test nahi kar paaya.
Code standard React/Vite/R3F patterns follow karta hai, aur Vercel ka apna
build environment internet access ke saath hota hai — wahan `npm install`
+ build normally chalega. Tu bhi pehle apne laptop par `npm install && npm
run dev` chala ke local check kar sakta hai deploy karne se pehle.

Bas itna hi — link ready hote hi apne dost ko bhej do. Party on! 🎉
