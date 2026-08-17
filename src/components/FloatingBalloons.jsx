import { useEffect, useState } from 'react'

const COLORS = ['#ff2e9a', '#ffc94a', '#22e7ff', '#9b5cff', '#ff6b6b']
let uid = 0

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState([])

  useEffect(() => {
    function spawn() {
      const id = uid++
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const left = Math.random() * 100
      const duration = 9 + Math.random() * 6
      setBalloons((b) => [...b, { id, color, left, duration }])
      setTimeout(() => {
        setBalloons((b) => b.filter((x) => x.id !== id))
      }, duration * 1000)
    }
    const initial = [0, 400, 800].map((d) => setTimeout(spawn, d))
    const interval = setInterval(spawn, 1600)
    return () => {
      initial.forEach(clearTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon"
          style={{
            left: b.left + 'vw',
            animationDuration: b.duration + 's',
            background: `radial-gradient(circle at 30% 30%, ${b.color}, ${b.color}cc 60%, ${b.color}88)`,
          }}
        />
      ))}
    </>
  )
}
