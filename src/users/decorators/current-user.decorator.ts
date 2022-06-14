import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log("🚀 ~ file: current-user.decorator.ts ~ line 6 ~ request", request.route);
    // console.log("🚀 ~ file: current-user.decorator.ts ~ line 6 ~ request", request.session);
    return request.currentUser;
  },
);
