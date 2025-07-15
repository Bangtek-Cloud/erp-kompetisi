import { BankSchema, IBank } from "@/types/input/bank";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { updateBankAccount, getBankById } from "@/services/bank";
import useAuthStore from "@/store/feature/authStand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import LoadingSolder from "@/components/loading-solder";
import { useEffect } from "react";

export default function UpdateBankAccount() {
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof BankSchema>>({
    resolver: zodResolver(BankSchema),
    defaultValues: {
      BankName: "",
      BankType: "",
      BankNo: "",
      noHp: "",
    },
  });

  const { data: bank, isLoading, error } = useQuery({
    queryKey: ["bank", id],
    queryFn: async () => {
      if (!id) throw new Error("Bank ID is missing");
      const response = await getBankById(accessToken || "", id);
      if (response.success) {
        return response.data;
      }
      throw new Error(response.error || "Failed to fetch bank data");
    },
    enabled: !!id && !!accessToken,
  });

  useEffect(() => {
    if (bank) {
      form.reset({
        BankName: bank.BankName || "",
        BankType: bank.BankType || "",
        BankNo: bank.BankNo || "",
        noHp: bank.noHp || "",
      });
    }
  }, [bank, form]);

  const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
    mutationFn: async (data: IBank) => {
      const response = await updateBankAccount(accessToken || "", id || "", data);
      if (response.success) {
        toast.success("Bank Account updated successfully");
        queryClient.invalidateQueries({ queryKey: ["bank-management"] });
        navigate("/apps/management/bank");
      } else {
        toast.error(response.error);
      }
    },
  });

  function onSubmit(values: z.infer<typeof BankSchema>) {
    mutateUpdate(values);
  }

  if (isLoading || isUpdating) {
    return <LoadingSolder />;
  }

  if (error) {
    return <div>Terjadi kesalahan: {error.message}</div>;
  }

  if (!bank) {
    return <div>Bank account not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-black text-2xl mb-6">Update Bank Account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit">Update</Button>
        </form>
      </Form>
    </div>
  );
}