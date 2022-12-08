import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from 'src/users/dtos/CreatePost.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

import { UserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
  }
  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() CreateUserProfileDto: UserProfileDto,
  ) {
    return this.userService.createProfile(id, CreateUserProfileDto);
  }
  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() CreatePostDto: CreatePostDto,
  ) {
    return this.userService.createPost(id, CreatePostDto);
  }
}
