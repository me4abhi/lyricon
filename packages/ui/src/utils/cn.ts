/**
 * Merges class names (trimmed, falsy values omitted).
 * Use for root and slot classNames in the hybrid override pattern.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ").trim();
}

/**
 * Slot-level override map for the hybrid pattern.
 * Components extend this with specific slot keys, e.g. { root?: string; icon?: string }.
 */
export type ComponentClassNames<Slots extends string = string> = Partial<
  Record<Slots, string>
>;
