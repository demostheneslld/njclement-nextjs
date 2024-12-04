import type { Metadata } from "next";
import ResumeView from "./resume";

export const metadata: Metadata = {
  title: "Resume | Nathaniel J. Clement",
  description: "Resume for Nathaniel J. Clement",
};

export default async function Resume() {
    return <ResumeView />;
}
