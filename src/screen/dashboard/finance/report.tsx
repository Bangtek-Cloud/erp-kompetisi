import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Calendar, BarChart2, PieChart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinancialReportsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Financial Reports</h1>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Calendar className="mr-2 h-4 w-4" /> Select Period
                        </Button>
                        <Button>
                            <Download className="mr-2 h-4 w-4" /> Export Reports
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="statements" className="w-full mb-8">
                    <TabsList>
                        <TabsTrigger value="statements">Financial Statements</TabsTrigger>
                        <TabsTrigger value="donations">Donation Reports</TabsTrigger>
                        <TabsTrigger value="expenses">Expense Reports</TabsTrigger>
                        <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
                    </TabsList>

                    <TabsContent value="statements" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Financial Statements</CardTitle>
                                <CardDescription>Comprehensive financial reports</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <Card className="border shadow-sm">
                                        <CardHeader>
                                            <CardTitle>Income Statement</CardTitle>
                                            <CardDescription>For the period ending March 15, 2025</CardDescription>
                                        </CardHeader>
                                        <CardContent className="h-80 flex items-center justify-center">
                                            <div className="text-center text-muted-foreground">
                                                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                                <p>Income statement will be displayed here</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex gap-2">
                                            <Button variant="outline" className="flex-1">
                                                Preview
                                            </Button>
                                            <Button className="flex-1">Download</Button>
                                        </CardFooter>
                                    </Card>
                                    <Card className="border shadow-sm">
                                        <CardHeader>
                                            <CardTitle>Balance Sheet</CardTitle>
                                            <CardDescription>As of March 15, 2025</CardDescription>
                                        </CardHeader>
                                        <CardContent className="h-80 flex items-center justify-center">
                                            <div className="text-center text-muted-foreground">
                                                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                                <p>Balance sheet will be displayed here</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex gap-2">
                                            <Button variant="outline" className="flex-1">
                                                Preview
                                            </Button>
                                            <Button className="flex-1">Download</Button>
                                        </CardFooter>
                                    </Card>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="border shadow-sm">
                                        <CardHeader>
                                            <CardTitle>Cash Flow Statement</CardTitle>
                                            <CardDescription>For the period ending March 15, 2025</CardDescription>
                                        </CardHeader>
                                        <CardContent className="h-80 flex items-center justify-center">
                                            <div className="text-center text-muted-foreground">
                                                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                                <p>Cash flow statement will be displayed here</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex gap-2">
                                            <Button variant="outline" className="flex-1">
                                                Preview
                                            </Button>
                                            <Button className="flex-1">Download</Button>
                                        </CardFooter>
                                    </Card>
                                    <Card className="border shadow-sm">
                                        <CardHeader>
                                            <CardTitle>Financial Ratios</CardTitle>
                                            <CardDescription>Key financial metrics and ratios</CardDescription>
                                        </CardHeader>
                                        <CardContent className="h-80 flex items-center justify-center">
                                            <div className="text-center text-muted-foreground">
                                                <BarChart2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                                <p>Financial ratios will be displayed here</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex gap-2">
                                            <Button variant="outline" className="flex-1">
                                                Preview
                                            </Button>
                                            <Button className="flex-1">Download</Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Generate Custom Financial Statement</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="donations" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Donation Reports</CardTitle>
                                <CardDescription>Analysis of all donations received</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12">Donation reports will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="expenses" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Expense Reports</CardTitle>
                                <CardDescription>Detailed breakdown of all expenses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12">Expense reports will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="budget" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Budget Analysis</CardTitle>
                                <CardDescription>Comparison of budgeted vs. actual expenses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12">Budget analysis will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <Card>
                    <CardHeader>
                        <CardTitle>Available Reports</CardTitle>
                        <CardDescription>Access and download detailed reports</CardDescription>
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
                    <CardFooter>
                        <Button className="w-full">Generate Custom Report</Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}

