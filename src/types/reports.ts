export type ReportsStateProps = {
    error: object | string | null;
    loading: boolean;
    changeLog: ChangeLog[];
};

export type ChangeLog = {
    productLog: string;
    skuId: string | null;
    prodId: string;
    userLog: string;
    dateChange: string;
    idMerchant: number;
};
