import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private readonly userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<UserEntity>);
    registerUser(registerUserDto: RegisterUserDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            token: string;
            user: any;
        } | undefined;
    }>;
    private removePasswordFromUserObject;
    verifyUser(email: string, password: string): Promise<{}>;
    loginUser(user: any): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            token: string;
            user: any;
        } | undefined;
    }>;
    loginWithGoogle(accessToken: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            token: string;
            user: any;
        } | undefined;
    }>;
}
