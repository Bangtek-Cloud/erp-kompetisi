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
import { deleteWebsiteSection, getAllWebsiteSections } from '@/services/website';
import { WEB_TYPE } from '@/constant/webType';
import { DateTime } from "luxon";
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import LoadingSolder from '@/components/loading-solder';

interface SectionType {
    id: string;
    name: string;
    type: number;
    show: boolean;
    url: string;
    updatedAt: Date;
    order: number;
    route: {
        url: string;
        path: string;
    }
}

export default function WebsiteIndex() {
    const queryClient = useQueryClient();
    const { accessToken } = useAuthStore();
    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery({
        queryKey: ['website-sections'],
        queryFn: () => getAllWebsiteSections(accessToken || ''),
    });
    
   

    const { mutate: handleDeleteWebsiteSection, isPending: isDeleting } = useMutation({
        mutationFn: async (id: string) => deleteWebsiteSection(accessToken || '', id),
        onSuccess: () => {
            toast.success("Berhasil menghapus section");
            queryClient.invalidateQueries({ queryKey: ["website-sections"] });
          },
          onError: (error) => {
            toast.error(error.message);
          },
    });

    if (isLoading || isDeleting) {
        return <LoadingSolder />
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Web Management</h1>
                <Button onClick={() => navigate('/apps/management/website/create')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Section
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tampilan</TableHead>
                            <TableHead>Url</TableHead>
                            <TableHead>Path</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.sort((a: SectionType, b: SectionType) => a.order - b.order).map((section: SectionType) => (
                            <TableRow key={section.id}>
                                <TableCell>{WEB_TYPE[section.type as keyof typeof WEB_TYPE]}</TableCell>
                                <TableCell>{section.route.url}</TableCell>
                                <TableCell>{section.route.path}</TableCell>
                                <TableCell>
                                    <Badge variant={section.show ? 'default' : 'destructive'}>
                                        {section.show ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{DateTime.fromISO(section.updatedAt.toString()).toFormat('dd MMM yyyy, HH:mm')}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" onClick={() => navigate(`/apps/management/website/update/${section.id}`)} className="mr-2">Edit</Button>
                                    <Button variant="ghost" onClick={() => handleDeleteWebsiteSection(section.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
