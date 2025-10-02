import { DesignClass, DesignUnits, DesignPackage } from 'src/lib';
export declare class PagesDto {
    is_default?: boolean;
    design_type: string;
    paper_size: string;
    paper_type: string;
    unit: DesignUnits;
    page_number: number;
    price: number;
    width: number;
    height: number;
}
export declare class CreateOrderDto {
    design_type: string;
    design_class: DesignClass;
    quick_delivery?: boolean;
    design_package: DesignPackage;
    delivery_time: number;
    amount: number;
    pages: PagesDto[];
}
