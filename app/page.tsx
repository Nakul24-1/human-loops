import { LoopSVG } from "@/components/loop-svg";
import { Hero } from "@/components/hero";
import { Socials } from "@/components/socials";

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        background: `
          radial-gradient(700px 380px at 15% 10%, rgba(52, 98, 199, 0.2), transparent 70%),
          radial-gradient(620px 360px at 85% 0%, rgba(63, 179, 157, 0.14), transparent 75%),
          linear-gradient(180deg, #080f1f 0%, #050914 65%)
        `,
      }}
    >
      {/* Hero text content */}
      <Hero />

      {/* Pipeline diagram -- separate section, not overlapping */}
      <div className="flex w-full flex-1 items-start justify-center px-6 pb-10">
        <LoopSVG />
      </div>

      <Socials />
    </div>
  );
}
