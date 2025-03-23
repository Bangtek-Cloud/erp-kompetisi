import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Download, FileText, PieChart, BarChart2 } from "lucide-react"

export default function PublicFinancePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Transparent Financial Reporting</h1>
            <p className="text-muted-foreground mt-2">Complete transparency in how funds are managed and utilized</p>
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
              <p className="text-xs text-muted-foreground">Year to date</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prize Money</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$75,000</div>
              <p className="text-xs text-muted-foreground">60% of donations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Event Operations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$31,250</div>
              <p className="text-xs text-muted-foreground">25% of donations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Other Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$18,750</div>
              <p className="text-xs text-muted-foreground">15% of donations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>How Donations Are Used</CardTitle>
              <CardDescription>Transparent allocation of all funds received</CardDescription>
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
                  <p className="text-xs text-muted-foreground mt-1">Directly awarded to tournament winners</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Event Operations (25%)</span>
                    <span className="font-medium">$31,250</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                    <div className="h-full rounded-full bg-primary" style={{ width: "25%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Venue, equipment, and staff costs</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Technology (10%)</span>
                    <span className="font-medium">$12,500</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                    <div className="h-full rounded-full bg-primary" style={{ width: "10%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Platform development and maintenance</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Administrative (5%)</span>
                    <span className="font-medium">$6,250</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted-foreground/20">
                    <div className="h-full rounded-full bg-primary" style={{ width: "5%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Legal, accounting, and other administrative costs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Donors</CardTitle>
              <CardDescription>Organizations and individuals supporting our tournaments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Allocation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      donor: "PT Telkom Indonesia",
                      type: "Corporate",
                      amount: "$25,000",
                      allocation: "Network Masters Cup",
                    },
                    {
                      donor: "Tokopedia",
                      type: "Corporate",
                      amount: "$20,000",
                      allocation: "General Fund",
                    },
                    {
                      donor: "Bank Mandiri",
                      type: "Corporate",
                      amount: "$15,000",
                      allocation: "Database Wizards Tournament",
                    },
                    {
                      donor: "Gojek",
                      type: "Corporate",
                      amount: "$12,500",
                      allocation: "DevOps Challenge",
                    },
                    {
                      donor: "Bukalapak",
                      type: "Corporate",
                      amount: "$10,000",
                      allocation: "General Fund",
                    },
                  ].map((donor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{donor.donor}</TableCell>
                      <TableCell>{donor.type}</TableCell>
                      <TableCell>{donor.amount}</TableCell>
                      <TableCell>{donor.allocation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Public Financial Reports</CardTitle>
            <CardDescription>Download our detailed financial reports</CardDescription>
          </CardHeader>
          <CardContent>
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
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Commitment to Transparency</CardTitle>
            <CardDescription>How we ensure financial accountability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                At TechComp ERP, we believe in complete transparency in how we manage and utilize funds. Our commitment
                to financial accountability is reflected in our regular public reporting and open access to financial
                data.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Independent Auditing</h3>
                  <p className="text-sm text-muted-foreground">
                    All our financial statements are independently audited by a certified accounting firm to ensure
                    accuracy and compliance with financial regulations.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Regular Reporting</h3>
                  <p className="text-sm text-muted-foreground">
                    We publish quarterly and annual financial reports that are accessible to the public, providing
                    detailed insights into our financial activities.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Donor Transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    We maintain a public record of all donations received, ensuring that our funding sources are
                    transparent and accountable.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Expense Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Every expense is meticulously tracked and categorized, allowing for clear visibility into how funds
                    are being utilized.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Contact Us for More Information</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

