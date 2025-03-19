import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Search, Filter, Download, Calendar, ArrowDown, ArrowUp, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TransactionsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Transaction Management</h1>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" /> Export
                        </Button>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Transaction
                        </Button>
                    </div>
                </div>

                <div className="flex items-center mb-6 gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search transactions..." className="w-full pl-8" />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" /> Date Range
                    </Button>
                </div>

                <Tabs defaultValue="all" className="w-full mb-8">
                    <TabsList>
                        <TabsTrigger value="all">All Transactions</TabsTrigger>
                        <TabsTrigger value="income">Income</TabsTrigger>
                        <TabsTrigger value="expenses">Expenses</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>All Financial Transactions</CardTitle>
                                        <CardDescription>Complete record of all financial activities</CardDescription>
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
                                            <TableHead>Type</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            {
                                                date: "2025-03-15",
                                                id: "TRX-1001",
                                                description: "Donation from PT Telkom Indonesia",
                                                category: "Donation",
                                                type: "Income",
                                                amount: "$5,000",
                                                status: "Completed",
                                            },
                                            {
                                                date: "2025-03-14",
                                                id: "TRX-1000",
                                                description: "Prize payment to Ahmad Rizki",
                                                category: "Prize Money",
                                                type: "Expense",
                                                amount: "$2,000",
                                                status: "Completed",
                                            },
                                            {
                                                date: "2025-03-12",
                                                id: "TRX-999",
                                                description: "Venue rental for Network Masters Cup",
                                                category: "Event Operations",
                                                type: "Expense",
                                                amount: "$3,500",
                                                status: "Completed",
                                            },
                                            {
                                                date: "2025-03-11",
                                                id: "TRX-998",
                                                description: "Donation from Tokopedia",
                                                category: "Donation",
                                                type: "Income",
                                                amount: "$3,500",
                                                status: "Completed",
                                            },
                                            {
                                                date: "2025-03-10",
                                                id: "TRX-997",
                                                description: "Equipment purchase for Server Championship",
                                                category: "Event Operations",
                                                type: "Expense",
                                                amount: "$1,200",
                                                status: "Completed",
                                            },
                                            {
                                                date: "2025-03-08",
                                                id: "TRX-996",
                                                description: "Platform maintenance and hosting",
                                                category: "Technology",
                                                type: "Expense",
                                                amount: "$800",
                                                status: "Completed",
                                            },
                                            {
                                                date: "2025-03-05",
                                                id: "TRX-995",
                                                description: "Donation from Bank Mandiri",
                                                category: "Donation",
                                                type: "Income",
                                                amount: "$2,000",
                                                status: "Completed",
                                            },
                                            {
                                                date: "2025-03-03",
                                                id: "TRX-994",
                                                description: "Legal services for tournament rules",
                                                category: "Administrative",
                                                type: "Expense",
                                                amount: "$500",
                                                status: "Completed",
                                            },
                                            {
                                                date: "2025-03-20",
                                                id: "TRX-1002",
                                                description: "Sponsorship from Bukalapak",
                                                category: "Donation",
                                                type: "Income",
                                                amount: "$4,000",
                                                status: "Pending",
                                            },
                                            {
                                                date: "2025-03-25",
                                                id: "TRX-1003",
                                                description: "Prize payment for Database Tournament",
                                                category: "Prize Money",
                                                type: "Expense",
                                                amount: "$3,000",
                                                status: "Pending",
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
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        {transaction.type === "Income" ? (
                                                            <ArrowUp className="mr-1 h-4 w-4 text-green-600" />
                                                        ) : (
                                                            <ArrowDown className="mr-1 h-4 w-4 text-red-600" />
                                                        )}
                                                        <span className={transaction.type === "Income" ? "text-green-600" : "text-red-600"}>
                                                            {transaction.type}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    className={
                                                        transaction.type === "Income" ? "text-green-600 font-medium" : "text-red-600 font-medium"
                                                    }
                                                >
                                                    {transaction.type === "Income" ? "+" : "-"}
                                                    {transaction.amount}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            transaction.status === "Completed"
                                                                ? "bg-green-100 text-green-800 border-green-200"
                                                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                        }
                                                    >
                                                        {transaction.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm">
                                                        View
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <div className="text-sm text-muted-foreground">Showing 10 of 120 transactions</div>
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

                    <TabsContent value="income" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Income Transactions</CardTitle>
                                <CardDescription>All donations and income</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12">Income transactions will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="expenses" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Expense Transactions</CardTitle>
                                <CardDescription>All expenses and payments</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12">Expense transactions will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="pending" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pending Transactions</CardTitle>
                                <CardDescription>Transactions awaiting approval or completion</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12">Pending transactions will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <Card>
                    <CardHeader>
                        <CardTitle>Transaction Summary</CardTitle>
                        <CardDescription>Overview of financial activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="border-0 shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Income</p>
                                            <p className="text-2xl font-bold text-green-600">$125,000</p>
                                        </div>
                                        <ArrowUp className="h-8 w-8 text-green-500" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Expenses</p>
                                            <p className="text-2xl font-bold text-red-600">$85,000</p>
                                        </div>
                                        <ArrowDown className="h-8 w-8 text-red-500" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Net Balance</p>
                                            <p className="text-2xl font-bold">$40,000</p>
                                        </div>
                                        <DollarSign className="h-8 w-8 text-primary" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Pending Transactions</p>
                                            <p className="text-2xl font-bold">$7,000</p>
                                        </div>
                                        <Calendar className="h-8 w-8 text-yellow-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            View Detailed Financial Reports
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}

