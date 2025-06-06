import * as React from "react"
import { NavigationMenuLink } from "../../components/ui/navigation-menu"
import { cn } from "../../lib/utils"

export interface ListItemProps
  extends React.ComponentPropsWithoutRef<"a"> {
  title: string
}



const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  ListItemProps
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:bg-gray-100 focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default ListItem
