import { useQuery } from "@tanstack/react-query";
import UserlistManagement from "./list";
import useAuthStore from "@/store/feature/authStand";
import useUserStore from "@/store/feature/userStand";
import LoadingSolder from "@/components/loading-solder";
import { getAllUser } from "@/services/auth";

export default function Userlist() {
    const { accessToken } = useAuthStore()
    const { loading, setData, setLoading, setError } = useUserStore()

    const { error } = useQuery({
        queryKey: ['user-management'],
        queryFn: async () => {
            const response = await getAllUser(accessToken || "")
            if (response.success) {
                setData(response.data)
                setLoading(false)
                return response.data
            }
        },
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