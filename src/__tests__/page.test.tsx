import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import nextConfig from "../../next.config";

const routes = [
  "/quote", "/pairs", "/stats", "/admin",
  "/api-keys", "/events", "/webhooks", "/docs",
];

describe("Home", () => {
  it("renders StableRoute heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /StableRoute/i })).toBeInTheDocument();
  });

  it("renders liquidity router subtitle", () => {
    render(<Home />);
    expect(screen.getByText(/Liquidity Router for Stellar/i)).toBeInTheDocument();
  });

  it("renders operator dashboard description without wallet copy", () => {
    render(<Home />);
    expect(screen.getByText(/operator dashboard/i)).toBeInTheDocument();
    expect(screen.queryByText(/connect your stellar wallet/i)).not.toBeInTheDocument();
  });

  it("renders links for all dashboard routes", () => {
    render(<Home />);
    const links = screen.getAllByRole("link", { hidden: true });
    expect(links).toHaveLength(routes.length);
    for (const route of routes) {
      const link = links.find((l) => l.getAttribute("href") === route);
      expect(link).toBeTruthy();
      expect(link).toHaveAttribute("href", route);
    }
  });

  it("includes skip-to-main target with focus:outline-none", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveAttribute("tabIndex", "-1");
  });
});

describe("next.config security headers", () => {
  it("applies baseline hardening headers to every route", async () => {
    expect(nextConfig.headers).toBeDefined();

    const rules = await nextConfig.headers!();
    const catchAll = rules.find((rule) => rule.source === "/:path*");

    expect(catchAll).toBeDefined();
    expect(catchAll?.headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: "X-Content-Type-Options", value: "nosniff" }),
        expect.objectContaining({ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }),
        expect.objectContaining({ key: "X-Frame-Options", value: "DENY" }),
        expect.objectContaining({ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }),
      ]),
    );
  });
});
