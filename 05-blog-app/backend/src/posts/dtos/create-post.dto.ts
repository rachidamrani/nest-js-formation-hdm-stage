import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  // @MinLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  // @MinLength(100)
  content: string;
}
