import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Download } from "lucide-react"

export default function TechniciansPage() {
  return (
      <main className="flex-1 container mx-auto p-8">
        <div className="flex md:flex-row gap-4 flex-col justify-between md:items-center mb-8">
          <h1 className="text-3xl font-bold text-left">Technicians</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Technician
            </Button>
          </div>
        </div>

        <div className="flex items-center mb-6 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search technicians..." className="w-full pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Registered Technicians</CardTitle>
            <CardDescription>Manage all technicians participating in competitions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Competitions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Ahmad Rizki",
                    avatar: "AR",
                    specialization: "Network Engineer",
                    company: "PT Telkom Indonesia",
                    experience: "5 years",
                    competitions: 8,
                    status: "Active",
                  },
                  {
                    name: "Budi Santoso",
                    avatar: "BS",
                    specialization: "System Administrator",
                    company: "Tokopedia",
                    experience: "7 years",
                    competitions: 12,
                    status: "Active",
                  },
                  {
                    name: "Citra Dewi",
                    avatar: "CD",
                    specialization: "Database Administrator",
                    company: "Bank Mandiri",
                    experience: "4 years",
                    competitions: 5,
                    status: "Active",
                  },
                  {
                    name: "Denny Pratama",
                    avatar: "DP",
                    specialization: "Security Specialist",
                    company: "Gojek",
                    experience: "6 years",
                    competitions: 9,
                    status: "Active",
                  },
                  {
                    name: "Eka Putri",
                    avatar: "EP",
                    specialization: "Cloud Engineer",
                    company: "Bukalapak",
                    experience: "3 years",
                    competitions: 4,
                    status: "Inactive",
                  },
                  {
                    name: "Fajar Nugroho",
                    avatar: "FN",
                    specialization: "Hardware Specialist",
                    company: "Astra International",
                    experience: "8 years",
                    competitions: 15,
                    status: "Active",
                  },
                  {
                    name: "Gita Purnama",
                    avatar: "GP",
                    specialization: "DevOps Engineer",
                    company: "Traveloka",
                    experience: "5 years",
                    competitions: 7,
                    status: "Active",
                  },
                ].map((technician, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                        <AvatarImage src={"https://api.dicebear.com/9.x/open-peeps/svg?seed="+technician.avatar} alt="name" />
                          <AvatarFallback>{technician.avatar}</AvatarFallback>
                        </Avatar>
                        <div>{technician.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{technician.specialization}</TableCell>
                    <TableCell>{technician.company}</TableCell>
                    <TableCell>{technician.experience}</TableCell>
                    <TableCell>{technician.competitions}</TableCell>
                    <TableCell>
                      <Badge variant={technician.status === "Active" ? "default" : "secondary"}>
                        {technician.status}
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
            <div className="text-sm text-muted-foreground">Showing 7 of 128 technicians</div>
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
  )
}

