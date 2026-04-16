import {
  LayoutDashboard,
  FileText,
  Scale,
  CalendarDays,
  Folder,
  BarChart3,
  Bell,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: FileText, label: "RTI Management", to: "/rti-management" },
  { icon: Scale, label: "Legal Cases", to: "/legal-cases" },
  { icon: CalendarDays, label: "Hearings Calendar", to: "/hearings" },
  { icon: Folder, label: "Documents", to: "/documents" },
  { icon: BarChart3, label: "Reports & Analytics", to: "/reports" },
  { icon: Bell, label: "Notifications & Settings", to: "/notifications" },
  { icon: LogOut, label: "Logout", to: "/logout" },
];

const Sidebar = () => {
  const location = useLocation();
  const isRtiActive =
    location.pathname === "/" ||
    location.pathname.startsWith("/rti");

  return (
    <aside className="w-64 bg-sidebar border-r border-border flex flex-col shrink-0">
      <div className="h-20 flex items-center gap-3 px-6 border-b border-border">
        <div className="w-11 h-11 rounded-full bg-brand flex items-center justify-center text-brand-foreground font-bold text-xs">
          SAU
        </div>
        <div className="leading-tight">
          <div className="font-extrabold text-sm text-foreground tracking-wide">SAU</div>
          <div className="text-[10px] text-muted-foreground tracking-widest">
            SOUTH ASIAN
            <br />
            UNIVERSITY
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.to === "/rti-management"
              ? isRtiActive
              : location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-active text-sidebar-active-foreground"
                  : "text-sidebar-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
