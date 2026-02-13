import Image from "next/image";
import { KpiCounter } from "./kpi-counter";

export function Hero() {
  return (
    <header className="flex shrink-0 flex-col items-center px-6 pt-8 pb-6 text-center">
      <Image
        src="/human-loop-logo.svg"
        alt="Human Loops logo"
        width={200}
        height={80}
        className="mb-1 object-contain"
        priority
      />

      <h1 className="m-0 max-w-[24ch] text-balance text-[clamp(1.25rem,3vw,2.25rem)] leading-[1.18] font-extrabold text-foreground">
        Human-in-the-Loop QA for AI at Scale
      </h1>

      <p className="mt-4 max-w-[52ch] text-pretty text-[clamp(0.95rem,1.4vw,1.08rem)] leading-relaxed text-muted-foreground">
        AI generates. We verify, correct, and deliver --
        so you ship accurate outputs without slowing down.
      </p>

      <div className="mt-6">
        <a
          href="https://calendly.com/shloak/introductory-call?month=2026-02"
          className="inline-block rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground no-underline transition-opacity hover:opacity-90"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a meeting
        </a>
      </div>

      <div className="mt-6 grid w-full max-w-[480px] grid-cols-2 gap-3 max-[640px]:max-w-[260px] max-[640px]:grid-cols-1">
        <KpiCounter label="AI outputs QA'd" target={100000} />
        <KpiCounter label="Critical mistakes corrected" target={10000} />
      </div>
    </header>
  );
}
