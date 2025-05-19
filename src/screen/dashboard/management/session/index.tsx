import { useQuery } from "@tanstack/react-query";
import UserlistManagement from "./list";
import useAuthStore from "@/store/feature/authStand";
import LoadingSolder from "@/components/loading-solder";
import { getAllUserSession } from "@/services/session";
import useSessionStore from "@/store/feature/sessionStand";

export default function UserSessionlist() {
    const { accessToken } = useAuthStore()
    const { loading, setData, setLoading, setError } = useSessionStore()

    const { error } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const response = await getAllUserSession(accessToken || "")
            if (response.success) {
                setData(response.data)
                setLoading(false)
                return response.data
            }
        },
        staleTime: 0
    })

    if(error){
        setError(error.message)
        return(
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
        <UserlistManagement />
    )
}