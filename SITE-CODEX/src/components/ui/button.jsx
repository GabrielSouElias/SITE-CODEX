import { cloneElement, isValidElement } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  asChild = false,
  className,
  children,
  type = "button",
  ...props
}) {
  const baseClassName =
    "inline-flex items-center justify-center whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50";

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      className: cn(baseClassName, className, children.props.className),
    });
  }

  return (
    <button type={type} className={cn(baseClassName, className)} {...props}>
      {children}
    </button>
  );
}
