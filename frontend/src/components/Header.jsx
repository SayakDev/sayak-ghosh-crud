import { Search, Bell } from "lucide-react";

const Header = ({
  title = "RTI Management",
  subtitle = "RTI Management",
  searchValue,
  onSearchChange,
}) => {
  const controlled = typeof onSearchChange === "function";
  return (
    <header className="h-20 bg-card border-b border-border flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={controlled ? searchValue ?? "" : undefined}
            onChange={controlled ? (e) => onSearchChange(e.target.value) : undefined}
            className="w-72 h-10 pl-4 pr-12 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
          <button className="absolute right-1 top-1 w-8 h-8 rounded-md bg-brand flex items-center justify-center text-brand-foreground">
            <Search className="w-4 h-4" />
          </button>
        </div>

        <button className="relative">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            01
          </span>
        </button>

        <div className="w-9 h-9 rounded-full bg-secondary overflow-hidden border-2 border-border">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
