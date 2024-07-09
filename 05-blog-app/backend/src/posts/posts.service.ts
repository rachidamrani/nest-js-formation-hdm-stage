import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async createNewPost(postDto: CreatePostDto, userId: number) {
    // Get the user entity from the request logged in user
    const user = await this.usersService.findUserById(userId);

    // Create a new post with the user entity
    const post = this.postsRepository.create(postDto);

    // Associate the post with the user
    post.user = user;

    // Save post
    return this.postsRepository.save(post);
  }

  async getAllPosts() {
    return await this.postsRepository.find();
  }

  async getPost(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async deletePost(id: number) {
    const post = await this.getPost(id);
    if (!post) throw new NotFoundException('Post not found');
    return await this.postsRepository.remove(post);
  }
}
