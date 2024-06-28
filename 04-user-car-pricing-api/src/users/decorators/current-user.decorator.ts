import { ExecutionContext, Inject, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // ExecutionContext is a wrapper around the incoming request
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
