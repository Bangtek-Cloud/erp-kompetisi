import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NEW_TRANSACTION, UPDATE_TRANSACTION } from "@/services/account";
import { getAllEvents } from "@/services/event";
import useAuthStore from "@/store/feature/authStand";
import { IAccountForm } from "@/types/account";
import { IEvent } from "@/types/event";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UpdateInterface extends IAccountForm {
    id: string
}

export default function NewTransaction({ onClose, update, isUpdate }: { onClose: () => void, update: UpdateInterface, isUpdate: boolean }) {
    const queryClient = useQueryClient();
    const { accessToken } = useAuthStore()
    const [form, setForm] = useState<IAccountForm>({
        detail: "",
        amount: 0,
        status: "CREDIT",
        note: "",
        date: new Date(),
        eventId: ""
    })

    const { data: dataEvent, error: errorEvent, isFetching } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const response = await getAllEvents(accessToken || "");
            if (response?.error) {
                return new Error(response.error);
            }
            if (response?.success) {
                return response.data;
            }
            return [];
        }
    })

    const {mutate, isPending} = useMutation({
        mutationFn: async () => {
            let response
            if(!isUpdate) {
                 response = await UPDATE_TRANSACTION(accessToken || "", update.id, form);
            } else {
                response = await NEW_TRANSACTION(accessToken || "", form);
            }
            if(response.success) {
                toast.success("Transaction created successfully");
            } else {
                toast.error(response.message);
            }
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GET_TRANSACTION'] });
            onClose();
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!form.eventId) {
            toast.error("Event is required");
            return;
        }
        if(!form.detail) {
            toast.error("Detail is required");
            return;
        }
        if(!form.amount) {
            toast.error("Amount is required");
            return;
        }
        if(!form.date) {
            toast.error("Date is required");
            return;
        }
        if(!form.note) {
            toast.error("Note is required");
            return;
        }
        mutate();
    }

    useEffect(() => {
        if(update) {
            setForm({
                ...update,
                date: new Date(update.date)
            });
        }
    }, [update])

    if(isFetching || isPending) {
        return <div>Loading...</div>
    }

    if(errorEvent) {
        return <div>{errorEvent.message}</div>
    }

    return (
        <div className="grid gap-4 py-4 mx-2">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="detail" className="text-right">
                    Detail
                </Label>
                <Textarea
                    id="detail"
                    required
                    value={form.detail}
                    onChange={(e) => setForm({ ...form, detail: e.target.value })}
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                    Amount
                </Label>
                <Input
                    id="amount"
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                    Status
                </Label>

                <Select value={form.status} onValueChange={(e) => setForm({ ...form, status: e as "CREDIT" | "DEBIT" })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="CREDIT">CREDIT</SelectItem>
                            <SelectItem value="DEBIT">DEBIT</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="note" className="text-right">
                    Note
                </Label>
                <Textarea
                    id="note"
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                    Date
                </Label>
                <Input
                    id="date"
                    type="date"
                    value={form.date.toISOString().split("T")[0]}
                    onChange={(e) => setForm({ ...form, date: new Date(e.target.value) })}
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="eventId" className="text-right">
                    Event ID
                </Label>
                 <Select onValueChange={(e) => setForm({ ...form, eventId: e })} value={form.eventId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Event</SelectLabel>
                  {
                    dataEvent && dataEvent?.map((event: IEvent) => (
                      <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>
            <Button onClick={handleFormSubmit}>
                Submit
            </Button>
        </div>
    )
}