import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Store, 
  Layers, 
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'retailers', label: 'Retailers', icon: Store },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export function Sidebar({
  activeSection,
  onSectionChange,
  collapsed = false,
  onToggleCollapse
}: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-neutral-200 z-30 flex flex-col"
    >
      {/* Logo */}
      <div className="h-20 border-b border-neutral-200 flex items-center justify-between px-6">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-cyan-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-neutral-900">KC</span>
            </div>
            <span className="text-gradient">Kripa Connect</span>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-cyan-400 rounded-xl flex items-center justify-center mx-auto">
            <span className="text-neutral-900">KC</span>
          </div>
        )}
      </div>
      
      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-lime-400 to-cyan-400 text-neutral-900 shadow-md'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </motion.button>
            );
          })}
        </div>
      </nav>
      
      {/* Collapse Toggle */}
      {onToggleCollapse && (
        <div className="p-3 border-t border-neutral-200">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-50 rounded-xl transition-all"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      )}
    </motion.aside>
  );
}
