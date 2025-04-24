import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, ArrowUpDown } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useParams } from "react-router"
import { exportDataTournament, getTournamentById, updateContestantById } from "@/services/tournament"
import { toast } from "sonner"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import useAuthStore from "@/store/feature/authStand";
import LoadingSolder from "@/components/loading-solder"


type TechType = {
  id: string
  name: string
  avatar: string
  logo: string
  storeName: string
  storeAddress: string
  phoneNo: string,
  playerType: string,
  shirtSize: string,
  equipmentSource: boolean,
  equipmentOwned: string,
  isVerified: boolean,
  email: string,
  user: {
    name: string,
    avatar: string,
    email: string,
    usingAvatar: boolean
  }
}

export default function TechniciansPage() {
  const { tournamentId } = useParams<{ tournamentId?: string }>()
  const queryClient = useQueryClient();
  const { user, accessToken } = useAuthStore();
  const isAdmin = user?.role === "ADMIN" || user?.role === "SU";
  const [loading, setLoading] = useState(false)

  const { data: techData, isFetching } = useQuery({
    queryKey: ['technicians', tournamentId],
    queryFn: async () => {
      const response = await getTournamentById(tournamentId || "", accessToken || "")
      return response.data
    },
  })

  const exportData = async (status: string) => {
    setLoading(true)
    await exportDataTournament(tournamentId || "", status, accessToken || "")
    setLoading(false)
  }

  const { mutate: update, isPending } = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await updateContestantById(id, data, accessToken || '')
      if (res.success) {
        toast.success('berhasil update data')
        queryClient.invalidateQueries({ queryKey: ['technicians', tournamentId] })
        queryClient.setQueryData(['tournaments'], (old: any) => {
          if (!old) return old

          return old.map((t: any) => {
            if (t.id !== tournamentId) return t

            return {
              ...t,
              contestants: t.contestants?.map((c: any) =>
                c.id === id ? { ...c, ...data } : c
              )
            }
          })
        })


      } else {
        toast.error('gagal update data')
      }
      return res.data
    }
  })

  const columns: ColumnDef<TechType>[] = [
    {
      accessorKey: 'user.avatar',
      header: () => <div style={{ minWidth: '100px' }}>Avatar</div>,
      accessorFn: row => row.user.avatar,
      cell: ({ row }) => {
        const usingAvatar = row.original.user.usingAvatar
        const avatar = row.original.user.avatar
        return (
          <img src={usingAvatar ? import.meta.env.VITE_BASE_S3 +  avatar : avatar} className="w-24 h-24" />
        )
      }
    },
    {
      accessorKey: "name",
      header: () => <div style={{ minWidth: '200px' }}>Nama Peserta</div>,
      accessorFn: row => row.user.name,
      size: 100
    },
    {
      accessorKey: "email",
      header: () => <div style={{ minWidth: '200px' }}>Email Peserta</div>,
      accessorFn: row => row.user.email,
      size: 100
    },
    {
      accessorKey: "phoneNo",
      header: () => <div style={{ minWidth: '200px' }}>telp</div>,
    },
    {
      accessorKey: 'playerType',
      header: () => <div style={{ minWidth: '100px' }}>Tipe Peserta</div>,
    },
    {
      accessorKey: 'storeName',
      header: () => <div style={{ minWidth: '100px' }}>Mewakili</div>,
    },
    {
      accessorKey: 'storeAddress',
      header: () => <div style={{ minWidth: '200px' }}>Alamat Peserta</div>,
    },
    {
      accessorKey: 'shirtSize',
      header: () => <div style={{ minWidth: '100px' }}>Ukuran Baju</div>,
    },
    {
      accessorKey: 'equipmentOwned',
      header: ({ column }) => <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bawa alat sendiri
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
      cell: ({ row }) => {
        return row.original.equipmentSource ? 'Ya' : 'Tidak'
      }
    },
    {
      accessorKey: 'equipmentOwned',
      header: () => <div style={{ minWidth: '200px' }}>Alat yang dibawa</div>,
      cell: ({ row }) => {
        if (row.original.equipmentSource) {
          return (
            <ul>
              {Array.isArray(row.original.equipmentOwned) ? row.original.equipmentOwned.map((item: string, index: number) => (
                <li key={index}>{index + 1}. {item}</li>
              )) : null
              }
            </ul>
          )
        }

      }
    },
    {
      accessorKey: 'equipmentSource',
      header: ({ column }) => <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status Verifikasi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
      cell: ({ row }) => {
        return row.original.isVerified ? 'Sudah Verifikasi' : 'Belum Verifikasi'
      }
    },
    {
      accessorKey: 'id',
      header: () => <div style={{ minWidth: '200px' }}>Action</div>,
      cell: ({ row }) => {
        return (
          <Button variant={row.original.isVerified ? 'destructive' : 'default'} size="sm" onClick={() => update({ id: Number(row.original.id), data: { isVerified: !row.original.isVerified } })}>
            {row.original.isVerified ? "Batalkan Verifikasi" : "Verifikasi Sekarang"}
          </Button>
        )

      }
    }
  ]

  if (isFetching || isPending || loading) {
    return (
    <LoadingSolder />
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
        {isAdmin && !isFetching && (
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={'secondary'}>
                  <Download /> Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={()=> exportData('semua')}>Semua data</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> exportData('true')}>Hanya yang sudah verifikasi</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> exportData('false')}>hanya yang belum verifikasi</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Technician
            </Button>
          </div>
        )}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Turnamen {techData?.name}</CardTitle>
          <CardDescription>Peserta dan panitia dalam turnamen</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={techData.contestants} />
        </CardContent>
      </Card>

    </main>
  )
}

