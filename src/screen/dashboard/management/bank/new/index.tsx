import { BankSchema, IBank } from "@/types/input/bank";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"; // Asumsi Anda punya komponen Button
import { Input } from "@/components/ui/input";   // Asumsi Anda punya komponen Input
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; // Asumsi Anda menggunakan Shadcn UI Form
import { toast } from "sonner";
import { createBankAccount } from "@/services/bank";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import LoadingSolder from "@/components/loading-solder";

export default function NewBankAccount() {
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof BankSchema>>({
        resolver: zodResolver(BankSchema),
        defaultValues: {
            BankName: "",
            BankType: "",
            BankNo: "",
            noHp: "",
        },
    });

    const { mutate: mutateCreate, isPending: isCreating } = useMutation({
        mutationFn: async (data: IBank) => {
            const response = await createBankAccount(data);
            if (response.success) {
                toast.success("Bank Account created successfully");
                queryClient.invalidateQueries({ queryKey: ["bank-management"] });
                navigate("/apps/management/bank");
            } else {
                toast.error(response.error);
            }
        },
    });

    // Fungsi yang akan dipanggil saat form disubmit
    function onSubmit(values: z.infer<typeof BankSchema>) {
        mutateCreate(values)
    }

    if(isCreating){
        return <LoadingSolder />
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="font-black text-2xl mb-6">New Bank Account</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Input untuk BankName */}
                    <FormField
                        control={form.control}
                        name="BankName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Pemilik Rekening</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nama pemilik rekening" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Input untuk BankType */}
                    <FormField
                        control={form.control}
                        name="BankType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jenis Bank</FormLabel>
                                <FormControl>
                                    <Input placeholder="Contoh: BCA, Mandiri, BRI" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Input untuk BankNo */}
                    <FormField
                        control={form.control}
                        name="BankNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nomor Rekening</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nomor rekening" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Input untuk noHp */}
                    <FormField
                        control={form.control}
                        name="noHp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nomor Handphone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nomor handphone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}