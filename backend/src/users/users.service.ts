import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindByIdUserDto } from './dto/find-by-id-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(createUserDto: CreateUserDto): Promise<User> {
    const { sub, given_name, family_name, email, picture } = createUserDto;

    console.log({ createUserDto });

    let user = await this.prisma.user.findUnique({
      where: { google_id: sub },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          google_id: sub,
          given_name,
          family_name,
          email,
          avatar_url: picture,
        },
      });
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { sub, given_name, family_name, email, picture } = createUserDto;
    return await this.prisma.user.create({
      data: {
        google_id: sub,
        given_name,
        family_name,
        email,
        avatar_url: picture,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findByGoogleId(googleId: string): Promise<User | null | string> {
    const user = await this.prisma.user.findUnique({
      where: { google_id: googleId },
    });

    if (!user) {
      return 'User not found';
    }

    return user;
  }

  async findById(userId: string): Promise<User | null | string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return 'User not found';
    }

    return user;
  }

  async update(
    findByIdUserDto: FindByIdUserDto,
    updateUserDto: UpdateUserDto,
  ): Promise<User | string> {
    const { user_id } = findByIdUserDto;
    const user = await this.prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return 'User not found';
    }

    return await this.prisma.user.update({
      where: { id: user_id },
      data: updateUserDto,
    });
  }

  async remove(findByIdUserDto: FindByIdUserDto): Promise<User | string> {
    const { user_id } = findByIdUserDto;
    const user = await this.prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      return 'User not found';
    }

    return await this.prisma.user.delete({
      where: { id: user_id },
    });
  }
}
