import { AuthService } from './auth.service';
import { LoginWithGoogleDto, RegisterUserDto } from './dto';
import type { AuthRequest } from 'src/lib';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuthStatus(req: any): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            token: string;
            user: any;
        } | undefined;
    }>;
    login(req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            token: string;
            user: any;
        } | undefined;
    }>;
    loginWithGoogle({ access_token }: LoginWithGoogleDto): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            token: string;
            user: any;
        } | undefined;
    }>;
    register(body: RegisterUserDto): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            token: string;
            user: any;
        } | undefined;
    }>;
    logout(): {
        status: string;
        message: string;
    };
    forgotPassword(): {
        status: string;
        message: string;
    };
    resetPassword(): {
        status: string;
        message: string;
    };
}
