---
title: "Anatomy of a shadcn Component"
date: "2026-02-13"
description: "What actually makes a shadcn/ui component tick — Radix primitives, Tailwind classes, and a tiny utility that ties it all together."
---

If you've used [shadcn/ui](https://ui.shadcn.com), you know the pitch: copy-paste components you actually own. But what's actually inside one of these components? It's surprisingly minimal — and that's the point.

A shadcn component is essentially three things stacked together:

1. A **Radix UI** unstyled primitive for behavior and accessibility
2. **Tailwind CSS** classes for opinionated styling
3. A `cn()` utility for merging and overriding those classes

That's it. Let's break each one down.

## The `cn()` Utility

Every shadcn project starts with this tiny function in `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Two libraries doing two jobs:

- **clsx** handles conditional class logic — it lets you pass strings, objects, arrays, and falsy values without worrying about formatting. `clsx("px-4", false && "hidden", { "bg-red-500": hasError })` just works.
- **tailwind-merge** resolves Tailwind conflicts intelligently. If you pass `"px-4 px-8"`, it knows `px-8` wins. Without it, both classes land in the DOM and the result depends on CSS source order — which in Tailwind is effectively random.

Together they let consumers override any default styles cleanly. This is the entire secret sauce of shadcn's composability.

## The Radix Layer

Radix UI provides unstyled, accessible primitives — dialogs, popovers, accordions, select menus — that handle the hard behavioral stuff: focus trapping, keyboard navigation, aria attributes, portal rendering. Things you do not want to build from scratch.

shadcn wraps these with styling but doesn't alter the behavior. Here's a simplified version of how the Dialog component works:

```tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
```

The pattern is always the same:

1. Import a Radix primitive
2. Wrap it with `forwardRef` (so refs pass through)
3. Destructure `className` from props
4. Use `cn()` to merge default Tailwind classes with whatever `className` the consumer passes
5. Spread `...props` so everything else passes through

That last point matters. Because the component spreads props and merges classNames, you're never fighting the component. You're extending it.

## The Tailwind Layer

The styling is just Tailwind classes. No CSS modules, no styled-components, no runtime CSS-in-JS. Here's a simplified Button:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

**class-variance-authority** (cva) handles variant logic. It maps prop combinations to class strings — no conditionals, no ternaries, just a declarative config. The `buttonVariants` function takes `{ variant, size }` and returns the right classes.

The actual component is thin:

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  )
);
```

Consumer overrides always win because `className` comes after the defaults in the `cn()` call.

## Why This Works

The pattern is deliberately boring. Every shadcn component follows the same formula:

- Radix (or native HTML) for behavior
- Tailwind for styling
- `cn()` for merging
- `forwardRef` + prop spreading for composability
- cva for variant management (when needed)

There's no component library runtime. No theme provider. No context-based styling system. The components are just files in your project that you can read, modify, and delete. If you don't like how the Dialog animates, you change the Tailwind classes. If you need a variant that doesn't exist, you add it to the cva config.

The reusability comes from the convention, not the abstraction. Every component uses the same three tools the same way. Once you understand one, you understand all of them.
