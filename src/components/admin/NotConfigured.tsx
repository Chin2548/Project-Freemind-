export function NotConfigured() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md">
        <p className="font-sans text-xs uppercase tracking-[0.24em] text-brass">
          Setup Required
        </p>
        <h1 className="mt-4 font-serif text-3xl text-ivory">
          Supabase isn&apos;t connected yet.
        </h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-taupe">
          The public site is running on sample content. To manage the menu,
          events, media, and settings from here, add your Supabase project
          credentials to <code className="text-cream">.env.local</code>:
        </p>
        <pre className="mt-4 overflow-x-auto border border-walnut bg-chocolate p-4 font-mono text-xs text-cream">
{`NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=`}
        </pre>
        <p className="mt-4 font-sans text-sm leading-relaxed text-taupe">
          Then run <code className="text-cream">supabase/schema.sql</code>{" "}
          against your project and restart the dev server.
        </p>
      </div>
    </div>
  );
}
