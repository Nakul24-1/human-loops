"use client"

import { useEffect, useRef } from 'react'

export default function GlowOrb() {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const move = (e) => {
            el.style.top = `${e.clientY}px`
            el.style.left = `${e.clientX}px`
        }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
    }, [])

    return <div ref={ref} className="glow-orb" />
}
