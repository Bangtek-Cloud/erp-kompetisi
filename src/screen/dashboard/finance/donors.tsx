import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Download, DollarSign } from "lucide-react"

export default function DonorsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Donors & Sponsors</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Donor
            </Button>
          </div>
        </div>

        <div className="flex items-center mb-6 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search donors..." className="w-full pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,234</div>
              <p className="text-xs text-muted-foreground">+$2,100 from last month</p>
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,450</div>
              <p className="text-xs text-muted-foreground">5 pending approvals</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Donors & Sponsors</CardTitle>
            <CardDescription>Manage all donors and sponsors supporting the competitions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Competitions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "PT Telkom Indonesia",
                    type: "Corporate",
                    contact: "contact@telkom.co.id",
                    amount: "$5,000",
                    competitions: "All",
                    status: "Active",
                  },
                  {
                    name: "Tokopedia",
                    type: "Corporate",
                    contact: "sponsors@tokopedia.com",
                    amount: "$3,500",
                    competitions: "Network Challenge, Cloud Architecture",
                    status: "Active",
                  },
                  {
                    name: "Bank Mandiri",
                    type: "Corporate",
                    contact: "corporate@bankmandiri.co.id",
                    amount: "$2,000",
                    competitions: "Security Breach Response",
                    status: "Active",
                  },
                  {
                    name: "Budi Hartono",
                    type: "Individual",
                    contact: "budi.h@gmail.com",
                    amount: "$500",
                    competitions: "Hardware Assembly Sprint",
                    status: "Active",
                  },
                  {
                    name: "PT Astra International",
                    type: "Corporate",
                    contact: "sponsorships@astra.co.id",
                    amount: "$1,500",
                    competitions: "Server Maintenance Showdown",
                    status: "Pending",
                  },
                  {
                    name: "Gojek",
                    type: "Corporate",
                    contact: "partnerships@gojek.com",
                    amount: "$2,500",
                    competitions: "DevOps Challenge",
                    status: "Active",
                  },
                ].map((donor, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{donor.name}</TableCell>
                    <TableCell>{donor.type}</TableCell>
                    <TableCell>{donor.contact}</TableCell>
                    <TableCell>{donor.amount}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={donor.competitions}>
                      {donor.competitions}
                    </TableCell>
                    <TableCell>
                      <Badge variant={donor.status === "Active" ? "default" : "secondary"}>{donor.status}</Badge>
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
            <div className="text-sm text-muted-foreground">Showing 6 of 18 donors</div>
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
      </main>
    </div>
  )
}

