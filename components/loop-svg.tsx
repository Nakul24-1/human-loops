"use client";

import { useEffect, useRef, useState } from "react";

export function LoopSVG() {
  const incomingTrackRef = useRef<SVGPathElement>(null);
  const approvedTrackRef = useRef<SVGPathElement>(null);
  const returnTrackRef = useRef<SVGPathElement>(null);

  const incomingPillRefs = useRef<(SVGRectElement | null)[]>([]);
  const approvedPillRefs = useRef<(SVGRectElement | null)[]>([]);
  const returnPillRefs = useRef<(SVGRectElement | null)[]>([]);

  const [phase, setPhase] = useState<"approved" | "flagged">("approved");

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev === "approved" ? "flagged" : "approved"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate pills along a path
  function useAnimatePills(
    trackRef: React.RefObject<SVGPathElement | null>,
    pillRefs: React.RefObject<(SVGRectElement | null)[]>,
    speed: number,
    spacing: number,
    pillW: number,
    pillH: number
  ) {
    useEffect(() => {
      const track = trackRef.current;
      const pills = pillRefs.current?.filter(Boolean) as SVGRectElement[];
      if (!track || !pills.length) return;

      const total = track.getTotalLength();
      let animId: number;

      function frame(ms: number) {
        const t = ms * speed;
        pills.forEach((pill, i) => {
          const pos = (t + i * spacing) % 1;
          const point = track!.getPointAtLength(pos * total);
          pill.setAttribute("x", (point.x - pillW / 2).toFixed(1));
          pill.setAttribute("y", (point.y - pillH / 2).toFixed(1));
        });
        animId = requestAnimationFrame(frame);
      }

      animId = requestAnimationFrame(frame);
      return () => cancelAnimationFrame(animId);
    }, [trackRef, pillRefs, speed, spacing, pillW, pillH]);
  }

  useAnimatePills(incomingTrackRef, incomingPillRefs, 0.000045, 0.35, 22, 10);
  useAnimatePills(approvedTrackRef, approvedPillRefs, 0.00004, 0.45, 22, 10);
  useAnimatePills(returnTrackRef, returnPillRefs, 0.000035, 0.5, 22, 10);

  const isApproved = phase === "approved";

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1400 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Subtle ambient grid */}
      <g opacity="0.08">
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={140 + i * 110}
            x2="1400"
            y2={140 + i * 110}
            stroke="#7f97bf"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={175 + i * 150}
            y1="0"
            x2={175 + i * 150}
            y2="800"
            stroke="#7f97bf"
            strokeWidth="0.5"
          />
        ))}
      </g>

      {/* ================= TRACKS ================= */}

      {/* Track: AI -> Human (incoming, neutral) */}
      <path
        ref={incomingTrackRef}
        d="M 260 440 C 380 440, 460 390, 580 390"
        fill="none"
        stroke="rgba(142,172,220,0.18)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Animated dash overlay */}
      <path
        d="M 260 440 C 380 440, 460 390, 580 390"
        fill="none"
        stroke="rgba(142,172,220,0.35)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 12"
        className="animate-track"
      />

      {/* Track: Human -> Delivered (approved, green) */}
      <path
        ref={approvedTrackRef}
        d="M 820 390 C 940 390, 1020 440, 1140 440"
        fill="none"
        stroke="rgba(100,232,203,0.18)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          opacity: isApproved ? 1 : 0.3,
          transition: "opacity 0.8s ease",
        }}
      />
      <path
        d="M 820 390 C 940 390, 1020 440, 1140 440"
        fill="none"
        stroke="rgba(100,232,203,0.35)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 12"
        className="animate-track"
        style={{
          opacity: isApproved ? 1 : 0.2,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Track: Human -> back to AI (return, red) */}
      <path
        ref={returnTrackRef}
        d="M 620 430 C 530 490, 400 510, 260 480"
        fill="none"
        stroke="rgba(255,140,160,0.15)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          opacity: isApproved ? 0.2 : 1,
          transition: "opacity 0.8s ease",
        }}
      />
      <path
        d="M 620 430 C 530 490, 400 510, 260 480"
        fill="none"
        stroke="rgba(255,140,160,0.3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 12"
        className="animate-track"
        style={{
          opacity: isApproved ? 0.1 : 1,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* ================= NODES ================= */}

      {/* NODE: AI Output */}
      <g transform="translate(140, 415)">
        <rect
          width="120"
          height="52"
          rx="12"
          fill="rgba(12,20,38,0.85)"
          stroke="rgba(142,172,220,0.3)"
          strokeWidth="1"
        />
        {/* Simple circuit/brain icon */}
        <g transform="translate(16, 14)">
          <rect
            x="0"
            y="2"
            width="16"
            height="12"
            rx="3"
            fill="none"
            stroke="rgba(142,172,220,0.7)"
            strokeWidth="1.2"
          />
          <circle cx="5" cy="8" r="1.5" fill="rgba(142,172,220,0.7)" />
          <circle cx="11" cy="8" r="1.5" fill="rgba(142,172,220,0.7)" />
          <line x1="8" y1="0" x2="8" y2="2" stroke="rgba(142,172,220,0.5)" strokeWidth="1.2" />
          <circle cx="8" cy="0" r="1" fill="rgba(142,172,220,0.6)" />
        </g>
        <text
          x="67"
          y="30"
          textAnchor="start"
          fill="rgba(200,216,240,0.9)"
          fontSize="12"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
        >
          AI Output
        </text>
        <text
          x="67"
          y="43"
          textAnchor="start"
          fill="rgba(142,172,220,0.5)"
          fontSize="9"
          fontWeight="400"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Raw content
        </text>
      </g>

      {/* NODE: Human Review (center, prominent) */}
      <g transform="translate(585, 358)">
        {/* Outer ring / glow */}
        <rect
          x="-6"
          y="-6"
          width="242"
          height="80"
          rx="20"
          fill="none"
          stroke={isApproved ? "rgba(100,232,203,0.12)" : "rgba(255,140,160,0.12)"}
          strokeWidth="1"
          style={{ transition: "stroke 0.8s ease" }}
        />
        <rect
          width="230"
          height="68"
          rx="14"
          fill="rgba(10,20,38,0.9)"
          stroke={isApproved ? "rgba(100,232,203,0.45)" : "rgba(255,140,160,0.45)"}
          strokeWidth="1.2"
          style={{ transition: "stroke 0.8s ease" }}
        />
        {/* Person icon */}
        <g transform="translate(20, 16)">
          <circle
            cx="9"
            cy="7"
            r="5.5"
            fill="none"
            stroke={isApproved ? "rgba(100,232,203,0.75)" : "rgba(255,140,160,0.75)"}
            strokeWidth="1.3"
            style={{ transition: "stroke 0.8s ease" }}
          />
          <path
            d="M0 24 C0 17, 18 17, 18 24"
            fill="none"
            stroke={isApproved ? "rgba(100,232,203,0.75)" : "rgba(255,140,160,0.75)"}
            strokeWidth="1.3"
            style={{ transition: "stroke 0.8s ease" }}
          />
        </g>
        <text
          x="115"
          y="28"
          textAnchor="middle"
          fill="#edf3ff"
          fontSize="14"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Human Review
        </text>
        <text
          x="115"
          y="48"
          textAnchor="middle"
          fill="rgba(175,189,216,0.7)"
          fontSize="10.5"
          fontWeight="500"
          fontFamily="Inter, system-ui, sans-serif"
        >
          We verify, correct & approve
        </text>
      </g>

      {/* ---- STATUS BADGE (large, prominent) ---- */}
      <g transform="translate(637, 310)">
        {/* Badge background */}
        <rect
          width={isApproved ? 122 : 136}
          height="34"
          rx="17"
          fill={isApproved ? "rgba(80,210,170,0.12)" : "rgba(255,120,140,0.12)"}
          stroke={isApproved ? "rgba(80,210,170,0.5)" : "rgba(255,120,140,0.5)"}
          strokeWidth="1.2"
          filter="url(#softGlow)"
          style={{ transition: "all 0.8s ease" }}
        />

        {isApproved ? (
          <>
            {/* Large checkmark icon */}
            <g transform="translate(12, 7)">
              <circle cx="10" cy="10" r="9" fill="none" stroke="#67e7cc" strokeWidth="1.8" />
              <path d="M6 10.5 L9 13.5 L14 6.5" fill="none" stroke="#67e7cc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text
              x="68"
              y="22"
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
            {/* Large flag icon */}
            <g transform="translate(12, 6)">
              <line x1="5" y1="3" x2="5" y2="21" stroke="#ff8c9e" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 3 L20 6 L20 14 L5 11 Z" fill="rgba(255,140,160,0.3)" stroke="#ff8c9e" strokeWidth="1.5" strokeLinejoin="round" />
            </g>
            <text
              x="72"
              y="22"
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

      {/* NODE: Delivered */}
      <g transform="translate(1140, 415)">
        <rect
          width="120"
          height="52"
          rx="12"
          fill="rgba(12,20,38,0.85)"
          stroke="rgba(100,232,203,0.3)"
          strokeWidth="1"
          style={{
            opacity: isApproved ? 1 : 0.4,
            transition: "opacity 0.8s ease",
          }}
        />
        {/* Delivered / checkmark doc icon */}
        <g
          transform="translate(16, 12)"
          style={{
            opacity: isApproved ? 1 : 0.3,
            transition: "opacity 0.8s ease",
          }}
        >
          <rect
            x="0"
            y="2"
            width="14"
            height="18"
            rx="2"
            fill="none"
            stroke="rgba(100,232,203,0.7)"
            strokeWidth="1.2"
          />
          <path
            d="M3 11 L6 14 L11 8"
            fill="none"
            stroke="rgba(100,232,203,0.8)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text
          x="67"
          y="30"
          textAnchor="start"
          fill="rgba(200,240,228,0.9)"
          fontSize="12"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
          style={{
            opacity: isApproved ? 1 : 0.35,
            transition: "opacity 0.8s ease",
          }}
        >
          Delivered
        </text>
        <text
          x="67"
          y="43"
          textAnchor="start"
          fill="rgba(100,232,203,0.45)"
          fontSize="9"
          fontWeight="400"
          fontFamily="Inter, system-ui, sans-serif"
          style={{
            opacity: isApproved ? 1 : 0.25,
            transition: "opacity 0.8s ease",
          }}
        >
          Verified output
        </text>
      </g>

      {/* ---- RETURN LABEL ---- */}
      <text
        x="430"
        y="520"
        textAnchor="middle"
        fill="rgba(255,160,175,0.5)"
        fontSize="10"
        fontWeight="500"
        fontFamily="Inter, system-ui, sans-serif"
        style={{
          opacity: isApproved ? 0.15 : 0.7,
          transition: "opacity 0.8s ease",
        }}
      >
        Returned for correction
      </text>

      {/* ---- DIRECTIONAL ARROWS ---- */}

      {/* Arrow: AI -> Human */}
      <g transform="translate(565, 388)">
        <polygon points="0,0 10,5 0,10" fill="rgba(142,172,220,0.45)" />
      </g>
      {/* Arrow: Human -> Delivered */}
      <g
        transform="translate(1125, 438)"
        style={{
          opacity: isApproved ? 1 : 0.25,
          transition: "opacity 0.8s ease",
        }}
      >
        <polygon points="0,0 10,5 0,10" fill="rgba(100,232,203,0.45)" />
      </g>
      {/* Arrow: Return to AI */}
      <g
        transform="translate(255, 473) rotate(180)"
        style={{
          opacity: isApproved ? 0.15 : 0.6,
          transition: "opacity 0.8s ease",
        }}
      >
        <polygon points="0,0 10,5 0,10" fill="rgba(255,140,160,0.55)" />
      </g>

      {/* ================= ANIMATED PILLS ================= */}

      {/* Incoming pills (neutral blue-gray) */}
      {[0, 1, 2].map((i) => (
        <rect
          key={`in-${i}`}
          ref={(el) => { incomingPillRefs.current[i] = el; }}
          width="22"
          height="10"
          rx="5"
          fill="rgba(142,172,220,0.7)"
          style={{ filter: "drop-shadow(0 0 4px rgba(142,172,220,0.5))" }}
        />
      ))}

      {/* Approved pills (green) */}
      {[0, 1].map((i) => (
        <rect
          key={`ok-${i}`}
          ref={(el) => { approvedPillRefs.current[i] = el; }}
          width="22"
          height="10"
          rx="5"
          fill="rgba(100,232,203,0.8)"
          style={{
            filter: "drop-shadow(0 0 6px rgba(100,232,203,0.6))",
            opacity: isApproved ? 1 : 0.1,
            transition: "opacity 0.8s ease",
          }}
        />
      ))}

      {/* Return pills (red) */}
      {[0, 1].map((i) => (
        <rect
          key={`ret-${i}`}
          ref={(el) => { returnPillRefs.current[i] = el; }}
          width="22"
          height="10"
          rx="5"
          fill="rgba(255,140,160,0.75)"
          style={{
            filter: "drop-shadow(0 0 6px rgba(255,140,160,0.5))",
            opacity: isApproved ? 0.05 : 1,
            transition: "opacity 0.8s ease",
          }}
        />
      ))}
    </svg>
  );
}
