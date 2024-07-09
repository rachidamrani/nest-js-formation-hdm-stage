import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { AccessTokenGuard } from 'src/iam/authentication/guards/access-token.guard';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Post('new-post')
  @UseGuards(AccessTokenGuard)
  createNewPost(@Body() post: CreatePostDto, @Req() request: Request) {
    // TODO : Fetch the logged in user from the request so that we can create a new post with the logged in user
    if (!request[REQUEST_USER_KEY]) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const loggedInUserId = +request[REQUEST_USER_KEY].sub;
    return this.postsService.createNewPost(post, loggedInUserId);
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    const post = await this.postsService.getPost(id);
    return post;
  }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  deletePost(@Param('id') id: number, @Req() request: Request) {
    if (!request[REQUEST_USER_KEY]) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    // use the user id to check if the user is authorized to delete the post
    //const loggedInUserId = +request[REQUEST_USER_KEY].sub;

    return this.postsService.deletePost(id);
  }
}
