import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/pairs", label: "Pairs" },
  { href: "/quote", label: "Quote" },
  { href: "/stats", label: "Stats" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-5xl items-center justify-between p-4"
      >
        <Link
          href="/"
          className="text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          StableRoute
        </Link>
        <ul className="flex gap-4 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded px-2 py-1 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:hover:bg-neutral-800"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
