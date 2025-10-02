import { UserType } from "src/lib";
export declare class RegisterUserDto {
    firstname: string;
    lastname: string;
    email: string;
    phone_number: string;
    password: string;
    user_type?: UserType;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class LoginWithGoogleDto {
    access_token: string;
}
