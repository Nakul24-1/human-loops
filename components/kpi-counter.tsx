"use client";

import { useEffect, useRef, useState } from "react";

interface KpiCounterProps {
  label: string;
  target: number;
}

export function KpiCounter({ label, target }: KpiCounterProps) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const duration = 1300;
    const start = performance.now();

    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [target]);

  return (
    <article className="rounded-[14px] border border-border bg-card px-3.5 py-3">
      <p className="m-0 text-xs text-[#c0cee9]">{label}</p>
      <p className="m-0 mt-1.5 text-2xl font-bold text-card-foreground break-all">
        {value.toLocaleString()}+
      </p>
    </article>
  );
}
