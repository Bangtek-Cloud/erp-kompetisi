export interface IAccount {
    id: number;
    code: string;
    name: string;
    type: string;
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