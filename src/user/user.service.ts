import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import _ from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async join(
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    phone: string,
  ) {
    const searchUser = await this.findByEmail(email);

    if (searchUser) throw new ConflictException('가입한 이메일입니다.');

    if (password !== confirmPassword)
      throw new ConflictException('비밀번호 확인이 일치하지 않습니다.');

    const hashedPassword = await hash(password, 10);
    const createUser = await this.userRepository.save({
      email,
      password: hashedPassword,
      name,
      phone,
    });

    return {
      success: true,
      message: '회원가입 되었습니다!',
      date: createUser,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'name'],
    });

    if (_.isNil(user))
      throw new UnauthorizedException('이메일을 확인해주세요.');

    if (!(await compare(password, user.password)))
      throw new UnauthorizedException('비밀번호를 확인해주세요.');

    const payload = { email, sub: user.id };
    return {
      success: true,
      message: `${user.name}님, 반갑습니다!`,
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
