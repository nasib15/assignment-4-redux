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
  BarChart3,
  BookOpen,
  Check,
  Copy,
  Edit,
  FileText,
  Hash,
  Layers,
  Sparkles,
  Trash2,
  User,
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
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy");
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-muted/50 rounded-xl w-1/4"></div>
            <div className="grid gap-8">
              <div className="space-y-6">
                <div className="h-64 bg-muted/50 rounded-2xl"></div>
                <div className="h-32 bg-muted/50 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!bookDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20 animate-scale-in">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-pink-500 p-8 rounded-3xl inline-block">
                <BookOpen className="h-20 w-20 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Book Not Found
            </h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
              The book you're looking for doesn't exist or has been removed from
              our collection.
            </p>
            <Link to="/books">
              <Button className="button-primary text-lg px-8 py-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Books
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30 animate-glow-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gradient">
                  Book Details
                </h1>
                <p className="text-xl text-muted-foreground mt-1">
                  Complete information about this book
                </p>
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap gap-3 animate-slide-in-right"
            style={{ animationDelay: "200ms" }}
          >
            <Link to={`/edit-book/${bookDetails._id}`}>
              <Button
                variant="outline"
                className="hover-lift bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border/50 hover:border-primary/50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Book
              </Button>
            </Link>
            <Button
              className={`hover-lift ${
                bookDetails.copies > 0
                  ? "button-primary"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={bookDetails.copies === 0}
              onClick={() => navigate(`/borrow/${bookDetails._id}`)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {bookDetails.copies > 0 ? "Borrow Book" : "Unavailable"}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="hover-lift bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="card-modern border-0">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base leading-relaxed">
                    This action cannot be undone. This will permanently delete
                    <span className="font-semibold">
                      {" "}
                      "{bookDetails.title}"{" "}
                    </span>
                    and remove it from the library system.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-3">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(bookDetails._id)}
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
          </div>
        </div>

        <div className="grid gap-8">
          {/* Hero Card */}
          <Card
            className="card-modern hover-lift animate-scale-in"
            style={{ animationDelay: "300ms" }}
          >
            <CardHeader className="pb-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div>
                    <CardTitle className="text-3xl lg:text-4xl leading-tight text-gradient mb-2">
                      {bookDetails?.title}
                    </CardTitle>
                    <CardDescription className="text-xl flex items-center gap-2">
                      <User className="h-5 w-5" />
                      by {bookDetails?.author}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Badge
                      variant={
                        bookDetails?.available ? "default" : "destructive"
                      }
                      className={`text-sm px-3 py-1 ${
                        bookDetails?.available
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                          : "bg-gradient-to-r from-red-500 to-pink-500 text-white border-0"
                      }`}
                    >
                      {bookDetails?.available ? "Available" : "Not Available"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-sm px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-purple-300 border-0"
                    >
                      <Layers className="h-3 w-3 mr-1" />
                      {bookDetails?.genre}
                    </Badge>
                  </div>
                </div>

                {/* Availability Status Card */}
                <div className="glass-effect p-6 rounded-2xl min-w-[200px]">
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          bookDetails?.copies > 0
                            ? "bg-green-500"
                            : "bg-red-500"
                        } animate-bounce-subtle`}
                      ></div>
                    </div>
                    <div
                      className={`text-3xl font-bold mb-1 ${
                        bookDetails?.copies > 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {bookDetails?.copies}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {bookDetails?.copies > 0
                        ? "Copies Available"
                        : "All Borrowed"}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            {bookDetails?.description && (
              <CardContent className="pt-0">
                <Separator className="mb-6" />
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-purple-400" />
                    Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {bookDetails?.description}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Book Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Metadata Card */}
            <Card
              className="card-modern hover-lift animate-slide-in-left"
              style={{ animationDelay: "400ms" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                    <Hash className="h-5 w-5 text-white" />
                  </div>
                  Book Metadata
                </CardTitle>
                <CardDescription>
                  Technical details and identifiers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    ISBN Number
                  </span>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono bg-white/80 dark:bg-slate-700/80 px-3 py-1 rounded-lg border">
                      {bookDetails?.isbn}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bookDetails?.isbn, "isbn")}
                      className="h-8 w-8 p-0 hover:bg-primary/10"
                    >
                      {copiedField === "isbn" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Genre Category
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-purple-300 border-0"
                  >
                    {bookDetails?.genre}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Author Name
                  </span>
                  <span className="font-medium">{bookDetails?.author}</span>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Card */}
            <Card
              className="card-modern hover-lift animate-slide-in-right"
              style={{ animationDelay: "500ms" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  Book Analytics
                </CardTitle>
                <CardDescription>Usage statistics and metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">
                    Availability Status
                  </span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        bookDetails?.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="font-medium text-green-700 dark:text-green-400">
                      {bookDetails?.available ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <span className="text-sm font-medium text-blue-700 dark:text-purple-400">
                    Total Copies
                  </span>
                  <span className="text-lg font-bold text-blue-700 dark:text-purple-400">
                    {bookDetails?.copies}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <span className="text-sm font-medium text-purple-700 dark:text-pink-400">
                    Book ID
                  </span>
                  <code className="text-xs font-mono bg-white/80 dark:bg-slate-700/80 px-2 py-1 rounded border text-purple-700 dark:text-pink-400">
                    {bookDetails?._id.slice(-8)}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card
            className="card-modern animate-fade-in-scale"
            style={{ animationDelay: "600ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                Quick Actions
              </CardTitle>
              <CardDescription>Common operations for this book</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to={`/edit-book/${bookDetails._id}`} className="block">
                  <Button
                    variant="outline"
                    className="w-full h-12 hover-lift bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border/50 hover:border-primary/50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </Button>
                </Link>

                <Button
                  className={`w-full h-12 hover-lift ${
                    bookDetails.copies > 0
                      ? "button-primary"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={bookDetails.copies === 0}
                  onClick={() => navigate(`/borrow/${bookDetails._id}`)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {bookDetails.copies > 0 ? "Borrow Now" : "Unavailable"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 hover-lift bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border/50 hover:border-primary/50"
                  onClick={() => copyToClipboard(bookDetails?.isbn, "share")}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy ISBN
                </Button>

                <Link to="/books" className="block">
                  <Button
                    variant="outline"
                    className="w-full h-12 hover-lift bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border/50 hover:border-primary/50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Library
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
