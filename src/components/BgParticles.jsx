import { useEffect, useRef } from 'react'

export default function BgParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let raf

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = Array.from({ length: Math.min(80, Math.floor(window.innerWidth / 14)) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.6 + 0.2,
        s: Math.random() * 0.3 + 0.05,
        hue: Math.random() > 0.5 ? '255,201,74' : '255,46,154',
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.y -= p.s
        if (p.y < -5) p.y = canvas.height + 5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.hue},${p.a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas id="bg-particles" ref={canvasRef} />
}
