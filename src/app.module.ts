import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import Joi from 'joi';
import { User } from './user/entities/user.entity';
import { ShowModule } from './show/show.module';
import { Show } from './show/entities/show.entity';
import { ReservationModule } from './reservation/reservation.module';
// Joi는 javascript객체의 유효성 검사를 위한 라이브러리이며,
// 객체의 형식이나 값이 일정한 규칙을 따르는지 확인하고 검증하는데 사용되며,
// 주로 데이터의 유효성 검사하고 필터링하는데 활용된다.

const typeOrmModuleOption = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    entities: [User, Show],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOption),
    AuthModule,
    UserModule,
    ShowModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
