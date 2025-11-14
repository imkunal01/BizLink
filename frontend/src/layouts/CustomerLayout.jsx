import { Outlet } from 'react-router-dom'

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  )
}

export default CustomerLayout