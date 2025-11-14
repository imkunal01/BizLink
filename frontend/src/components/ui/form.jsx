import * as React from "react"
import { cn } from "@/lib/utils"

const Form = React.forwardRef(({ className, ...props }, ref) => (
  <form ref={ref} className={cn("space-y-4", className)} {...props} />
))
Form.displayName = "Form"

const FormField = ({ children }) => {
  return (
    <div className="space-y-2">
      {children}
    </div>
  )
}

const FormItem = ({ className, ...props }) => (
  <div className={cn("space-y-2", className)} {...props} />
)
FormItem.displayName = "FormItem"

const FormMessage = ({ className, children, ...props }) => {
  if (!children) return null
  
  return (
    <p
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  )
}
FormMessage.displayName = "FormMessage"

export { Form, FormField, FormItem, FormMessage }