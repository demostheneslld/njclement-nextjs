import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

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
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    ghost: "text-primary-700 hover:bg-primary-50 hover:text-primary-800",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  // Generate size classes
  const sizeClasses = {
    sm: "text-sm py-1.5 px-3",
    md: "text-base py-2.5 px-5",
    lg: "text-lg py-3 px-6",
  };

  const classes = `
    btn
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  // Render as link if href is provided
  if (href) {
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return isExternal ? (
      <a href={href} className={classes} {...linkProps}>
        {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
        {children}
        {iconPosition === "right" && icon && <span className="ml-2">{icon}</span>}
      </a>
    ) : (
      <Link href={href} className={classes}>
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