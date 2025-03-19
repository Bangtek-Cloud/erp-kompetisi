import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Download, FileText, PieChart, Calendar } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Select Period
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Export Reports
            </Button>
          </div>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">+24 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Technicians</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">64</div>
              <p className="text-xs text-muted-foreground">+8 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tournament Completion</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">3 of 4 tournaments completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Match Duration</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45 min</div>
              <p className="text-xs text-muted-foreground">-5 min from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Match Statistics</CardTitle>
              <CardDescription>Overview of match outcomes and performance</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Match statistics chart will be displayed here</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Statistics
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Technician Performance</CardTitle>
              <CardDescription>Performance metrics across all technicians</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Technician performance chart will be displayed here</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Performance Details
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Access and download detailed reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Tournament Performance Report",
                  description: "Detailed analysis of tournament outcomes and statistics",
                  date: "March 15, 2025",
                  icon: BarChart2,
                },
                {
                  title: "Technician Ranking Report",
                  description: "Complete rankings and performance metrics for all technicians",
                  date: "March 10, 2025",
                  icon: FileText,
                },
                {
                  title: "Match Analysis Report",
                  description: "In-depth analysis of match outcomes and patterns",
                  date: "March 5, 2025",
                  icon: PieChart,
                },
                {
                  title: "Quarterly Performance Summary",
                  description: "Summary of all competitions and performance for Q1 2025",
                  date: "March 31, 2025",
                  icon: FileText,
                },
                {
                  title: "Specialization Comparison Report",
                  description: "Comparative analysis across different technical specializations",
                  date: "February 28, 2025",
                  icon: BarChart2,
                },
                {
                  title: "Tournament Engagement Report",
                  description: "Analysis of participant and audience engagement",
                  date: "February 15, 2025",
                  icon: PieChart,
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

