import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Select = ({ value, onChange, children, disabled, placeholder = "Select an option" }) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef(null)

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = React.Children.toArray(children).find(
    (child) => child.props.value === value
  )

  return (
    <div className="relative" ref={ref}>
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between"
        onClick={() => setOpen(!open)}
        disabled={disabled}
      >
        {selectedOption ? selectedOption.props.children : placeholder}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md z-50">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onClick: () => {
                onChange(child.props.value)
                setOpen(false)
              },
              selected: child.props.value === value,
            })
          )}
        </div>
      )}
    </div>
  )
}

const SelectItem = ({ children, onClick, selected }) => (
  <div
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
      selected && "bg-accent text-accent-foreground"
    )}
    onClick={onClick}
  >
    {selected && <Check className="absolute left-2 h-4 w-4" />}
    {children}
  </div>
)

export { Select, SelectItem }