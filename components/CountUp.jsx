"use client"

import { useEffect, useRef, useState } from 'react'

/**
 * Animates an integer from 0 to `value` over `duration` ms when the element
 * scrolls into view. `suffix`/`prefix` are appended verbatim. The final value
 * is rendered server-side so the SSR markup matches what the user eventually sees.
 */
export default function CountUp({ value, duration = 1400, suffix = '', prefix = '' }) {
    const [display, setDisplay] = useState(value)
    const ref = useRef(null)
    const startedRef = useRef(false)

    useEffect(() => {
        const el = ref.current
        if (!el || typeof IntersectionObserver === 'undefined') return

        // Respect reduced-motion users — show final value, no animation
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
            setDisplay(value)
            return
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || startedRef.current) return
                startedRef.current = true
                io.disconnect()

                const start = performance.now()
                const tick = (now) => {
                    const elapsed = now - start
                    const t = Math.min(1, elapsed / duration)
                    // easeOutCubic for a snappy-but-soft landing
                    const eased = 1 - Math.pow(1 - t, 3)
                    setDisplay(Math.round(value * eased))
                    if (t < 1) requestAnimationFrame(tick)
                }
                setDisplay(0)
                requestAnimationFrame(tick)
            },
            { threshold: 0.4 },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [value, duration])

    return (
        <span ref={ref}>
            {prefix}{display.toLocaleString('en-US')}{suffix}
        </span>
    )
}
