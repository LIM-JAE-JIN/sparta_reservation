import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const authenticated = await super.canActivate(context);
    if (!authenticated) return false;

    const requiredAdmin = this.reflector.getAllAndOverride<Boolean>('admin', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredAdmin) return false;

    const { user } = context.switchToHttp().getRequest();

    return requiredAdmin === user.admin;
  }
}
