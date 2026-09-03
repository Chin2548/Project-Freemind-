"use client";

import { useEffect } from "react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.32em] text-brass">
        Something Interrupted
      </p>
      <h1 className="mt-6 max-w-md font-serif text-3xl leading-relaxed text-ivory md:text-4xl">
        Something interrupted the evening.
        <br />
        Please try again.
      </h1>
      <button
        onClick={reset}
        className="mt-10 font-sans text-xs uppercase tracking-[0.28em] text-ivory underline decoration-brass/60 underline-offset-8"
      >
        Try Again
      </button>
    </div>
  );
}
