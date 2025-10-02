import { Strategy } from 'passport-local';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    private verifyUser;
    validate(email: string, password: string): Promise<Partial<UserEntity>>;
}
export {};
