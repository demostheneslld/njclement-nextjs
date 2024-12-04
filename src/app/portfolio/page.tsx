import type { Metadata } from "next";
import PortfolioView from "./portfolio";

export const metadata: Metadata = {
  title: "Portfolio | Nathaniel J. Clement",
  description: "Portfolio for Nathaniel J. Clement",
};

export default async function Portfolio() {
    return <PortfolioView />;
}
