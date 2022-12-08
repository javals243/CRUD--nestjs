import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  CreatePostParam,
  CreateUserParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }
  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }
  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
  async createProfile(id: number, CreateUserProfile: CreateUserProfileParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found ', HttpStatus.BAD_REQUEST);
    const newProfile = this.profileRepository.create(CreateUserProfile);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }
  async createPost(id: number, createPost: CreatePostParam) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found ', HttpStatus.BAD_REQUEST);
    const newPost = this.postRepository.create({ ...createPost, user });
    return this.postRepository.save(newPost);
  }
}
