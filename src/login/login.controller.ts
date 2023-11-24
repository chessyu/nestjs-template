import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  import { LoginService, LoginsRo } from './login.service';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { CreateLoginDto } from './dto/create-login.dto';
  
  @ApiTags('测试登录')
  @Controller('login')
  export class LoginController {
    constructor(private readonly loginService: LoginService) {}
  
    /**
     * 查询所有数据
     * @param query
     * @returns
     */
    @ApiOperation({ summary: '查询所有数据' })
    @Get('list')
    async findAll(@Query() query): Promise<LoginsRo> {
      return await this.loginService.findAll(query);
    }
  
    /**
     * 新增数据
     * @param post
     * @returns
     */
    @ApiOperation({ summary: '新增数据' })
    @Post('add')
    async create(@Body() post: CreateLoginDto) {
      return await this.loginService.create(post);
    }
  
    /**
     * 获取某一条数据
     * @param id
     * @returns
     */
    @ApiOperation({ summary: '获取某一条数据' })
    @Get(':id')
    async findById(@Param('id') id) {
      return await this.loginService.findById(id);
    }
  
    /**
     * 更新某一个数据
     * @param id
     * @param post
     * @returns
     */
    @ApiOperation({ summary: '更新某一条数据' })
    @Put(':id')
    async update(@Param('id') id, @Body() post) {
      return await this.loginService.updateById(id, post);
    }
  
    /**
     * 删除某一条数据
     * @param id
     * @returns
     */
    @ApiOperation({ summary: '删除某条数据' })
    @Delete(':id')
    async remove(@Param('id') id) {
      return await this.loginService.remove(id);
    }
  }
  