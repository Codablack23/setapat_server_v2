import { Gender } from "src/lib";
export declare class UpdateProfileDto {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone_number?: string;
    avatar?: string;
    reason?: string;
    telegram_handle?: string;
    gender?: Gender;
}
export declare class UpdateAvatarDto {
    avatar: string;
}
