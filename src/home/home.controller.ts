import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiTags('根目录')
  @ApiOperation({ summary: '查询所有数据' })
  @Get()
  appInfo() {
    return this.homeService.appInfo();
  }
}
