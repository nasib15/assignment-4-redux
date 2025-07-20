import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { mockBooks } from "@/data/mock-data";
import type { Book, BorrowForm } from "@/types/book-types";
import { ArrowLeft, BookOpen, Calendar, Mail, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate default dates
  const today = new Date();
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(today.getDate() + 14);

  const [formData, setFormData] = useState<BorrowForm>({
    borrowerName: "",
    borrowerEmail: "",
    borrowerPhone: "",
    borrowDate: today.toISOString().split("T")[0],
    dueDate: twoWeeksLater.toISOString().split("T")[0],
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<BorrowForm>>({});

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        const foundBook = mockBooks.find((b) => b.id === bookId);
        setBook(foundBook || null);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    } else {
      setIsLoading(false);
    }
  }, [bookId]);

  const handleInputChange = (field: keyof BorrowForm, value: string) => {
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

    // Auto-calculate due date when borrow date changes
    if (field === "borrowDate" && value) {
      const borrowDate = new Date(value);
      const dueDate = new Date(borrowDate);
      dueDate.setDate(borrowDate.getDate() + 14);
      setFormData((prev) => ({
        ...prev,
        dueDate: dueDate.toISOString().split("T")[0],
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BorrowForm> = {};

    if (!formData.borrowerName.trim()) {
      newErrors.borrowerName = "Borrower name is required";
    }

    if (!formData.borrowerEmail.trim()) {
      newErrors.borrowerEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.borrowerEmail)) {
      newErrors.borrowerEmail = "Please enter a valid email address";
    }

    if (!formData.borrowerPhone.trim()) {
      newErrors.borrowerPhone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.borrowerPhone)) {
      newErrors.borrowerPhone = "Please enter a valid phone number";
    }

    if (!formData.borrowDate) {
      newErrors.borrowDate = "Borrow date is required";
    } else {
      const borrowDate = new Date(formData.borrowDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (borrowDate < today) {
        newErrors.borrowDate = "Borrow date cannot be in the past";
      }
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else if (formData.borrowDate) {
      const borrowDate = new Date(formData.borrowDate);
      const dueDate = new Date(formData.dueDate);

      if (dueDate <= borrowDate) {
        newErrors.dueDate = "Due date must be after borrow date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !book) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Creating borrow record:", {
        bookId: book.id,
        bookTitle: book.title,
        ...formData,
      });

      alert(
        `Book "${book.title}" has been borrowed successfully!\n\nBorrower: ${
          formData.borrowerName
        }\nDue Date: ${new Date(formData.dueDate).toLocaleDateString()}`
      );

      // Navigate to borrow summary or back to books
      navigate("/borrow-summary");
    } catch (error) {
      console.error("Error creating borrow record:", error);
      alert("Error processing borrow request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateBorrowDuration = () => {
    if (!formData.borrowDate || !formData.dueDate) return 0;

    const borrow = new Date(formData.borrowDate);
    const due = new Date(formData.dueDate);
    const diffTime = Math.abs(due.getTime() - borrow.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-muted rounded"></div>
            </div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Book Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The book you're trying to borrow doesn't exist or has been removed.
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

  if (book.availableCopies === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Book Unavailable</h2>
          <p className="text-muted-foreground mb-6">
            All copies of "{book.title}" are currently borrowed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/books">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Button>
            </Link>
            <Link to={`/books/${book.id}`}>
              <Button>View Book Details</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to={`/books/${book.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Book
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Borrow Book</h1>
          <p className="text-muted-foreground mt-2">
            Complete the form to borrow "{book.title}"
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Borrower Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Borrower Information
                </CardTitle>
                <CardDescription>
                  Enter the details of the person borrowing this book
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="borrowerName">Full Name *</Label>
                  <Input
                    id="borrowerName"
                    placeholder="Enter borrower's full name"
                    value={formData.borrowerName}
                    onChange={(e) =>
                      handleInputChange("borrowerName", e.target.value)
                    }
                    className={errors.borrowerName ? "border-red-500" : ""}
                  />
                  {errors.borrowerName && (
                    <p className="text-sm text-red-500">
                      {errors.borrowerName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="borrowerEmail">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="borrowerEmail"
                        type="email"
                        placeholder="borrower@example.com"
                        value={formData.borrowerEmail}
                        onChange={(e) =>
                          handleInputChange("borrowerEmail", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.borrowerEmail ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.borrowerEmail && (
                      <p className="text-sm text-red-500">
                        {errors.borrowerEmail}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="borrowerPhone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="borrowerPhone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.borrowerPhone}
                        onChange={(e) =>
                          handleInputChange("borrowerPhone", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.borrowerPhone ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.borrowerPhone && (
                      <p className="text-sm text-red-500">
                        {errors.borrowerPhone}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Borrow Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Borrow Details
                </CardTitle>
                <CardDescription>
                  Set the borrow and return dates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="borrowDate">Borrow Date *</Label>
                    <Input
                      id="borrowDate"
                      type="date"
                      value={formData.borrowDate}
                      onChange={(e) =>
                        handleInputChange("borrowDate", e.target.value)
                      }
                      min={today.toISOString().split("T")[0]}
                      className={errors.borrowDate ? "border-red-500" : ""}
                    />
                    {errors.borrowDate && (
                      <p className="text-sm text-red-500">
                        {errors.borrowDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        handleInputChange("dueDate", e.target.value)
                      }
                      min={
                        formData.borrowDate || today.toISOString().split("T")[0]
                      }
                      className={errors.dueDate ? "border-red-500" : ""}
                    />
                    {errors.dueDate && (
                      <p className="text-sm text-red-500">{errors.dueDate}</p>
                    )}
                  </div>
                </div>

                {formData.borrowDate && formData.dueDate && (
                  <div className="p-3 bg-muted/50 rounded-md">
                    <p className="text-sm">
                      <strong>Borrow Duration:</strong>{" "}
                      {calculateBorrowDuration()} days
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Standard library policy allows 14-day borrowing periods
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional notes or special requests..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Include any special instructions or requests
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book Summary</CardTitle>
                <CardDescription>
                  Details of the book being borrowed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by {book.author}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Genre:</span>
                      <Badge variant="secondary">{book.genre}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Published:</span>
                      <span>{book.publishedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="text-green-600 font-medium">
                        {book.availableCopies}/{book.totalCopies}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ISBN:</span>
                      <code className="text-xs bg-muted px-1 rounded">
                        {book.isbn}
                      </code>
                    </div>
                  </div>

                  {formData.borrowDate && formData.dueDate && (
                    <>
                      <Separator />
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Borrow Date:
                          </span>
                          <span>
                            {new Date(formData.borrowDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Due Date:
                          </span>
                          <span>
                            {new Date(formData.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <span>{calculateBorrowDuration()} days</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Link to={`/books/${book.id}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4 mr-2" />
                Confirm Borrow
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BorrowBook;
