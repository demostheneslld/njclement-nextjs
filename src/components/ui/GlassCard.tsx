import clsx from "clsx";
import { ElementType, HTMLAttributes } from "react";

export interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  elevation?: 1 | 2;
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
        "backdrop-blur-xl rounded-2xl transition-all duration-500 text-[color:var(--c-text-high)]",
        elevation === 1 && "bg-glass-elev1 shadow-elev1",
        elevation === 2 && "bg-glass-elev2 shadow-elev2",
        className
      )}
    />
  );
}
