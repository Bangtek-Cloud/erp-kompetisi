export interface IAccount {
    id: string;
    detail: string;
    amount: number;
    status: "CREDIT" | "DEBIT";
    note: string;
    createdAt: Date;
    updatedAt: Date;
    eventId: string;
    date: string
}

export interface IResAccount {
    accounts: IAccount[];
    total: number;
    totalPage: number;
    totalCredit: number;
    totalDebit: number;
    balance: number
    totalPerPage: number
}

export interface IAccountForm {
    detail: string;
    amount: number;
    status: "CREDIT" | "DEBIT";
    note: string;
    date: Date;
    eventId: string;
}

export interface IJournal {
    account: IAccount;
    debit: number;
    credit: number;
}

export interface ITransaction {
    id: number;
    date: string;
    description: string;
    journal: IJournal[];
}