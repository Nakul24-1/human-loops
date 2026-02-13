"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/*
 * Pipeline diagram with sequential animation:
 * Phase 1 ("incoming"):  3 neutral pills travel AI -> Human
 * Phase 2 ("reviewing"):  Brief pause at Human node
 * Phase 3a ("approved"):  3 green pills travel Human -> Delivered
 * Phase 3b ("flagged"):   3 red pills travel Human -> back to AI
 *
 * Phases alternate between approved and flagged outcomes each cycle.
 */

type Phase = "incoming" | "reviewing" | "outgoing";
type Outcome = "approved" | "flagged";

function getPointOnPath(path: SVGPathElement, progress: number) {
  const len = path.getTotalLength();
  const pt = path.getPointAtLength(Math.min(Math.max(progress, 0), 1) * len);
  return { x: pt.x, y: pt.y };
}

export function LoopSVG() {
  const incomingRef = useRef<SVGPathElement>(null);
  const approvedRef = useRef<SVGPathElement>(null);
  const returnRef = useRef<SVGPathElement>(null);

  const [phase, setPhase] = useState<Phase>("incoming");
  const [outcome, setOutcome] = useState<Outcome>("approved");
  const [pillPositions, setPillPositions] = useState<{ x: number; y: number }[]>([
    { x: -40, y: -40 },
    { x: -40, y: -40 },
    { x: -40, y: -40 },
  ]);

  const animRef = useRef<number>(0);
  const phaseStartRef = useRef<number>(0);
  const phaseRef = useRef(phase);
  const outcomeRef = useRef(outcome);

  phaseRef.current = phase;
  outcomeRef.current = outcome;

  const PILL_SPACING = 0.15; // fraction of path between each pill
  const INCOMING_DURATION = 2200;
  const REVIEW_DURATION = 1000;
  const OUTGOING_DURATION = 2200;

  const advancePhase = useCallback(() => {
    const cur = phaseRef.current;
    if (cur === "incoming") {
      setPhase("reviewing");
    } else if (cur === "reviewing") {
      setPhase("outgoing");
    } else {
      // cycle: flip outcome, restart
      setOutcome((prev) => (prev === "approved" ? "flagged" : "approved"));
      setPhase("incoming");
    }
  }, []);

  useEffect(() => {
    phaseStartRef.current = performance.now();
  }, [phase]);

  useEffect(() => {
    function tick(now: number) {
      const elapsed = now - phaseStartRef.current;
      const cur = phaseRef.current;
      const out = outcomeRef.current;

      if (cur === "incoming") {
        const path = incomingRef.current;
        if (path) {
          const progress = elapsed / INCOMING_DURATION;
          const positions = [0, 1, 2].map((i) => {
            const p = Math.min(Math.max(progress - i * PILL_SPACING, 0), 1);
            const eased = p < 1 ? 1 - Math.pow(1 - p, 2) : 1;
            return getPointOnPath(path, eased);
          });
          setPillPositions(positions);
          // All 3 pills have fully arrived
          if (progress >= 1 + 2 * PILL_SPACING) {
            advancePhase();
          }
        }
      } else if (cur === "reviewing") {
        // Hold pills at end of incoming path
        const path = incomingRef.current;
        if (path) {
          const endPt = getPointOnPath(path, 1);
          setPillPositions([endPt, endPt, endPt]);
        }
        if (elapsed >= REVIEW_DURATION) {
          advancePhase();
        }
      } else if (cur === "outgoing") {
        const path = out === "approved" ? approvedRef.current : returnRef.current;
        if (path) {
          const progress = elapsed / OUTGOING_DURATION;
          const positions = [0, 1, 2].map((i) => {
            const p = Math.min(Math.max(progress - i * PILL_SPACING, 0), 1);
            const eased = p < 1 ? 1 - Math.pow(1 - p, 2) : 1;
            return getPointOnPath(path, eased);
          });
          setPillPositions(positions);
          if (progress >= 1 + 2 * PILL_SPACING) {
            advancePhase();
          }
        }
      }

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, advancePhase]);

  const isApproved = outcome === "approved";
  const isOutgoing = phase === "outgoing";
  const isReviewing = phase === "reviewing";

  // Pill color depends on phase
  let pillFill = "rgba(142,172,220,0.8)";
  let pillGlow = "rgba(142,172,220,0.5)";
  if (isOutgoing || isReviewing) {
    if (isApproved) {
      pillFill = "rgba(100,232,203,0.85)";
      pillGlow = "rgba(100,232,203,0.6)";
    } else {
      pillFill = "rgba(255,140,160,0.85)";
      pillGlow = "rgba(255,140,160,0.6)";
    }
  }

  return (
    <svg
      viewBox="0 0 900 280"
      className="w-full"
      style={{ maxWidth: 820 }}
      role="img"
      aria-label="Pipeline diagram showing AI output flowing through human review to delivery or correction"
    >
      <defs>
        <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pillShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== TRACKS (hidden paths for animation) ===== */}

      {/* AI -> Human */}
      <path
        ref={incomingRef}
        d="M 140 140 C 230 140, 290 140, 380 140"
        fill="none"
        stroke="none"
      />
      {/* Human -> Delivered */}
      <path
        ref={approvedRef}
        d="M 520 140 C 610 140, 670 140, 760 140"
        fill="none"
        stroke="none"
      />
      {/* Human -> back to AI */}
      <path
        ref={returnRef}
        d="M 450 175 C 420 230, 300 250, 140 210"
        fill="none"
        stroke="none"
      />

      {/* ===== VISIBLE TRACK LINES ===== */}

      {/* AI -> Human track */}
      <line x1="155" y1="140" x2="370" y2="140" stroke="rgba(142,172,220,0.15)" strokeWidth="2" strokeDasharray="6 8" />
      <polygon points="368,134 380,140 368,146" fill="rgba(142,172,220,0.3)" />

      {/* Human -> Delivered track */}
      <line
        x1="530" y1="140" x2="745" y2="140"
        stroke="rgba(100,232,203,0.15)" strokeWidth="2" strokeDasharray="6 8"
        style={{ opacity: isApproved || !isOutgoing ? 0.8 : 0.2, transition: "opacity 0.6s" }}
      />
      <polygon
        points="743,134 755,140 743,146"
        fill="rgba(100,232,203,0.3)"
        style={{ opacity: isApproved || !isOutgoing ? 0.8 : 0.2, transition: "opacity 0.6s" }}
      />

      {/* Return curved track */}
      <path
        d="M 450 175 C 420 230, 300 250, 155 210"
        fill="none"
        stroke="rgba(255,140,160,0.12)"
        strokeWidth="2"
        strokeDasharray="6 8"
        style={{ opacity: !isApproved || !isOutgoing ? 0.8 : 0.15, transition: "opacity 0.6s" }}
      />
      <polygon
        points="160,204 148,212 156,218"
        fill="rgba(255,140,160,0.3)"
        style={{ opacity: !isApproved || !isOutgoing ? 0.8 : 0.15, transition: "opacity 0.6s" }}
      />

      {/* Return label */}
      <text
        x="310" y="255"
        textAnchor="middle"
        fill="rgba(255,160,175,0.9)"
        fontSize="12"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        style={{ opacity: !isApproved && isOutgoing ? 1 : 0.6, transition: "opacity 0.6s" }}
      >
        Returned for correction
      </text>


      {/* ===== NODE: AI OUTPUT ===== */}
      <g transform="translate(20, 108)">
        <rect width="130" height="64" rx="12" fill="rgba(12,20,38,0.9)" stroke="rgba(142,172,220,0.25)" strokeWidth="1" />
        {/* CPU icon */}
        <g transform="translate(14, 21)">
          <rect x="2" y="2" width="18" height="18" rx="3" fill="none" stroke="rgba(142,172,220,0.6)" strokeWidth="1.2" />
          <circle cx="11" cy="11" r="3.5" fill="none" stroke="rgba(142,172,220,0.5)" strokeWidth="1" />
          <line x1="6" y1="0" x2="6" y2="2" stroke="rgba(142,172,220,0.4)" strokeWidth="1" />
          <line x1="11" y1="0" x2="11" y2="2" stroke="rgba(142,172,220,0.4)" strokeWidth="1" />
          <line x1="16" y1="0" x2="16" y2="2" stroke="rgba(142,172,220,0.4)" strokeWidth="1" />
          <line x1="6" y1="20" x2="6" y2="22" stroke="rgba(142,172,220,0.4)" strokeWidth="1" />
          <line x1="11" y1="20" x2="11" y2="22" stroke="rgba(142,172,220,0.4)" strokeWidth="1" />
          <line x1="16" y1="20" x2="16" y2="22" stroke="rgba(142,172,220,0.4)" strokeWidth="1" />
        </g>
        {/* ALIGNED TEXT LEFT */}
        <text x="46" y="28" textAnchor="start" fill="rgba(200,216,240,0.95)" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          AI Output
        </text>
        <text x="46" y="44" textAnchor="start" fill="rgba(142,172,220,0.5)" fontSize="9.5" fontFamily="Inter, system-ui, sans-serif">
          Raw content
        </text>
      </g>

      {/* ===== NODE: HUMAN REVIEW (center, prominent) ===== */}
      <g transform="translate(375, 96)">
        {/* Outer glow ring */}
        <rect
          x="-5" y="-5" width="160" height="98" rx="18"
          fill="none"
          stroke={isReviewing ? (isApproved ? "rgba(100,232,203,0.2)" : "rgba(255,140,160,0.2)") : "rgba(142,172,220,0.08)"}
          strokeWidth="1"
          style={{ transition: "stroke 0.6s" }}
        />
        <rect
          width="150" height="88" rx="14"
          fill="rgba(10,18,36,0.95)"
          stroke={isReviewing ? (isApproved ? "rgba(100,232,203,0.5)" : "rgba(255,140,160,0.5)") : "rgba(142,172,220,0.2)"}
          strokeWidth="1.2"
          style={{ transition: "stroke 0.6s" }}
        />
        {/* Person icon */}
        <g transform="translate(20, 32)">
          <circle cx="10" cy="8" r="6" fill="none" stroke="rgba(200,216,240,0.6)" strokeWidth="1.3" />
          <path d="M0 28 C0 20, 20 20, 20 28" fill="none" stroke="rgba(200,216,240,0.6)" strokeWidth="1.3" />
        </g>
        {/* ALIGNED TEXT LEFT */}
        <text x="54" y="38" textAnchor="start" fill="#edf3ff" fontSize="13.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          Human Review
        </text>
        <text x="54" y="58" textAnchor="start" fill="rgba(175,189,216,0.6)" fontSize="9.5" fontFamily="Inter, system-ui, sans-serif">
          Verify &amp; correct
        </text>
      </g>

      {/* ===== STATUS BADGE ===== */}
      <g transform="translate(395, 56)">
        <rect
          width={isApproved ? 110 : 100}
          height="30" rx="15"
          fill={isOutgoing || isReviewing
            ? (isApproved ? "rgba(80,210,170,0.12)" : "rgba(255,120,140,0.12)")
            : "rgba(142,172,220,0.06)"
          }
          stroke={isOutgoing || isReviewing
            ? (isApproved ? "rgba(80,210,170,0.5)" : "rgba(255,120,140,0.5)")
            : "rgba(142,172,220,0.15)"
          }
          strokeWidth="1"
          filter="url(#nodeGlow)"
          style={{ transition: "all 0.6s" }}
        />
        {isApproved ? (
          <>
            <g transform="translate(12, 6)">
              <circle cx="9" cy="9" r="7.5" fill="none" stroke="#67e7cc" strokeWidth="1.5"
                style={{ opacity: isOutgoing || isReviewing ? 1 : 0.3, transition: "opacity 0.6s" }}
              />
              <path d="M5.5 9.5 L8 12 L12.5 6.5" fill="none" stroke="#67e7cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ opacity: isOutgoing || isReviewing ? 1 : 0.3, transition: "opacity 0.6s" }}
              />
            </g>
            {/* FIXED: Left-aligned text next to icon to prevent bleeding */}
            <text x="34" y="15" dominantBaseline="central" textAnchor="start" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif"
              fill="#b8fce6"
              style={{ opacity: isOutgoing || isReviewing ? 1 : 0.3, transition: "opacity 0.6s" }}
            >
              Verified
            </text>
          </>
        ) : (
          <>
            <g transform="translate(12, 5)">
              <line x1="5" y1="4" x2="5" y2="18" stroke="#ff8c9e" strokeWidth="2" strokeLinecap="round"
                style={{ opacity: isOutgoing || isReviewing ? 1 : 0.3, transition: "opacity 0.6s" }}
              />
              <path d="M5 4 L18 7 L18 13 L5 10 Z" fill="rgba(255,140,160,0.3)" stroke="#ff8c9e" strokeWidth="1.3" strokeLinejoin="round"
                style={{ opacity: isOutgoing || isReviewing ? 1 : 0.3, transition: "opacity 0.6s" }}
              />
            </g>
            {/* FIXED: Left-aligned text next to icon to prevent bleeding */}
            <text x="34" y="15" dominantBaseline="central" textAnchor="start" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif"
              fill="#ffd0d6"
              style={{ opacity: isOutgoing || isReviewing ? 1 : 0.3, transition: "opacity 0.6s" }}
            >
              Flagged
            </text>
          </>
        )}
      </g>

      {/* ===== NODE: DELIVERED ===== */}
      <g transform="translate(760, 108)">
        <rect width="130" height="64" rx="12"
          fill="rgba(12,20,38,0.9)"
          stroke="rgba(100,232,203,0.25)" strokeWidth="1"
          style={{ opacity: isApproved || !isOutgoing ? 1 : 0.3, transition: "opacity 0.6s" }}
        />
        {/* Checkmark doc icon */}
        <g transform="translate(14, 19)"
          style={{ opacity: isApproved || !isOutgoing ? 1 : 0.3, transition: "opacity 0.6s" }}
        >
          <rect x="2" y="1" width="16" height="20" rx="2.5" fill="none" stroke="rgba(100,232,203,0.6)" strokeWidth="1.2" />
          <path d="M6 11 L9 14 L14 8" fill="none" stroke="rgba(100,232,203,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* ALIGNED TEXT LEFT */}
        <text x="46" y="28" textAnchor="start" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif"
          fill="rgba(200,240,228,0.95)"
          style={{ opacity: isApproved || !isOutgoing ? 1 : 0.3, transition: "opacity 0.6s" }}
        >
          Delivered
        </text>
        <text x="46" y="44" textAnchor="start" fontSize="9.5" fontFamily="Inter, system-ui, sans-serif"
          fill="rgba(100,232,203,0.45)"
          style={{ opacity: isApproved || !isOutgoing ? 1 : 0.3, transition: "opacity 0.6s" }}
        >
          Verified output
        </text>
      </g>

      {/* ===== ANIMATED PILLS (3, sequential) ===== */}
      {pillPositions.map((pos, i) => (
        <rect
          key={i}
          x={pos.x - 10}
          y={pos.y - 5}
          width="20"
          height="10"
          rx="5"
          fill={pillFill}
          filter="url(#pillShadow)"
          style={{
            transition: "fill 0.5s",
            filter: `drop-shadow(0 0 5px ${pillGlow})`,
          }}
        />
      ))}
    </svg>
  );
}