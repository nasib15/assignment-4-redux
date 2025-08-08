import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useGetSingleBookDeatilsQuery } from "@/redux/api/book";
import { useCreateBorrowMutation } from "@/redux/api/borrow";
import type { IBook } from "@/types/book-types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CalendarIcon,
  CheckCircle2,
  Clock,
  Hash,
  Layers,
  Sparkles,
  User,
} from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-muted/50 rounded-xl w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-muted/50 rounded-2xl"></div>
              </div>
              <div className="h-96 bg-muted/50 rounded-2xl"></div>
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
              The book you're trying to borrow doesn't exist or has been removed
              from our collection.
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

  if (bookDetails.copies === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20 animate-scale-in">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-3xl inline-block">
                <AlertCircle className="h-20 w-20 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Book Unavailable
            </h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
              All copies of "{bookDetails.title}" are currently borrowed. Please
              check back later.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/books">
                <Button variant="outline" className="hover-lift">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Books
                </Button>
              </Link>
              <Link to={`/books/${bookDetails._id}`}>
                <Button className="button-primary">View Book Details</Button>
              </Link>
            </div>
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
        <div className="flex items-center gap-6 mb-12 animate-slide-up">
          <Link to={`/books/${bookDetails._id}`}>
            <Button
              variant="outline"
              size="sm"
              className="hover-lift bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Book
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-xl opacity-30 animate-glow-pulse"></div>
              <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gradient">Borrow Book</h1>
              <p className="text-xl text-muted-foreground mt-1">
                Complete the form to borrow "{bookDetails.title}"
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Success Indicator */}
                <Card
                  className="card-modern hover-lift animate-scale-in border-green-200 dark:border-green-800/30"
                  style={{ animationDelay: "200ms" }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-700 dark:text-green-400 text-lg">
                          Book Available for Borrowing
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-500">
                          {bookDetails.copies} copies available in the library
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Borrow Details */}
                <Card
                  className="card-modern hover-lift animate-scale-in"
                  style={{ animationDelay: "400ms" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      Borrow Details
                    </CardTitle>
                    <CardDescription className="text-base">
                      Set the due date and quantity to borrow
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="dueDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold">
                                Due Date *
                              </FormLabel>
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-start text-left font-normal input-modern h-12 text-base"
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
                                  className="w-auto p-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-border/50"
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

                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold">
                                Quantity *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  max={bookDetails.copies}
                                  placeholder="Enter quantity..."
                                  className="input-modern h-12 text-base [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                              <p className="text-xs text-muted-foreground">
                                Maximum {bookDetails.copies} copies available
                              </p>
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
                <Card
                  className="card-modern hover-lift animate-slide-in-right sticky top-4"
                  style={{ animationDelay: "600ms" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      Book Summary
                    </CardTitle>
                    <CardDescription>
                      Details of the book being borrowed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                        <h3 className="font-bold text-xl leading-tight text-gradient mb-2">
                          {bookDetails.title}
                        </h3>
                        <p className="text-base text-muted-foreground flex items-center justify-center gap-2">
                          <User className="h-4 w-4" />
                          by {bookDetails.author}
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Layers className="h-4 w-4" />
                            Genre
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-purple-300 border-0"
                          >
                            {bookDetails.genre}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <span className="text-sm font-medium text-muted-foreground">
                            Available Copies
                          </span>
                          <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                            {bookDetails.copies}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            ISBN
                          </span>
                          <code className="text-xs bg-white/80 dark:bg-slate-700/80 px-2 py-1 rounded border font-mono">
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
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-scale"
              style={{ animationDelay: "800ms" }}
            >
              <Link
                to={`/books/${bookDetails._id}`}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full h-12 text-base bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border/50 hover:border-primary/50 hover-lift transition-all duration-300"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="w-full sm:w-auto h-12 text-base button-primary hover-lift min-w-[180px]"
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-b-transparent mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <BookOpen className="h-5 w-5 mr-2" />
                    Confirm Borrow
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BorrowBook;
