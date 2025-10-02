import { UpdateAvatarDto, UpdateProfileDto } from './dto';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { UserType } from 'src/lib';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            profile: {
                id: string;
                firstname: string;
                lastname: string;
                email: string;
                user_type: UserType;
                gender: import("src/lib").Gender;
                reason?: string;
                phone_number: string;
                avatar: string;
                telegram_handle?: string;
                orders: import("src/entities").OrderEntity[];
                designer: import("../entities/entity.designer").DesignerProfileEntity;
                notifications: import("../entities/entity.notification").NotificationEntity[];
                sent_messages: import("../entities/entity.messages").MessageEntity[];
                participants: import("../entities/entity.participants").ConversationParticipantEntity[];
                created_at: Date;
                updated_at: Date;
            };
        } | undefined;
    }>;
    updateAvatar(userId: string, updateAvatarDto: UpdateAvatarDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            avatar: string;
        } | undefined;
    }>;
}
