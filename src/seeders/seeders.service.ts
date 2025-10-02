import { DiscountEntity } from './../entities/entity.discount';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { DesignerProfileEntity } from 'src/entities/entity.designer';
import { AppResponse, DesignerRole, Gender, UserType } from 'src/lib';
import { Repository } from 'typeorm';
import { oneYear30PercentDiscountSeed, superDesignerSeed } from './seeds';
import { ENVIRONMENT } from 'src/config';
import { DiscountInjectableUtils } from 'src/lib/utils/util.discount';

@Injectable()
export class SeedersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

    @InjectRepository(DesignerProfileEntity)
    private designerRepo: Repository<DesignerProfileEntity>,

    @InjectRepository(DiscountEntity)
    private discountRepo: Repository<DiscountEntity>,

    private discountUtils: DiscountInjectableUtils,
  ) {}

  async seedDesigner() {
    const designers = await this.designerRepo.find({
      where: {
        role: DesignerRole.SUPER_DESIGNER,
      },
    });

    if (designers.length > 0) {
      throw new ForbiddenException(
        AppResponse.getFailedResponse(
          'Super designer has already been seeded ',
        ),
      );
    }

    const designerUser = this.userRepo.create({
      firstname: superDesignerSeed.firstname,
      lastname: superDesignerSeed.lastname,
      email: superDesignerSeed.email,
      password: ENVIRONMENT.SEEDERS.SUPER_DESIGNER_PASSWORD,
      user_type: UserType.DESIGNER,
      gender: Gender.MALE,
    });

    await this.userRepo.save(designerUser);

    const designerProfile = this.designerRepo.create({
      role: DesignerRole.SUPER_DESIGNER,
      opens_at: superDesignerSeed.opens_at,
      closes_at: superDesignerSeed.closes_at,
      designer_specifications: superDesignerSeed.designer_specifications,
      working_days: superDesignerSeed.working_days,
      resume_link: superDesignerSeed.resume_link,
      portfolio_link: superDesignerSeed.portfolio_link,
      user: designerUser,
    });

    await this.designerRepo.save(designerProfile);

    return AppResponse.getSuccessResponse({
      message: 'Designer account seeded successfully',
      data: {
        email: designerUser.email,
        profileId: designerProfile.id,
      },
    });
  }
  async seedDiscount() {
    const defaultDiscount = await this.discountRepo.find({});

    if (defaultDiscount.length > 0) {
      throw new ForbiddenException(
        AppResponse.getFailedResponse(
          'Default Discount has already been generated',
        ),
      );
    }

    const discountCode = await this.discountUtils.generateNextDiscountCode();

    const newDiscount = this.discountRepo.create({
      ...oneYear30PercentDiscountSeed,
      code: discountCode,
    });

    const discount = await this.discountRepo.save(newDiscount);

    return AppResponse.getSuccessResponse({
      message: 'Discount seeded successfully',
      data: {
        discount,
      },
    });
  }
}
