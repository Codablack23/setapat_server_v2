import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    validate(payload: any): Promise<Partial<UserEntity>>;
}
export {};
