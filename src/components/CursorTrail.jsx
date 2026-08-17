import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let trail = []
    let raf

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    function onMove(e) {
      trail.push({ x: e.clientX, y: e.clientY, life: 1 })
      if (trail.length > 40) trail.shift()
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      trail.forEach((p) => {
        p.life -= 0.04
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = '#ffc94a'
        ctx.fill()
      })
      ctx.globalAlpha = 1
      trail = trail.filter((p) => p.life > 0)
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas id="cursor-canvas" ref={canvasRef} />
}
