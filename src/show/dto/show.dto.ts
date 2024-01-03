import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  descript: string;

  @IsString()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  show_date: string[];

  @IsNumber()
  @IsNotEmpty({ message: '해당 공연 좌석 수를 입력해주세요.' })
  space_left: number;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  location: string;

  @IsString()
  @IsNotEmpty({ message: '공연 장르를 입력해주세요.' })
  category: string[];

  img_url?: string[];
}
