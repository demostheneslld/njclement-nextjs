import clsx from "clsx";
import { forwardRef, TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "glass";
  fullWidth?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  variant = "default",
  fullWidth = false,
  resize = "vertical",
  className,
  ...props
}, ref) => {
  const baseClasses = "px-4 py-3 rounded-lg font-body text-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 min-h-[120px]";
  
  const variantClasses = {
    default: "bg-fog border border-text-low text-high placeholder-text-med hover:border-text-med focus:border-accent",
    glass: "bg-glass-elev1 backdrop-blur-xl border border-white/20 text-high placeholder-text-med hover:border-white/30 focus:border-accent shadow-elev1",
  };

  const resizeClasses = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  };

  const textareaClasses = clsx(
    baseClasses,
    variantClasses[variant],
    resizeClasses[resize],
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
      <textarea
        ref={ref}
        className={textareaClasses}
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

Textarea.displayName = "Textarea";

export default Textarea;