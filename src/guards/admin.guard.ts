import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false;
    }
    
    console.log("🚀 ~ file: admin.guard.ts ~ line 7 ~ AdminGuard ~ canActivate ~ request.currentUser", request.currentUser.admin);
    return request.currentUser.admin;
  }
}
