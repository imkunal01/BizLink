import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin sidebar will be added here in Phase 2 */}
      <div className="flex">
        <aside className="w-64 bg-muted/10 border-r min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Sidebar navigation will be added in Phase 2
            </p>
          </div>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout