import { Github, Heart, Library, Mail, Twitter } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2.5 rounded-xl">
                <Library className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Library Management
                </span>
                <div className="text-sm text-slate-300">System</div>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md">
              Revolutionizing library management with cutting-edge technology.
              Streamline your operations, enhance user experience, and unlock
              powerful insights with our comprehensive platform.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:-translate-y-1 transform"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:-translate-y-1 transform"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:-translate-y-1 transform"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-3">
              {[
                { name: "Browse Books", href: "/books" },
                { name: "Add Book", href: "/create-book" },
                { name: "Borrow Summary", href: "/borrow-summary" },
                { name: "Home", href: "/" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Features</h3>
            <div className="space-y-3">
              {[
                "Smart Cataloging",
                "Real-time Analytics",
                "Cloud Backup",
                "Mobile Responsive",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center space-x-2 text-sm text-slate-300"
                >
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-slate-300">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>for modern libraries</span>
            </div>

            <div className="text-sm text-slate-300">
              © 2024 Library Management System. All rights reserved.
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-colors duration-300"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
