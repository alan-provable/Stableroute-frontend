"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/apiClient";

type Stats = { totalPairs: number; paused: boolean };

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const tick = () =>
      apiGet<Stats>("/api/v1/stats")
        .then((s) => !cancelled && setStats(s))
        .catch((e) => !cancelled && setError(e.message));
    tick();
    const t = setInterval(tick, 5000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-[60vh] max-w-3xl flex-col gap-6 p-8 focus:outline-none"
    >
      <h1 className="text-3xl font-semibold tracking-tight">Stats</h1>
      {error && <p role="alert" className="text-sm text-rose-600">{error}</p>}
      {stats && (
        <dl className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-neutral-200 p-4 text-center dark:border-neutral-800">
            <dt className="text-xs uppercase text-neutral-500">Pairs</dt>
            <dd className="mt-1 text-2xl font-semibold">{stats.totalPairs}</dd>
          </div>
          <div className="rounded-lg border border-neutral-200 p-4 text-center dark:border-neutral-800">
            <dt className="text-xs uppercase text-neutral-500">Status</dt>
            <dd className="mt-1 text-2xl font-semibold">
              {stats.paused ? "Paused" : "Live"}
            </dd>
          </div>
        </dl>
      )}
    </main>
  );
}
