import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Calendar, Users, MapPin } from "lucide-react"

export default function TournamentsPage() {
  return (
      <main className="flex-1 container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tournaments</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Tournament
          </Button>
        </div>

        <div className="flex items-center mb-6 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search tournaments..." className="w-full pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              id: "1",
              title: "Network Masters Cup",
              status: "Active",
              dates: "March 15-30, 2025",
              location: "Jakarta",
              participants: 32,
              description: "A tournament to test network configuration and troubleshooting skills in 1vs1 matches.",
              matches: {
                total: 31,
                completed: 15,
                upcoming: 16,
              },
            },
            {
              id: "2",
              title: "Server Administration Championship",
              status: "Active",
              dates: "March 20-April 5, 2025",
              location: "Surabaya",
              participants: 16,
              description: "Technicians compete in 1vs1 matches to troubleshoot and maintain server infrastructure.",
              matches: {
                total: 15,
                completed: 7,
                upcoming: 8,
              },
            },
            {
              id: "3",
              title: "Database Wizards Tournament",
              status: "Active",
              dates: "March 25-April 10, 2025",
              location: "Bandung",
              participants: 24,
              description: "1vs1 competition focusing on database optimization and management skills.",
              matches: {
                total: 23,
                completed: 8,
                upcoming: 15,
              },
            },
            {
              id: "4",
              title: "Cloud Computing Cup",
              status: "Upcoming",
              dates: "April 15-30, 2025",
              location: "Jakarta",
              participants: 16,
              description: "Design and implement cloud architecture solutions in head-to-head matches.",
              matches: {
                total: 15,
                completed: 0,
                upcoming: 15,
              },
            },
            {
              id: "5",
              title: "Cybersecurity Championship",
              status: "Upcoming",
              dates: "May 1-15, 2025",
              location: "Medan",
              participants: 32,
              description: "Identify and respond to simulated security breaches in 1vs1 competition format.",
              matches: {
                total: 31,
                completed: 0,
                upcoming: 31,
              },
            },
            {
              id: "6",
              title: "Hardware Masters",
              status: "Completed",
              dates: "February 10-25, 2025",
              location: "Yogyakarta",
              participants: 16,
              description: "Race against opponents to assemble and configure computer hardware.",
              matches: {
                total: 15,
                completed: 15,
                upcoming: 0,
              },
            },
          ].map((tournament) => (
            <Card key={tournament.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{tournament.title}</CardTitle>
                  <Badge
                    variant="outline"
                    className={
                      tournament.status === "Active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : tournament.status === "Upcoming"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {tournament.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {tournament.dates}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3.5 w-3.5" /> {tournament.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-3.5 w-3.5" /> {tournament.participants} participants
                  </div>
                  <p className="text-sm mt-2">{tournament.description}</p>

                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold">{tournament.matches.total}</p>
                        <p className="text-xs text-muted-foreground">Total Matches</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{tournament.matches.completed}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{tournament.matches.upcoming}</p>
                        <p className="text-xs text-muted-foreground">Upcoming</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Brackets
                </Button>
                <Button size="sm">Manage</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
  )
}

