import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders StableRoute heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /StableRoute/i })).toBeInTheDocument();
  });

  it("renders liquidity router subtitle", () => {
    render(<Home />);
    expect(screen.getByText(/Liquidity Router for Stellar/i)).toBeInTheDocument();
  });
});
