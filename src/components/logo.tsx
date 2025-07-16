import clsx from 'clsx';

export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        'inline-block bg-[color:currentColor]',
        className,
        'mask-logo'
      )}
      role="img"
      aria-label="Logo"
    />
  );
} 