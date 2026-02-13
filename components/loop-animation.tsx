"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/* ──────────────────────────────────────
   Types & constants
   ────────────────────────────────────── */
type PacketStatus = "incoming" | "reviewing" | "reviewing-verified" | "reviewing-flagged" | "verified" | "flagged";

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

const MAX_INCOMING = 6;
const MAX_REVIEWING = 6;
const MAX_VERIFIED = 3;
const MAX_FLAGGED = 3;

const FLAG_RATE = 0.25;

/* ──────────────────────────────────────
   Icons (inline SVGs matching loop-svg)
   ────────────────────────────────────── */
function AiIcon({ color }: { color: string }) {
    return (
        <svg width="14" height="14" viewBox="0 0 22 22" fill="none" className="shrink-0">
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
        <svg width="14" height="14" viewBox="0 0 22 28" fill="none" className="shrink-0">
            <circle cx="11" cy="8" r="6" stroke={color} strokeWidth="1.3" fill="none" />
            <path d="M1 28 C1 20, 21 20, 21 28" stroke={color} strokeWidth="1.3" fill="none" />
        </svg>
    );
}

function CheckIcon({ color }: { color: string }) {
    return (
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="shrink-0">
            <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.3" fill="none" />
            <path d="M6 10.5 L8.5 13 L14 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    );
}

function FlagIcon({ color }: { color: string }) {
    return (
        <svg width="14" height="14" viewBox="0 0 20 22" fill="none" className="shrink-0">
            <line x1="4" y1="2" x2="4" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 2 L16 5 L16 13 L4 10 Z" fill={`${color}30`} stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
    );
}

const SECTOR_COLORS: Record<Packet["sector"], string> = {
    legal: "rgba(168,148,255,0.6)",
    healthcare: "rgba(100,200,255,0.6)",
    finance: "rgba(255,200,100,0.6)",
};

/* ──────────────────────────────────────
   Animation variants (Dynamic based on mobile)
   ────────────────────────────────────── */
const getIncomingVariants = (isMobile: boolean): Variants => ({
    initial: isMobile ? { y: -60, opacity: 0, scale: 0.85 } : { x: -60, opacity: 0, scale: 0.85 },
    animate: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 18 },
    },
    exit: isMobile ? {
        y: 40,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.4, ease: "easeIn" },
    } : {
        x: 40,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.4, ease: "easeIn" },
    },
});

const getReviewingVariants = (isMobile: boolean): Variants => ({
    initial: isMobile ? { y: -40, opacity: 0, scale: 0.92 } : { x: -40, opacity: 0, scale: 0.92 },
    animate: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 160, damping: 22 },
    },
    exit: (status: string) => {
        if (status === "verified" || status === "reviewing-verified") {
            return isMobile
                ? { y: 40, opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }
                : { x: 40, opacity: 0, transition: { duration: 0.4, ease: "easeIn" } };
        }
        return {
            y: 30,
            x: isMobile ? 0 : -15,
            opacity: 0,
            rotate: -6,
            transition: { duration: 0.45, ease: "easeIn" },
        };
    },
});

const getVerifiedVariants = (isMobile: boolean): Variants => ({
    initial: isMobile ? { y: -30, opacity: 0 } : { x: -30, opacity: 0 },
    animate: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0 },
    },
});

const getFlaggedVariants = (isMobile: boolean): Variants => ({
    initial: { y: -20, opacity: 0 }, // Same for both usually ok, but consistent
    animate: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 140, damping: 16 },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0 },
    },
});

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
        "reviewing-verified": {
            bg: "rgba(100,232,203,0.15)",
            border: "rgba(100,232,203,0.5)",
        },
        "reviewing-flagged": {
            bg: "rgba(255,110,130,0.15)",
            border: "rgba(255,110,130,0.5)",
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
                transition: "background 0.3s, border-color 0.3s"
            }}
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 shadow-sm w-full"
        >
            {icon}
            <div className="flex flex-col gap-0 min-w-0 flex-1">
                <span className="text-[11px] font-medium text-foreground/90 truncate leading-tight">
                    {packet.label}
                </span>
                <span
                    className="text-[9px] font-semibold uppercase tracking-wider leading-tight"
                    style={{ color: SECTOR_COLORS[packet.sector] }}
                >
                    {packet.sector}
                </span>
            </div>
        </motion.div>
    );
}

