import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class JoinDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @MinLength(6, { message: '6자 이상 입력해주세요.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @MinLength(6, { message: '6자 이상 입력해주세요.' })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '번호를 입력해주세요.' })
  phone: string;
}
