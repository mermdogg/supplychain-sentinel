import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = React.forwardRef(function Label(
  props: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
  ref: React.ForwardedRef<React.ElementRef<typeof LabelPrimitive.Root>>
) {
  const { className, ...rest } = props;
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...rest}
    />
  );
});
Label.displayName = "Label";

export { Label };
