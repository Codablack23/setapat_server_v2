import { Request } from 'express';
import { UserEntity } from 'src/entities';
export type AuthRequest = Request & {
    user: UserEntity;
};
export interface RevisionObject {
    [page: string]: {
        total: number;
        count: number;
    };
}
export interface RevisionsPerPage {
    [page: string]: {
        total: number;
        count: number;
        resize?: {
            [page: string]: {
                total: number;
                count: number;
            };
        };
    };
}
