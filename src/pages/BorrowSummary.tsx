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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockBorrowRecords } from "@/data/data";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Filter,
  Mail,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const BorrowSummary = () => {
  const [borrowRecords] = useState(mockBorrowRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter records based on search and status
  const filteredRecords = borrowRecords.filter((record) => {
    const matchesSearch =
      record.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.borrowerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: borrowRecords.length,
    borrowed: borrowRecords.filter((r) => r.status === "borrowed").length,
    returned: borrowRecords.filter((r) => r.status === "returned").length,
    overdue: borrowRecords.filter((r) => r.status === "overdue").length,
    uniqueBorrowers: new Set(borrowRecords.map((r) => r.borrowerEmail)).size,
    uniqueBooks: new Set(borrowRecords.map((r) => r.bookId)).size,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "borrowed":
        return <Badge variant="default">Borrowed</Badge>;
      case "returned":
        return <Badge variant="secondary">Returned</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "borrowed":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "returned":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSendReminder = (record: any) => {
    // Mock reminder functionality
    alert(
      `Sending reminder to ${record.borrowerName} (${record.borrowerEmail}) about "${record.bookTitle}"`
    );
  };

  const handleMarkReturned = (record: any) => {
    // Mock return functionality
    alert(
      `Marking "${record.bookTitle}" as returned by ${record.borrowerName}`
    );
  };

  const exportRecords = () => {
    // Mock export functionality
    console.log("Exporting records:", filteredRecords);
    alert(
      "Export functionality would download a CSV file with the filtered records"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
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
        <Button onClick={exportRecords} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Records
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{stats.total}</p>
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
                  Currently Borrowed
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.borrowed}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue Books</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.overdue}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Borrowers
                </p>
                <p className="text-2xl font-bold">{stats.uniqueBorrowers}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((stats.returned / stats.total) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.returned} of {stats.total} books returned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueBooks}</div>
            <p className="text-xs text-muted-foreground">
              Different titles borrowed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {Math.round((stats.overdue / stats.total) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Books past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by book title, borrower name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="borrowed">Borrowed</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredRecords.length} of {borrowRecords.length} records
        </p>
      </div>

      {/* Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Borrow Records</CardTitle>
          <CardDescription>
            Complete list of all book borrowing activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => {
                  const daysUntilDue = getDaysUntilDue(record.dueDate);

                  return (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.bookTitle}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {record.bookId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {record.borrowerName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {record.borrowerEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(record.borrowDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(record.dueDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          {getStatusBadge(record.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {record.status === "returned" ? (
                          <div className="text-sm text-muted-foreground">
                            Returned:{" "}
                            {record.returnDate
                              ? new Date(record.returnDate).toLocaleDateString()
                              : "N/A"}
                          </div>
                        ) : (
                          <div
                            className={`text-sm font-medium ${
                              daysUntilDue < 0
                                ? "text-red-600"
                                : daysUntilDue <= 3
                                ? "text-amber-600"
                                : "text-green-600"
                            }`}
                          >
                            {daysUntilDue < 0
                              ? `${Math.abs(daysUntilDue)} days overdue`
                              : daysUntilDue === 0
                              ? "Due today"
                              : `${daysUntilDue} days left`}
                          </div>
                        )}
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
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {record.status === "borrowed" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => handleSendReminder(record)}
                                >
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Reminder
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleMarkReturned(record)}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as Returned
                                </DropdownMenuItem>
                              </>
                            )}
                            {record.status === "overdue" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => handleSendReminder(record)}
                                  className="text-red-600"
                                >
                                  <AlertCircle className="mr-2 h-4 w-4" />
                                  Send Overdue Notice
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleMarkReturned(record)}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Mark as Returned
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No records found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "No books have been borrowed yet"}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Link to="/books">
                  <Button>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Books
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {stats.overdue > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Overdue Books Alert
            </CardTitle>
            <CardDescription>
              {stats.overdue} book(s) are overdue and require attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  alert("Sending reminders to all overdue borrowers")
                }
              >
                <Mail className="h-4 w-4 mr-2" />
                Send All Reminders
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusFilter("overdue")}
              >
                <Filter className="h-4 w-4 mr-2" />
                View Overdue Only
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BorrowSummary;
