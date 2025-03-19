import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, Clock, Filter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SchedulePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Competition Schedule</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> View Calendar
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </div>
        </div>

        <div className="flex items-center mb-6 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search events..." className="w-full pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous Week
          </Button>
          <h2 className="text-xl font-semibold">March 15 - March 21, 2025</h2>
          <Button variant="outline" size="sm">
            Next Week <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>All scheduled matches and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-auto border border-gray-200 rounded-lg shadow dark:border-gray-800">
              <Table className="relative">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Tournament</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      date: "March 15, 2025",
                      time: "10:00 AM",
                      event: "Network Configuration Challenge",
                      tournament: "Network Masters Cup",
                      participants: "Ahmad Rizki vs Budi Santoso",
                      location: "Jakarta Convention Center, Room A",
                      status: "Scheduled",
                    },
                    {
                      date: "March 15, 2025",
                      time: "2:00 PM",
                      event: "Database Optimization Battle",
                      tournament: "Database Wizards Tournament",
                      participants: "Citra Dewi vs Denny Pratama",
                      location: "Jakarta Convention Center, Room B",
                      status: "Scheduled",
                    },
                    {
                      date: "March 16, 2025",
                      time: "11:00 AM",
                      event: "Server Maintenance Showdown",
                      tournament: "Server Masters League",
                      participants: "Eka Putri vs Fajar Nugroho",
                      location: "Jakarta Convention Center, Room A",
                      status: "Scheduled",
                    },
                    {
                      date: "March 17, 2025",
                      time: "10:00 AM",
                      event: "Cloud Architecture Challenge",
                      tournament: "Cloud Computing Cup",
                      participants: "Gita Purnama vs Hadi Wijaya",
                      location: "Jakarta Convention Center, Room C",
                      status: "Scheduled",
                    },
                    {
                      date: "March 18, 2025",
                      time: "1:00 PM",
                      event: "Security Breach Response",
                      tournament: "Cybersecurity Championship",
                      participants: "Indra Kusuma vs Joko Santoso",
                      location: "Jakarta Convention Center, Room B",
                      status: "Scheduled",
                    },
                    {
                      date: "March 19, 2025",
                      time: "11:00 AM",
                      event: "Hardware Assembly Sprint",
                      tournament: "Hardware Masters",
                      participants: "Kartika Sari vs Lukman Hakim",
                      location: "Jakarta Convention Center, Room A",
                      status: "Scheduled",
                    },
                    {
                      date: "March 20, 2025",
                      time: "10:00 AM",
                      event: "DevOps Challenge",
                      tournament: "DevOps Masters",
                      participants: "Maya Putri vs Naufal Hidayat",
                      location: "Jakarta Convention Center, Room D",
                      status: "Scheduled",
                    },
                  ].map((event, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{event.date}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3 w-3" /> {event.time}
                        </div>
                      </TableCell>
                      <TableCell>{event.event}</TableCell>
                      <TableCell>{event.tournament}</TableCell>
                      <TableCell>{event.participants}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={event.location}>
                        {event.location}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          {event.status}
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Showing 7 of 24 events</div>
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

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events scheduled for the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  date: "March 22, 2025",
                  time: "10:00 AM",
                  event: "Network Masters Cup - Finals",
                  location: "Jakarta Convention Center, Main Hall",
                  participants: "TBD vs TBD",
                },
                {
                  date: "March 25, 2025",
                  time: "11:00 AM",
                  event: "Database Wizards Tournament - Semifinals",
                  location: "Jakarta Convention Center, Room B",
                  participants: "TBD vs TBD",
                },
                {
                  date: "March 28, 2025",
                  time: "2:00 PM",
                  event: "Server Masters League - Quarterfinals",
                  location: "Jakarta Convention Center, Room A",
                  participants: "TBD vs TBD",
                },
                {
                  date: "April 2, 2025",
                  time: "10:00 AM",
                  event: "Cloud Computing Cup - Opening Ceremony",
                  location: "Jakarta Convention Center, Main Hall",
                  participants: "All Participants",
                },
                {
                  date: "April 5, 2025",
                  time: "11:00 AM",
                  event: "Cybersecurity Championship - Round 1",
                  location: "Jakarta Convention Center, Room C",
                  participants: "Multiple Matches",
                },
                {
                  date: "April 10, 2025",
                  time: "1:00 PM",
                  event: "Hardware Masters - Semifinals",
                  location: "Jakarta Convention Center, Room A",
                  participants: "TBD vs TBD",
                },
              ].map((event, index) => (
                <Card key={index} className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div className="font-medium">{event.date}</div>
                      <div className="text-sm text-muted-foreground">{event.time}</div>
                    </div>
                    <h4 className="font-medium mb-1">{event.event}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{event.location}</p>
                    <p className="text-sm">Participants: {event.participants}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Reminder
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Full Calendar
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

