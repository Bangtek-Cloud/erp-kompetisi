import LoadingSolder from "@/components/loading-solder"
import { rupiahFormat } from "@/lib/utils"
import { GET_TRANSACTION } from "@/services/account"
import useAuthStore from "@/store/feature/authStand"
import useTransactionStore from "@/store/feature/transactionStand"
import { IJournal, ITransaction } from "@/types/account"
import { useQuery } from "@tanstack/react-query"

export default function FinancePage() {
  const {accessToken} = useAuthStore()

  const {setData, setLoading, loading} = useTransactionStore()

  const { error, data } = useQuery({
    queryKey: ['GET_TRANSACTION'],
    queryFn: async () => {
      const response = await GET_TRANSACTION(accessToken || "")
      if (response) {
        console.log('resss', response)
        setData(response)
        setLoading(false)
        return response
      }
    },
  })

  if(loading){
    return <LoadingSolder />
  }

  if(error){
    return (
      <div>
        error {error.message}
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Transaksi & Buku Besar</h1>

      {/* Form Tambah Transaksi */}
      <div className="bg-card shadow rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Tambah Transaksi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="date"  className="border rounded px-3 py-2 w-full" />
          <input type="text" className="border rounded px-3 py-2 w-full" />
        </div>
        {/* {journalEntries.map((entry, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-4 mb-2">
            <input type="number" placeholder="Account ID" value={entry.accountId} onChange={e => {
              const copy = [...journalEntries];
              copy[idx].accountId = parseInt(e.target.value);
              setJournalEntries(copy);
            }} className="border rounded px-3 py-2" />
            <input type="number" placeholder="Debit" value={entry.debit} onChange={e => {
              const copy = [...journalEntries];
              copy[idx].debit = parseInt(e.target.value);
              setJournalEntries(copy);
            }} className="border rounded px-3 py-2" />
            <input type="number" placeholder="Kredit" value={entry.credit} onChange={e => {
              const copy = [...journalEntries];
              copy[idx].credit = parseInt(e.target.value);
              setJournalEntries(copy);
            }} className="border rounded px-3 py-2" />
          </div> ))} */}
       
        {/* <button onClick={() => setJournalEntries([...journalEntries, { accountId: 1, debit: 0, credit: 0 }])} className="text-blue-600 hover:underline mb-4">+ Tambah Baris Jurnal</button> */}
        <div>
          <button onClick={()=> alert('test')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan Transaksi</button>
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="bg-card shadow rounded-lg p-6 text-xs">
        <h2 className="text-xl font-semibold mb-4">Daftar Transaksi</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-card">
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Deskripsi</th>
                <th className="px-4 py-2 border">Akun</th>
                <th className="px-4 py-2 border">Debit</th>
                <th className="px-4 py-2 border">Kredit</th>
                <th className="px-4 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tx: ITransaction) => (
                tx.journal.map((j: IJournal, idx: number) => (
                  <tr key={`${tx.id}-${idx}`}>
                    {idx === 0 && (
                      <>
                        <td className="px-4 py-2 border" rowSpan={tx.journal.length}>{new Date(tx.date).toLocaleDateString()}</td>
                        <td className="px-4 py-2 border" rowSpan={tx.journal.length}>{tx.description}</td>
                      </>
                    )}
                    <td className="px-4 py-2 border">{j.account.name}</td>
                    <td className="px-4 py-2 border text-right">{j.debit}</td>
                    <td className="px-4 py-2 border text-right">{j.credit}</td>
                    {idx === 0 && (
                      <td className="px-4 py-2 border text-center" rowSpan={tx.journal.length}>
                        <button onClick={() => alert('test')} className="text-red-600 hover:underline">Hapus</button>
                      </td>
                    )}
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

