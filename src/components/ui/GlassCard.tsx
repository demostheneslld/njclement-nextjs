import clsx from "clsx";
import { ElementType, HTMLAttributes } from "react";

export interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  elevation?: 1 | 2;
  href?: string;
  target?: string;
  rel?: string;
}

export default function GlassCard({
  as: Tag = "section",
  className,
  elevation = 1,
  ...props
}: GlassCardProps) {
  return (
    <Tag
      {...props}
      className={clsx(
        "backdrop-blur-xl rounded-card transition-all duration-500 text-high relative overflow-hidden",
        elevation === 1 && "shadow-elev1",
        elevation === 2 && "shadow-elev2",
        className
      )}
    >
      {/* Glass overlay */}
      <div 
        className={clsx(
          "absolute inset-0 rounded-card",
          elevation === 1 && "bg-glass-elev1",
          elevation === 2 && "bg-glass-elev2"
        )}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {props.children}
      </div>
    </Tag>
  );
}
