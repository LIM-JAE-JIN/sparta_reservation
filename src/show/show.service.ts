import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Show } from './entities/show.entity';
import { ShowDto } from './dto/show.dto';
import _ from 'lodash';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  // 공연 전체 조회
  async findAll(): Promise<{ success: boolean; data: Show[] }> {
    const allShow = await this.showRepository.find({
      select: [
        'name',
        'category',
        'location',
        'img_url',
        'status',
        'show_date',
      ],
    });

    return {
      success: true,
      data: allShow,
    };
  }

  // 공연검색
  async searchShow(name: string) {
    const search = await this.showRepository
      .createQueryBuilder('show')
      .where('show.name LIKE :name', { name: `%${name}%` })
      .getMany();

    return {
      success: true,
      message: `총 ${search.length}개가 검색 되었습니다.`,
      data: search,
    };
  }

  // 공연 상세 조회
  async findOne(id: number) {
    const show = await this.showRepository.findOneBy({ id });
    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }
    return {
      success: true,
      data: show,
    };
  }

  // 공연 생성
  async createShow(showDto: ShowDto) {
    const {
      name,
      descript,
      show_date,
      space_left,
      location,
      category,
      img_url,
    } = showDto;

    const nameChk = await this.showRepository.findOne({
      where: { name },
    });
    console.log(nameChk);
    if (nameChk) throw new ConflictException('일치하는 공연이름이 있습니다.');

    const createShow = await this.showRepository.save({
      name,
      descript,
      show_date,
      space_left,
      location,
      category,
      img_url,
    });
    return {
      success: true,
      message: '공연이 생성되었습니다!',
      data: createShow,
    };
  }
}
