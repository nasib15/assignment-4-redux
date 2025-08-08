import { ToggleTheme } from "@/components/theme/ToggleTheme";
import { Button } from "@/components/ui/button";
import { BarChart3, BookOpen, Library, Menu, Plus, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="navbar-glass animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Title */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-all duration-300"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl">
                <Library className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Library
              </span>
              <div className="text-sm text-muted-foreground font-medium">
                Management System
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`
                      relative flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5
                      ${
                        active
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-purple-400 shadow-md"
                          : "hover:bg-white/10 dark:hover:bg-white/5"
                      }
                    `}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"></div>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <ToggleTheme />
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-90 opacity-0"
                      : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-0 opacity-100"
                      : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </Button>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden lg:flex items-center">
            <ToggleTheme />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`
          lg:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <nav className="py-6 space-y-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
                      ${
                        active
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-purple-400"
                          : "hover:bg-white/10 dark:hover:bg-white/5"
                      }
                    `}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
