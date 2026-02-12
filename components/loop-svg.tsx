"use client";

import { useEffect, useRef, useState } from "react";

export function LoopSVG() {
  const approvedTrackRef = useRef<SVGPathElement>(null);
  const returnTrackRef = useRef<SVGPathElement>(null);
  const incomingTrackRef = useRef<SVGPathElement>(null);

  const approvedPillRefs = useRef<(SVGRectElement | null)[]>([]);
  const returnPillRefs = useRef<(SVGRectElement | null)[]>([]);
  const incomingPillRefs = useRef<(SVGRectElement | null)[]>([]);

  const [phase, setPhase] = useState<"approved" | "flagged">("approved");

  // Cycle between approved and flagged states
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev === "approved" ? "flagged" : "approved"));
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  // Animate packets along the incoming track (AI -> Human)
  useEffect(() => {
    const track = incomingTrackRef.current;
    const pills = incomingPillRefs.current.filter(
      Boolean
    ) as SVGRectElement[];
    if (!track || !pills.length) return;

    const total = track.getTotalLength();
    let animId: number;

    function frame(ms: number) {
      const t = ms * 0.00005;
      pills.forEach((pill, i) => {
        const pos = (t + i * 0.35) % 1;
        const point = track!.getPointAtLength(pos * total);
        pill.setAttribute("x", (point.x - 10).toFixed(1));
        pill.setAttribute("y", (point.y - 6).toFixed(1));
      });
      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Animate packets along the approved track (Human -> Delivered)
  useEffect(() => {
    const track = approvedTrackRef.current;
    const pills = approvedPillRefs.current.filter(
      Boolean
    ) as SVGRectElement[];
    if (!track || !pills.length) return;

    const total = track.getTotalLength();
    let animId: number;

    function frame(ms: number) {
      const t = ms * 0.00004;
      pills.forEach((pill, i) => {
        const pos = (t + i * 0.4) % 1;
        const point = track!.getPointAtLength(pos * total);
        pill.setAttribute("x", (point.x - 10).toFixed(1));
        pill.setAttribute("y", (point.y - 6).toFixed(1));
      });
      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Animate packets along the return track (Human -> back to AI)
  useEffect(() => {
    const track = returnTrackRef.current;
    const pills = returnPillRefs.current.filter(
      Boolean
    ) as SVGRectElement[];
    if (!track || !pills.length) return;

    const total = track.getTotalLength();
    let animId: number;

    function frame(ms: number) {
      const t = ms * 0.000035;
      pills.forEach((pill, i) => {
        const pos = (t + i * 0.5) % 1;
        const point = track!.getPointAtLength(pos * total);
        pill.setAttribute("x", (point.x - 10).toFixed(1));
        pill.setAttribute("y", (point.y - 6).toFixed(1));
      });
      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  const isApproved = phase === "approved";

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1400 900"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="incomingGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(142,172,220,0.5)" />
          <stop offset="100%" stopColor="rgba(142,172,220,0.3)" />
        </linearGradient>
        <linearGradient id="approvedGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(100,232,203,0.5)" />
          <stop offset="100%" stopColor="rgba(100,232,203,0.3)" />
        </linearGradient>
        <linearGradient id="returnGrad" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="rgba(255,140,160,0.45)" />
          <stop offset="100%" stopColor="rgba(255,140,160,0.2)" />
        </linearGradient>
        <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker
          id="arrowGreen"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 1 L 8 5 L 0 9 z" fill="rgba(100,232,203,0.7)" />
        </marker>
        <marker
          id="arrowRed"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 1 L 8 5 L 0 9 z" fill="rgba(255,140,160,0.7)" />
        </marker>
        <marker
          id="arrowBlue"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 1 L 8 5 L 0 9 z" fill="rgba(142,172,220,0.7)" />
        </marker>
      </defs>

      {/* Subtle grid lines */}
      <g className="opacity-100">
        {[
          "M80 180 C420 120 980 120 1320 180",
          "M40 320 C360 260 1040 260 1360 330",
          "M100 470 C440 420 980 420 1320 490",
          "M70 620 C420 570 980 570 1310 650",
          "M200 760 C560 710 940 710 1220 790",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(127, 151, 191, 0.12)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* ---- TRACK 1: Incoming (AI Output -> Human Review) ---- */}
      <path
        ref={incomingTrackRef}
        d="M 300 310 C 440 310, 520 250, 660 250"
        fill="none"
        stroke="url(#incomingGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 10"
        markerEnd="url(#arrowBlue)"
        className="animate-track"
      />

      {/* ---- TRACK 2: Approved (Human -> Delivered) ---- */}
      <path
        ref={approvedTrackRef}
        d="M 780 250 C 900 250, 980 310, 1110 310"
        fill="none"
        stroke="url(#approvedGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 10"
        markerEnd="url(#arrowGreen)"
        className="animate-track"
        style={{
          opacity: isApproved ? 1 : 0.25,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* ---- TRACK 3: Return / Flagged (Human -> back to AI) ---- */}
      <path
        ref={returnTrackRef}
        d="M 660 290 C 550 340, 450 380, 300 350"
        fill="none"
        stroke="url(#returnGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 10"
        markerEnd="url(#arrowRed)"
        className="animate-track"
        style={{
          opacity: isApproved ? 0.2 : 1,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* ---- NODE: AI Output ---- */}
      <g transform="translate(170 278)">
        <rect
          width="130"
          height="64"
          rx="14"
          fill="rgba(9, 16, 31, 0.72)"
          stroke="rgba(142,172,220,0.35)"
          strokeWidth="1.5"
        />
        {/* Robot / AI icon */}
        <g transform="translate(28, 16)">
          <rect
            x="0"
            y="4"
            width="18"
            height="14"
            rx="3"
            fill="none"
            stroke="rgba(142,172,220,0.8)"
            strokeWidth="1.5"
          />
          <circle cx="6" cy="11" r="2" fill="rgba(142,172,220,0.8)" />
          <circle cx="12" cy="11" r="2" fill="rgba(142,172,220,0.8)" />
          <line
            x1="9"
            y1="0"
            x2="9"
            y2="4"
            stroke="rgba(142,172,220,0.6)"
            strokeWidth="1.5"
          />
          <circle cx="9" cy="0" r="1.5" fill="rgba(142,172,220,0.7)" />
        </g>
        <text
          x="75"
          y="36"
          textAnchor="start"
          fill="#c8d8f0"
          fontSize="13"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
        >
          AI Output
        </text>
      </g>

      {/* ---- NODE: Human Review (center, prominent) ---- */}
      <g transform="translate(620 215)">
        {/* Outer glow ring */}
        <rect
          x="-4"
          y="-4"
          width="168"
          height="78"
          rx="18"
          fill="none"
          stroke={
            isApproved
              ? "rgba(100,232,203,0.2)"
              : "rgba(255,140,160,0.2)"
          }
          strokeWidth="1"
          style={{ transition: "stroke 0.6s ease" }}
        />
        <rect
          width="160"
          height="70"
          rx="14"
          fill="rgba(10, 21, 38, 0.82)"
          stroke={
            isApproved
              ? "rgba(100,232,203,0.55)"
              : "rgba(255,140,160,0.55)"
          }
          strokeWidth="1.5"
          style={{ transition: "stroke 0.6s ease" }}
        />
        {/* Person icon */}
        <g transform="translate(22, 18)">
          <circle
            cx="9"
            cy="6"
            r="5"
            fill="none"
            stroke={
              isApproved
                ? "rgba(100,232,203,0.85)"
                : "rgba(255,140,160,0.85)"
            }
            strokeWidth="1.5"
            style={{ transition: "stroke 0.6s ease" }}
          />
          <path
            d="M0 22 C0 16, 18 16, 18 22"
            fill="none"
            stroke={
              isApproved
                ? "rgba(100,232,203,0.85)"
                : "rgba(255,140,160,0.85)"
            }
            strokeWidth="1.5"
            style={{ transition: "stroke 0.6s ease" }}
          />
        </g>
        <text
          x="90"
          y="32"
          textAnchor="middle"
          fill="#edf3ff"
          fontSize="13.5"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Human Review
        </text>
        <text
          x="90"
          y="50"
          textAnchor="middle"
          fill="rgba(175,189,216,0.8)"
          fontSize="11"
          fontWeight="500"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Verify &amp; Correct
        </text>
      </g>

      {/* ---- STATUS BADGE (prominent) ---- */}
      <g
        transform="translate(667 150)"
        style={{ transition: "all 0.6s ease" }}
      >
        <rect
          width={isApproved ? 106 : 120}
          height="36"
          rx="18"
          fill={
            isApproved
              ? "rgba(80,210,170,0.15)"
              : "rgba(255,120,140,0.15)"
          }
          stroke={
            isApproved
              ? "rgba(80,210,170,0.6)"
              : "rgba(255,120,140,0.6)"
          }
          strokeWidth="1.5"
          filter={isApproved ? "url(#glowGreen)" : "url(#glowRed)"}
          style={{ transition: "all 0.6s ease" }}
        />
        {isApproved ? (
          <>
            {/* Checkmark icon */}
            <g transform="translate(14, 9)">
              <circle
                cx="9"
                cy="9"
                r="8"
                fill="none"
                stroke="#67e7cc"
                strokeWidth="1.8"
              />
              <path
                d="M5 9.5 L8 12.5 L13 6.5"
                fill="none"
                stroke="#67e7cc"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <text
              x="62"
              y="23"
              textAnchor="start"
              fill="#b8fce6"
              fontSize="13"
              fontWeight="700"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Verified
            </text>
          </>
        ) : (
          <>
            {/* Warning / flag icon */}
            <g transform="translate(14, 8)">
              <path
                d="M10 2 L18 17 L2 17 Z"
                fill="none"
                stroke="#ff8c9e"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <line
                x1="10"
                y1="8"
                x2="10"
                y2="12"
                stroke="#ff8c9e"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="10" cy="14.5" r="1" fill="#ff8c9e" />
            </g>
            <text
              x="62"
              y="23"
              textAnchor="start"
              fill="#ffd0d6"
              fontSize="13"
              fontWeight="700"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Flagged
            </text>
          </>
        )}
      </g>

      {/* ---- NODE: Delivered ---- */}
      <g transform="translate(1110 278)">
        <rect
          width="130"
          height="64"
          rx="14"
          fill="rgba(9, 16, 31, 0.72)"
          stroke="rgba(100,232,203,0.35)"
          strokeWidth="1.5"
        />
        {/* Checkmark / delivered icon */}
        <g transform="translate(26, 18)">
          <rect
            x="0"
            y="2"
            width="16"
            height="20"
            rx="2"
            fill="none"
            stroke="rgba(100,232,203,0.75)"
            strokeWidth="1.5"
          />
          <path
            d="M4 12 L7 15 L12 8"
            fill="none"
            stroke="rgba(100,232,203,0.85)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text
          x="78"
          y="36"
          textAnchor="start"
          fill="#c8f0e4"
          fontSize="13"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Delivered
        </text>
      </g>

      {/* ---- LABEL: under return arrow ---- */}
      <text
        x="480"
        y="390"
        textAnchor="middle"
        fill="rgba(255,180,190,0.55)"
        fontSize="10.5"
        fontWeight="500"
        fontFamily="Inter, system-ui, sans-serif"
        style={{
          opacity: isApproved ? 0.3 : 0.8,
          transition: "opacity 0.6s ease",
        }}
      >
        Return for correction
      </text>

      {/* ---- Incoming pills (neutral / blue-gray) ---- */}
      {[0, 1, 2].map((i) => (
        <rect
          key={`in-${i}`}
          ref={(el) => {
            incomingPillRefs.current[i] = el;
          }}
          width="20"
          height="12"
          rx="6"
          fill="#8eacdc"
          style={{
            filter: "drop-shadow(0 0 6px rgba(142,172,220,0.6))",
          }}
        />
      ))}

      {/* ---- Approved pills (green) ---- */}
      {[0, 1].map((i) => (
        <rect
          key={`ok-${i}`}
          ref={(el) => {
            approvedPillRefs.current[i] = el;
          }}
          width="20"
          height="12"
          rx="6"
          fill="#71efbe"
          style={{
            filter: "drop-shadow(0 0 8px rgba(113,239,190,0.7))",
            opacity: isApproved ? 1 : 0.15,
            transition: "opacity 0.6s ease",
          }}
        />
      ))}

      {/* ---- Return pills (red / warning) ---- */}
      {[0, 1].map((i) => (
        <rect
          key={`ret-${i}`}
          ref={(el) => {
            returnPillRefs.current[i] = el;
          }}
          width="20"
          height="12"
          rx="6"
          fill="#ff8c9e"
          style={{
            filter: "drop-shadow(0 0 8px rgba(255,140,160,0.7))",
            opacity: isApproved ? 0.1 : 1,
            transition: "opacity 0.6s ease",
          }}
        />
      ))}
    </svg>
  );
}
