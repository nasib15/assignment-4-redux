import { ToggleTheme } from "@/components/theme/ToggleTheme";
import { Button } from "@/components/ui/button";
import { BarChart3, BookOpen, Library, Plus } from "lucide-react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Library },
    { name: "Books", href: "/books", icon: BookOpen },
    { name: "Add Book", href: "/create-book", icon: Plus },
    { name: "Borrow Summary", href: "/borrow-summary", icon: BarChart3 },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-2">
            <Library className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Library Management</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center space-x-1">
            {navigation.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    size="sm"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
