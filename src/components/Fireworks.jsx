import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

const FW_COLORS = ['#ff2e9a', '#ffc94a', '#22e7ff', '#9b5cff', '#ff6b6b', '#7CFFCB']

const Fireworks = forwardRef(function Fireworks(_, ref) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.045
        p.vx *= 0.99
        p.life -= p.decay
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
      ctx.globalAlpha = 1
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0)
      raf = requestAnimationFrame(animate)
    }
    resize()
    animate()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  function launch(x, y) {
    const count = 46
    const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)]
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count
      const speed = 2 + Math.random() * 4
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.012 + Math.random() * 0.012,
        color,
        size: 2 + Math.random() * 2,
      })
    }
  }

  useImperativeHandle(ref, () => ({ launch }))

  return <canvas id="firework-canvas" ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' }} />
})

export default Fireworks
