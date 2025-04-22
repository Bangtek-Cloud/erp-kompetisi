import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWebsiteRoute, getAllWebRoute, getWebRouteById, updateWebsiteRoute } from "@/services/webRoute";
import useAuthStore from "@/store/feature/authStand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";

export default function UpdateOrCreateWebsiteRoute({ actionType }: { actionType: "create" | "update" }) {
    const { webRouteId } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { accessToken } = useAuthStore();     
    const [formData, setFormData] = useState({
        path: "",
        url: "",
    });

    const { isLoading, error } = useQuery({
        queryKey: ['website-routes-by-id', webRouteId],
        queryFn: async () => {
            if(actionType === "update") {
                const response = await getWebRouteById(accessToken || '', webRouteId || '');
                if(response.success) {
                    setFormData({
                        path: response.data.path,
                        url: response.data.url,
                    });
                }
            }
            return getAllWebRoute(accessToken || '');
        },
        enabled: webRouteId !== undefined,
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    });

    const { mutate: mutateCreate, isPending: isCreating } = useMutation({
        mutationFn: async (data: { path: string, url: string }) => {
            const response = await createWebsiteRoute(accessToken || '', data);
           if(response.success) {
            toast.success("Website route created successfully");
            queryClient.invalidateQueries({ queryKey: ["website-routes"] });
            navigate("/apps/management/web-route");
           } else {
            toast.error(response.error);
           }
        },
    });

    const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
        mutationFn: async (data: { path: string, url: string }) => {
            const response = await updateWebsiteRoute(accessToken || '', webRouteId || '', data);
            if(response.success) {
                toast.success("Website route updated successfully");
                queryClient.invalidateQueries({ queryKey: ["website-routes"] });
                navigate("/apps/management/web-route");
            } else {
                toast.error(response.error);
            }
        },
    });


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(!formData.path || !formData.url) {
            toast.error("Path and URL are required");
            return;
        }

        if(actionType === "create") {
            mutateCreate(formData);
        } else if(actionType === "update") {
            mutateUpdate(formData);
        }
    }

    const isSubmitting = isCreating || isUpdating;

    if(isLoading) {
        return <div>Loading...</div>;
    }

    if(error) {
        return <div>Error: {error.message}</div>;
    }
    

    return (
        <div className="container mx-auto py-6">
          <h1 className="text-2xl font-bold">
            {actionType === "create" ? "Create Website Route" : "Update Website Route"}
          </h1>
          <form className="mt-4 space-y-4 max-w-2xl" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <Label>Route Name</Label>
              <div className="col-span-2">
                <Input type="text" placeholder="Route Name" value={formData.path} onChange={(e) => setFormData({ ...formData, path: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Label>Route URL</Label>
                <div className="col-span-2">
                    <Input type="text" placeholder="Route URL" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
                </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : actionType === "create" ? "Create" : "Update"}
            </Button>
          </form>
        </div>
    )
}
