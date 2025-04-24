import useUserStore from "@/store/feature/userStand"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, PencilRuler } from "lucide-react"
import { DataTable } from "@/components/data-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IUser } from "@/types/user"
import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuthStore from "@/store/feature/authStand"
import { changeRoleUser } from "@/services/auth"
import { toast } from "sonner"
import LoadingSolder from "@/components/loading-solder"

export default function UserlistManagement() {
    const {user, accessToken} = useAuthStore()
    const qc = useQueryClient()
    const { data } = useUserStore()
    const navigate = useNavigate()

    const columns: ColumnDef<IUser>[] = [
        {
            accessorKey: 'name',
            header: () => <div style={{ minWidth: '100px' }}></div>,
            cell({ row }) {
                if (row.original.usingAvatar) {
                    return (
                        <Avatar>
                            <AvatarImage src={import.meta.env.VITE_BASE_S3 + row.original.avatar} alt={row.original.email} />
                            <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                    )
                } else {
                    return (
                        <Avatar>
                            <AvatarImage src={row.original.avatar} alt={row.original.email} />
                            <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                    )
                }
            },
        },
        {
            accessorKey: 'name',
            header: () => <div style={{ minWidth: '100px' }}>Nama Lengkap</div>,
        },
        {
            accessorKey: 'email',
            header: () => <div style={{ minWidth: '100px' }}>Email</div>,
        },
        {
            accessorKey: 'id',
            header: 'Action',
            cell: ({row}) => {
                return(
                    <div className="flex gap-2">
                        
                        {row.original.role === 'USER' ? <Button size={'sm'} variant={'outline'} onClick={()=> navigate('/apps/management/user/' + row.original.id)}><PencilRuler /></Button> : null}
{user?.role === 'SU' && row.original.role  !== 'SU' ? <Button size={'sm'} variant={'outline'} onClick={()=> updateRoles({id: row.original.id, role: row.original.role})}>{row.original.role} to {row.original.role === 'ADMIN' ? 'USER' : 'ADMIN' }</Button> : null}
                    </div>
                )
            }
        }
    ]

    const {mutate: updateRoles, isPending} = useMutation({
        mutationFn: async (data: any) => {
            const kirim = {
                userId: data.id,
                role: data.role === 'ADMIN' ? 'USER' : 'ADMIN'
            }
            const response = await changeRoleUser(kirim, accessToken || "")
            if(response.success){
                toast.success(response.message)
                qc.invalidateQueries({queryKey: ['user-management']})
            } else {
                toast.error(response.error)
            }
        }
    })

    if(isPending){
        return <LoadingSolder />
    }

    return (
        <main className="flex-1 container mx-auto p-8">
            <div className="flex md:flex-row gap-4 flex-col justify-between md:items-center mb-8">
                <h1 className="text-3xl font-bold text-left">User</h1>
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant={'secondary'}>
                                <Download /> Export
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {/* <DropdownMenuItem onClick={()=> exportData('semua')}>Semua data</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> exportData('true')}>Hanya yang sudah verifikasi</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> exportData('false')}>hanya yang belum verifikasi</DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Technician
                    </Button> */}
                </div>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>List User</CardTitle>
                    <CardDescription>Daftar semua user</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>

        </main>
    )
}