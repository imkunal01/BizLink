import { cn } from '@/lib/utils'

const PageLoader = ({ className, ...props }) => {
  return (
    <div className={cn('flex items-center justify-center min-h-[60vh]', className)} {...props}>
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-primary/20 animate-spin" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-transparent border-t-primary animate-spin" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default PageLoader