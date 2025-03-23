import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Medal, Download, Filter, Search, Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeaderboardPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Technician Rankings</h1>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" /> Export Rankings
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

                <Tabs defaultValue="overall" className="w-full mb-8">
                    <TabsList>
                        <TabsTrigger value="overall">Overall Rankings</TabsTrigger>
                        <TabsTrigger value="network">Network</TabsTrigger>
                        <TabsTrigger value="server">Server</TabsTrigger>
                        <TabsTrigger value="database">Database</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overall" className="mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>Overall Technician Rankings</CardTitle>
                                        <CardDescription>Based on performance across all competitions</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 mb-6 md:grid-cols-3">
                                    <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="relative">
                                                <div className="absolute -top-1 -left-1">
                                                    <Medal className="h-6 w-6 text-amber-500" />
                                                </div>
                                                <Avatar className="h-16 w-16 border-2 border-amber-500">
                                                    <AvatarImage src={"https://api.dicebear.com/9.x/open-peeps/svg?seed=Vivian"} alt="name" />
                                                    <AvatarFallback>AR</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold">Ahmad Rizki</div>
                                                <div className="text-sm text-muted-foreground">Network Engineer</div>
                                                <div className="flex items-center mt-1">
                                                    <Trophy className="h-4 w-4 text-amber-500 mr-1" />
                                                    <span className="font-medium">1st Place</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="relative">
                                                <div className="absolute -top-1 -left-1">
                                                    <Medal className="h-6 w-6 text-slate-400" />
                                                </div>
                                                <Avatar className="h-16 w-16 border-2 border-slate-400">
                                                <AvatarImage src={"https://api.dicebear.com/9.x/open-peeps/svg?seed=budi"} alt="name" />
                                                    <AvatarFallback>BS</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold">Budi Santoso</div>
                                                <div className="text-sm text-muted-foreground">System Administrator</div>
                                                <div className="flex items-center mt-1">
                                                    <Trophy className="h-4 w-4 text-slate-400 mr-1" />
                                                    <span className="font-medium">2nd Place</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="relative">
                                                <div className="absolute -top-1 -left-1">
                                                    <Medal className="h-6 w-6 text-orange-500" />
                                                </div>
                                                <Avatar className="h-16 w-16 border-2 border-orange-500">
                                                <AvatarImage src={"https://api.dicebear.com/9.x/open-peeps/svg?seed=Citra"} alt="name" />
                                                    <AvatarFallback>CD</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold">Citra Dewi</div>
                                                <div className="text-sm text-muted-foreground">Database Administrator</div>
                                                <div className="flex items-center mt-1">
                                                    <Trophy className="h-4 w-4 text-orange-500 mr-1" />
                                                    <span className="font-medium">3rd Place</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Rank</TableHead>
                                            <TableHead>Technician</TableHead>
                                            <TableHead>Specialization</TableHead>
                                            <TableHead>Wins</TableHead>
                                            <TableHead>Losses</TableHead>
                                            <TableHead>Win Rate</TableHead>
                                            <TableHead>Points</TableHead>
                                            <TableHead>Trend</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            {
                                                rank: 1,
                                                name: "Ahmad Rizki",
                                                avatar: "AR",
                                                specialization: "Network Engineer",
                                                wins: 12,
                                                losses: 2,
                                                winRate: "85.7%",
                                                points: 240,
                                                trend: "up",
                                            },
                                            {
                                                rank: 2,
                                                name: "Budi Santoso",
                                                avatar: "BS",
                                                specialization: "System Administrator",
                                                wins: 10,
                                                losses: 3,
                                                winRate: "76.9%",
                                                points: 210,
                                                trend: "up",
                                            },
                                            {
                                                rank: 3,
                                                name: "Citra Dewi",
                                                avatar: "CD",
                                                specialization: "Database Administrator",
                                                wins: 9,
                                                losses: 3,
                                                winRate: "75.0%",
                                                points: 195,
                                                trend: "down",
                                            },
                                            {
                                                rank: 4,
                                                name: "Denny Pratama",
                                                avatar: "DP",
                                                specialization: "Security Specialist",
                                                wins: 8,
                                                losses: 4,
                                                winRate: "66.7%",
                                                points: 180,
                                                trend: "same",
                                            },
                                            {
                                                rank: 5,
                                                name: "Eka Putri",
                                                avatar: "EP",
                                                specialization: "Cloud Engineer",
                                                wins: 8,
                                                losses: 5,
                                                winRate: "61.5%",
                                                points: 170,
                                                trend: "up",
                                            },
                                            {
                                                rank: 6,
                                                name: "Fajar Nugroho",
                                                avatar: "FN",
                                                specialization: "Hardware Specialist",
                                                wins: 7,
                                                losses: 5,
                                                winRate: "58.3%",
                                                points: 155,
                                                trend: "down",
                                            },
                                            {
                                                rank: 7,
                                                name: "Gita Purnama",
                                                avatar: "GP",
                                                specialization: "DevOps Engineer",
                                                wins: 7,
                                                losses: 6,
                                                winRate: "53.8%",
                                                points: 145,
                                                trend: "up",
                                            },
                                            {
                                                rank: 8,
                                                name: "Hadi Wijaya",
                                                avatar: "HW",
                                                specialization: "Cloud Architect",
                                                wins: 6,
                                                losses: 6,
                                                winRate: "50.0%",
                                                points: 130,
                                                trend: "same",
                                            },
                                            {
                                                rank: 9,
                                                name: "Indra Kusuma",
                                                avatar: "IK",
                                                specialization: "Security Analyst",
                                                wins: 5,
                                                losses: 7,
                                                winRate: "41.7%",
                                                points: 115,
                                                trend: "down",
                                            },
                                            {
                                                rank: 10,
                                                name: "Joko Santoso",
                                                avatar: "JS",
                                                specialization: "Network Security Specialist",
                                                wins: 5,
                                                losses: 8,
                                                winRate: "38.5%",
                                                points: 105,
                                                trend: "up",
                                            },
                                        ].map((technician, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-bold">{technician.rank}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarFallback>{technician.avatar}</AvatarFallback>
                                                        </Avatar>
                                                        <div>{technician.name}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{technician.specialization}</TableCell>
                                                <TableCell className="text-green-600 font-medium">{technician.wins}</TableCell>
                                                <TableCell className="text-red-600 font-medium">{technician.losses}</TableCell>
                                                <TableCell>{technician.winRate}</TableCell>
                                                <TableCell className="font-bold">{technician.points}</TableCell>
                                                <TableCell>
                                                    {technician.trend === "up" ? (
                                                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                                            <ArrowUp className="mr-1 h-3 w-3" /> Up
                                                        </Badge>
                                                    ) : technician.trend === "down" ? (
                                                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                                            <ArrowDown className="mr-1 h-3 w-3" /> Down
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                                                            <Minus className="mr-1 h-3 w-3" /> Same
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <div className="text-sm text-muted-foreground">Showing 10 of 128 technicians</div>
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

                    <TabsContent value="network" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Network Specialization Rankings</CardTitle>
                                <CardDescription>Rankings for network engineers and specialists</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12">Network specialization rankings will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="server" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Server Specialization Rankings</CardTitle>
                                <CardDescription>Rankings for system administrators and server specialists</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12">Server specialization rankings will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="database" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Database Specialization Rankings</CardTitle>
                                <CardDescription>Rankings for database administrators and specialists</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12">Database specialization rankings will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Specialization Rankings</CardTitle>
                                <CardDescription>Rankings for security specialists and analysts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12">Security specialization rankings will be displayed here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

