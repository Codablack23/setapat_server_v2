import { DesignUnits } from 'src/lib';
export declare class CreateOrderResizeExtraDto {
    design_type: string;
    unit: DesignUnits;
    amount: number;
    page: number;
    width: number;
    height: number;
}
export declare class CreateOrderEditPageDto {
    page: number;
    revisions?: number;
    price: number;
    page_resizes?: CreateOrderResizeExtraDto[];
}
export declare class CreateOrderEditDto {
    pages: CreateOrderEditPageDto[];
}
