import * as React from "react";
import * as SP from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = SP.Root;
export const SelectGroup = SP.Group;
export const SelectValue = SP.Value;

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SP.Trigger>) {
  return (
    <SP.Trigger
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <SP.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SP.Icon>
    </SP.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentPropsWithoutRef<typeof SP.Content>) {
  return (
    <SP.Portal>
      <SP.Content
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className
        )}
        position={position}
        {...props}
      >
        <SP.Viewport className="p-1">{children}</SP.Viewport>
      </SP.Content>
    </SP.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SP.Item>) {
  return (
    <SP.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SP.ItemIndicator>
          <Check className="h-4 w-4" />
        </SP.ItemIndicator>
      </span>
      <SP.ItemText>{children}</SP.ItemText>
    </SP.Item>
  );
}

export function SelectLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SP.Label>) {
  return (
    <SP.Label
      className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
      {...props}
    />
  );
}

export function SelectSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SP.Separator>) {
  return (
    <SP.Separator
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  );
}