# Cursor prompt: Apply hybrid override pattern to @lyricon/ui

**Use this prompt when:** You want to add or migrate components in `packages/ui` to the hybrid className + classNames override pattern.

**Reference implementations:** `packages/ui/src/components/atoms/Button.tsx` (single slot: root), `packages/ui/src/components/atoms/Badge.tsx` (slots: root, icon, label). Storybook: Atoms/Button, Atoms/Badge (including Root override and Slot overrides stories).

---

## Prompt (copy into Cursor)

```
Apply the hybrid override pattern to all components in packages/ui (atoms, molecules, organisms).

For each component under packages/ui/src/components/:

1. **API**
   - Keep existing `className?: string` for root-level overrides.
   - Add `classNames?: ComponentClassNames<SlotNames>` for slot-level overrides.
   - Define and export a `*ClassNames` type (e.g. ButtonClassNames) using ComponentClassNames<"root" | "icon" | ...> for that component’s slots.

2. **Implementation**
   - Import `cn` and `ComponentClassNames` from the package utils (e.g. from "../../utils/cn").
   - Root element: build className with cn("base-class", variantClass, className, classNames?.root).
   - Every other overridable element (icon, label, etc.): add the corresponding classNames slot (e.g. classNames?.icon) to that element’s className.

3. **Consistency**
   - Use design-system base classes and variants first; then consumer className; then classNames slots.
   - Do not remove or rename existing props unless they conflict with this pattern.

Follow the project rule in .cursor/rules/ui-hybrid-component-pattern.mdc for details and examples. Use Button and Badge in packages/ui/src/components/atoms/ as reference implementations.
```

---

## For new components

When **adding a new** atom, molecule, or organism, the rule `ui-hybrid-component-pattern.mdc` applies automatically when you work in `packages/ui/**/*.tsx`. You can still say:

```
Add a new [Atom|Molecule|Organism] component [Name] in packages/ui. Use the hybrid override pattern (className + classNames) and the shared cn / ComponentClassNames from the package. Follow .cursor/rules/ui-hybrid-component-pattern.mdc.
```

You don’t need to repeat the full pattern each time; the rule gives Cursor the context.
