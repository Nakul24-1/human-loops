"use client"

import { useRef, useEffect } from 'react'

export default function ConfluenceCanvas() {
    const ref = useRef(null)

    useEffect(() => {
        const canvas = ref.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let raf

        const sources = [
            { label: 'AI Agents', x: 0.15, y: 0.08 },
            { label: 'Your Engineers', x: 0.5, y: 0.03 },
            { label: 'Our Humans', x: 0.85, y: 0.08 },
        ]
        const merge = { x: 0.5, y: 0.6 }
        const output = { label: 'Quality Output', x: 0.5, y: 0.92 }

        let particles = []
        let frame = 0

        function resize() {
            canvas.width = canvas.parentElement.clientWidth
            canvas.height = canvas.parentElement.clientHeight
        }
        resize()
        window.addEventListener('resize', resize)

        function spawn() {
            for (const s of sources) {
                if (Math.random() < 0.12) {
                    particles.push({
                        x: s.x * canvas.width,
                        y: s.y * canvas.height,
                        tx: merge.x * canvas.width,
                        ty: merge.y * canvas.height,
                        p: 0,
                        speed: 0.003 + Math.random() * 0.003,
                        phase: 0,
                    })
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            frame++
            if (frame % 3 === 0) spawn()

            // Draw paths
            ctx.strokeStyle = 'rgba(255,255,255,0.04)'
            ctx.lineWidth = 1
            for (const s of sources) {
                ctx.beginPath()
                ctx.moveTo(s.x * canvas.width, s.y * canvas.height)
                ctx.lineTo(merge.x * canvas.width, merge.y * canvas.height)
                ctx.stroke()
            }
            ctx.beginPath()
            ctx.moveTo(merge.x * canvas.width, merge.y * canvas.height)
            ctx.lineTo(output.x * canvas.width, output.y * canvas.height)
            ctx.stroke()

            // Source nodes
            for (const s of sources) {
                const sx = s.x * canvas.width, sy = s.y * canvas.height
                ctx.beginPath()
                ctx.arc(sx, sy, 5, 0, Math.PI * 2)
                ctx.strokeStyle = 'rgba(255,255,255,0.3)'
                ctx.lineWidth = 1
                ctx.stroke()
                ctx.fillStyle = 'rgba(255,255,255,0.5)'
                ctx.font = '11px Inter, sans-serif'
                ctx.textAlign = 'center'
                ctx.fillText(s.label, sx, sy - 14)
            }

            // Merge + output nodes
            for (const n of [merge, output]) {
                const nx = n.x * canvas.width, ny = n.y * canvas.height
                ctx.beginPath()
                ctx.arc(nx, ny, 7, 0, Math.PI * 2)
                ctx.strokeStyle = 'rgba(255,255,255,0.2)'
                ctx.lineWidth = 1.5
                ctx.stroke()
            }
            ctx.fillStyle = 'rgba(255,255,255,0.5)'
            ctx.font = '11px Inter, sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(output.label, output.x * canvas.width, output.y * canvas.height + 22)

            // Particles
            const alive = []
            for (const p of particles) {
                p.p += p.speed
                if (p.phase === 0) {
                    p.cx = p.x + (p.tx - p.x) * p.p
                    p.cy = p.y + (p.ty - p.y) * p.p
                    if (p.p >= 1) { p.p = 0; p.phase = 1; p.x = p.tx; p.y = p.ty; p.tx = output.x * canvas.width; p.ty = output.y * canvas.height }
                } else {
                    p.cx = p.x + (p.tx - p.x) * p.p
                    p.cy = p.y + (p.ty - p.y) * p.p
                    if (p.p >= 1) continue
                }
                ctx.beginPath()
                ctx.arc(p.cx, p.cy, 2, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${0.5 - p.p * 0.3})`
                ctx.fill()
                alive.push(p)
            }
            particles = alive

            raf = requestAnimationFrame(draw)
        }
        raf = requestAnimationFrame(draw)
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
    }, [])

    return <canvas ref={ref} className="confluence-canvas" />
}
