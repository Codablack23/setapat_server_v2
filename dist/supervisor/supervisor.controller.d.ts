import { SupervisorService } from './supervisor.service';
export declare class SupervisorController {
    private readonly supervisorService;
    constructor(supervisorService: SupervisorService);
    getOrders(): void;
    updateProfile(): void;
    getStats(): void;
    setupProfile(): void;
    getConversations(): void;
    getConversationDetails(): void;
}
