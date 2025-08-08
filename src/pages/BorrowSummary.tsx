import TableLoader from "@/components/loaders/TableLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllBorrowsQuery } from "@/redux/api/borrow";
import type { BorrowSummaryResponse } from "@/types/borrow-types";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  Eye,
  Mail,
  MoreVertical,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router";

const BorrowSummary = () => {
  const { data: borrowsData, isLoading } = useGetAllBorrowsQuery(undefined) as {
    data: BorrowSummaryResponse | undefined;
    isLoading: boolean;
  };

  const borrowSummaryData = borrowsData?.data || [];

  const stats = {
    totalBooks: borrowSummaryData.length,
    totalBorrowedBooks: borrowSummaryData.reduce(
      (sum, item) => sum + item.totalQuantity,
      0
    ),
    averageBorrowsPerBook:
      borrowSummaryData.length > 0
        ? Math.round(
            (borrowSummaryData.reduce(
              (sum, item) => sum + item.totalQuantity,
              0
            ) /
              borrowSummaryData.length) *
              10
          ) / 10
        : 0,
    mostBorrowedBook:
      borrowSummaryData.length > 0
        ? borrowSummaryData.reduce(
            (max, item) =>
              item.totalQuantity > max.totalQuantity ? item : max,
            borrowSummaryData[0]
          )
        : null,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-slide-up">
            <div className="flex items-center gap-6">
              <Link to="/books">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover-lift bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Books
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-xl opacity-30 animate-glow-pulse"></div>
                  <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gradient">
                    Borrow Summary
                  </h1>
                  <p className="text-xl text-muted-foreground mt-1">
                    Track and manage all borrowed books
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-modern">
            <TableLoader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Floating Background Elements */}
        <div className="fixed top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-float"></div>
        <div
          className="fixed bottom-20 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 animate-slide-up">
          <div className="flex items-center gap-6">
            <Link to="/books">
              <Button
                variant="outline"
                size="sm"
                className="hover-lift bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-xl opacity-30 animate-glow-pulse"></div>
                <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gradient">
                  Borrow Analytics
                </h1>
                <p className="text-xl text-muted-foreground mt-1">
                  Comprehensive insights into library usage patterns
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="card-modern hover-lift animate-scale-in stagger-item">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Books Borrowed
                  </p>
                  <p className="text-3xl font-bold text-gradient">
                    {stats.totalBooks}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unique titles
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern hover-lift animate-scale-in stagger-item">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Total Copies
                  </p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.totalBorrowedBooks}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Currently borrowed
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern hover-lift animate-scale-in stagger-item">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Average Borrows
                  </p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {stats.averageBorrowsPerBook}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Per book</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern hover-lift animate-scale-in stagger-item">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Most Popular
                  </p>
                  <p className="text-sm font-bold truncate max-w-[120px]">
                    {stats.mostBorrowedBook?.book.title || "N/A"}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                    {stats.mostBorrowedBook?.totalQuantity || 0} copies
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Info */}
        <div
          className="card-modern mb-8 animate-scale-in"
          style={{ animationDelay: "400ms" }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Library Usage Overview
                </p>
                <p className="text-2xl font-bold text-gradient">
                  {borrowSummaryData.length} Active Borrowing Records
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing all current borrowing activities
            </div>
          </div>
        </div>

        {/* Main Data Table */}
        <Card
          className="card-modern animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              Borrowed Books Analytics
            </CardTitle>
            <CardDescription className="text-base">
              Detailed breakdown of all books currently being borrowed with
              popularity metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 bg-muted/30">
                    <TableHead className="font-semibold text-foreground">
                      Book Title
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      ISBN
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Copies Borrowed
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Popularity
                    </TableHead>
                    <TableHead className="text-right font-semibold text-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowSummaryData.map((item, index) => {
                    const popularityLevel =
                      item.totalQuantity >= 7
                        ? "High"
                        : item.totalQuantity >= 4
                        ? "Medium"
                        : "Low";

                    const popularityBg =
                      popularityLevel === "High"
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"
                        : popularityLevel === "Medium"
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0"
                        : "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0";

                    return (
                      <TableRow
                        key={`${item.book.isbn}-${index}`}
                        className="border-border/30 hover:bg-accent/30 transition-colors duration-200 animate-slide-up"
                        style={{ animationDelay: `${800 + index * 50}ms` }}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                            <div>
                              <div className="font-medium hover:text-primary transition-colors cursor-pointer">
                                {item.book.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ISBN: {item.book.isbn}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                            {item.book.isbn}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="default"
                              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 font-semibold"
                            >
                              {item.totalQuantity}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              copies
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={popularityBg}>
                            {popularityLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-accent/50"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                                Actions
                              </DropdownMenuLabel>
                              <DropdownMenuItem className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                View Book Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center">
                                <Mail className="mr-2 h-4 w-4" />
                                Contact Borrowers
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Analytics
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {borrowSummaryData.length === 0 && (
              <div className="text-center py-20 animate-scale-in">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-3xl inline-block">
                    <BookOpen className="h-20 w-20 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gradient mb-4">
                  No Borrowing Records
                </h3>
                <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
                  No books have been borrowed yet. Start exploring our
                  collection to see analytics here.
                </p>
                <Link to="/books">
                  <Button className="button-primary text-lg px-8 py-4">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Browse Books
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* High Demand Alert */}
        {borrowSummaryData.some((item) => item.totalQuantity >= 7) && (
          <Card
            className="card-modern mt-8 animate-fade-in-scale border-orange-200 dark:border-orange-800/30"
            style={{ animationDelay: "800ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-orange-600 dark:text-orange-400">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                High Demand Books Alert
              </CardTitle>
              <CardDescription className="text-base">
                These books have exceptional borrowing demand and may require
                additional copies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {borrowSummaryData
                  .filter((item) => item.totalQuantity >= 7)
                  .map((item, index) => (
                    <div
                      key={`${item.book.isbn}-alert-${index}`}
                      className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800/30 hover-lift"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                        <div>
                          <span className="font-semibold text-orange-700 dark:text-orange-300">
                            {item.book.title}
                          </span>
                          <p className="text-sm text-orange-600 dark:text-orange-400">
                            Consider ordering more copies
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="destructive"
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"
                      >
                        {item.totalQuantity} copies borrowed
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BorrowSummary;
