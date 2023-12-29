import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from './entities/user.entity';
import { JoinDto } from './dto/join.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('join')
  async join(@Body() joinDto: JoinDto) {
    const { email, password, confirmPassword, name, phone } = joinDto;
    return await this.userService.join(
      email,
      password,
      confirmPassword,
      name,
      phone,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mypage')
  mypage(@UserInfo() user: User) {
    return {
      success: true,
      message: `${user.name}님의 마이페이지`,
      user,
    };
  }
}
