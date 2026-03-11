"use client"

import { useRef, useEffect } from 'react'

export default function MeshGradientBG() {
    const ref = useRef(null)

    useEffect(() => {
        const canvas = ref.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let raf
        const blobs = [
            { x: 0.2, y: 0.3, r: 400, vx: 0.0003, vy: 0.0002, color: [20, 30, 80] },
            { x: 0.7, y: 0.5, r: 350, vx: -0.0002, vy: 0.0003, color: [40, 20, 80] },
            { x: 0.5, y: 0.8, r: 300, vx: 0.0002, vy: -0.0002, color: [15, 50, 60] },
            { x: 0.3, y: 0.6, r: 280, vx: -0.0003, vy: -0.0001, color: [50, 35, 20] },
        ]

        function resize() {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        function draw(t) {
            ctx.fillStyle = '#070710'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            for (const b of blobs) {
                b.x += b.vx
                b.y += b.vy
                if (b.x < 0.05 || b.x > 0.95) b.vx *= -1
                if (b.y < 0.05 || b.y > 0.95) b.vy *= -1
                const cx = b.x * canvas.width
                const cy = b.y * canvas.height
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r)
                g.addColorStop(0, `rgba(${b.color.join(',')},0.35)`)
                g.addColorStop(1, 'transparent')
                ctx.fillStyle = g
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
            raf = requestAnimationFrame(draw)
        }
        raf = requestAnimationFrame(draw)
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
    }, [])

    return <canvas ref={ref} className="bg-mesh-canvas" />
}
