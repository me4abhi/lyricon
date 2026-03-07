import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn, type ComponentClassNames } from "../../utils/cn";

import "./Button.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "subtle"
  | "danger";

export type ButtonClassNames = ComponentClassNames<"root">;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Visual style; follows design system semantic colors. */
  variant?: ButtonVariant;
  /** Slot-level class overrides. Use `classNames.root` when you need to target the root only. */
  classNames?: ButtonClassNames;
}

export function Button({
  children,
  variant = "primary",
  className,
  classNames,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "lyricon-button",
        `lyricon-button--${variant}`,
        className,
        classNames?.root
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
