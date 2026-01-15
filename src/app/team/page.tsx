import type { Metadata } from "next";
import TeamView from "./team";

export const metadata: Metadata = {
  title: "Our Team | Nathaniel J. Clement",
  description: "Meet the leadership team behind our product work.",
};

export default function TeamPage() {
  return <TeamView />;
}
