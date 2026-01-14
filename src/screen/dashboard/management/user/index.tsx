import { useQuery } from "@tanstack/react-query";
import UserlistManagement from "./list";
import useUserStore from "@/store/feature/userStand";
import LoadingSolder from "@/components/loading-solder";
import { getAllUser } from "@/services/auth";
import { useState } from "react";

export default function Userlist() {
    const { loading, setData, setLoading, setError } = useUserStore()
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [search, setSearch] = useState('')


    const { error } = useQuery({
        queryKey: ['user-management', page, limit, search],
        queryFn: async () => {
            const response = await getAllUser({ page, limit, search })
            if (response.success) {
                console.log(response.data, response.meta)
                setData(response.data, response.meta)
                setLoading(false)
                return response.data
            }
        },
        staleTime: 0
    })

    if (error) {
        setError(error.message)
        return (
            <div>
                Terjadi kesalahan {error.message}
            </div>
        )
    }

    if (loading) {
        return (
            <LoadingSolder />
        )
    }

    return (
        <UserlistManagement setSearch={setSearch} page={page} setPage={setPage} />
    )
}