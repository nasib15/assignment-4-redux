import { Library } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Library className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Library Management System
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link
              to="/books"
              className="hover:text-foreground transition-colors"
            >
              Browse Books
            </Link>
            <Link
              to="/create-book"
              className="hover:text-foreground transition-colors"
            >
              Add Book
            </Link>
            <Link
              to="/borrow-summary"
              className="hover:text-foreground transition-colors"
            >
              View Summary
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
