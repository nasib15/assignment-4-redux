import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { genres } from "@/data/data";
import {
  useGetSingleBookDeatilsQuery,
  useUpdateBookMutation,
} from "@/redux/api/book";
import type { IBook } from "@/types/book-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, BookOpen, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleBookDeatilsQuery(id);
  const bookDetails: IBook = data?.data;

  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    isbn: z.string().min(1, { message: "ISBN is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    genre: z.string().min(1, { message: "Genre is required" }),
    copies: z.number().min(1, { message: "Total copies is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      description: "",
      genre: "",
      copies: 0,
    },
  });

  useEffect(() => {
    if (bookDetails) {
      form.reset({
        title: bookDetails.title || "",
        author: bookDetails.author || "",
        isbn: bookDetails.isbn || "",
        description: bookDetails.description || "",
        genre: bookDetails?.genre || "",
        copies: bookDetails?.copies || 0,
      });
    }
  }, [bookDetails, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateBook({ id: id as string, ...values })
      .unwrap()
      .then((response) => {
        if (response.success) {
          toast.success("Book updated successfully", {
            action: {
              label: "Go to book details",
              onClick: () => navigate(`/books/${id}`),
            },
            position: "top-right",
          });
        } else {
          toast.error("Failed to update book");
        }
      })
      .catch(() => {
        toast.error("Failed to update book");
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Enter the basic details about the book
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter title name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter author name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ISBN *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter isbn number"
                                {...field}
                                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4"></div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              placeholder="Enter book description..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
                      <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={bookDetails?.genre || ""}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a genre" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {genres.map((genre) => (
                                  <SelectItem
                                    key={genre.id}
                                    value={genre?.value || ""}
                                  >
                                    {genre.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="copies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Copies *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                placeholder="Enter total copies"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
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
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link to="/books">
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Update Book
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditBook;
