// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Swords } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router"
// import MaintenanceAlert from "@/components/maintenance-alert"

export default function DashboardIndex() {
  return (
    <div className="container mx-auto p-8">
      {/* <MaintenanceAlert /> */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <section className="w-full py-6 md:py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tournaments</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
            <CardFooter>
              <Link to="/apps/tournament" className="text-xs text-blue-500 hover:underline">
                View all tournaments
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Event</CardTitle>
              <Swords className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
            <CardFooter>
              <Link to="/apps/matches" className="text-xs text-blue-500 hover:underline">
                View all matches
              </Link>
            </CardFooter>
          </Card>
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$125,000</div>
              <p className="text-xs text-muted-foreground">+$15,000 from last month</p>
            </CardContent>
            <CardFooter>
              <Link to="/apps/finance" className="text-xs text-blue-500 hover:underline">
                View financial details
              </Link>
            </CardFooter>
          </Card> */}
        </div>
      </section>

      {/* <section className="w-full py-6 md:py-10 bg-muted">
        <div className="flex flex-col items-start space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Today's Matches</h2>
            <p className="text-muted-foreground">Live and upcoming 1vs1 technician matches for today.</p>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Network Configuration</CardTitle>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Live
                  </Badge>
                </div>
                <CardDescription>Match #1024 • Round 2</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Vivian" alt="Image" />
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">Ahmad Rizki</p>
                    <p className="text-xs text-muted-foreground">Network Engineer</p>
                  </div>
                  <div className="text-center text-xl font-bold">VS</div>
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                    <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Nolan" alt="Image" />
                      <AvatarFallback>BS</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">Budi Santoso</p>
                    <p className="text-xs text-muted-foreground">System Administrator</p>
                  </div>
                </div>
                <div className="text-center text-sm">
                  <p>Started 15 minutes ago</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Watch Live
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Server Maintenance</CardTitle>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    Upcoming
                  </Badge>
                </div>
                <CardDescription>Match #1025 • Round 1</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                    <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Budi" alt="Image" />
                      <AvatarFallback>CD</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">Citra Dewi</p>
                    <p className="text-xs text-muted-foreground">Database Administrator</p>
                  </div>
                  <div className="text-center text-xl font-bold">VS</div>
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                    <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Mackenzie" alt="Image" />
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">Denny Pratama</p>
                    <p className="text-xs text-muted-foreground">Security Specialist</p>
                  </div>
                </div>
                <div className="text-center text-sm">
                  <p>Starting in 2 hours</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Set Reminder
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Cloud Architecture</CardTitle>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    Upcoming
                  </Badge>
                </div>
                <CardDescription>Match #1026 • Round 1</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                    <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Aidan" alt="Image" />
                      <AvatarFallback>EP</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">Eka Putri</p>
                    <p className="text-xs text-muted-foreground">Cloud Engineer</p>
                  </div>
                  <div className="text-center text-xl font-bold">VS</div>
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                    <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Andrea" alt="Image" />
                      <AvatarFallback>FN</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">Fajar Nugroho</p>
                    <p className="text-xs text-muted-foreground">Hardware Specialist</p>
                  </div>
                </div>
                <div className="text-center text-sm">
                  <p>Starting in 4 hours</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Set Reminder
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-6 md:py-10">
        <div className="flex flex-col items-start space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Financial Overview</h2>
            <p className="text-muted-foreground">Current financial status and recent transactions.</p>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Donation Allocation</CardTitle>
                <CardDescription>How funds are being utilized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Prize Money (60%)</span>
                      <span className="font-medium">$75,000</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                      <div className="h-full rounded-full bg-primary" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Event Operations (25%)</span>
                      <span className="font-medium">$31,250</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                      <div className="h-full rounded-full bg-primary" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Technology (10%)</span>
                      <span className="font-medium">$12,500</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                      <div className="h-full rounded-full bg-primary" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Administrative (5%)</span>
                      <span className="font-medium">$6,250</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                      <div className="h-full rounded-full bg-primary" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/apps/finance">
                  <Button variant="outline" className="w-full">
                    View Detailed Reports
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Donation",
                      from: "PT Telkom Indonesia",
                      amount: "$5,000",
                      date: "Today",
                      isCredit: true,
                    },
                    {
                      type: "Prize Payment",
                      to: "Ahmad Rizki",
                      amount: "$2,000",
                      date: "Yesterday",
                      isCredit: false,
                    },
                    {
                      type: "Venue Rental",
                      to: "Jakarta Convention Center",
                      amount: "$3,500",
                      date: "3 days ago",
                      isCredit: false,
                    },
                    {
                      type: "Donation",
                      from: "Tokopedia",
                      amount: "$3,500",
                      date: "4 days ago",
                      isCredit: true,
                    },
                  ].map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.from ? `From: ${transaction.from}` : `To: ${transaction.to}`}
                        </p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className={transaction.isCredit ? "text-green-600" : "text-red-600"}>
                        {transaction.isCredit ? "+" : "-"}
                        {transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/apps/finance/transactions">
                  <Button variant="outline" className="w-full">
                    View All Transactions
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section> */}
    </div>
  )
}

