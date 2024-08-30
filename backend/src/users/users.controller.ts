import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindByIdUserDto, findByIdUserSchema } from './dto/find-by-id-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':user_id')
  async findById(@Param('user_id') userId: string) {
    return await this.usersService.findById(userId);
  }

  @Patch(':user_id')
  @UsePipes(new ZodValidationPipe(findByIdUserSchema))
  async update(
    @Param() findByIdUserDto: FindByIdUserDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(findByIdUserDto, updateUserDto);
  }

  @Delete(':user_id')
  @UsePipes(new ZodValidationPipe(findByIdUserSchema))
  async remove(@Param() findByIdUserDto: FindByIdUserDto) {
    return this.usersService.remove(findByIdUserDto);
  }

  // @Get('post/:id')
  // async getPostById(@Param('id') id: string): Promise<PostModel> {
  //   return this.postService.post({ id: Number(id) });
  // }

  // @Put('publish/:id')
  // async publishPost(@Param('id') id: string): Promise<PostModel> {
  //   return this.postService.updatePost({
  //     where: { id: Number(id) },
  //     data: { published: true },
  //   });
  // }

  // @Delete('post/:id')
  // async deletePost(@Param('id') id: string): Promise<PostModel> {
  //   return this.postService.deletePost({ id: Number(id) });
  // }
}
