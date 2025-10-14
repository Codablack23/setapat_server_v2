/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AppResponse, UserType } from 'src/lib';
import { GoogleOAuthProvider } from 'src/providers';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async registerUser(registerUserDto: RegisterUserDto) {

        const existingUser = await this.userRepository.findOne({
            where: {
                email: registerUserDto.email
            }
        })

        if (existingUser) throw new BadRequestException(AppResponse.getResponse("success", {
            message: "User already exists"
        }))

        const newUser = this.userRepository.create({
            ...registerUserDto,
        })
        const user = await this.userRepository.save(newUser)
        return this.loginUser(this.removePasswordFromUserObject(user))

    }

    private removePasswordFromUserObject<T extends Record<string, any>>(object: T) {
        return Object.keys(object).reduce((acc, key) => {
            if (key !== "password") {
                acc[key as Exclude<keyof T, "password">] = object[key]
            }
            return acc
        }, {} as Omit<T, "password">)
    }


    async verifyUser(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            }
        })
        if (!user) throw new UnauthorizedException({
            status: "failed",
            message: "User does not exist"
        });

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) throw new BadRequestException({
            status: "failed",
            message: "Incorrect credentials please check the email and try again"
        });

        return {
            ...this.removePasswordFromUserObject({})
        };
    }
    async loginUser(user: any) {
        const token = this.jwtService.sign(user)
        return AppResponse.getResponse("success", {
            message: "Login successful",
            data: {
                token,
                user
            }
        })
    }
    async loginWithGoogle(accessToken: string) {
        const { email, avatar, firstname, lastname } = await GoogleOAuthProvider.verifyToken(accessToken)
        const existingUser = await this.userRepository.findOne({
            where: {
                email,
                user_type: UserType.USER
            }
        })
        if (!existingUser) {
            const newUser = this.userRepository.create({
                email,
                firstname,
                lastname,
                avatar,
                password:email
            })

            const user = await this.userRepository.save(newUser)
            const res = await this.loginUser(this.removePasswordFromUserObject(user))
            return res
        }

        const res = await this.loginUser(this.removePasswordFromUserObject(existingUser))
        return res;
    }
}
