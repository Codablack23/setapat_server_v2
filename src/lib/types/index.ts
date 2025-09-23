import { Request } from 'express';
import { UserEntity } from 'src/entities';

export type AuthRequest = Request & {
  user: UserEntity;
};
