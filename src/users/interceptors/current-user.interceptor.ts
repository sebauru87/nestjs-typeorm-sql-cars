import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    console.log("🚀 ~ file: current-user.interceptor.ts ~ line 15 ~ CurrentUserInterceptor ~ intercept ~ request", request);
    const { userId } = request.session || {};
    console.log("🚀 ~ file: current-user.interceptor.ts ~ line 16 ~ CurrentUserInterceptor ~ intercept ~ userId", userId);
    // NO SE USA MAAAAAAAAAAAAS
    // ES viejo porque se ejecuta despues del AdminGuard entoces el currentUser siempre es false
    // primero request -> cookie session / middleware -> despies currentUser middleware -> desp AdminGuard -> 
    // -> ultimo request handles y response
    // el interceptor actua entre request handler
    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
