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
import { Separator } from "@/components/ui/separator";
import { useGetSingleBookDeatilsQuery } from "@/redux/api/book";
import type { IBook } from "@/types/book-types";
// import { mockBooks } from "@/data/data";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateBorrowMutation } from "@/redux/api/borrow";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookOpen, CalendarIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const BorrowBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading } = useGetSingleBookDeatilsQuery(id as string);
  const bookDetails: IBook = book?.data;

  const [createBorrow, { isLoading: isCreating }] = useCreateBorrowMutation();

  const [open, setOpen] = React.useState(false);

  function formatDate(date: Date | undefined) {
    if (!date) {
      return "";
    }
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const formSchema = z.object({
    dueDate: z.date(),
    quantity: z.number().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dueDate: new Date(),
      quantity: 1,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createBorrow({
      book: id as string,
      dueDate: data.dueDate.toISOString(),
      quantity: data.quantity,
    })
      .unwrap()
      .then((response) => {
        if (response.success) {
          toast.success("Borrowed book successfully", {
            action: {
              label: "Go to books",
              onClick: () => navigate(`/books/${id}`),
            },
            position: "top-right",
          });
        } else {
          toast.error("Failed to borrow book");
        }
      })
      .catch(() => {
        toast.error("Failed to borrow book");
      });
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

  if (!bookDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <BookOpen className="h-16 w-1j6 text-muted-foreground mx-auto mb-4" />
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

  if (bookDetails.copies === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Book Unavailable</h2>
          <p className="text-muted-foreground mb-6">
            All copies of "{bookDetails.title}" are currently borrowed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/books">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Button>
            </Link>
            <Link to={`/books/${bookDetails._id}`}>
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
        <Link to={`/books/${bookDetails._id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Book
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Borrow Book</h1>
          <p className="text-muted-foreground mt-2">
            Complete the form to borrow "{bookDetails.title}"
          </p>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            {/* Main Form */}
            <div className=" space-y-6">
              {/* Borrow Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Borrow Details
                  </CardTitle>
                  <CardDescription>
                    Set the due date and quantity to borrow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                      <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Due Date *</FormLabel>
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      formatDate(field.value)
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => {
                                    field.onChange(date);
                                    setOpen(false);
                                  }}
                                  disabled={(date) =>
                                    date <
                                    new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                max={bookDetails.copies}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight">
                        {bookDetails.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by {bookDetails.author}
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Genre:</span>
                        <Badge variant="secondary">{bookDetails.genre}</Badge>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Copies:</span>
                        <span className="text-green-600 font-medium">
                          {bookDetails.copies}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ISBN:</span>
                        <code className="text-xs bg-muted px-1 rounded">
                          {bookDetails.isbn}
                        </code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link to={`/books/${bookDetails._id}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4" />
                  Confirm Borrow
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BorrowBook;
