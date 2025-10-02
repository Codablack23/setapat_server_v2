import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): void;
    getAllAdmins(): void;
    getOrders(): void;
    addAdmin(): void;
    updateProfile(): void;
    getAdminStatistics(): void;
    getUserDetila(): void;
    setupProfile(): void;
    getApplications(): void;
    getApplication(): void;
    suspendUsers(): void;
    activateUsers(): void;
    suspendAdmin(): void;
    activateAdmin(): void;
    acceptApplication(): void;
    rejectApplication(): void;
}
