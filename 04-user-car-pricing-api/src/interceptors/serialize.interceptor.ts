import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { User } from 'src/users/user.entity';

interface ClassConstructor {
  new (...args: any[]): any;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    // run somthing before the request is handled by the request handler
    return next.handle().pipe(
      map((data: User) => {
        return plainToClass(this.dto, data, {
          // ensure that whenever we have an instance of UserDto
          // and try to turn it in plain JSON, it is only going to share
          //only the properties that are marked with @Expose decorator
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
