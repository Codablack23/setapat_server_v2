import { DesignerRanks, Gender } from "src/lib";
import { OrderEntity } from "./entity.order";
export declare class DesignerApplicationEntity {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    gender: Gender;
    phone_number: string;
    avatar: string;
    telegram_handle?: string;
    rank: DesignerRanks;
    designer_specifications: string[];
    resume_link: string;
    portfolio_link: string;
    working_days: string[];
    opens_at: string;
    closes_at: string;
    orders: OrderEntity[];
    created_at: Date;
    updated_at: Date;
}
