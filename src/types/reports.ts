export type ReportsStateProps = {
    error: object | string | null;
    loading: boolean;
    changeLog: any[];
};
export type ChangeLogMulticatalogo = {
    changeLogs: ChangeLog;
    fatherMerchant: boolean;
    idMerchant: number;
};

export type ChangeLog = {
    productLog: string;
    skuId: string | null;
    prodId: string;
    userLog: string;
    dateChange: string;
    idMerchant: number;
};
