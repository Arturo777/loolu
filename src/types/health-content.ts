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
export type SecondLevelProd = {
    metricPoor: Metric[] | [];
    metricGood: Metric[] | [];
    metricFair: Metric[] | [];
    resumeProducts?: ResumenProducts[];
    resume?: ResumenProducts[];
};
export type ThirdLevel = {
    merchantId: number;
    productId: number;
    categoryIdProduct: number;
    categoryIdMetric: number;
    productReferenceCodeScore: boolean;
    pageTitleScore: boolean;
    brandNameScore: boolean;
    categoryScore: boolean;
    textLinkScore: boolean;
    skuReferenceCodeScore: boolean;
    eanUpcScore: boolean;
    dimensionHeightScore: boolean;
    dimensionWidthScore: boolean;
    dimensionLargeScore: boolean;
    dimensionWeightScore: boolean;
    totalScore: number;
    maxScore: number;
    totalScorePercentage: number;
    metricConfigRangeId: number;
    metricDescription: string;
    created: string;
};
export type Metric = {
    merchantId: number | null;
    productId: number;
    completeness: number | null;
    metricConfigRangeId: number;
    categoryId: number | null;
    categoryName: string | null;
    eanUpc: string[];
    productReferenceCode: string | null;
    brandName: string | null;
};
export type ResumenProducts = {
    merchantId: number | null;
    metricConfigRangeId: number;
    description: string;
    productReferenceCodeScorePercentage?: number;
    productReferenceCodeCount?: number;
    pageTitleScorePercentage?: number;
    pageTitleCount?: number;
    brandNameScorePercentage?: number;
    brandNameCount?: number;
    categoryScorePercentage?: number;
    categoryCount?: number;
    textLinkScorePercentage?: number;
    textLinkCount?: number;
    skuReferenceCodeScorePercentage?: number;
    skuReferenceCodeCount?: number;
    eanUpcScorePercentage?: number;
    eanUpcCount?: number;
    dimensionHeightScorePercentage?: number;
    dimensionHeightCount?: number;
    dimensionWidthScorePercentage?: number;
    dimensionWidthCount?: number;
    dimensionLargeScorePercentage?: number;
    dimensionLargeCount?: number;
    dimensionWeightScorePercentage?: number;
    dimensionWeightCount?: number;
    totalProducts?: number;
    totalProductsPercentage?: number;
    totalScore?: number;
    dimensionScorePercen?: number;
    dimensionCount?: number;
    qualityScorePercen?: number;
    qualityCount?: number;
    sizeScorePercen?: number;
    sizeCount?: number;
    quantityScorePerce?: number;
    quantityCount?: number;
    totalProductScore?: number;
    totalProductCount?: number;
    totalSkuScore?: number;
    totalSkuCount?: number;
};

export interface HealthContentStateProps {
    loading: boolean;
    updating: boolean;
    error: object | string | null;
    firstLevel?: HCHealthContent[] | undefined;
    secondLevelProducts: SecondLevelProd[];
    secondLevelImages: SecondLevelProd[];
    secondLevelFacets: SecondLevelProd[];
    thirdLevelProducts: ThirdLevel[];
}