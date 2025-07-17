import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode, MouseEventHandler } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  isExternal?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  icon,
  iconPosition = "right",
  fullWidth = false,
  isExternal = false,
  ...rest
}: ButtonProps) {
  // Generate variant classes
  const variantClasses = {
    primary: "bg-accent text-high shadow-elev1 hover:shadow-accent hover:-translate-y-0.5 transition-all duration-200",
    secondary: "bg-neutral text-accent border border-accent glass-fill backdrop-blur-sm hover:text-high transition-all duration-200",
    accent: "bg-danger text-high shadow-elev1 hover:shadow-elev2 hover:-translate-y-0.5 transition-all duration-200", 
    ghost: "bg-transparent text-accent glass-fill backdrop-blur-sm hover:text-high transition-all duration-200",
    outline: "bg-transparent border border-text-low text-med glass-fill backdrop-blur-sm hover:text-high hover:border-text-med transition-all duration-200",
  };

  // Generate size classes
  const sizeClasses = {
    sm: "text-sm py-2 px-4 rounded-md",
    md: "text-base py-3 px-6 rounded-lg",
    lg: "text-lg py-4 px-8 rounded-xl",
  };

  const classes = `
    inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Render as link if href is provided
  if (href) {
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return isExternal ? (
      <a href={href} className={classes} {...linkProps} onClick={rest.onClick as unknown as MouseEventHandler<HTMLAnchorElement>}>
        {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
        {children}
        {iconPosition === "right" && icon && <span className="ml-2">{icon}</span>}
      </a>
    ) : (
      <Link href={href} className={classes} onClick={rest.onClick as unknown as MouseEventHandler<HTMLAnchorElement>}>
        {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
        {children}
        {iconPosition === "right" && icon && <span className="ml-2">{icon}</span>}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button className={classes} {...rest}>
      {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
      {children}
      {iconPosition === "right" && icon && <span className="ml-2">{icon}</span>}
    </button>
  );
} 