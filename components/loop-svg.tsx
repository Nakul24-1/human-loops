"use client";

import { useEffect, useRef } from "react";

export function LoopSVG() {
  const flagTextRef = useRef<SVGTextElement>(null);
  const flagBadgeRef = useRef<SVGRectElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const pillRefs = useRef<(SVGRectElement | null)[]>([]);
  const isOkRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const pills = pillRefs.current.filter(Boolean) as SVGRectElement[];
    if (!track || !pills.length) return;

    const total = track.getTotalLength();
    const QA_SPLIT = 0.49;
    let animId: number;

    function stylePill(pill: SVGRectElement, pos: number) {
      if (!isOkRef.current) {
        pill.setAttribute("fill", "#ff7f9a");
        pill.style.filter =
          "drop-shadow(0 0 10px rgba(255, 98, 142, 0.95))";
        return;
      }
      if (pos >= QA_SPLIT) {
        pill.setAttribute("fill", "#71efbe");
        pill.style.filter =
          "drop-shadow(0 0 10px rgba(113, 239, 190, 0.95))";
      } else {
        pill.setAttribute("fill", "#8ec8ff");
        pill.style.filter =
          "drop-shadow(0 0 8px rgba(112, 195, 255, 0.8))";
      }
    }

    function frame(ms: number) {
      const t = ms * 0.00006;
      pills.forEach((pill, i) => {
        const pos = (t + i * 0.24) % 1;
        const point = track!.getPointAtLength(pos * total);
        pill.setAttribute("x", (point.x - 9).toFixed(1));
        pill.setAttribute("y", (point.y - 5).toFixed(1));
        stylePill(pill, pos);
      });
      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      isOkRef.current = !isOkRef.current;
      const flagText = flagTextRef.current;
      const flagBadge = flagBadgeRef.current;
      if (!flagText || !flagBadge) return;

      if (isOkRef.current) {
        flagText.textContent = "\u2713 Fixed";
        flagText.setAttribute("fill", "#d8ffea");
        flagBadge.setAttribute("fill", "rgba(86, 211, 155, 0.2)");
        flagBadge.setAttribute("stroke", "rgba(86, 211, 155, 0.56)");
      } else {
        flagText.textContent = "\u26A0 Flag";
        flagText.setAttribute("fill", "#ffd9de");
        flagBadge.setAttribute("fill", "rgba(255, 111, 131, 0.17)");
        flagBadge.setAttribute("stroke", "rgba(255, 111, 131, 0.55)");
      }
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1400 900"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64e8cb" />
          <stop offset="100%" stopColor="#7ea9ff" />
        </linearGradient>
        <marker
          id="flowArrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#7ea9ff" />
        </marker>
      </defs>

      {/* Grid lines */}
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
            stroke="rgba(127, 151, 191, 0.18)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Track */}
      <path
        ref={trackRef}
        d="M 170 272 C 470 95, 930 95, 1230 272"
        fill="none"
        stroke="url(#loopGrad)"
        strokeWidth="3.3"
        strokeLinecap="round"
        strokeDasharray="8 13"
        markerEnd="url(#flowArrow)"
        className="animate-track"
      />

      {/* Incoming node */}
      <g transform="translate(120 212)">
        <rect
          width="130"
          height="76"
          rx="14"
          fill="rgba(9, 16, 31, 0.62)"
          stroke="rgba(137, 171, 230, 0.34)"
        />
        <text
          x="65"
          y="46"
          textAnchor="middle"
          fill="#d8e7ff"
          fontSize="13"
          fontWeight="600"
        >
          Incoming
        </text>
      </g>

      {/* Human QA node */}
      <g transform="translate(639 118)">
        <rect
          width="122"
          height="64"
          rx="14"
          fill="rgba(10, 21, 38, 0.75)"
          stroke="rgba(134, 228, 198, 0.55)"
        />
        <text
          x="61"
          y="33"
          textAnchor="middle"
          fill="#d8e7ff"
          fontSize="13"
          fontWeight="600"
        >
          Human QA
        </text>
        <text
          x="61"
          y="50"
          textAnchor="middle"
          fill="#d8e7ff"
          fontSize="13"
          fontWeight="600"
        >
          Review
        </text>
      </g>

      {/* Delivered node */}
      <g transform="translate(1150 212)">
        <rect
          width="130"
          height="76"
          rx="14"
          fill="rgba(9, 16, 31, 0.62)"
          stroke="rgba(137, 171, 230, 0.34)"
        />
        <text
          x="65"
          y="46"
          textAnchor="middle"
          fill="#d8e7ff"
          fontSize="13"
          fontWeight="600"
        >
          Delivered
        </text>
      </g>

      {/* Flag badge */}
      <g transform="translate(782 178)">
        <rect
          ref={flagBadgeRef}
          width="74"
          height="30"
          rx="10"
          fill="rgba(255, 111, 131, 0.17)"
          stroke="rgba(255, 111, 131, 0.55)"
        />
        <text
          ref={flagTextRef}
          x="37"
          y="20"
          textAnchor="middle"
          fill="#ffd9de"
          fontSize="12"
          fontWeight="600"
        >
          {"\u26A0 Flag"}
        </text>
      </g>

      {/* Pills */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          ref={(el) => {
            pillRefs.current[i] = el;
          }}
          width="18"
          height="10"
          rx="5"
          fill="#9ddaff"
          style={{
            filter: "drop-shadow(0 0 8px rgba(112, 207, 255, 0.7))",
          }}
        />
      ))}
    </svg>
  );
}
