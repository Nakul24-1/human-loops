"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/* ──────────────────────────────────────
   Types & constants
   ────────────────────────────────────── */
type PacketStatus = "incoming" | "reviewing" | "verified" | "flagged";

interface Packet {
  id: number;
  status: PacketStatus;
  label: string;
  sector: "legal" | "healthcare" | "finance";
}

const TASK_POOL: { label: string; sector: Packet["sector"] }[] = [
  { label: "Contract clause review", sector: "legal" },
  { label: "Patient intake form", sector: "healthcare" },
  { label: "Invoice reconciliation", sector: "finance" },
  { label: "NDA classification", sector: "legal" },
  { label: "Lab result summary", sector: "healthcare" },
  { label: "Expense categorisation", sector: "finance" },
  { label: "Compliance check", sector: "legal" },
  { label: "Insurance claim entry", sector: "healthcare" },
  { label: "Tax filing review", sector: "finance" },
  { label: "Deposition tagging", sector: "legal" },
  { label: "Prescription validation", sector: "healthcare" },
  { label: "Payroll data entry", sector: "finance" },
  { label: "Case brief extraction", sector: "legal" },
  { label: "Discharge note review", sector: "healthcare" },
  { label: "Audit trail check", sector: "finance" },
];

const MAX_INCOMING = 10;
const MAX_REVIEWING = 10;
const MAX_VERIFIED = 5;
const MAX_FLAGGED = 5;

const FLAG_RATE = 0.25;

/* ──────────────────────────────────────
   Icons (inline SVGs matching loop-svg)
   ────────────────────────────────────── */
function AiIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 22 22" fill="none" className="shrink-0">
      <rect x="2" y="2" width="18" height="18" rx="3" stroke={color} strokeWidth="1.3" />
      <circle cx="11" cy="11" r="3.5" stroke={color} strokeWidth="1" fill="none" />
      <line x1="6" y1="0" x2="6" y2="2" stroke={color} strokeWidth="1" />
      <line x1="11" y1="0" x2="11" y2="2" stroke={color} strokeWidth="1" />
      <line x1="16" y1="0" x2="16" y2="2" stroke={color} strokeWidth="1" />
      <line x1="6" y1="20" x2="6" y2="22" stroke={color} strokeWidth="1" />
      <line x1="11" y1="20" x2="11" y2="22" stroke={color} strokeWidth="1" />
      <line x1="16" y1="20" x2="16" y2="22" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function HumanIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 22 28" fill="none" className="shrink-0">
      <circle cx="11" cy="8" r="6" stroke={color} strokeWidth="1.3" fill="none" />
      <path d="M1 28 C1 20, 21 20, 21 28" stroke={color} strokeWidth="1.3" fill="none" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.3" fill="none" />
      <path d="M6 10.5 L8.5 13 L14 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function FlagIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 22" fill="none" className="shrink-0">
      <line x1="4" y1="2" x2="4" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 2 L16 5 L16 13 L4 10 Z" fill={`${color}30`} stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/* ──────────────────────────────────────
   Sector badge colors
   ────────────────────────────────────── */
const SECTOR_COLORS: Record<Packet["sector"], string> = {
  legal: "rgba(168,148,255,0.6)",
  healthcare: "rgba(100,200,255,0.6)",
  finance: "rgba(255,200,100,0.6)",
};

/* ──────────────────────────────────────
   Animation variants
   ────────────────────────────────────── */
const incomingVariants: Variants = {
  initial: { x: -100, opacity: 0, scale: 0.85 },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
  exit: {
    x: 80,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const reviewingVariants: Variants = {
  initial: { x: -60, opacity: 0, scale: 0.92 },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 20 },
  },
  exit: (status: string) =>
    status === "verified"
      ? { x: 80, opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }
      : {
          y: 50,
          x: -30,
          opacity: 0,
          rotate: -6,
          transition: { duration: 0.4, ease: "easeIn" },
        },
};

