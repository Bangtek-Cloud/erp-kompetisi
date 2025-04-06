import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const translate = (status: string) => {
  switch (status) {
    case "UPCOMING":
      return "Akan Datang";
    case "ONGOING":
      return "Sedang Berlangsung";
    case "FINISHED":
      return "Selesai";
    default:
      return status;
  }
}

export const rupiahFormat = (number: number)=>{
  return "Rp" + new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}