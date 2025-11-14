import { Link } from 'react-router-dom'

const SideNav = () => {
  return (
    <nav className="space-y-2">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Navigation
        </h2>
        <div className="space-y-1">
          <Link
            to="#"
            className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            Dashboard
          </Link>
          <Link
            to="#"
            className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            Orders
          </Link>
          <Link
            to="#"
            className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            Products
          </Link>
          <Link
            to="#"
            className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default SideNav