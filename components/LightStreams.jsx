"use client"

import { useRef, useEffect } from 'react'

export default function LightStreams() {
    const ref = useRef(null)

    useEffect(() => {
        const canvas = ref.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let raf
        const streams = Array.from({ length: 8 }, () => ({
            x: Math.random(),
            speed: 0.3 + Math.random() * 0.6,
            particles: Array.from({ length: 18 }, () => ({ y: Math.random(), alpha: Math.random() * 0.15 })),
        }))

        function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
        resize()
        window.addEventListener('resize', resize)

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (const s of streams) {
                const sx = s.x * canvas.width
                for (const p of s.particles) {
                    p.y += s.speed * 0.001
                    if (p.y > 1) { p.y = 0; p.alpha = Math.random() * 0.15 }
                    ctx.beginPath()
                    ctx.arc(sx, p.y * canvas.height, 1, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
                    ctx.fill()
                }
            }
            raf = requestAnimationFrame(draw)
        }
        raf = requestAnimationFrame(draw)
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
    }, [])

    return <canvas ref={ref} className="bg-streams-canvas" />
}
