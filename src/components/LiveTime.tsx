"use client";

import { useEffect, useState } from "react";

export function LiveTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Bangkok",
      }).format(new Date());
      setTime(formatted);
    };

    update();
    const interval = setInterval(update, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <span className={className} suppressHydrationWarning>
      BANGKOK &nbsp;{time}
    </span>
  );
}
