"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";

/* ──────────────────────────────────────
   Types
   ────────────────────────────────────── */
type PacketStatus = "incoming" | "reviewing" | "approved" | "flagged";

interface Packet {
  id: number;
  status: PacketStatus;
  label: string;
}

const LABELS = [
  "api/auth",
  "usr/data",
  "txn/pay",
  "msg/send",
  "img/upload",
  "ws/conn",
  "db/query",
  "evt/log",
  "ml/infer",
  "cdn/pull",
];

/* ──────────────────────────────────────
   Animation variants
   ────────────────────────────────────── */

/* Incoming lane: slide in from far left */
const incomingVariants: Variants = {
  initial: { x: -120, opacity: 0, scale: 0.8 },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
  exit: {
    x: 120,
    opacity: 0,
    scale: 0.85,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/* Reviewing lane: pop in from incoming */
const reviewingVariants: Variants = {
  initial: { x: -80, opacity: 0, scale: 0.9 },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: (status: string) =>
    status === "approved"
      ? { x: 100, opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }
      : { y: 60, x: -40, opacity: 0, rotate: -8, transition: { duration: 0.4, ease: "easeIn" } },
};

/* Approved lane: glide in from review */
const approvedVariants: Variants = {
  initial: { x: -60, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
  exit: {
    x: 160,
    opacity: 0,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

/* Flagged lane: tumble down from review */
const flaggedVariants: Variants = {
  initial: { y: -40, opacity: 0, rotate: 0 },
  animate: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 180, damping: 14 },
  },
  exit: {
    y: 30,
    opacity: 0,
    scale: 0.85,
    transition: { duration: 0.4 },
  },
};

/* ──────────────────────────────────────
   Packet chip component
   ────────────────────────────────────── */
function PacketChip({
  packet,
  variants,
}: {
  packet: Packet;
  variants: Variants;
}) {
  const colors: Record<PacketStatus, { bg: string; border: string; dot: string }> = {
    incoming: {
      bg: "rgba(129,174,252,0.08)",
      border: "rgba(129,174,252,0.3)",
      dot: "#81aefc",
    },
    reviewing: {
      bg: "rgba(250,204,80,0.08)",
      border: "rgba(250,204,80,0.35)",
      dot: "#facc50",
    },
    approved: {
      bg: "rgba(100,232,203,0.08)",
      border: "rgba(100,232,203,0.35)",
      dot: "#64e8cb",
    },
    flagged: {
      bg: "rgba(255,110,130,0.08)",
      border: "rgba(255,110,130,0.35)",
      dot: "#ff6e82",
    },
  };

  const c = colors[packet.status];

  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={packet.status}
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
      }}
      className="flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs"
    >
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ background: c.dot, boxShadow: `0 0 6px ${c.dot}` }}
      />
      <span className="text-foreground/90">{packet.label}</span>
    </motion.div>
  );
}

/* ──────────────────────────────────────
   Main demo
   ────────────────────────────────────── */
