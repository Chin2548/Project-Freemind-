import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.32em] text-brass">404</p>
      <h1 className="mt-6 font-serif text-4xl text-ivory md:text-5xl">
        This room doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-sm font-sans text-sm text-taupe">
        Some corners of Freemind are still being discovered. Let&apos;s get
        you back.
      </p>
      <Link
        href="/"
        className="mt-10 font-sans text-xs uppercase tracking-[0.28em] text-ivory underline decoration-brass/60 underline-offset-8"
      >
        Return Home
      </Link>
    </div>
  );
}
