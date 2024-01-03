import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { ShowService } from './show.service';
import { Admin } from 'src/auth/admin.decorator';
import { ShowDto } from './dto/show.dto';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  // 공연 조회
  @Get()
  async findAll() {
    return await this.showService.findAll();
  }

  // 공연 검색
  @Get('search')
  async searchShow(@Query('name') name: string) {
    return await this.showService.searchShow(name);
  }

  // 공연 상세 조회
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.showService.findOne(id);
  }

  // 공연 생성
  @UseGuards(AdminGuard)
  @Admin()
  @Post()
  async createShow(@Body() showDto: ShowDto) {
    return await this.showService.createShow(showDto);
  }
}
