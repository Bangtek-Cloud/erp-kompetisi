import useUserStore from "@/store/feature/userStand"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, PencilRuler, Search } from "lucide-react"
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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

type UPSs = {
    setSearch: (search: string) => void;
    page: number;
    setPage: (page: number) => void;

}

export default function UserlistManagement(params: UPSs) {
    const { user } = useAuthStore()
    const qc = useQueryClient()
    const { data, meta } = useUserStore()
    const navigate = useNavigate()
    const [find, setFind] = useState("")
    const totalPages = meta?.totalPages ?? 1

    // alert(totalPages)

    function getPageRange(current: number, total: number, window = 1) {
        const start = Math.max(1, current - window)
        const end = Math.min(total, current + window)

        return { start, end }
    }

    const { start, end } = getPageRange(params.page, totalPages)



    const columns: ColumnDef<IUser>[] = [
        {
            accessorKey: 'name',
            header: () => <div style={{ minWidth: '100px' }}></div>,
            cell({ row }) {
                return (
                    <Avatar>
                        <AvatarImage src={row.original.avatar} alt={row.original.email} />
                        <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                )
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
            accessorKey: 'role',
            header: () => <div style={{ minWidth: '100px' }}>Role</div>,
        },
        {
            accessorKey: 'id',
            header: 'Action',
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2">
                        {row.original.role === 'USER' ? <Button size={'sm'} variant={'outline'} onClick={() => navigate('/apps/management/user/' + row.original.id)}><PencilRuler /></Button> : null}
                        {user?.role === 'SU'
                            && row.original.role !== 'SU'
                            && row.original.id !== user.id && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="sm" variant="secondary">
                                            Ubah Role
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Set Role</DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        {['USER', 'ADMIN', 'EDITOR'].map((role) => (
                                            <DropdownMenuItem
                                                key={role}
                                                disabled={row.original.role === role}
                                                onClick={() =>
                                                    updateRoles({
                                                        id: row.original.id,
                                                        role
                                                    })
                                                }
                                            >
                                                {role}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}

                    </div>
                )
            }
        }
    ]

    const { mutate: updateRoles, isPending } = useMutation({
        mutationFn: async (data: { id: string, role: string }) => {
            const kirim = {
                userId: data.id,
                role: data.role
            }
            const response = await changeRoleUser(kirim)
            if (response.success) {
                toast.success(response.message)
                qc.invalidateQueries({ queryKey: ['user-management'] })
            } else {
                toast.error(response.error)
            }
        }
    })

    if (isPending) {
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
                    <div className="flex items-center py-4 gap-2">
                        <Input
                            placeholder="Cari Berdasarkan Email atau Nama Lengkap"
                            value={find}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setFind(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        <Button onClick={() => params.setSearch(find)} variant={'secondary'}>
                            <Search />
                        </Button>
                    </div>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>


            <Pagination>
                <PaginationContent>
                    {/* PREV */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                params.setPage(Math.max(params.page - 1, 1))
                            }
                        />
                    </PaginationItem>

                    {/* PAGE 1 */}
                    {start > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationLink
                                    isActive={params.page === 1}
                                    onClick={() => params.setPage(1)}
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>

                            {start > 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                        </>
                    )}

                    {/* MIDDLE WINDOW */}
                    {Array.from({ length: end - start + 1 }).map((_, i) => {
                        const page = start + i
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={page === params.page}
                                    onClick={() => params.setPage(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}

                    {/* LAST PAGE */}
                    {end < totalPages && (
                        <>
                            {end < totalPages - 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationLink
                                    isActive={params.page === totalPages}
                                    onClick={() => params.setPage(totalPages)}
                                >
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    {/* NEXT */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                params.setPage(
                                    Math.min(params.page + 1, totalPages)
                                )
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </main>
    )
}