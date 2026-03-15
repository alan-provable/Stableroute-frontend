export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold tracking-tight text-center">
        StableRoute
      </h1>
      <p className="mt-2 text-lg text-center text-neutral-600">
        Liquidity Router for Stellar
      </p>
      <p className="mt-6 text-sm text-neutral-500 max-w-md text-center">
        Connect your Stellar wallet to find the best path for stablecoin
        payments and cross-currency swaps.
      </p>
    </main>
  );
}
