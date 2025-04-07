import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Plus } from "lucide-react"
import MaintenanceAlert from "@/components/maintenance-alert"

export default function MatchesPage() {
  return (
    <div className="container mx-auto p-8">
      <MaintenanceAlert />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">1vs1 Matches</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Match
        </Button>
      </div>

      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search matches..." className="w-full pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full mb-8">
        <TabsList>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "1024",
                title: "Network Configuration Challenge",
                round: "Round 2",
                tournament: "Network Masters Cup",
                player1: {
                  image: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Vivian',
                  name: "Ahmad Rizki",
                  avatar: "AR",
                  role: "Network Engineer",
                },
                player2: {
                  image: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Nolan',
                  name: "Budi Santoso",
                  avatar: "BS",
                  role: "System Administrator",
                },
                startedAt: "15 minutes ago",
              },
              {
                id: "1025",
                title: "Database Optimization Battle",
                round: "Round 1",
                tournament: "Database Wizards Tournament",
                player1: {
                  image: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Aidan',
                  name: "Citra Dewi",
                  avatar: "CD",
                  role: "Database Administrator",
                },
                player2: {
                  image: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Mackenzie',
                  name: "Denny Pratama",
                  avatar: "DP",
                  role: "Security Specialist",
                },
                startedAt: "5 minutes ago",
              },
            ].map((match) => (
              <Card key={match.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{match.title}</CardTitle>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Live
                    </Badge>
                  </div>
                  <CardDescription>
                    Match #{match.id} • {match.round}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-2">
                        <AvatarImage src={match.player1.image} alt="@shadcn" />
                        <AvatarFallback>{match.player1.avatar}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{match.player1.name}</p>
                      <p className="text-xs text-muted-foreground">{match.player1.role}</p>
                    </div>
                    <div className="text-center text-xl font-bold">VS</div>
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={match.player2.image} alt="@shadcn" />
                        <AvatarFallback>{match.player2.avatar}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{match.player2.name}</p>
                      <p className="text-xs text-muted-foreground">{match.player2.role}</p>
                    </div>
                  </div>
                  <div className="text-center text-sm">
                    <p>Started {match.startedAt}</p>
                    <p className="text-xs text-muted-foreground mt-1">{match.tournament}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="w-1/2">
                    View Details
                  </Button>
                  <Button className="w-1/2">Watch Live</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "1026",
                title: "Server Maintenance Showdown",
                round: "Round 1",
                tournament: "Server Masters League",
                player1: {
                  name: "Eka Putri",
                  avatar: "EP",
                  role: "Cloud Engineer",
                },
                player2: {
                  name: "Fajar Nugroho",
                  avatar: "FN",
                  role: "Hardware Specialist",
                },
                startsIn: "2 hours",
              },
              {
                id: "1027",
                title: "Cloud Architecture Challenge",
                round: "Round 1",
                tournament: "Cloud Computing Cup",
                player1: {
                  name: "Gita Purnama",
                  avatar: "GP",
                  role: "DevOps Engineer",
                },
                player2: {
                  name: "Hadi Wijaya",
                  avatar: "HW",
                  role: "Cloud Architect",
                },
                startsIn: "4 hours",
              },
              {
                id: "1028",
                title: "Security Breach Response",
                round: "Round 2",
                tournament: "Cybersecurity Championship",
                player1: {
                  name: "Indra Kusuma",
                  avatar: "IK",
                  role: "Security Analyst",
                },
                player2: {
                  name: "Joko Santoso",
                  avatar: "JS",
                  role: "Network Security Specialist",
                },
                startsIn: "Tomorrow, 10:00 AM",
              },
            ].map((match) => (
              <Card key={match.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{match.title}</CardTitle>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      Upcoming
                    </Badge>
                  </div>
                  <CardDescription>
                    Match #{match.id} • {match.round}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-2">
                        <AvatarImage src={"https://api.dicebear.com/9.x/fun-emoji/svg?seed="+match.player1.avatar} alt="name" />
                        <AvatarFallback>{match.player1.avatar}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{match.player1.name}</p>
                      <p className="text-xs text-muted-foreground">{match.player1.role}</p>
                    </div>
                    <div className="text-center text-xl font-bold">VS</div>
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={"https://api.dicebear.com/9.x/fun-emoji/svg?seed="+match.player2.avatar} alt="name" />
                        <AvatarFallback>{match.player2.avatar}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{match.player2.name}</p>
                      <p className="text-xs text-muted-foreground">{match.player2.role}</p>
                    </div>
                  </div>
                  <div className="text-center text-sm">
                    <p>Starting in {match.startsIn}</p>
                    <p className="text-xs text-muted-foreground mt-1">{match.tournament}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="w-1/2">
                    View Details
                  </Button>
                  <Button className="w-1/2">Set Reminder</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "1020",
                title: "Network Troubleshooting Cup",
                round: "Round 1",
                tournament: "Network Masters Cup",
                player1: {
                  name: "Ahmad Rizki",
                  avatar: "AR",
                  role: "Network Engineer",
                  winner: true,
                },
                player2: {
                  name: "Budi Santoso",
                  avatar: "BS",
                  role: "System Administrator",
                  winner: false,
                },
                completedAt: "Yesterday",
              },
              {
                id: "1021",
                title: "Hardware Assembly Sprint",
                round: "Round 1",
                tournament: "Hardware Masters",
                player1: {
                  name: "Citra Dewi",
                  avatar: "CD",
                  role: "Database Administrator",
                  winner: false,
                },
                player2: {
                  name: "Denny Pratama",
                  avatar: "DP",
                  role: "Security Specialist",
                  winner: true,
                },
                completedAt: "Yesterday",
              },
              {
                id: "1022",
                title: "Database Optimization Battle",
                round: "Round 1",
                tournament: "Database Wizards Tournament",
                player1: {
                  name: "Eka Putri",
                  avatar: "EP",
                  role: "Cloud Engineer",
                  winner: true,
                },
                player2: {
                  name: "Fajar Nugroho",
                  avatar: "FN",
                  role: "Hardware Specialist",
                  winner: false,
                },
                completedAt: "2 days ago",
              },
            ].map((match) => (
              <Card key={match.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{match.title}</CardTitle>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                      Completed
                    </Badge>
                  </div>
                  <CardDescription>
                    Match #{match.id} • {match.round}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={"https://api.dicebear.com/9.x/fun-emoji/svg?seed="+match.player1.avatar} alt="name" />
                        <AvatarFallback>{match.player1.avatar}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{match.player1.name}</p>
                      <p className="text-xs text-muted-foreground">{match.player1.role}</p>
                      {match.player1.winner && (
                        <Badge className="mt-1 bg-green-100 text-green-800 border-green-200">Winner</Badge>
                      )}
                    </div>
                    <div className="text-center text-xl font-bold">VS</div>
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={"https://api.dicebear.com/9.x/fun-emoji/svg?seed="+match.player2.avatar} alt="name" />
                        <AvatarFallback>{match.player2.avatar}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium">{match.player2.name}</p>
                      <p className="text-xs text-muted-foreground">{match.player2.role}</p>
                      {match.player2.winner && (
                        <Badge className="mt-1 bg-green-100 text-green-800 border-green-200">Winner</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-center text-sm">
                    <p>Completed {match.completedAt}</p>
                    <p className="text-xs text-muted-foreground mt-1">{match.tournament}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Match Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

