import TableLoader from "@/components/loaders/TableLoader";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/api/book";
import type { IBook } from "@/types/book-types";
import {
    Book,
    BookOpen,
    Edit,
    Eye,
    Filter,
    MoreVertical,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const Books = () => {
  const [page, setPage] = useState(1);
  const { data: books, isError, isLoading } = useGetAllBooksQuery({ page });
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDelete = (bookId: string) => {
    deleteBook(bookId)
      .unwrap()
      .then((response) => {
        if (response.success) {
          toast.success("Book deleted successfully", {
            position: "top-right",
          });
        } else {
          toast.error("Failed to delete book");
        }
      })
      .catch(() => {
        toast.error("Failed to delete book");
      });
  };

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-230px)] md:min-h-[calc(100vh-200px)] text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-3xl">
              <BookOpen className="h-16 w-16 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gradient mb-4">
            Failed to Load Books
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md text-lg">
            We encountered an error while loading the book collection. Please
            try again later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Book className="h-5 w-5" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-gradient animate-slide-up">
              Library Collection
            </h1>
            <p
              className="text-xl text-muted-foreground animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              Discover and manage your entire book collection
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            <Link to="/create-book">
              <Button className="flex items-center gap-2 w-full sm:w-auto">
                <Plus className="h-5 w-5" />
                Add New Book
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Card */}
        <div
          className="card-modern mb-8 animate-scale-in"
          style={{ animationDelay: "400ms" }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Books in Collection
                </p>
                <p className="text-2xl font-bold text-gradient">
                  {books?.meta?.totalItems || 0}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {books?.data?.length || 0} of{" "}
              {books?.meta?.totalItems || 0} books
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="card-modern">
            <TableLoader />
          </div>
        ) : (
          <>
            <div
              className="card-modern overflow-hidden animate-fade-in"
              style={{ animationDelay: "600ms" }}
            >
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="font-semibold text-foreground">
                      Title
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Author
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Genre
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      ISBN
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Copies
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-right font-semibold text-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books?.data?.map((book: IBook, index: number) => (
                    <TableRow
                      key={book._id}
                      className="border-border/30 hover:bg-accent/30 transition-colors duration-200"
                      style={{
                        animationDelay: `${800 + index * 50}ms`,
                      }}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                          <span className="hover:text-primary transition-colors cursor-pointer">
                            {book.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {book.author}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-purple-300 border-0"
                        >
                          {book.genre}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                          {book.isbn}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              book.copies > 0 ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></div>
                          <span
                            className={
                              book.copies > 0
                                ? "text-green-600 dark:text-green-400 font-medium"
                                : "text-red-600 dark:text-red-400 font-medium"
                            }
                          >
                            {book.copies}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={book.available ? "default" : "destructive"}
                          className={
                            book.available
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                              : "bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"
                          }
                        >
                          {book.available ? "Available" : "Not Available"}
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
                            <DropdownMenuItem asChild disabled={isDeleting}>
                              <Link
                                to={`/books/${book._id}`}
                                className="flex items-center"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild disabled={isDeleting}>
                              <Link
                                to={`/edit-book/${book._id}`}
                                className="flex items-center"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Book
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              asChild
                              disabled={book.copies === 0 || isDeleting}
                            >
                              <Link
                                to={`/borrow/${book._id}`}
                                className="flex items-center"
                              >
                                <BookOpen className="mr-2 h-4 w-4" />
                                Borrow Book
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Book
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="card-modern border-0">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-xl">
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-base leading-relaxed">
                                    This action cannot be undone. This will
                                    permanently delete
                                    <span className="font-semibold">
                                      {" "}
                                      "{book.title}"{" "}
                                    </span>
                                    and remove it from the library system.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="gap-3">
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(book._id)}
                                    disabled={isDeleting}
                                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                                  >
                                    {isDeleting ? (
                                      <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent mr-2"></div>
                                        Deleting...
                                      </>
                                    ) : (
                                      <>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Book
                                      </>
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {books?.meta?.totalPages && books.meta.totalPages > 1 && (
              <div
                className="flex justify-center mt-8 animate-fade-in"
                style={{ animationDelay: "800ms" }}
              >
                <div className="card-modern p-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setPage(Math.max(1, page - 1))}
                          className={`${
                            page === 1
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer hover:bg-accent/50"
                          } transition-all duration-200`}
                          disabled={page === 1}
                        />
                      </PaginationItem>

                      {page > 1 && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setPage(page - 1)}
                            className="cursor-pointer hover:bg-accent/50 transition-all duration-200"
                          >
                            {page - 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationLink
                          isActive
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>

                      {books?.meta?.totalPages &&
                        page < books.meta.totalPages && (
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => setPage(page + 1)}
                              className="cursor-pointer hover:bg-accent/50 transition-all duration-200"
                            >
                              {page + 1}
                            </PaginationLink>
                          </PaginationItem>
                        )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setPage(page + 1)}
                          className={`${
                            books?.meta?.totalPages &&
                            page >= books.meta.totalPages
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer hover:bg-accent/50"
                          } transition-all duration-200`}
                          disabled={
                            books?.meta?.totalPages &&
                            page >= books.meta.totalPages
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {books?.data?.length === 0 && (
          <div className="text-center py-20 animate-scale-in">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-3xl inline-block">
                <Book className="h-20 w-20 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gradient mb-4">
              No books found
            </h3>
            <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
              Your library collection is empty. Get started by adding your first
              book to begin building your digital library.
            </p>
            <Link to="/create-book">
              <Button className="text-lg px-8 py-4">
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Book
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
