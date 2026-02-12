import { LoopSVG } from "@/components/loop-svg";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      {/* Background layer with SVG animation */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(700px 380px at 15% 10%, rgba(52, 98, 199, 0.2), transparent 70%),
            radial-gradient(620px 360px at 85% 0%, rgba(63, 179, 157, 0.14), transparent 75%),
            linear-gradient(180deg, #080f1f 0%, #050914 65%)
          `,
        }}
      >
        <LoopSVG />
      </div>

      {/* Hero content */}
      <Hero />
    </>
  );
}
