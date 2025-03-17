import * as React from "react"
import { cn } from "@/lib/utils"

interface ListProps {
  children: React.ReactNode
  className?: string
  type?: "unordered" | "ordered"
  variant?: "default" | "spaced"
  icon?: React.ReactNode
}

interface ListItemProps {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

const List = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  ListProps
>(({ children, className, type = "unordered", variant = "default", icon }, ref) => {
  const baseStyles = "text-foreground"
  const variantStyles = {
    default: "space-y-1",
    spaced: "space-y-3",
  }

  if (type === "ordered") {
    return (
      <ol
        ref={ref as React.ForwardedRef<HTMLOListElement>}
        className={cn(baseStyles, variantStyles[variant], className)}
      >
        {children}
      </ol>
    )
  }

  return (
    <ul
      ref={ref as React.ForwardedRef<HTMLUListElement>}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ListItem) {
          return React.cloneElement(child, {
            icon: child.props.icon || icon,
          } as ListItemProps)
        }
        return child
      })}
    </ul>
  )
})

List.displayName = "List"

const ListItem = React.forwardRef<
  HTMLLIElement,
  ListItemProps
>(({ children, className, icon }, ref) => {
  return (
    <li
      ref={ref}
      className={cn("flex items-start", className)}
    >
      {icon && (
        <span className="mr-2 mt-0.5 text-primary">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </li>
  )
})

ListItem.displayName = "ListItem"

export { List, ListItem } 