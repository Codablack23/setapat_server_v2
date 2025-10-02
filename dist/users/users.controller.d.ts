import { UsersService } from './users.service';
import { UpdateAvatarDto, UpdateProfileDto } from './dto';
import type { AuthRequest } from 'src/lib';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserProfile(): void;
    deleteUserAccount(): void;
    updateUserProfile(updateProfileDto: UpdateProfileDto, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            profile: {
                id: string;
                firstname: string;
                lastname: string;
                email: string;
                user_type: import("src/lib").UserType;
                gender: import("src/lib").Gender;
                reason?: string;
                phone_number: string;
                avatar: string;
                telegram_handle?: string;
                orders: import("../entities").OrderEntity[];
                designer: import("../entities/entity.designer").DesignerProfileEntity;
                notifications: import("../entities/entity.notification").NotificationEntity[];
                sent_messages: import("../entities/entity.messages").MessageEntity[];
                participants: import("../entities/entity.participants").ConversationParticipantEntity[];
                created_at: Date;
                updated_at: Date;
            };
        } | undefined;
    }>;
    updateProfilePicture(updateAvatarDto: UpdateAvatarDto, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            avatar: string;
        } | undefined;
    }>;
    getFavourites(): void;
    addFavourites(): void;
    deleteFavourites(): void;
}
