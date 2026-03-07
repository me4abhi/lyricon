import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@lyricon/ui";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger"],
      description: "Visual style; uses design system semantic tokens",
    },
    children: {
      control: "text",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const WithIcon: Story = {
  args: {
    children: "With icon",
    variant: "success",
    icon: (
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "currentColor",
        }}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Optional `icon` slot renders before the label. Style it via `classNames.icon` when needed.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
};

/** Root-level override: use `className` for quick styling (e.g. extra padding, shadow). */
export const RootOverride: Story = {
  args: {
    children: "Root override",
    variant: "default",
    className: "lyricon-badge-override-demo",
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Pattern 1 – className:** Single class on the root. Use for common tweaks (spacing, shadow).",
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`.lyricon-badge-override-demo { box-shadow: 0 2px 8px rgba(0,0,0,0.12); padding: var(--space-2) var(--space-3); }`}</style>
        <Story />
      </>
    ),
  ],
};

/** Slot-level overrides: use `classNames` to target root, icon, and label separately. */
export const SlotOverrides: Story = {
  args: {
    children: "Slot overrides",
    variant: "warning",
    icon: (
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "currentColor",
        }}
      />
    ),
    classNames: {
      root: "lyricon-badge-slot-root",
      icon: "lyricon-badge-slot-icon",
      label: "lyricon-badge-slot-label",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Pattern 2 – classNames:** Target specific slots when you need precision (e.g. icon size, label font).",
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          .lyricon-badge-slot-root { border-width: 2px; }
          .lyricon-badge-slot-icon { opacity: 0.9; }
          .lyricon-badge-slot-label { font-weight: var(--font-weight-semibold); letter-spacing: 0.02em; }
        `}</style>
        <Story />
      </>
    ),
  ],
};
