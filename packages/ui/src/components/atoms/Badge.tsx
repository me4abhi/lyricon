import type { HTMLAttributes, ReactNode } from "react";

import { cn, type ComponentClassNames } from "../../utils/cn";

import "./Badge.css";

export type BadgeVariant = "default" | "success" | "warning" | "danger";

export type BadgeClassNames = ComponentClassNames<"root" | "icon" | "label">;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge text. */
  children: ReactNode;
  /** Optional leading icon (e.g. status dot or SVG). */
  icon?: ReactNode;
  /** Visual style; uses semantic colors from the design system. */
  variant?: BadgeVariant;
  /** Slot-level class overrides. Use when you need to target root, icon, or label separately. */
  classNames?: BadgeClassNames;
}

export function Badge({
  children,
  icon,
  variant = "default",
  className,
  classNames,
  ...props
}: BadgeProps) {
  return (
    <span
      role="status"
      className={cn(
        "lyricon-badge",
        `lyricon-badge--${variant}`,
        className,
        classNames?.root
      )}
      {...props}
    >
      {icon ? (
        <span
          className={cn("lyricon-badge__icon", classNames?.icon)}
          aria-hidden
        >
          {icon}
        </span>
      ) : null}
      <span className={cn("lyricon-badge__label", classNames?.label)}>
        {children}
      </span>
    </span>
  );
}
