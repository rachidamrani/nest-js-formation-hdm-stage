import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/users/user.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    UserModule,
  ],
})
export class PostsModule {}
