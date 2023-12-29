import _ from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// passport는 인증 메커니즘을 캡슐화하고, 다양한 인증 전략을 사용하여
// 애플리케이션을 쉽게 확장할 수 있도록 돕는 모듈 기반의 인증 프레임워크

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.email);
    if (_.isNil(user))
      throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');

    return user;
  }
}
