import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, BookOpen, Eye, Library, Plus, Users } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Library className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Library Management System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Efficiently manage your library's book collection, track borrowers,
          and maintain detailed records with our comprehensive management
          system.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/books">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Browse Books</CardTitle>
                  <CardDescription>
                    View and manage the library collection
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Search, filter, and manage all books in the library. View
                details, check availability, and perform actions.
              </p>
              <Button className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                View All Books
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/create-book">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Add New Book</CardTitle>
                  <CardDescription>
                    Register a new book in the system
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add new books to the library collection with detailed
                information including title, author, ISBN, and more.
              </p>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/borrow-summary">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Borrow Summary</CardTitle>
                  <CardDescription>
                    Track all borrowing activities
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Monitor borrowed books, track due dates, manage returns, and
                send reminders to borrowers.
              </p>
              <Button variant="outline" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Summary
              </Button>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Book Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/books">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View All Books
                </Button>
              </Link>
              <Link to="/create-book">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Book
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive book management with search, filtering, detailed
              views, and editing capabilities. Track availability and manage
              your entire collection efficiently.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Borrowing System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/borrow-summary">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Summary
                </Button>
              </Link>
              <Link to="/books">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Borrow Books
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Complete borrowing workflow with borrower information capture, due
              date management, return tracking, and automated reminders for
              overdue books.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Features */}
      <Card>
        <CardHeader>
          <CardTitle>System Features</CardTitle>
          <CardDescription>
            Everything you need to manage your library effectively
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-3 bg-primary/10 rounded-lg inline-flex mb-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Book Catalog</h3>
              <p className="text-sm text-muted-foreground">
                Detailed book information with ISBN, genre, publisher, and
                availability tracking
              </p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg inline-flex mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Borrower Management</h3>
              <p className="text-sm text-muted-foreground">
                Track borrower information, borrowing history, and contact
                details
              </p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg inline-flex mb-3">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Analytics & Reports</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive statistics on borrowing patterns and library usage
              </p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg inline-flex mb-3">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Search & Filter</h3>
              <p className="text-sm text-muted-foreground">
                Powerful search capabilities with multiple filters and view
                options
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
