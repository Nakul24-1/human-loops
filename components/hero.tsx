import Image from "next/image";
import { KpiCounter } from "./kpi-counter";

export function Hero() {
  return (
    <main className="relative z-10 grid h-full content-center justify-items-center px-6 pt-[86px] pb-14 text-center">
      <Image
        src="/logo.svg"
        alt="Human Loops logo"
        width={154}
        height={154}
        className="mt-[42px] mb-[18px] object-contain"
        priority
      />

      <h1 className="m-0 max-w-[18ch] text-balance text-[clamp(1.4rem,3.35vw,2.45rem)] leading-[1.12] font-extrabold text-foreground">
        Human-in-the-Loop Operations for AI at Scale
      </h1>

      <p className="mt-[18px] max-w-[62ch] leading-relaxed text-pretty text-muted-foreground">
        We QA AI outputs, filter datasets, and train models -- so your accuracy
        improves without slowing your team down.
      </p>

      <div className="mt-7">
        <a
          href="https://calendly.com/shloak/introductory-call?month=2026-02"
          className="inline-block rounded-[11px] bg-gradient-to-r from-primary to-accent px-[18px] py-3 font-bold text-primary-foreground no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a meeting
        </a>
      </div>

      <div className="mt-[30px] grid w-full max-w-[560px] grid-cols-2 gap-3 max-[700px]:max-w-[320px] max-[700px]:grid-cols-1">
        <KpiCounter label="AI outputs QA'd" target={100000} />
        <KpiCounter label="Critical mistakes corrected" target={10000} />
      </div>
    </main>
  );
}
