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
import { genres, languages, mockBooks } from "@/data/mock-data";
import type { Book, BookForm } from "@/types/book-types";
import { ArrowLeft, BookOpen, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalBook, setOriginalBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<BookForm>({
    title: "",
    author: "",
    isbn: "",
    publishedYear: new Date().getFullYear(),
    genre: "",
    description: "",
    totalCopies: 1,
    publisher: "",
    language: "English",
    pages: 0,
  });

  const [errors, setErrors] = useState<Partial<BookForm>>({});

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        const foundBook = mockBooks.find((b) => b.id === id);
        if (foundBook) {
          setOriginalBook(foundBook);
          setFormData({
            title: foundBook.title,
            author: foundBook.author,
            isbn: foundBook.isbn,
            publishedYear: foundBook.publishedYear,
            genre: foundBook.genre,
            description: foundBook.description,
            totalCopies: foundBook.totalCopies,
            publisher: foundBook.publisher,
            language: foundBook.language,
            pages: foundBook.pages,
          });
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBook();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleInputChange = (field: keyof BookForm, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookForm> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!formData.isbn.trim()) {
      newErrors.isbn = "ISBN is required";
    } else if (!/^[\d-]+$/.test(formData.isbn)) {
      newErrors.isbn = "ISBN should contain only numbers and hyphens";
    }

    if (!formData.genre) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.publisher.trim()) {
      newErrors.publisher = "Publisher is required";
    }

    if (
      formData.publishedYear < 1000 ||
      formData.publishedYear > new Date().getFullYear()
    ) {
      newErrors.publishedYear = "Please enter a valid year";
    }

    if (formData.totalCopies < 1) {
      newErrors.totalCopies = "Total copies must be at least 1";
    }

    if (formData.pages < 1) {
      newErrors.pages = "Pages must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updating book:", { id, ...formData });
      alert("Book updated successfully!");

      // Navigate back to book details
      navigate(`/books/${id}`);
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasChanges = () => {
    if (!originalBook) return false;

    return (
      formData.title !== originalBook.title ||
      formData.author !== originalBook.author ||
      formData.isbn !== originalBook.isbn ||
      formData.publishedYear !== originalBook.publishedYear ||
      formData.genre !== originalBook.genre ||
      formData.description !== originalBook.description ||
      formData.totalCopies !== originalBook.totalCopies ||
      formData.publisher !== originalBook.publisher ||
      formData.language !== originalBook.language ||
      formData.pages !== originalBook.pages
    );
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

  if (!originalBook) {
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
            Update the information for "{originalBook.title}"
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
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      placeholder="Enter author name"
                      value={formData.author}
                      onChange={(e) =>
                        handleInputChange("author", e.target.value)
                      }
                      className={errors.author ? "border-red-500" : ""}
                    />
                    {errors.author && (
                      <p className="text-sm text-red-500">{errors.author}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN *</Label>
                    <Input
                      id="isbn"
                      placeholder="978-0-123456-78-9"
                      value={formData.isbn}
                      onChange={(e) =>
                        handleInputChange("isbn", e.target.value)
                      }
                      className={errors.isbn ? "border-red-500" : ""}
                    />
                    {errors.isbn && (
                      <p className="text-sm text-red-500">{errors.isbn}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher *</Label>
                    <Input
                      id="publisher"
                      placeholder="Enter publisher name"
                      value={formData.publisher}
                      onChange={(e) =>
                        handleInputChange("publisher", e.target.value)
                      }
                      className={errors.publisher ? "border-red-500" : ""}
                    />
                    {errors.publisher && (
                      <p className="text-sm text-red-500">{errors.publisher}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter book description..."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
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
                    <Select
                      value={formData.genre}
                      onValueChange={(value) =>
                        handleInputChange("genre", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.genre ? "border-red-500" : ""}
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
                    {errors.genre && (
                      <p className="text-sm text-red-500">{errors.genre}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) =>
                        handleInputChange("language", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="publishedYear">Published Year *</Label>
                    <Input
                      id="publishedYear"
                      type="number"
                      min="1000"
                      max={new Date().getFullYear()}
                      value={formData.publishedYear}
                      onChange={(e) =>
                        handleInputChange(
                          "publishedYear",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className={errors.publishedYear ? "border-red-500" : ""}
                    />
                    {errors.publishedYear && (
                      <p className="text-sm text-red-500">
                        {errors.publishedYear}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pages">Pages *</Label>
                    <Input
                      id="pages"
                      type="number"
                      min="1"
                      value={formData.pages || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "pages",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className={errors.pages ? "border-red-500" : ""}
                    />
                    {errors.pages && (
                      <p className="text-sm text-red-500">{errors.pages}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totalCopies">Total Copies *</Label>
                    <Input
                      id="totalCopies"
                      type="number"
                      min="1"
                      value={formData.totalCopies}
                      onChange={(e) =>
                        handleInputChange(
                          "totalCopies",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className={errors.totalCopies ? "border-red-500" : ""}
                    />
                    {errors.totalCopies && (
                      <p className="text-sm text-red-500">
                        {errors.totalCopies}
                      </p>
                    )}
                    {formData.totalCopies < originalBook.totalCopies && (
                      <p className="text-sm text-amber-600">
                        Warning: Reducing total copies from{" "}
                        {originalBook.totalCopies} to {formData.totalCopies}
                      </p>
                    )}
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
                  <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
                    {originalBook.coverImage ? (
                      <img
                        src={originalBook.coverImage}
                        alt={formData.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg leading-tight">
                      {formData.title || "Book Title"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by {formData.author || "Author Name"}
                    </p>

                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Genre:</span>
                        <span>{formData.genre || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year:</span>
                        <span>{formData.publishedYear || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pages:</span>
                        <span>{formData.pages || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Copies:</span>
                        <span>{formData.totalCopies}</span>
                      </div>
                    </div>

                    {hasChanges() && (
                      <div className="mt-4 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                          You have unsaved changes
                        </p>
                      </div>
                    )}
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
            disabled={isSubmitting || !hasChanges()}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {hasChanges() ? "Save Changes" : "No Changes"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
