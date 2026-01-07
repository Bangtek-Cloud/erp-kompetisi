import { z } from "zod";

export interface IBank {
    BankName: string
    BankType: string
    BankNo: string
    noHp: string
}

export interface IBankTable extends IBank {
    id: string
}


export const BankSchema = z.object({
    BankName: z.string().min(2, {
        message: "Nama Pemilik Rekening Wajib diisi"
    }),
    BankType: z.string().min(1, {
        message: "Jenis Bank Wajib diisi"
    }),
    BankNo: z.string().min(8, { // Asumsi nomor rekening minimal 8 digit
        message: "Nomor Rekening Wajib diisi dan minimal 8 digit"
    }).regex(/^\d+$/, { // Memastikan hanya berisi angka
        message: "Nomor Rekening harus berupa angka"
    }),
    noHp: z.string().min(10, { // Asumsi nomor HP minimal 10 digit
        message: "Nomor Handphone Wajib diisi dan minimal 10 digit"
    }).regex(/^\d+$/, { // Memastikan hanya berisi angka
        message: "Nomor Handphone harus berupa angka"
    })
});