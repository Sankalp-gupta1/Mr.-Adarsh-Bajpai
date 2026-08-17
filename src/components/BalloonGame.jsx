import { useEffect, useRef, useState } from 'react'

const COLORS = ['#ff2e9a', '#ffc94a', '#22e7ff', '#9b5cff', '#ff6b6b']
let uid = 0

export default function BalloonGame({ onPop }) {
  const [active, setActive] = useState(false)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(20)
  const [balloons, setBalloons] = useState([])
  const [finished, setFinished] = useState(false)
  const arenaRef = useRef(null)
  const spawnTimerRef = useRef(null)
  const gameTimerRef = useRef(null)

  function startGame() {
    setScore(0)
    setTime(20)
    setBalloons([])
    setFinished(false)
    setActive(true)
  }

  useEffect(() => {
    if (!active) return
    spawnTimerRef.current = setInterval(() => {
      const arenaWidth = arenaRef.current ? arenaRef.current.clientWidth : 500
      const id = uid++
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const left = Math.random() * (arenaWidth - 60)
      const duration = 3.2 + Math.random() * 1.6
      setBalloons((b) => [...b, { id, color, left, duration }])
      setTimeout(() => {
        setBalloons((b) => b.filter((x) => x.id !== id))
      }, duration * 1000 + 50)
    }, 550)

    gameTimerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(spawnTimerRef.current)
          clearInterval(gameTimerRef.current)
          setActive(false)
          setFinished(true)
          setBalloons([])
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => {
      clearInterval(spawnTimerRef.current)
      clearInterval(gameTimerRef.current)
    }
  }, [active])

  function pop(id, e) {
    e.stopPropagation()
    setScore((s) => s + 1)
    setBalloons((b) => b.filter((x) => x.id !== id))
    if (onPop) onPop(e.clientX, e.clientY)
  }

  const resultMsg =
    score >= 20 ? 'Bhai tu toh legend hai! 🔥' : score >= 10 ? 'Solid tagda score! 💪' : 'Chal theek hai, ek aur try? 😄'

  return (
    <>
      <div className="game-hud">
        <div className="pill">Score: <b>{score}</b></div>
        <div className="pill">Time: <b>{time}</b>s</div>
      </div>
      <div className="game-arena" ref={arenaRef}>
        {balloons.map((b) => (
          <div
            key={b.id}
            className="game-balloon"
            style={{
              left: b.left + 'px',
              background: `radial-gradient(circle at 30% 30%, ${b.color}, ${b.color}cc 60%, ${b.color}88)`,
              animation: `gRise ${b.duration}s linear forwards`,
            }}
            onClick={(e) => pop(b.id, e)}
          />
        ))}
        {!active && (
          <div className="game-overlay">
            {finished ? (
              <>
                <div className="big">Score: {score} 🎈</div>
                <div style={{ color: 'var(--text-dim)', margin: '0.6rem 0 1.2rem', fontFamily: "'Poppins',sans-serif" }}>
                  {resultMsg}
                </div>
                <button className="game-start" onClick={startGame}>Phir Se Khelo</button>
              </>
            ) : (
              <>
                <div className="big">🎈</div>
                <button className="game-start" onClick={startGame}>Game Shuru Karo</button>
              </>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes gRise{to{transform:translateY(-480px);}}`}</style>
    </>
  )
}
