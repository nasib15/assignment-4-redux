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
import { useCreateBookMutation } from "@/redux/api/book";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Hash,
  Save,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const CreateBook = () => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();
  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    isbn: z.string().min(1, { message: "ISBN is required" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),
    genre: z.enum(
      genres.map((genre) => genre.value),
      {
        message: "Genre is required",
      }
    ),
    copies: z
      .number()
      .min(1, { message: "Total copies should be greater than 0" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      description: "",
      genre: "FICTION",
      copies: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createBook(values)
      .unwrap()
      .then((response) => {
        if (response.success) {
          toast.success("Book created successfully", {
            action: {
              label: "Go to books",
              onClick: () => navigate("/books"),
            },
            position: "top-right",
          });
        } else {
          toast.error("Failed to create book");
        }
      })
      .catch(() => {
        toast.error("Failed to create book");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Floating Background Elements */}
        <div className="fixed top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-float"></div>
        <div
          className="fixed bottom-20 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="fixed top-1/2 left-1/4 w-16 h-16 bg-pink-400/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Header */}
        <div className="flex items-center gap-6 mb-12 animate-slide-up">
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
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30 animate-glow-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gradient">Add New Book</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Create a new entry in your digital library collection
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-8">
              {/* Main Information */}
              <div className="lg:col-span-2 space-y-8">
                <Card
                  className="card-modern animate-scale-in hover-lift"
                  style={{ animationDelay: "200ms" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      Basic Information
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter the essential details about the book
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold">
                                Book Title *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter the book title..."
                                  className="input-modern h-12 text-base"
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
                              <FormLabel className="text-sm font-semibold">
                                Author Name *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter author name..."
                                  className="input-modern h-12 text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="isbn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold flex items-center gap-2">
                              <Hash className="h-4 w-4" />
                              ISBN Number *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter ISBN number..."
                                className="input-modern h-12 text-base [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
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
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">
                              Book Description *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter a detailed description of the book..."
                                rows={4}
                                className="input-modern text-base resize-none"
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

                <Card
                  className="card-modern animate-scale-in hover-lift"
                  style={{ animationDelay: "400ms" }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      Additional Details
                    </CardTitle>
                    <CardDescription className="text-base">
                      Categorization and inventory information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="genre"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold">
                                Genre Category
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="input-modern h-12 text-base">
                                    <SelectValue placeholder="Select a genre..." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-border/50">
                                  {genres.map((genre) => (
                                    <SelectItem
                                      key={genre.id}
                                      value={genre.value}
                                      className="text-base"
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
                              <FormLabel className="text-sm font-semibold">
                                Total Copies *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  placeholder="Enter number of copies..."
                                  className="input-modern h-12 text-base [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
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
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-scale"
              style={{ animationDelay: "600ms" }}
            >
              <Link to="/books" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border/50 hover:border-primary/50 hover-lift transition-all duration-300"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="w-full sm:w-auto h-12 text-base button-primary hover-lift min-w-[160px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-b-transparent mr-2"></div>
                    Creating Book...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Create Book
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

export default CreateBook;
