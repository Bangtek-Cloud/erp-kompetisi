import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, Download } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { Link, useParams } from "react-router"
import { getTournamentById, updateContestantById } from "@/services/tournament"
import { toast } from "sonner"

export default function TechniciansPage() {
  const { tournamentId } = useParams<{ tournamentId?: string }>()
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAdmin = user?.role === "ADMIN" || user?.role === "SU";

  const { data: techData, isFetching } = useQuery({
    queryKey: ['technicians', tournamentId],
    queryFn: async () => {
      const response = await getTournamentById(tournamentId || "", accessToken || "")
      return response.data
    },
  })

  const {mutate: update, isPending} = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await updateContestantById(id, data, accessToken || '')
      if(res.success){
        toast.success('berhasil update data')
        queryClient.invalidateQueries({queryKey: ['technicians', tournamentId]})
        queryClient.invalidateQueries({queryKey: ['tournaments']})
        
      } else {
        toast.error('gagal update data')
      }
      return res.data
    }
  })

  if (isFetching || isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
        <div>Loading</div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div>
        <Link to={'/apps/tournament'}>
          Go Back
        </Link>
      </div>
    )
  }
  

  return (
    <main className="flex-1 container mx-auto p-8">
      <div className="flex md:flex-row gap-4 flex-col justify-between md:items-center mb-8">
        <h1 className="text-3xl font-bold text-left">Peserta</h1>
        {isAdmin && (
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Technician
            </Button>
          </div>
        )}
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
          <CardTitle>Turnamen {techData?.name}</CardTitle>
          <CardDescription>Peserta dan panitia dalam turnamen</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Bawa Alat Sendiri</TableHead>
                <TableHead>Alat yang dibawa</TableHead>
                <TableHead>Ukuran Baju</TableHead>
                <TableHead>Tipe Player</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {techData.contestants.length > 0 && techData?.contestants.map((technician: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {
                        technician.logo && (
                          <Link to={'data:image/png;base64,' + technician.logo} target="_blank">
                            <img src={'data:image/png;base64,' + technician.logo} alt="name" className="w-16 h-16" />
                          </Link>
                        )
                      }
                      <div>{technician.playerType === 'INDIVIDUAL' ? technician?.user?.name : technician?.storeName}</div>
                    </div>
                  </TableCell>
                  <TableCell>{technician.storeAddress}</TableCell>
                  <TableCell>{technician.equipmentSource ? 'ya' : 'tidak'}</TableCell>
                  <TableCell><ul>
                    {
                      technician?.equipmentSource &&
                      technician?.equipmentOwned.map((item: string, index: number) => (
                        <li key={index}>{index + 1} {item}</li>
                      ))
                    }
                  </ul>
                  </TableCell>
                  <TableCell>{technician.shirtSize}</TableCell>
                  <TableCell>
                    {technician.playerType}
                  </TableCell>
                  <TableCell>
                    {!technician.isVerified ? 'Belum diverifikasi' : 'Done'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={()=>update({ id: technician?.id, data: { isVerified: !technician.isVerified } })}>
                      Verifikasi
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
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

