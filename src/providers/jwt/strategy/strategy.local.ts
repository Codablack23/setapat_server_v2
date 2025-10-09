import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SanitizerProvider } from 'src/lib';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({ usernameField: 'email' });
  }

  private async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        designer: true,
      },
    });
    if (!user)
      throw new UnauthorizedException({
        status: 'failed',
        message: 'User does not exist',
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new BadRequestException({
        status: 'failed',
        message: 'Incorrect credentials please check the email and try again',
      });

    return SanitizerProvider.sanitizeObject(user, ['password']);
  }

  async validate(email: string, password: string) {
    return this.verifyUser(email, password);
  }
}
