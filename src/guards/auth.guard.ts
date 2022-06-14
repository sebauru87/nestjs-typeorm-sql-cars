import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // console.log("🚀 ~ file: auth.guard.ts ~ line 6 ~ AuthGuard ~ canActivate ~ request", request.session)

    return request.session.userId;
  }
}
