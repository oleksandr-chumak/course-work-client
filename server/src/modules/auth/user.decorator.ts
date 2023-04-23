import {
  createParamDecorator,
  ExecutionContext, ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request?.user;

    if (!user) {
        throw new ForbiddenException('No user found for request');
    }

    return user;
  },
);