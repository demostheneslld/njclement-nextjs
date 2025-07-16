import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "glass";
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  variant = "default",
  fullWidth = false,
  className,
  ...props
}, ref) => {
  const baseClasses = "px-4 py-3 rounded-lg font-body text-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2";
  
  const variantClasses = {
    default: "bg-fog border border-text-low text-high placeholder-text-med hover:border-text-med focus:border-accent",
    glass: "bg-glass-elev1 backdrop-blur-xl border border-white/20 text-high placeholder-text-med hover:border-white/30 focus:border-accent shadow-elev1",
  };

  const inputClasses = clsx(
    baseClasses,
    variantClasses[variant],
    fullWidth && "w-full",
    error && "border-danger focus:ring-danger",
    className
  );

  return (
    <div className={clsx("flex flex-col", fullWidth && "w-full")}>
      {label && (
        <label className="mb-2 text-sm font-medium text-high font-body">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger font-body">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-med font-body">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;