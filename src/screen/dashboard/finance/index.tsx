import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Search, Filter, Download, Calendar, ArrowUp, FileText, PieChart, BarChart2 } from "lucide-react"
import { Link } from "react-router"

export default function FinancePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Reports
            </Button>
            <Link to="/apps/finance/public">
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Public Reports
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$125,000</div>
              <p className="text-xs text-muted-foreground">+$15,000 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$85,000</div>
              <p className="text-xs text-muted-foreground">+$10,000 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$40,000</div>
              <p className="text-xs text-muted-foreground">+$5,000 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sponsors</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ledger" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="ledger">General Ledger</TabsTrigger>
            <TabsTrigger value="expenses">Expense Tracking</TabsTrigger>
            <TabsTrigger value="donations">Donation Tracking</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="ledger" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>General Ledger</CardTitle>
                    <CardDescription>Complete financial transaction records</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search transactions..." className="w-[250px] pl-8" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" /> Date Range
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Debit</TableHead>
                      <TableHead>Credit</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        date: "2025-03-15",
                        id: "TRX-1001",
                        description: "Donation from PT Telkom Indonesia",
                        category: "Donation",
                        debit: "$5,000",
                        credit: "",
                        balance: "$40,000",
                      },
                      {
                        date: "2025-03-14",
                        id: "TRX-1000",
                        description: "Prize payment to Ahmad Rizki",
                        category: "Prize Money",
                        debit: "",
                        credit: "$2,000",
                        balance: "$35,000",
                      },
                      {
                        date: "2025-03-12",
                        id: "TRX-999",
                        description: "Venue rental for Network Masters Cup",
                        category: "Event Operations",
                        debit: "",
                        credit: "$3,500",
                        balance: "$37,000",
                      },
                      {
                        date: "2025-03-11",
                        id: "TRX-998",
                        description: "Donation from Tokopedia",
                        category: "Donation",
                        debit: "$3,500",
                        credit: "",
                        balance: "$40,500",
                      },
                      {
                        date: "2025-03-10",
                        id: "TRX-997",
                        description: "Equipment purchase for Server Championship",
                        category: "Event Operations",
                        debit: "",
                        credit: "$1,200",
                        balance: "$37,000",
                      },
                      {
                        date: "2025-03-08",
                        id: "TRX-996",
                        description: "Platform maintenance and hosting",
                        category: "Technology",
                        debit: "",
                        credit: "$800",
                        balance: "$38,200",
                      },
                      {
                        date: "2025-03-05",
                        id: "TRX-995",
                        description: "Donation from Bank Mandiri",
                        category: "Donation",
                        debit: "$2,000",
                        credit: "",
                        balance: "$39,000",
                      },
                      {
                        date: "2025-03-03",
                        id: "TRX-994",
                        description: "Legal services for tournament rules",
                        category: "Administrative",
                        debit: "",
                        credit: "$500",
                        balance: "$37,000",
                      },
                    ].map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              transaction.category === "Donation"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : transaction.category === "Prize Money"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : transaction.category === "Event Operations"
                                    ? "bg-orange-100 text-orange-800 border-orange-200"
                                    : transaction.category === "Technology"
                                      ? "bg-purple-100 text-purple-800 border-purple-200"
                                      : "bg-gray-100 text-gray-800 border-gray-200"
                            }
                          >
                            {transaction.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-green-600">{transaction.debit}</TableCell>
                        <TableCell className="text-red-600">{transaction.credit}</TableCell>
                        <TableCell className="font-medium">{transaction.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">Showing 8 of 120 transactions</div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Expense Tracking</CardTitle>
                    <CardDescription>Detailed breakdown of all expenses</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <PieChart className="mr-2 h-4 w-4" /> View Charts
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Expense Categories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          category: "Prize Money",
                          amount: "$75,000",
                          percentage: "60%",
                          color: "bg-blue-600",
                        },
                        {
                          category: "Event Operations",
                          amount: "$31,250",
                          percentage: "25%",
                          color: "bg-orange-500",
                        },
                        {
                          category: "Technology",
                          amount: "$12,500",
                          percentage: "10%",
                          color: "bg-purple-600",
                        },
                        {
                          category: "Administrative",
                          amount: "$6,250",
                          percentage: "5%",
                          color: "bg-gray-500",
                        },
                      ].map((category, index) => (
                        <Card key={index} className="border-0 shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{category.category}</span>
                              <span className="text-sm text-muted-foreground">{category.percentage}</span>
                            </div>
                            <div className="text-xl font-bold mb-2">{category.amount}</div>
                            <div className="h-2 w-full rounded-full bg-muted-foreground/20">
                              <div
                                className={`h-full rounded-full ${category.color}`}
                                style={{ width: category.percentage }}
                              ></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Recent Expenses</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Approved By</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            date: "2025-03-14",
                            description: "Prize payment to Ahmad Rizki",
                            category: "Prize Money",
                            amount: "$2,000",
                            approvedBy: "Finance Director",
                            status: "Completed",
                          },
                          {
                            date: "2025-03-12",
                            description: "Venue rental for Network Masters Cup",
                            category: "Event Operations",
                            amount: "$3,500",
                            approvedBy: "Event Manager",
                            status: "Completed",
                          },
                          {
                            date: "2025-03-10",
                            description: "Equipment purchase for Server Championship",
                            category: "Event Operations",
                            amount: "$1,200",
                            approvedBy: "Technical Director",
                            status: "Completed",
                          },
                          {
                            date: "2025-03-08",
                            description: "Platform maintenance and hosting",
                            category: "Technology",
                            amount: "$800",
                            approvedBy: "IT Manager",
                            status: "Completed",
                          },
                          {
                            date: "2025-03-03",
                            description: "Legal services for tournament rules",
                            category: "Administrative",
                            amount: "$500",
                            approvedBy: "Finance Director",
                            status: "Completed",
                          },
                        ].map((expense, index) => (
                          <TableRow key={index}>
                            <TableCell>{expense.date}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  expense.category === "Prize Money"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : expense.category === "Event Operations"
                                      ? "bg-orange-100 text-orange-800 border-orange-200"
                                      : expense.category === "Technology"
                                        ? "bg-purple-100 text-purple-800 border-purple-200"
                                        : "bg-gray-100 text-gray-800 border-gray-200"
                                }
                              >
                                {expense.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">${expense.amount}</TableCell>
                            <TableCell>{expense.approvedBy}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                {expense.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Expenses
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Donation Tracking</CardTitle>
                    <CardDescription>All donations received and their allocation</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <BarChart2 className="mr-2 h-4 w-4" /> View Charts
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Donation Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Total Donations</p>
                              <p className="text-2xl font-bold">$125,000</p>
                            </div>
                            <ArrowUp className="h-8 w-8 text-green-500" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Corporate Sponsors</p>
                              <p className="text-2xl font-bold">$110,000</p>
                            </div>
                            <ArrowUp className="h-8 w-8 text-green-500" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Individual Donors</p>
                              <p className="text-2xl font-bold">$15,000</p>
                            </div>
                            <ArrowUp className="h-8 w-8 text-green-500" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Recent Donations</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Donor</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Allocation</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            date: "2025-03-15",
                            donor: "PT Telkom Indonesia",
                            type: "Corporate",
                            amount: "$5,000",
                            allocation: "Network Masters Cup",
                            status: "Received",
                          },
                          {
                            date: "2025-03-11",
                            donor: "Tokopedia",
                            type: "Corporate",
                            amount: "$3,500",
                            allocation: "General Fund",
                            status: "Received",
                          },
                          {
                            date: "2025-03-05",
                            donor: "Bank Mandiri",
                            type: "Corporate",
                            amount: "$2,000",
                            allocation: "Database Wizards Tournament",
                            status: "Received",
                          },
                          {
                            date: "2025-03-02",
                            donor: "Budi Hartono",
                            type: "Individual",
                            amount: "$500",
                            allocation: "Hardware Assembly Sprint",
                            status: "Received",
                          },
                          {
                            date: "2025-03-01",
                            donor: "Gojek",
                            type: "Corporate",
                            amount: "$2,500",
                            allocation: "DevOps Challenge",
                            status: "Received",
                          },
                        ].map((donation, index) => (
                          <TableRow key={index}>
                            <TableCell>{donation.date}</TableCell>
                            <TableCell className="font-medium">{donation.donor}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  donation.type === "Corporate"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : "bg-purple-100 text-purple-800 border-purple-200"
                                }
                              >
                                {donation.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">{donation.amount}</TableCell>
                            <TableCell>{donation.allocation}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                {donation.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Donations
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>Comprehensive financial statements and reports</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" /> Select Period
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border shadow-sm">
                      <CardHeader>
                        <CardTitle>Income Statement</CardTitle>
                        <CardDescription>For the period ending March 15, 2025</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-bold">Revenue</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Corporate Donations</TableCell>
                              <TableCell className="text-right">$110,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Individual Donations</TableCell>
                              <TableCell className="text-right">$15,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold">Total Revenue</TableCell>
                              <TableCell className="text-right font-bold">$125,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold">Expenses</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Prize Money</TableCell>
                              <TableCell className="text-right">$75,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Event Operations</TableCell>
                              <TableCell className="text-right">$31,250</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Technology</TableCell>
                              <TableCell className="text-right">$12,500</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Administrative</TableCell>
                              <TableCell className="text-right">$6,250</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold">Total Expenses</TableCell>
                              <TableCell className="text-right font-bold">$125,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold">Net Income</TableCell>
                              <TableCell className="text-right font-bold">$0</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View Detailed Statement
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border shadow-sm">
                      <CardHeader>
                        <CardTitle>Balance Sheet</CardTitle>
                        <CardDescription>As of March 15, 2025</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-bold">Assets</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Cash and Equivalents</TableCell>
                              <TableCell className="text-right">$40,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Accounts Receivable</TableCell>
                              <TableCell className="text-right">$15,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Equipment</TableCell>
                              <TableCell className="text-right">$25,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold">Total Assets</TableCell>
                              <TableCell className="text-right font-bold">$80,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold">Liabilities</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Accounts Payable</TableCell>
                              <TableCell className="text-right">$10,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="pl-6">Accrued Expenses</TableCell>
                              <TableCell className="text-right">$5,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold">Total Liabilities</TableCell>
                              <TableCell className="text-right font-bold">$15,000</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-bold">Net Assets</TableCell>
                              <TableCell className="text-right font-bold">$65,000</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          View Detailed Balance Sheet
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Available Reports</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          title: "Q1 2025 Financial Report",
                          description: "Complete financial statements for Q1",
                          date: "March 31, 2025",
                          icon: FileText,
                        },
                        {
                          title: "Annual Report 2024",
                          description: "Comprehensive annual financial report",
                          date: "December 31, 2024",
                          icon: FileText,
                        },
                        {
                          title: "Tournament Expense Analysis",
                          description: "Breakdown of expenses by tournament",
                          date: "March 15, 2025",
                          icon: BarChart2,
                        },
                        {
                          title: "Donor Contribution Report",
                          description: "Analysis of donor contributions",
                          date: "March 10, 2025",
                          icon: PieChart,
                        },
                        {
                          title: "Budget vs. Actual Report",
                          description: "Comparison of budgeted vs. actual expenses",
                          date: "March 5, 2025",
                          icon: BarChart2,
                        },
                        {
                          title: "Cash Flow Statement",
                          description: "Detailed cash flow analysis",
                          date: "March 1, 2025",
                          icon: FileText,
                        },
                      ].map((report, index) => (
                        <Card key={index} className="flex flex-col">
                          <CardContent className="flex flex-col flex-1 p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <report.icon className="h-5 w-5 text-primary" />
                              <h4 className="font-medium">{report.title}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                            <p className="text-xs text-muted-foreground mt-auto">Generated: {report.date}</p>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button variant="outline" size="sm" className="w-full">
                              Download
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate Custom Report</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

