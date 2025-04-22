import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import useAuthStore from '@/store/feature/authStand';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { WEB_TYPE } from '@/constant/webType';
import { DateTime } from "luxon";
import { useNavigate } from 'react-router';
import { deleteWebsiteRoute, getAllWebRoute } from '@/services/webRoute';
import { toast } from 'sonner';
interface SectionType {
    id: string;
    path: string;
    url: string;
    updatedAt: string;
}

export default function WebsiteRouteIndex() {
    const { accessToken } = useAuthStore();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const {mutate: delData} = useMutation({
        mutationFn: async (id: string) => {
            const response = await deleteWebsiteRoute(accessToken || '', id);
            if(response.success) {
                toast.success("Website route deleted successfully");
                queryClient.invalidateQueries({ queryKey: ['website-routes'] });
            } else {
                toast.error(response.error);
            }
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['website-routes'] });
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['website-routes'],
        queryFn: () => getAllWebRoute(accessToken || ''),
    });
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <h1 className="text-2xl font-bold">Website Route Management</h1>
                <Button className="ml-auto flex items-center" onClick={() => navigate('/apps/management/web-route/create')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Route
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Path Name</TableHead>
                            <TableHead>Url</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((section: SectionType) => (
                            <TableRow key={section.id}>
                                <TableCell>{section.path}</TableCell>
                                <TableCell>{section.url}</TableCell>
                                <TableCell>{DateTime.fromISO(section.updatedAt.toString()).toFormat('dd MMM yyyy, HH:mm')}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" className="mr-2" onClick={() => navigate(`/apps/management/web-route/update/${section.id}`)}>Edit</Button>
                                    <Button variant="ghost" onClick={() => delData(section.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
