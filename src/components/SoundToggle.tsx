"use client";

import { useEffect, useRef, useState } from "react";

export function SoundToggle({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (enabled) {
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(() => setEnabled(false));
    } else {
      audioRef.current.pause();
    }
  }, [enabled]);

  return (
    <>
      <audio ref={audioRef} src="/audio/ambience.mp3" loop preload="none" />
      <button
        type="button"
        onClick={() => setEnabled((v) => !v)}
        className={className}
        aria-pressed={enabled}
        data-cursor="view"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-taupe transition-colors hover:text-ivory">
          Sound {enabled ? "On" : "Off"}
        </span>
      </button>
    </>
  );
}
