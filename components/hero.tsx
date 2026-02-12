import Image from "next/image";
import { KpiCounter } from "./kpi-counter";

export function Hero() {
  return (
    <main className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-16 pb-14 text-center">
      <Image
        src="/logo.svg"
        alt="Human Loops logo"
        width={180}
        height={72}
        className="mb-6 object-contain"
        priority
      />

      <h1 className="m-0 max-w-[22ch] text-balance text-[clamp(1.5rem,3.5vw,2.6rem)] leading-[1.15] font-extrabold text-foreground">
        Human-in-the-Loop QA for AI at Scale
      </h1>

      <p className="mt-4 max-w-[52ch] text-pretty text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-muted-foreground">
        AI generates. We verify, correct, and deliver --
        so you ship accurate outputs without slowing down.
      </p>

      <div className="mt-8">
        <a
          href="https://calendly.com/shloak/introductory-call?month=2026-02"
          className="inline-block rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground no-underline transition-opacity hover:opacity-90"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a meeting
        </a>
      </div>

      <div className="mt-8 grid w-full max-w-[520px] grid-cols-2 gap-3 max-[640px]:max-w-[280px] max-[640px]:grid-cols-1">
        <KpiCounter label="AI outputs QA'd" target={100000} />
        <KpiCounter label="Critical mistakes corrected" target={10000} />
      </div>
    </main>
  );
}
