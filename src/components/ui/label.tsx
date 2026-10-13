import * as React from "react";

export type LabelProps = React.ComponentPropsWithoutRef<"label">;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={["text-sm font-medium leading-none", className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);

Label.displayName = "Label";
