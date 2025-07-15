import LoadingSolder from "@/components/loading-solder"
import { DELETE_TRANSACTION, GET_TRANSACTION } from "@/services/account"
import useAuthStore from "@/store/feature/authStand"
import useTransactionStore from "@/store/feature/transactionStand"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Plus, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { rupiahFormat } from "@/lib/utils"
import { useState } from "react"
import { getAllEvents } from "@/services/event"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IEvent } from "@/types/event"
import NewTransaction from "./new/newTransaction"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { DateTime } from "luxon"

export default function FinancePage() {
  const queryClient = useQueryClient()
  const { accessToken, user } = useAuthStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [eventId, setEventId] = useState("")
  const isAdmin = user?.role === "ADMIN" || user?.role === "SU";

  const [addNewTransaction, setAddNewTransaction] = useState(false)
  const [newBlock, setNewBlock] = useState(true)

  const [update, setUpdate] = useState({
    id: "",
    detail: "",
    amount: 0,
    status: "CREDIT" as "CREDIT" | "DEBIT",
    note: "",
    date: new Date(),
    eventId: ""
  })

  const { setData, setLoading, loading, data } = useTransactionStore()

  const { error } = useQuery({
    queryKey: ['GET_TRANSACTION', currentPage, eventId],
    queryFn: async () => {
      setLoading(true)
      const response = await GET_TRANSACTION(accessToken || "", currentPage, eventId)
      if (response) {
        setData(response.data)
        setLoading(false)
        return response
      }
    },
    enabled: !!accessToken,
    staleTime: 0
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

  const { mutate: deleteTransaction, isPending: deletePending } = useMutation({
    mutationFn: async (id: string) => {
      const response = await DELETE_TRANSACTION(accessToken || "", id)
      if (response) {
        setData(response.data)
        setLoading(false)
        return response
      }
    },
    onSuccess: () => {
      toast.success("Transaction deleted successfully")
      queryClient.invalidateQueries({ queryKey: ['GET_TRANSACTION'] });
    }
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleEventChange = (event: string) => {
    setEventId(event)
  }

  if (loading || isFetching || deletePending) {
    return <LoadingSolder />
  }

  if (error) {
    return (
      <div>
        error {error.message}
      </div>
    )
  }

  if (errorEvent) {
    return (
      <div>
        error {errorEvent.message}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Transaction</h1>
          {
            isAdmin && (
              <div className="flex gap-2">
                <Button onClick={() => {
                  setNewBlock(true)
                  setAddNewTransaction(true)
                }}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Transaction
                </Button>
              </div>
            )
          }
        </div>

        <div className="flex items-center mb-6 gap-4">
          <div className="relative flex-1">
            <Select onValueChange={handleEventChange}>
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
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{rupiahFormat(data.totalCredit) || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Debit</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{rupiahFormat(data.totalDebit) || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rupiahFormat(data.balance) || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Transaction debit and credit</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Detail</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Status</TableHead>
                  {
                    isAdmin && (
                      <TableHead className="text-right">Actions</TableHead>
                    )
                  }
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.accounts && data.accounts.map((ix, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{DateTime.fromISO(ix.date).toFormat('dd LLL yyyy')}</TableCell>
                    <TableCell className="font-medium">{ix.detail}</TableCell>
                    <TableCell>
                      {ix.amount.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      })}
                    </TableCell>
                    <TableCell>{ix.note}</TableCell>
                    <TableCell><Badge variant={ix.status === "DEBIT" ? "destructive" : "secondary"}>{ix.status}</Badge></TableCell>
                    {
                      isAdmin && (

                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => {
                            setNewBlock(false)
                            setUpdate({
                              ...ix,
                              date: DateTime.fromISO(ix.date).toJSDate()
                            })
                            setAddNewTransaction(true)
                          }}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => toast('Are you sure?', {
                            description: 'This action cannot be undone.',
                            action: {
                              label: 'Delete',
                              onClick: () => deleteTransaction(ix.id)
                            }
                          })}>
                            Delete
                          </Button>
                        </TableCell>
                      )
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Showing {data.totalPerPage || 0} of {data.total || 0} results</div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={data.totalPage === currentPage} onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* New Transaction */}
      <Sheet open={addNewTransaction} onOpenChange={setAddNewTransaction}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{newBlock ? "New" : "Update"} Transaction</SheetTitle>
            <SheetDescription>
              Make {newBlock ? "new" : "update"} transaction here
            </SheetDescription>
          </SheetHeader>
          <NewTransaction onClose={() => setAddNewTransaction(false)} update={update} isUpdate={newBlock} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

