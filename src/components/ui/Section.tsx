import { ReactNode } from "react";
import SectionHeader from "./SectionHeader";

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  background?: "white" | "gray" | "gradient";
  divider?: boolean;
  className?: string;
}

export default function Section({
  children,
  title,
  subtitle,
  background = "white",
  divider = false,
  className = ""
}: SectionProps) {
  const getBgClass = () => {
    switch (background) {
      case "gray":
        return "bg-gray-50";
      case "gradient":
        return "bg-gradient-to-r from-primary-50 to-secondary-50";
      default:
        return "bg-white";
    }
  };

  return (
    <section className={`stripe-section ${getBgClass()} relative ${className}`}>
      {divider && (
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      )}
      
      <div className="stripe-container">
        {(title || subtitle) && <SectionHeader title={title || ""} subtitle={subtitle} />}
        {children}
      </div>
    </section>
  );
} 