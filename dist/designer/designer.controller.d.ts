import { DesignerService } from './designer.service';
export declare class DesignerController {
    private readonly designerService;
    constructor(designerService: DesignerService);
    getOrders(): void;
    updateProfile(): void;
    getConversations(): void;
    getStats(): void;
    setupProfile(): void;
    applyForPromotion(): void;
}
