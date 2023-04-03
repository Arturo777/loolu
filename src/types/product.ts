import { SupplierType } from './catalog';
import { Products } from './e-commerce';

export interface MerchantProductType {
    merchantId: number;
    merchantName: string;
    detailProduct: Products;
}

export interface DetailProductType {
    productID: string;
    vtexProductID: number | null;
    productName: string;
    nameComplete: string | null;
    departmentId: string | null;
    categoryId: number;
    productGlobalCategoryID: number | null;
    brandId: number;
    brandName: string;
    linkId: string;
    imageUrl: string;
    lastDateUpdate: string;
    userUpdate: string;
    merchantId: number;
    isVisible: boolean;
    description: string;
    productDescription: string | null;
    descriptionShort: string;
    releaseDate: string | null;
    keyWords: string;
    title: string;
    taxCode: null;
    metaTagDescription: string;
    provider: SupplierType;
    showWithoutStock: boolean;
    isActive: boolean;
    productStatus: string;
    syncStatusVTEX: string;
    productRefID: string;
    skuName: string | null;
    manufacturerCode: number | null;
    tradePolicies: any[];
    sku: number | null;
    isEcommerce: boolean;
    preventa: {
        Isactive: boolean;
        Fechainicio: string | null;
        Fechafin: string | null;
        Inventario: number;
    };
    sobrePedido: {
        Isactive: boolean;
        Fechainicio: string | null;
        Fechafin: string | null;
        Inventario: number;
    };
    isVtexCreated: boolean | null;
    merchantName: string;
    presale: boolean;
    kit: boolean;
    inventoried: boolean;
    giftCardRecharge: boolean;
    transported: boolean;
}
