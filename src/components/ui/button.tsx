import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Editorial button — small, deliberate, monospace label.
 * shadcn-style API kept for familiarity.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] " +
    "transition-[transform,background-color,color,border-color] duration-300 " +
    "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-bone hover:bg-vermilion",
        outline:
          "border border-ink text-ink hover:bg-ink hover:text-bone",
        ghost:
          "text-ink hover:text-vermilion",
        link:
          "underline-offset-4 hover:underline text-ink p-0 h-auto",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3",
        lg: "h-12 px-7",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
