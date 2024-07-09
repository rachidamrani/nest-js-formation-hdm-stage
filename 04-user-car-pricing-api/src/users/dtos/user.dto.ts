import { Exclude, Expose } from 'class-transformer';

// User dto that has all the properties that we want to share with the outside world
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
