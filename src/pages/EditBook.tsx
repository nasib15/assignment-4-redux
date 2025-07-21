import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { genres } from "@/data/data";
import { useGetSingleBookDeatilsQuery } from "@/redux/api/book";
import type { IBook } from "@/types/book-types";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router";

const EditBook = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetSingleBookDeatilsQuery(id);
  const bookDetails: IBook = data?.data;

  console.log(bookDetails);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
            <div className="h-96 bg-muted rounded"></div>
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
            The book you're trying to edit doesn't exist or has been removed.
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to={`/books/${id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Details
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Book</h1>
          <p className="text-muted-foreground mt-2">
            Update the information for "{bookDetails.title}"
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Update the basic details about the book
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter book title"
                      defaultValue={bookDetails?.title}
                    />
                    {/* {errors.title && (
                      <p className="text-sm text-red-500">{errors.title}</p>
                    )} */}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      placeholder="Enter author name"
                      value={bookDetails.author}
                    />
                    {/* {errors.author && (
                      <p className="text-sm text-red-500">{errors.author}</p>
                    )} */}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN *</Label>
                    <Input
                      id="isbn"
                      placeholder="978-0-123456-78-9"
                      value={bookDetails.isbn}
                    />
                    {/* {errors.isbn && (
                      <p className="text-sm text-red-500">{errors.isbn}</p>
                    )} */}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter book description..."
                    value={bookDetails.description}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
                <CardDescription>
                  Categorization and physical properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre *</Label>
                    <Select value={bookDetails.genre}>
                      <SelectTrigger
                      // className={errors.genre ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* {errors.genre && (
                      <p className="text-sm text-red-500">{errors.genre}</p>
                    )} */}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalCopies">Total Copies *</Label>
                    <Input
                      id="copies"
                      type="number"
                      min="1"
                      value={bookDetails.copies}
                    />
                    {/* {errors.totalCopies && (
                      <p className="text-sm text-red-500">
                        {errors.totalCopies}
                      </p>
                    )} */}
                    {/* {bookDetails.totalCopies < originalBook.totalCopies && (
                      <p className="text-sm text-amber-600">
                        Warning: Reducing total copies from{" "}
                        {originalBook.totalCopies} to {bookDetails.totalCopies}
                      </p>
                    )} */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  How the updated book will appear
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg leading-tight">
                      {bookDetails.title || "Book Title"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by {bookDetails.author || "Author Name"}
                    </p>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Genre:</span>
                        <span>{bookDetails.genre || "N/A"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Copies:</span>
                        <span>{bookDetails.copies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Link to={`/books/${id}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            // disabled={isSubmitting || !hasChanges()}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