export default function FramerDemo() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const nextId = useRef(0);
  const FLAG_RATE = 0.25; // 25% flagged

  /* Spawn a new packet every 800ms */
  const spawnPacket = useCallback(() => {
    const id = nextId.current++;
    const label = LABELS[id % LABELS.length];
    setPackets((prev) => [...prev, { id, status: "incoming", label }]);
  }, []);

  /* Lifecycle: incoming -> reviewing -> approved/flagged -> removed */
  useEffect(() => {
    const spawnInterval = setInterval(spawnPacket, 800);
    return () => clearInterval(spawnInterval);
  }, [spawnPacket]);

  useEffect(() => {
    /* Move incoming -> reviewing after 1s */
    const reviewTimer = setInterval(() => {
      setPackets((prev) => {
        const idx = prev.findIndex((p) => p.status === "incoming");
        if (idx === -1) return prev;
        const copy = [...prev];
        copy[idx] = { ...copy[idx], status: "reviewing" };
        return copy;
      });
    }, 1000);

    /* Move reviewing -> approved/flagged after 1.2s */
    const decideTimer = setInterval(() => {
      setPackets((prev) => {
        const idx = prev.findIndex((p) => p.status === "reviewing");
        if (idx === -1) return prev;
        const copy = [...prev];
        const isFlagged = Math.random() < FLAG_RATE;
        copy[idx] = {
          ...copy[idx],
          status: isFlagged ? "flagged" : "approved",
        };
        return copy;
      });
    }, 1200);

    /* Remove approved/flagged after 2s */
    const cleanTimer = setInterval(() => {
      setPackets((prev) => {
        const idx = prev.findIndex(
          (p) => p.status === "approved" || p.status === "flagged"
        );
        if (idx === -1) return prev;
        return prev.filter((_, i) => i !== idx);
      });
    }, 2000);

    return () => {
      clearInterval(reviewTimer);
      clearInterval(decideTimer);
      clearInterval(cleanTimer);
    };
  }, []);

  /* Partition packets by status */
  const incoming = packets.filter((p) => p.status === "incoming");
  const reviewing = packets.filter((p) => p.status === "reviewing");
  const approved = packets.filter((p) => p.status === "approved");
  const flagged = packets.filter((p) => p.status === "flagged");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-8 font-sans">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Framer Motion Demo
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Continuous packet flow with human review gating
        </p>
      </div>

      {/* Pipeline lanes */}
      <div className="flex w-full max-w-5xl items-start gap-4">
        {/* Incoming */}
        <Lane title="Incoming" count={incoming.length} color="#81aefc">
          <AnimatePresence mode="popLayout">
            {incoming.map((p) => (
              <PacketChip key={p.id} packet={p} variants={incomingVariants} />
            ))}
          </AnimatePresence>
        </Lane>

        {/* Arrow */}
        <Arrow color="#81aefc" />

        {/* Reviewing */}
        <Lane title="Reviewing" count={reviewing.length} color="#facc50">
          <AnimatePresence mode="popLayout">
            {reviewing.map((p) => (
              <PacketChip key={p.id} packet={p} variants={reviewingVariants} />
            ))}
          </AnimatePresence>
        </Lane>

        {/* Fork */}
        <div className="flex flex-col items-center gap-6 pt-12">
          <Arrow color="#64e8cb" />
          <div className="h-6" />
          <Arrow color="#ff6e82" rotate />
        </div>

        {/* Outcomes */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Approved */}
          <Lane title="Verified" count={approved.length} color="#64e8cb" compact>
            <AnimatePresence mode="popLayout">
              {approved.map((p) => (
                <PacketChip key={p.id} packet={p} variants={approvedVariants} />
              ))}
            </AnimatePresence>
          </Lane>

          {/* Flagged */}
          <Lane title="Flagged" count={flagged.length} color="#ff6e82" compact>
            <AnimatePresence mode="popLayout">
              {flagged.map((p) => (
                <PacketChip key={p.id} packet={p} variants={flaggedVariants} />
              ))}
            </AnimatePresence>
          </Lane>
        </div>
      </div>

      {/* Stats bar */}
      <StatsBar packets={packets} totalSpawned={nextId.current} />
    </div>
  );
}

/* ──────────────────────────────────────
   Sub-components
   ────────────────────────────────────── */

function Lane({
  title,
  count,
  color,
  compact,
  children,
}: {
  title: string;
  count: number;
  color: string;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-1 flex-col gap-2 ${compact ? "" : ""}`}>
      <div className="flex items-center gap-2 px-1">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <motion.span
          key={count}
          initial={{ scale: 1.4, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="ml-auto text-xs tabular-nums text-muted-foreground"
        >
          {count}
        </motion.span>
      </div>

      <div
        className="flex min-h-[120px] flex-col gap-2 rounded-xl border border-border/50 p-3"
        style={{
          background: `linear-gradient(135deg, ${color}05, transparent)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Arrow({ color, rotate }: { color: string; rotate?: boolean }) {
  return (
    <div
      className="flex items-center pt-14"
      style={rotate ? { transform: "rotate(30deg)", marginTop: 4 } : undefined}
    >
      <motion.div
        animate={{ x: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
          <path
            d="M0 8h26m0 0l-6-5.5M26 8l-6 5.5"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
      </motion.div>
    </div>
  );
}

function StatsBar({
  packets,
  totalSpawned,
}: {
  packets: Packet[];
  totalSpawned: number;
}) {
  const totalApproved = totalSpawned - packets.length;
  const flaggedCount = packets.filter((p) => p.status === "flagged").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-6 rounded-xl border border-border/50 px-6 py-3 text-xs text-muted-foreground"
      style={{ background: "rgba(8,14,27,0.6)" }}
    >
      <span>
        Total processed:{" "}
        <span className="font-semibold text-foreground tabular-nums">
          {totalSpawned}
        </span>
      </span>
      <span className="h-3 w-px bg-border" />
      <span>
        In pipeline:{" "}
        <span className="font-semibold text-foreground tabular-nums">
          {packets.length}
        </span>
      </span>
      <span className="h-3 w-px bg-border" />
      <span>
        Cleared:{" "}
        <span className="font-semibold tabular-nums" style={{ color: "#64e8cb" }}>
          {totalApproved}
        </span>
      </span>
      <span className="h-3 w-px bg-border" />
      <span>
        Under review:{" "}
        <span className="font-semibold tabular-nums" style={{ color: "#ff6e82" }}>
          {flaggedCount}
        </span>
      </span>
    </motion.div>
  );
}
