import { DesignerRanks, DesignerRole } from "src/lib";
import { OrderAssignmentEntity } from "./entity.order_assignments";
import { UserEntity } from "./entity.user";
export declare class DesignerProfileEntity {
    id: string;
    role: DesignerRole;
    level: number;
    rank: DesignerRanks;
    user: UserEntity;
    order_assignments: OrderAssignmentEntity[];
    designers: DesignerProfileEntity[];
    supervisor?: DesignerProfileEntity | null;
    designer_specifications: string[];
    working_days: string[];
    resume_link: string;
    portfolio_link: string;
    opens_at: string;
    closes_at: string;
    created_at: Date;
    updated_at: Date;
}
