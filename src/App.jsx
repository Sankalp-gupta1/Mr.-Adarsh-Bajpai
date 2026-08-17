import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import PhotoOrb from './components/PhotoOrb.jsx'
import KineticTitle from './components/KineticTitle.jsx'
import FloatingBalloons from './components/FloatingBalloons.jsx'
import BgParticles from './components/BgParticles.jsx'
import CursorTrail from './components/CursorTrail.jsx'
import Fireworks from './components/Fireworks.jsx'
import BalloonGame from './components/BalloonGame.jsx'
import StatsSection from './components/StatsSection.jsx'

const FRIEND_NAME = '' // apne dost ka naam yahan daalo, e.g. "Rohit"
const SECTION_IDS = ['hero', 'hype', 'moment', 'game', 'celebrate']

export default function App() {
  const [introHidden, setIntroHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const heroRef = useRef(null)
  const stageWrapRef = useRef(null)
  const fireworksRef = useRef(null)
  const confettiCanvasRef = useRef(null)
  const myConfettiRef = useRef(null)

  useEffect(() => {
    myConfettiRef.current = confetti.create(confettiCanvasRef.current, { resize: true, useWorker: true })
    const t = setTimeout(() => {
      setIntroHidden(true)
      burstConfettiCenter()
    }, 1300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((s) => spy.observe(s))
    return () => spy.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (introHidden) {
        const x = Math.random() * window.innerWidth
        const y = window.innerHeight * 0.15 + Math.random() * window.innerHeight * 0.35
        fireworksRef.current?.launch(x, y)
      }
    }, 4200)
    return () => clearInterval(interval)
  }, [introHidden])

  function burstConfettiCenter() {
    myConfettiRef.current?.({ particleCount: 130, spread: 100, startVelocity: 45, origin: { y: 0.6 }, colors: ['#ff2e9a', '#ffc94a', '#22e7ff', '#9b5cff'] })
  }
  function burstConfettiAt(x, y) {
    myConfettiRef.current?.({ particleCount: 60, spread: 70, startVelocity: 35, origin: { x: x / window.innerWidth, y: y / window.innerHeight }, colors: ['#ff2e9a', '#ffc94a', '#22e7ff', '#9b5cff'] })
  }
  function grandFinale() {
    const centerY = window.innerHeight * 0.4
    let i = 0
    const total = 7
    const interval = setInterval(() => {
      const x = window.innerWidth * (0.15 + Math.random() * 0.7)
      const y = centerY + (Math.random() - 0.5) * window.innerHeight * 0.3
      fireworksRef.current?.launch(x, y)
      burstConfettiAt(x, y)
      i++
      if (i >= total) clearInterval(interval)
    }, 200)
  }

  function handleBodyClick(e) {
    if (e.target.closest('.burst-btn, .dots, .game-balloon, .game-start, canvas')) return
    burstConfettiAt(e.clientX, e.clientY)
  }

  function handleHeroMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height
    if (stageWrapRef.current) {
      stageWrapRef.current.style.transform = `translate(${dx * 16}px, ${dy * 16}px)`
    }
  }

  const friendLabel = FRIEND_NAME ? `${FRIEND_NAME} ko ❤️` : 'mere yaar ko ❤️'

  return (
    <div onClick={handleBodyClick}>
      <div id="intro" className={introHidden ? 'hide' : ''}>
        <div className="intro-emoji">🎂</div>
        <div className="intro-text">Party Loading Ho Rahi Hai...</div>
        <div className="intro-bar"><span /></div>
      </div>

      <BgParticles />
      <Fireworks ref={fireworksRef} />
      <canvas ref={confettiCanvasRef} style={{ position: 'fixed', inset: 0, zIndex: 6, pointerEvents: 'none', width: '100%', height: '100%' }} />
      <CursorTrail />

      <div className="dots">
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            className={activeSection === id ? 'active' : ''}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </div>

      {/* SCENE 1: HERO */}
      <section className="hero" id="hero" ref={heroRef} onMouseMove={handleHeroMouseMove}>
        <div className="scene-label h1c">✦ Scene 01 — Aaj Ka Hero ✦</div>
        <div ref={stageWrapRef} style={{ transition: 'transform .1s ease-out' }}>
          <PhotoOrb src="/images/photo1.jpg" />
        </div>
        <KineticTitle text="HAPPY BIRTHDAY" />
        <div className="name">{friendLabel}</div>
        <p className="sub">Ek saal aur bada, ek saal aur zyada dhamaal. Aaj ka din tera hai bhai — full masti, full pyaar aur full tagda vibes ke saath. 🎉</p>
        <div className="scroll-cue"><span />scroll karke poora tamasha dekho</div>
        <FloatingBalloons />
      </section>

      {/* SCENE 2: STATS */}
      <StatsSection />

      {/* SCENE 3: BLESSINGS SPOTLIGHT */}
      <section className="moment" id="moment">
        <div className="spotlight-wrap">
          <div className="beam b1" /><div className="beam b2" /><div className="beam b3" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="frame">
            <div className="glow" />
            <img src="/images/photo2.jpg" alt="Blessings moment" />
          </div>
          <div className="copy">
            <div className="scene-label h3c" style={{ marginBottom: '.6rem' }}>✦ Scene 03 — Ashirwad ✦</div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>
              Blessings ke saath <em>shuru</em> hua naya saal
            </h2>
            <p>Jaise ye pal khaas hai, waise hi tera pura saal khaas rahe. Ghar ka pyaar, doston ka saath aur bhagwan ka ashirwad — sab kuch tere saath rahe, hamesha.</p>
            <p>Tu jitna tagda dikhta hai, zindagi mein utna hi tagda banke aage badhte rehna. Yehi dua hai! 🙏✨</p>
            <div className="sparkle-row"><span>🎊</span><span>🪔</span><span>🌸</span><span>✨</span></div>
          </div>
        </div>
      </section>

      {/* SCENE 4: BALLOON POP GAME */}
      <section className="game" id="game">
        <div className="scene-label h4c">✦ Scene 04 — Khel Shuru ✦</div>
        <h2 className="section-title">Balloon <em>Pop</em> Challenge</h2>
        <p>20 second, jitne balloons phod sako phodo. Score dikhayega tu kitna tagda hai!</p>
        <BalloonGame onPop={burstConfettiAt} />
      </section>

      {/* SCENE 5: FINALE */}
      <section className="celebrate" id="celebrate">
        <div className="scene-label h5c">✦ Scene 05 — Grand Finale ✦</div>
        <motion.div
          className="cake"
          whileHover={{ scale: 1.08, rotate: -3 }}
          onClick={(e) => { fireworksRef.current?.launch(e.clientX, e.clientY); burstConfettiAt(e.clientX, e.clientY) }}
        >
          🎂🕯️
        </motion.div>
        <h2 className="section-title">Ab thodi <em>aatishbaazi</em> ho jaaye?</h2>
        <p>Button daba aur dekh — screen pe fatega pura celebration. Jitni baar chahe daba, party khatam nahi hoti yahan!</p>
        <button className="burst-btn" onClick={() => { grandFinale(); burstConfettiCenter() }}>
          🎆 Fire Up The Party
        </button>
        <div className="burst-hint">tip: screen kahin bhi tap karo, confetti wahin phategi</div>
      </section>

      <footer>
        <span className="msg">"Happy Birthday yaara — tu tagda, tera din tagda, tera saal tagda!" 🥳</span>
        Made with ❤️ for a solid dost.
        <div className="credit">CRAFTED FOR YOUR BIG DAY</div>
      </footer>
    </div>
  )
}
