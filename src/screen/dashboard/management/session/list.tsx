import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { IUserSession } from "@/types/user"
import { ColumnDef } from "@tanstack/react-table"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAuthStore from "@/store/feature/authStand"
import { revokeSession } from "@/services/session"
import { toast } from "sonner"
import LoadingSolder from "@/components/loading-solder"
import useSessionStore from "@/store/feature/sessionStand"

export default function UserlistManagement() {
    const { user, accessToken } = useAuthStore()
    const qc = useQueryClient()
    const { data } = useSessionStore()

    const columns: ColumnDef<IUserSession>[] = [
        {
            accessorKey: 'name',
            header: () => <div style={{ minWidth: '100px' }}>Full name</div>,
        },
        {
            accessorKey: 'mail',
            header: () => <div style={{ minWidth: '100px' }}>Email</div>,
        },
        {
            accessorKey: 'id',
            header: 'Action',
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2">
                        {user?.email !== row.original.mail ? <Button size={'sm'} variant={'destructive'} onClick={() => revokeUser({ id: row.original.uid })}><LogOut /> Paksa Keluar</Button> : null}
                    </div>
                )
            }
        }
    ]


    const { mutate: revokeUser, isPending } = useMutation({
        mutationFn: async (data: {
            id: string
        }) => {
            const response = await revokeSession(accessToken || "", data.id)
            if (response.success) {
                toast.success(response.message)
                qc.invalidateQueries({ queryKey: ['session'] })
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
                <h1 className="text-3xl font-bold text-left">User Session</h1>
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