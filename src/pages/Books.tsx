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
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/api/book";
import type { IBook } from "@/types/book-types";
import {
  Book,
  BookOpen,
  Edit,
  Eye,
  Filter,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  console.log(books, "books");

  // Get unique genres for filter
  // const genres = Array.from(new Set(books.map((book) => book.genre)));

  // // Filter books based on search and genre
  // const filteredBooks = books.filter((book) => {
  //   const matchesSearch =
  //     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     book.isbn.includes(searchTerm);
  //   const matchesGenre =
  //     selectedGenre === "all" || book.genre === selectedGenre;
  //   return matchesSearch && matchesGenre;
  // });

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
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-230px)] md:min-h-[calc(100vh-200px)] text-center">
          <div className="bg-destructive/10 rounded-full p-4 mb-4">
            <BookOpen className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Failed to Load Books
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            We encountered an error while loading the book collection. Please
            try again later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Book className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Library Books</h1>
          <p className="text-muted-foreground mt-2">
            Manage and browse the library collection
          </p>
        </div>
        <Link to="/create-book">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Book
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {/* {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))} */}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {/* Showing {filteredBooks.length} of {books.length} books */}
        </p>
      </div>

      {/* Table View */}

      {isLoading ? (
        <TableLoader />
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Copies</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books?.data?.map((book: IBook) => (
                  <TableRow key={book._id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{book.genre}</Badge>
                    </TableCell>

                    <TableCell>{book.isbn}</TableCell>

                    <TableCell>
                      <span
                        className={
                          book.copies > 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {book.copies}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={book.available ? "default" : "destructive"}
                      >
                        {book.available ? "Available" : "Not Available"}
                      </Badge>
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
                          <DropdownMenuItem asChild disabled={isDeleting}>
                            <Link to={`/books/${book._id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild disabled={isDeleting}>
                            <Link to={`/edit-book/${book._id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            asChild
                            disabled={book.copies === 0 || isDeleting}
                          >
                            <Link to={`/borrow/${book._id}`}>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Borrow
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                className="text-red-600"
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this book and remove it
                                  from the library system.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(book._id)}
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? (
                                    <>
                                      <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                      Deleting...
                                    </>
                                  ) : (
                                    <>
                                      <Trash2 className="h-4 w-4" />
                                      Delete
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
          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(Math.max(1, page - 1))}
                    className={page === 1 ? "opacity-50" : "cursor-pointer"}
                    disabled={page === 1}
                  />
                </PaginationItem>

                {/* Show previous page if not on first page */}
                {page > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setPage(page - 1)}
                      className="cursor-pointer"
                    >
                      {page - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Current page */}
                <PaginationItem>
                  <PaginationLink isActive className="cursor-default">
                    {page}
                  </PaginationLink>
                </PaginationItem>

                {/* Show next page if there are more books */}
                {books?.meta?.totalPages && page < books.meta.totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setPage(page + 1)}
                      className="cursor-pointer"
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    className={
                      books?.meta?.totalPages && page >= books.meta.totalPages
                        ? "opacity-50"
                        : "cursor-pointer"
                    }
                    disabled={
                      books?.meta?.totalPages && page >= books.meta.totalPages
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}

      {/* Empty State */}
      {books?.data?.length === 0 && (
        <div className="text-center py-12">
          <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedGenre !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by adding your first book"}
          </p>
          {!searchTerm && selectedGenre === "all" && (
            <Link to="/create-book">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Book
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Books;
