import Link from "next/link";

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 focus:outline-none"
    >
      <h1 className="text-3xl font-bold tracking-tight text-center">
        StableRoute
      </h1>
      <p className="mt-2 text-lg text-center text-neutral-600">
        Liquidity Router for Stellar
      </p>
      <p className="mt-2 text-sm text-neutral-500 max-w-md text-center">
        Connect your Stellar wallet to find the best path for stablecoin
        payments and cross-currency swaps.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/quote"
          className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Get a quote
        </Link>
        <Link
          href="/pairs"
          className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 px-6 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-neutral-700"
        >
          Manage pairs
        </Link>
        <Link
          href="/stats"
          className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 px-6 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-neutral-700"
        >
          View stats
        </Link>
      </div>
    </main>
  );
}
