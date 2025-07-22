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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useDeleteBookMutation,
  useGetSingleBookDeatilsQuery,
} from "@/redux/api/book";
import type { IBook } from "@/types/book-types";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Copy,
  Edit,
  FileText,
  Hash,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const { data, isLoading } = useGetSingleBookDeatilsQuery(id);
  const bookDetails: IBook = data?.data;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDelete = (id: string) => {
    deleteBook(id)
      .unwrap()
      .then((response) => {
        if (response.success) {
          toast.success("Book deleted successfully", {
            position: "top-right",
          });
          navigate("/books");
        } else {
          toast.error("Failed to delete book");
        }
      })
      .catch(() => {
        toast.error("Failed to delete book");
      });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-16 bg-muted rounded w-1/4"></div>
          <div className="gap-8">
            <div className="space-y-6">
              <div className="h-64 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!bookDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Book Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/books">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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
            <h1 className="text-3xl font-bold text-foreground">Book Details</h1>
            <p className="text-muted-foreground mt-1">
              Complete information about this book
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to={`/edit-book/${bookDetails._id}`}>
            <Button variant="outline">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button
            variant="default"
            disabled={bookDetails.copies === 0}
            onClick={() => navigate(`/borrow/${bookDetails._id}`)}
          >
            <BookOpen className="h-4 w-4" />
            {bookDetails.copies > 0 ? "Borrow" : "Unavailable"}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this book and remove it from the library system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(bookDetails._id)}
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
        </div>
      </div>

      <div className="gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl leading-tight">
                    {bookDetails?.title}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    by {bookDetails?.author}
                  </CardDescription>
                </div>
                <Badge
                  variant={bookDetails?.available ? "default" : "destructive"}
                >
                  {bookDetails?.available ? "Available" : "Not Available"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Availability Status */}
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">Availability</h3>
                    <p className="text-sm text-muted-foreground">
                      Current status and copy information
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-lg font-semibold ${
                        bookDetails?.copies > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {bookDetails?.copies}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {bookDetails?.copies > 0
                        ? "Available"
                        : "All copies borrowed"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {bookDetails?.description && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {bookDetails?.description}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <Card>
            <CardHeader>
              <CardTitle>Book Information</CardTitle>
              <CardDescription>
                Detailed metadata and publication information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      ISBN
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {bookDetails?.isbn}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(bookDetails?.isbn, "isbn")
                        }
                        className="h-6 w-6 p-0"
                      >
                        {copiedField === "isbn" ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Genre</span>
                    <Badge variant="secondary">{bookDetails?.genre}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
