import { cva } from "class-variance-authority"

export const cardVariants = cva(
  "rounded-lg transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground shadow-soft",
        elevated: "bg-card text-card-foreground shadow-medium hover:shadow-strong",
        feature: "bg-gradient-steel border border-steel-light hover:shadow-medium hover:-translate-y-1 transition-all duration-300",
        product: "bg-background border border-border hover:border-steel-accent hover:shadow-soft transition-all duration-300 overflow-hidden",
        category: "bg-background shadow-soft hover:shadow-medium hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
)