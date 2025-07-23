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
  BookOpen,
  Eye,
  Mail,
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/books">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Borrow Summary
              </h1>
              <p className="text-muted-foreground mt-2">
                Track and manage all borrowed books
              </p>
            </div>
          </div>
        </div>
        <TableLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/books">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Borrow Summary
            </h1>
            <p className="text-muted-foreground mt-2">
              Track and manage all borrowed books
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Books Borrowed</p>
                <p className="text-2xl font-bold">{stats.totalBooks}</p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Copies Borrowed
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalBorrowedBooks}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Borrows</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.averageBorrowsPerBook}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Most Popular</p>
                <p className="text-sm font-bold truncate">
                  {stats.mostBorrowedBook?.book.title || "N/A"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.mostBorrowedBook?.totalQuantity || 0} copies
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {borrowSummaryData.length} of {borrowSummaryData.length} books
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Borrowed Books Summary</CardTitle>
          <CardDescription>
            Summary of all books currently being borrowed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Title</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Total Copies Borrowed</TableHead>
                  <TableHead>Popularity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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

                  const popularityColor =
                    popularityLevel === "High"
                      ? "text-red-600"
                      : popularityLevel === "Medium"
                      ? "text-orange-600"
                      : "text-green-600";

                  return (
                    <TableRow key={`${item.book.isbn}-${index}`}>
                      <TableCell>
                        <div className="font-medium">{item.book.title}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {item.book.isbn}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default" className="font-semibold">
                          {item.totalQuantity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`text-sm font-medium ${popularityColor}`}
                        >
                          {popularityLevel}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <div className="h-4 w-4">⋮</div>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Book Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact Borrowers
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
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No records found</h3>
              <p className="text-muted-foreground mb-4">
                No books have been borrowed yet
              </p>
              <Link to="/books">
                <Button>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Books
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {borrowSummaryData.some((item) => item.totalQuantity >= 7) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="h-5 w-5" />
              High Demand Books Alert
            </CardTitle>
            <CardDescription>
              Some books have high borrowing demand and may need more copies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {borrowSummaryData
                .filter((item) => item.totalQuantity >= 7)
                .map((item, index) => (
                  <div
                    key={`${item.book.isbn}-alert-${index}`}
                    className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-950/20 rounded"
                  >
                    <span className="font-medium">{item.book.title}</span>
                    <Badge variant="destructive">
                      {item.totalQuantity} copies borrowed
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BorrowSummary;
