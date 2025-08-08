import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  BookOpen,
  Clock,
  Eye,
  Library,
  Plus,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-3xl shadow-2xl animate-scale-in">
                  <Library className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6 mb-12">
              <h1 className="text-5xl lg:text-7xl font-bold text-gradient animate-slide-up">
                Library Management
              </h1>
              <h2
                className="text-3xl lg:text-4xl font-semibold text-muted-foreground animate-slide-up"
                style={{ animationDelay: "200ms" }}
              >
                Reimagined for the Modern Era
              </h2>
              <p
                className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-up"
                style={{ animationDelay: "400ms" }}
              >
                Experience the future of library management with our
                cutting-edge platform. Streamline operations, enhance user
                experience, and unlock powerful insights with intelligent
                automation and beautiful design.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-slide-up"
              style={{ animationDelay: "600ms" }}
            >
              <Link to="/books">
                <Button className="button-primary text-lg px-8 py-4 shadow-xl">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Collection
                </Button>
              </Link>
              <Link to="/create-book">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border-2"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Book
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                { label: "Books Managed", value: "10,000+", icon: BookOpen },
                { label: "Active Users", value: "2,500+", icon: Users },
                { label: "Transactions", value: "50,000+", icon: TrendingUp },
                { label: "Uptime", value: "99.9%", icon: Shield },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="card-modern text-center animate-scale-in"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600 dark:text-purple-400" />
                  <div className="text-2xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Quick Actions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with the most common library management tasks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Browse Books",
                description:
                  "Explore our comprehensive book collection with advanced search and filtering",
                icon: Eye,
                href: "/books",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "Add New Book",
                description:
                  "Easily add new books to the library with detailed information and metadata",
                icon: Plus,
                href: "/create-book",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "View Analytics",
                description:
                  "Access comprehensive reports and insights about library usage patterns",
                icon: BarChart3,
                href: "/borrow-summary",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                title: "Manage System",
                description:
                  "Configure settings, manage users, and customize your library experience",
                icon: Library,
                href: "/",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((action, index) => (
              <Link key={action.title} to={action.href}>
                <Card
                  className="card-modern group cursor-pointer h-full animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="text-center">
                    <div className="relative mx-auto mb-4">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${action.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                      ></div>
                      <div
                        className={`relative bg-gradient-to-r ${action.gradient} p-4 rounded-2xl`}
                      >
                        <action.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-gradient transition-all duration-300">
                      {action.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
                      {action.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-2 rounded-full">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-purple-400">
                  System Features
                </span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools and features designed to make library
              management effortless and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Book Catalog",
                description:
                  "Intelligent categorization with ISBN lookup, genre classification, and availability tracking",
                icon: BookOpen,
                features: [
                  "ISBN Integration",
                  "Auto-categorization",
                  "Real-time Availability",
                ],
              },
              {
                title: "User Management",
                description:
                  "Comprehensive borrower profiles with history tracking and automated notifications",
                icon: Users,
                features: [
                  "Borrower Profiles",
                  "History Tracking",
                  "Smart Notifications",
                ],
              },
              {
                title: "Advanced Analytics",
                description:
                  "Powerful insights into library usage patterns and operational metrics",
                icon: BarChart3,
                features: [
                  "Usage Analytics",
                  "Trend Analysis",
                  "Custom Reports",
                ],
              },
              {
                title: "Real-time Updates",
                description:
                  "Instant synchronization across all devices with live status updates",
                icon: Clock,
                features: ["Live Sync", "Instant Updates", "Cross-platform"],
              },
              {
                title: "Secure & Reliable",
                description:
                  "Enterprise-grade security with automated backups and data protection",
                icon: Shield,
                features: ["Data Encryption", "Auto Backups", "Access Control"],
              },
              {
                title: "Modern Interface",
                description:
                  "Beautiful, intuitive design optimized for desktop, tablet, and mobile devices",
                icon: Sparkles,
                features: ["Responsive Design", "Dark Mode", "Accessibility"],
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="card-modern animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.features.map((item) => (
                      <div
                        key={item}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Library?
            </h2>
            <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
              Join thousands of libraries worldwide that have revolutionized
              their operations with our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/books">
                <Button className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-4 shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Start Exploring
                </Button>
              </Link>
              <Link to="/create-book">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Book
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
