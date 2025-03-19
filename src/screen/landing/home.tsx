import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import { Trophy, Users, DollarSign, BarChart2, ChevronRight, CheckCircle2, Swords } from "lucide-react"
import { Link } from "react-router"

export default function LandingHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Fitur Canggih</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Semua yang Anda butuhkan untuk mengelola kompetisi teknisi dengan transparansi penuh!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Swords className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">1vs1 Matches</h3>
                <p className="text-center text-muted-foreground">
                  Organize head-to-head technical competitions with detailed match tracking
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Tournament Management</h3>
                <p className="text-center text-muted-foreground">
                  Create and manage tournaments with automatic bracket generation
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Technician Profiles</h3>
                <p className="text-center text-muted-foreground">
                  Comprehensive profiles for all participating technicians
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Financial Transparency</h3>
                <p className="text-center text-muted-foreground">
                  Track all donations and expenses with detailed financial reporting
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Advanced Analytics</h3>
                <p className="text-center text-muted-foreground">
                  Gain insights with comprehensive reports and analytics
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Public Accountability</h3>
                <p className="text-center text-muted-foreground">
                  Public financial reports ensure complete transparency
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tournaments Section */}
        <section id="tournaments" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Tournaments</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our exciting 1vs1 technician competitions
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Network Masters Cup",
                  date: "March 15-30, 2025",
                  location: "Jakarta",
                  participants: 32,
                  prize: "$5,000",
                },
                {
                  title: "Server Administration Championship",
                  date: "April 10-25, 2025",
                  location: "Surabaya",
                  participants: 16,
                  prize: "$3,000",
                },
                {
                  title: "Database Wizards Tournament",
                  date: "May 5-20, 2025",
                  location: "Bandung",
                  participants: 24,
                  prize: "$4,000",
                },
              ].map((tournament, index) => (
                <div key={index} className="flex flex-col overflow-hidden rounded-lg border bg-background">
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{tournament.title}</h3>
                    <div className="mt-2 flex flex-col space-y-1 text-sm text-muted-foreground">
                      <p>📅 {tournament.date}</p>
                      <p>📍 {tournament.location}</p>
                      <p>👥 {tournament.participants} participants</p>
                      <p>🏆 Prize pool: {tournament.prize}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link to="/apps/tournaments">
                        <Button variant="outline" size="sm">
                          Learn More <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link to="/apps/tournaments">
                <Button size="lg">View All Tournaments</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Transparency Section */}
        <section id="transparency" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Financial Transparency</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We believe in complete transparency in how funds are managed
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <div className="flex flex-col space-y-4">
                <h3 className="text-2xl font-bold">How Donations Are Used</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="mr-2 rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Prize Money (60%)</p>
                      <p className="text-sm text-muted-foreground">Directly awarded to tournament winners</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Event Operations (25%)</p>
                      <p className="text-sm text-muted-foreground">Venue, equipment, and staff costs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Technology (10%)</p>
                      <p className="text-sm text-muted-foreground">Platform development and maintenance</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Administrative (5%)</p>
                      <p className="text-sm text-muted-foreground">Legal, accounting, and other administrative costs</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Link to="/apps/finance/public">
                    <Button>View Financial Reports</Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg border bg-muted p-6">
                <h3 className="mb-4 text-xl font-bold">Financial Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Total Donations (2025)</span>
                      <span className="font-medium">$125,000</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                      <div className="h-full w-full rounded-full bg-primary" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Prize Money Distributed</span>
                      <span className="font-medium">$75,000</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                      <div className="h-full rounded-full bg-primary" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Event Operations</span>
                      <span className="font-medium">$31,250</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                      <div className="h-full rounded-full bg-primary" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Technology</span>
                      <span className="font-medium">$12,500</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                      <div className="h-full rounded-full bg-primary" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Administrative</span>
                      <span className="font-medium">$6,250</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                      <div className="h-full rounded-full bg-primary" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions about our tournaments or want to become a sponsor?
                </p>
              </div>
              <div className="mx-auto w-full max-w-md space-y-4">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t p-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 TechComp ERP. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link to="/apps/finance/public" className="text-sm text-muted-foreground hover:underline">
              Financial Reports
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