const verifiedVariants: Variants = {
  initial: { x: -50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: -10,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const flaggedVariants: Variants = {
  initial: { y: -30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 160, damping: 14 },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 10,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ──────────────────────────────────────
   Packet chip
   ────────────────────────────────────── */
function PacketChip({
  packet,
  variants,
  icon,
}: {
  packet: Packet;
  variants: Variants;
  icon: React.ReactNode;
}) {
  const statusColors: Record<
    PacketStatus,
    { bg: string; border: string }
  > = {
    incoming: {
      bg: "rgba(129,174,252,0.06)",
      border: "rgba(129,174,252,0.25)",
    },
    reviewing: {
      bg: "rgba(250,204,80,0.06)",
      border: "rgba(250,204,80,0.3)",
    },
    verified: {
      bg: "rgba(100,232,203,0.06)",
      border: "rgba(100,232,203,0.3)",
    },
    flagged: {
      bg: "rgba(255,110,130,0.06)",
      border: "rgba(255,110,130,0.3)",
    },
  };

  const c = statusColors[packet.status];

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
      className="flex items-center gap-2.5 rounded-lg px-3 py-2"
    >
      {icon}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs font-medium text-foreground/90 truncate">
          {packet.label}
        </span>
        <span
          className="text-[10px] font-medium uppercase tracking-wider"
          style={{ color: SECTOR_COLORS[packet.sector] }}
        >
          {packet.sector}
        </span>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────
   Main demo
   ────────────────────────────────────── */
export default function FramerDemo() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const nextId = useRef(0);
  const totalVerified = useRef(0);
  const totalFlagged = useRef(0);

  /* Spawn a packet only if incoming < MAX */
  const spawnPacket = useCallback(() => {
    setPackets((prev) => {
      const incomingCount = prev.filter((p) => p.status === "incoming").length;
      if (incomingCount >= MAX_INCOMING) return prev;

      const id = nextId.current++;
      const task = TASK_POOL[id % TASK_POOL.length];
      return [
        ...prev,
        { id, status: "incoming" as const, label: task.label, sector: task.sector },
      ];
    });
  }, []);

  /* Pipeline timers */
  useEffect(() => {
    const spawnInterval = setInterval(spawnPacket, 700);

    /* incoming -> reviewing (only if reviewing has space) */
    const reviewTimer = setInterval(() => {
      setPackets((prev) => {
        const reviewingCount = prev.filter((p) => p.status === "reviewing").length;
        if (reviewingCount >= MAX_REVIEWING) return prev;

        const idx = prev.findIndex((p) => p.status === "incoming");
        if (idx === -1) return prev;
        const copy = [...prev];
        copy[idx] = { ...copy[idx], status: "reviewing" };
        return copy;
      });
    }, 900);

    /* reviewing -> verified / flagged */
    const decideTimer = setInterval(() => {
      setPackets((prev) => {
        const idx = prev.findIndex((p) => p.status === "reviewing");
        if (idx === -1) return prev;
        const copy = [...prev];
        const isFlagged = Math.random() < FLAG_RATE;
        const newStatus: PacketStatus = isFlagged ? "flagged" : "verified";
        copy[idx] = { ...copy[idx], status: newStatus };

        if (isFlagged) {
          totalFlagged.current++;
        } else {
          totalVerified.current++;
        }

        return copy;
      });
    }, 1100);

    /* Trim verified lane to MAX */
    const trimVerified = setInterval(() => {
      setPackets((prev) => {
        const verified = prev.filter((p) => p.status === "verified");
        if (verified.length <= MAX_VERIFIED) return prev;
        const oldest = verified[0].id;
        return prev.filter((p) => p.id !== oldest);
      });
    }, 600);

    /* Trim flagged lane to MAX */
    const trimFlagged = setInterval(() => {
      setPackets((prev) => {
        const flagged = prev.filter((p) => p.status === "flagged");
        if (flagged.length <= MAX_FLAGGED) return prev;
        const oldest = flagged[0].id;
        return prev.filter((p) => p.id !== oldest);
      });
    }, 600);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(reviewTimer);
      clearInterval(decideTimer);
      clearInterval(trimVerified);
      clearInterval(trimFlagged);
    };
  }, [spawnPacket]);

  /* Partition */
  const incoming = packets.filter((p) => p.status === "incoming");
  const reviewing = packets.filter((p) => p.status === "reviewing");
  const verified = packets.filter((p) => p.status === "verified");
  const flagged = packets.filter((p) => p.status === "flagged");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-background p-8 font-sans">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Human-in-the-Loop Review
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          AI-processed tasks flow through human review before delivery
        </p>
      </div>

      {/* Pipeline lanes */}
      <div className="flex w-full max-w-6xl items-start gap-4">
        {/* Incoming */}
        <Lane
          title="AI Output"
          count={incoming.length}
          max={MAX_INCOMING}
          color="#81aefc"
          icon={<AiIcon color="#81aefc" />}
        >
          <AnimatePresence mode="popLayout">
            {incoming.map((p) => (
              <PacketChip
                key={p.id}
                packet={p}
                variants={incomingVariants}
                icon={<AiIcon color="#81aefc" />}
              />
            ))}
          </AnimatePresence>
        </Lane>

        <Arrow color="#81aefc" />

        {/* Reviewing */}
        <Lane
          title="Human Review"
          count={reviewing.length}
          max={MAX_REVIEWING}
          color="#facc50"
          icon={<HumanIcon color="#facc50" />}
        >
          <AnimatePresence mode="popLayout">
            {reviewing.map((p) => (
              <PacketChip
                key={p.id}
                packet={p}
                variants={reviewingVariants}
                icon={<HumanIcon color="#facc50" />}
              />
            ))}
          </AnimatePresence>
        </Lane>

        {/* Fork arrows */}
        <div className="flex flex-col items-center gap-8 pt-12">
          <Arrow color="#64e8cb" />
          <Arrow color="#ff6e82" rotate />
        </div>

        {/* Outcomes */}
        <div className="flex flex-1 flex-col gap-4">
          <Lane
            title="Verified"
            count={verified.length}
            max={MAX_VERIFIED}
            color="#64e8cb"
            icon={<CheckIcon color="#64e8cb" />}
            compact
          >
            <AnimatePresence mode="popLayout">
              {verified.map((p) => (
                <PacketChip
                  key={p.id}
                  packet={p}
                  variants={verifiedVariants}
                  icon={<CheckIcon color="#64e8cb" />}
                />
              ))}
            </AnimatePresence>
          </Lane>

          <Lane
            title="Flagged"
            count={flagged.length}
            max={MAX_FLAGGED}
            color="#ff6e82"
            icon={<FlagIcon color="#ff6e82" />}
            compact
          >
            <AnimatePresence mode="popLayout">
              {flagged.map((p) => (
                <PacketChip
                  key={p.id}
                  packet={p}
                  variants={flaggedVariants}
                  icon={<FlagIcon color="#ff6e82" />}
                />
              ))}
            </AnimatePresence>
          </Lane>
        </div>
      </div>

      {/* Stats bar */}
      <StatsBar
        inPipeline={packets.length}
        totalVerified={totalVerified.current}
        totalFlagged={totalFlagged.current}
      />
    </div>
  );
}

/* ──────────────────────────────────────
   Sub-components
   ────────────────────────────────────── */
function Lane({
  title,
  count,
  max,
  color,
  icon,
  compact,
  children,
}: {
  title: string;
  count: number;
  max: number;
  color: string;
  icon: React.ReactNode;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-1 flex-col gap-2 ${compact ? "" : ""}`}>
      <div className="flex items-center gap-2 px-1">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <motion.span
          key={count}
          initial={{ scale: 1.3, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="ml-auto text-xs tabular-nums text-muted-foreground"
        >
          {count}
          <span className="text-muted-foreground/40">/{max}</span>
        </motion.span>
      </div>

      <div
        className="flex min-h-[140px] flex-col gap-2 rounded-xl border border-border/50 p-3 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}06, transparent)`,
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
      style={rotate ? { transform: "rotate(28deg)", marginTop: 8 } : undefined}
    >
      <motion.div
        animate={{ x: [0, 5, 0] }}
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
  inPipeline,
  totalVerified,
  totalFlagged,
}: {
  inPipeline: number;
  totalVerified: number;
  totalFlagged: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-6 rounded-xl border border-border/50 px-6 py-3 text-xs text-muted-foreground"
      style={{ background: "rgba(8,14,27,0.6)" }}
    >
      <span>
        {"In pipeline: "}
        <span className="font-semibold text-foreground tabular-nums">
          {inPipeline}
        </span>
      </span>
      <span className="h-3 w-px bg-border" />
      <span>
        {"Total verified: "}
        <span className="font-semibold tabular-nums" style={{ color: "#64e8cb" }}>
          {totalVerified}
        </span>
      </span>
      <span className="h-3 w-px bg-border" />
      <span>
        {"Total flagged: "}
        <span className="font-semibold tabular-nums" style={{ color: "#ff6e82" }}>
          {totalFlagged}
        </span>
      </span>
    </motion.div>
  );
}
