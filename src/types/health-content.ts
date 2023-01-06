export type HCStateProps = {
    error: object | string | null;
    loading: boolean;
    updating: boolean;
    firstLevel?: HCHealthContent[] | undefined;
};

export type HCHealthContent = {
    skuCatalog: SkuHC[];
    name: string;
    totalImages: number;
    executionDate: string | null;
    totalProducts: number;
    totalSkus: number;
    overallScore: number;
    metricRange: MetricsRange[] | null;
};

export type SkuHC = {
    skuId: number;
    skuName: string;
    skuReferenceCode: string | null;
    eanUpc: string | null;
    dateInsert: string | null;
};

export type MetricsRange = {
    percentage: number;
    metricTypeId: number;
    typeDescription: string | null;
    description: string | null;
    merchantId: number | null;
    metricConfigRangeId: number;
};
