import { ReactNode } from "react";
import SectionHeader from "./SectionHeader";

type BackgroundColor = "primary" | "primary-sub" | "accent" | "accent-sub" | "neutral" | "neutral-sub";

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  background?: BackgroundColor | "gradient" | "transparent";
  gradientColors?: [BackgroundColor] | [BackgroundColor, BackgroundColor] | [BackgroundColor, BackgroundColor, BackgroundColor];
  gradientDirection?: "to-r" | "to-l" | "to-t" | "to-b" | "to-br" | "to-bl" | "to-tr" | "to-tl" | "135deg";
  divider?: boolean;
  className?: string;
  opacity?: number;
  blurPx?: number;
}

export default function Section({
  children,
  title,
  subtitle,
  background = "transparent",
  gradientColors,
  gradientDirection = "135deg",
  divider = false,
  className = "",
  opacity = 15,
  blurPx = 2,
}: SectionProps) {
  const getBgClass = () => {
    switch (background) {
      case "primary":
        return "bg-primary";
      case "primary-sub":
        return "bg-primary-sub";
      case "accent":
        return "bg-accent";
      case "accent-sub":
        return "bg-accent-sub";
      case "neutral":
        return "bg-neutral";
      case "neutral-sub":
        return "bg-neutral-sub";
      case "gradient":
        return ""; // Handle gradient separately with inline styles
      default:
        return "";
    }
  };

  const getColorVar = (color: BackgroundColor): string => {
    switch (color) {
      case "primary": return "var(--c-primary)";
      case "primary-sub": return "var(--c-primary-sub)";
      case "accent": return "var(--c-accent)";
      case "accent-sub": return "var(--c-accent-sub)";
      case "neutral": return "var(--c-neutral)";
      case "neutral-sub": return "var(--c-neutral-sub)";
      default: return "var(--c-accent)";
    }
  };

  const directionMap: Record<string, string> = {
    "to-r": "to right",
    "to-l": "to left",
    "to-t": "to top",
    "to-b": "to bottom",
    "to-br": "to bottom right",
    "to-bl": "to bottom left",
    "to-tr": "to top right",
    "to-tl": "to top left",
    "135deg": "135deg"
  };

  const renderBackground = () => {
    if (background === "transparent") return null;
    
    if (background === "gradient") {
      let gradientStyle: string;
      if (gradientColors && gradientColors.length > 0) {
        const colors = gradientColors.map(color => getColorVar(color)).join(", ");
        const direction = directionMap[gradientDirection] || "135deg";
        gradientStyle = direction.endsWith("deg")
          ? `linear-gradient(${direction}, ${colors})`
          : `linear-gradient(${direction}, ${colors})`;
      } else {
        // Default gradient
        gradientStyle = `linear-gradient(135deg, var(--c-accent), var(--c-accent-sub))`;
      }
      return (
        <div 
          className="absolute inset-0 -z-10"
          style={{ 
            background: gradientStyle,
            opacity: opacity / 100,
            filter: `blur(${blurPx}px)`
          }}
        />
      );
    }
    return (
      <div 
        className={`absolute inset-0 -z-10 ${getBgClass()}`}
        style={{ 
          opacity: opacity / 100,
          filter: `blur(${blurPx}px)`
        }}
      />
    );
  };

  const renderColorOverlay = () => {
    // Add very subtle overlay for accent sections
    if (background === "transparent" || background === "gradient") return null;
    
    return (
      <div className="absolute inset-0 -z-5 bg-black-5" />
    );
  };

  return (
    <section className={`section relative ${className}`}>
      {renderBackground()}
      {renderColorOverlay()}
      {divider && (
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      )}
      
      <div className="glass-surface">
        {(title || subtitle) && <SectionHeader title={title || ""} subtitle={subtitle} />}
        {children}
      </div>
    </section>
  );
} 