/* ──────────────────────────────────────
   Main Component
   ────────────────────────────────────── */
export function LoopAnimation() {
    const [mounted, setMounted] = useState(false);
    const [packets, setPackets] = useState<Packet[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const nextId = useRef(0);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

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

    useEffect(() => {
        if (!mounted) return;

        // Slower intervals
        const spawnInterval = setInterval(spawnPacket, 950);
        const reviewTimer = setInterval(() => {
            setPackets((prev) => {
                const reviewingCount = prev.filter((p) => p.status.startsWith("reviewing")).length;
                if (reviewingCount >= MAX_REVIEWING) return prev;
                const idx = prev.findIndex((p) => p.status === "incoming");
                if (idx === -1) return prev;
                const copy = [...prev];
                copy[idx] = { ...copy[idx], status: "reviewing" };
                return copy;
            });
        }, 1150);

        const transitionTimer = setInterval(() => {
            setPackets((prev) => {
                const candidates = prev.filter(p => p.status === "reviewing");
                if (candidates.length === 0) return prev;
                const target = candidates[0];
                const isFlagged = Math.random() < FLAG_RATE;
                const nextStatus: PacketStatus = isFlagged ? "reviewing-flagged" : "reviewing-verified";
                return prev.map(p => p.id === target.id ? { ...p, status: nextStatus } : p);
            });
        }, 1400);

        const moveTimer = setInterval(() => {
            setPackets((prev) => {
                const transitioning = prev.filter(p => p.status === "reviewing-verified" || p.status === "reviewing-flagged");
                if (transitioning.length === 0) return prev;

                const target = transitioning[0];
                const finalStatus = target.status === "reviewing-verified" ? "verified" : "flagged";

                let copy = [...prev];
                if (finalStatus === "verified") {
                    const verified = copy.filter(p => p.status === "verified");
                    if (verified.length >= MAX_VERIFIED) {
                        const oldest = verified[0];
                        copy = copy.filter(p => p.id !== oldest.id);
                    }
                } else {
                    const flagged = copy.filter(p => p.status === "flagged");
                    if (flagged.length >= MAX_FLAGGED) {
                        const oldest = flagged[0];
                        copy = copy.filter(p => p.id !== oldest.id);
                    }
                }
                return copy.map(p => p.id === target.id ? { ...p, status: finalStatus } : p);
            });
        }, 800);

        const cleanupLimit = setInterval(() => {
            setPackets(prev => {
                let copy = [...prev];
                const verified = copy.filter(p => p.status === "verified");
                if (verified.length > MAX_VERIFIED) {
                    const toRemove = verified.length - MAX_VERIFIED;
                    const idsToRemove = verified.slice(0, toRemove).map(p => p.id);
                    copy = copy.filter(p => !idsToRemove.includes(p.id));
                }
                const flagged = copy.filter(p => p.status === "flagged");
                if (flagged.length > MAX_FLAGGED) {
                    const toRemove = flagged.length - MAX_FLAGGED;
                    const idsToRemove = flagged.slice(0, toRemove).map(p => p.id);
                    copy = copy.filter(p => !idsToRemove.includes(p.id));
                }
                return copy;
            });
        }, 2000);

        return () => {
            clearInterval(spawnInterval);
            clearInterval(reviewTimer);
            clearInterval(transitionTimer);
            clearInterval(moveTimer);
            clearInterval(cleanupLimit);
        };
    }, [mounted, spawnPacket]);


    /* Partition */
    const incoming = packets.filter((p) => p.status === "incoming");
    const reviewing = packets.filter((p) => p.status.startsWith("reviewing"));
    const verified = packets.filter((p) => p.status === "verified");
    const flagged = packets.filter((p) => p.status === "flagged");

    if (!mounted) {
        return (
            <div className="flex h-[320px] w-full items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-center justify-center gap-6 font-sans">
            {/* Pipeline lanes */}
            <div className={`flex w-full max-w-[900px] items-start gap-4 transition-all duration-300 ${isMobile ? "flex-col items-center" : "flex-row"}`}>
                {/* Incoming */}
                <Lane
                    title="AI Output"
                    color="#81aefc"
                    icon={<AiIcon color="#81aefc" />}
                    className={isMobile ? "w-full max-w-sm min-h-[160px]" : ""}
                >
                    <AnimatePresence mode="popLayout">
                        {incoming.map((p) => (
                            <PacketChip
                                key={p.id}
                                packet={p}
                                variants={getIncomingVariants(isMobile)}
                                icon={<AiIcon color="#81aefc" />}
                            />
                        ))}
                    </AnimatePresence>
                </Lane>

                <Arrow color="#81aefc" rotate={isMobile} />

                {/* Reviewing */}
                <Lane
                    title="Human Review"
                    color="#facc50"
                    icon={<HumanIcon color="#facc50" />}
                    className={isMobile ? "w-full max-w-sm min-h-[160px]" : ""}
                >
                    <AnimatePresence mode="popLayout">
                        {reviewing.map((p) => {
                            let iconColor = "#facc50";
                            if (p.status === "reviewing-verified") iconColor = "#64e8cb";
                            if (p.status === "reviewing-flagged") iconColor = "#ff6e82";

                            return (
                                <PacketChip
                                    key={p.id}
                                    packet={p}
                                    variants={getReviewingVariants(isMobile)}
                                    icon={<HumanIcon color={iconColor} />}
                                />
                            );
                        })}
                    </AnimatePresence>
                </Lane>

                {/* Fork arrows */}
                {isMobile ? (
                    <div className="flex flex-col items-center py-2">
                        <Arrow color="#64e8cb" rotate />
                    </div>
                ) : (
                    <div className="flex flex-col items-center pt-8">
                        <div className="flex h-[110px] items-center">
                            <Arrow color="#64e8cb" />
                        </div>
                        <div className="mt-2 flex h-[110px] items-center">
                            <Arrow color="#ff6e82" />
                        </div>
                    </div>
                )}

                {/* Outcomes */}
                <div className={`flex flex-1 flex-col gap-3 ${isMobile ? "w-full max-w-sm" : ""}`}>
                    <Lane
                        title="Verified"
                        color="#64e8cb"
                        icon={<CheckIcon color="#64e8cb" />}
                        compact
                        className={isMobile ? "min-h-[90px]" : ""}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {verified.map((p) => (
                                <PacketChip
                                    key={p.id}
                                    packet={p}
                                    variants={getVerifiedVariants(isMobile)}
                                    icon={<CheckIcon color="#64e8cb" />}
                                />
                            ))}
                        </AnimatePresence>
                    </Lane>

                    <Lane
                        title="Flagged"
                        color="#ff6e82"
                        icon={<FlagIcon color="#ff6e82" />}
                        compact
                        className={isMobile ? "min-h-[90px]" : ""}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {flagged.map((p) => (
                                <PacketChip
                                    key={p.id}
                                    packet={p}
                                    variants={getFlaggedVariants(isMobile)}
                                    icon={<FlagIcon color="#ff6e82" />}
                                />
                            ))}
                        </AnimatePresence>
                    </Lane>
                </div>
            </div>
        </div>
    );
}

function Lane({
    title,
    color,
    icon,
    compact,
    children,
    className = "",
}: {
    title: string;
    count?: number;
    max?: number;
    color: string;
    icon: React.ReactNode;
    compact?: boolean;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`flex flex-1 flex-col gap-1.5 ${className}`}>
            <div className="flex items-center gap-2 px-1">
                {icon}
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {title}
                </span>
            </div>

            <div
                className={`flex ${compact ? "min-h-[100px]" : "min-h-[220px]"} flex-col gap-2 rounded-xl border border-border/50 p-2.5 overflow-hidden transition-all`}
                style={{
                    background: `linear-gradient(135deg, ${color}06, transparent)`,
                }}
            >
                {children}
            </div>
        </div>
    );
}

function Arrow({ color, rotate }: { color: string, rotate?: boolean }) {
    return (
        <div className={`flex items-center px-1 ${rotate ? "rotate-90 py-2" : ""}`}>
            <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                <svg width="24" height="12" viewBox="0 0 32 16" fill="none">
                    <path
                        d="M0 8h26m0 0l-6-5.5M26 8l-6 5.5"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.5"
                    />
                </svg>
            </motion.div>
        </div>
    );
}
