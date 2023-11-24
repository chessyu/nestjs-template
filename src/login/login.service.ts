import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginEntity } from './entities/login.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateLoginDto } from './dto/create-login.dto';

export interface LoginsRo {
  list: LoginEntity[];
  count: number;
}

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private readonly postsRepository: Repository<LoginEntity>,
    private dataSource: DataSource,
  ) {}

  // 创建
  async create(post: CreateLoginDto): Promise<LoginEntity> {
    const { name } = post;
    if (!name) throw new HttpException('名称是必填项', 401);

    const findUser = await this.postsRepository.find({ where: { name } });

    if (findUser.length) {
      throw new HttpException('名称已存在', 401);
    }
    return await this.postsRepository.save(post);
  }

  // 查询分页数据
  async findAll(query): Promise<LoginsRo> {
    const qb = await this.dataSource
      .getRepository(LoginEntity)
      .createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_data', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    console.log('rrrrr', params);
    const posts = await qb.getMany();

    return { list: posts, count };
  }

  //查询某一条数据
  async findById(id): Promise<LoginEntity> {
    return await this.postsRepository.findOne({
      where: {
        id: id,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  // 更新某一条数据
  async updateById(id, post): Promise<LoginEntity> {
    const existLogin = await this.postsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!existLogin) {
      throw new HttpException(` id 为${id} 的文章不存在`, 401);
    }

    const updateLogin = this.postsRepository.merge(existLogin, post);

    return this.postsRepository.save(updateLogin);
  }

  // 删除某一条数据
  async remove(id) {
    const existPost = await this.postsRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(` id 为${id} 的文章不存在`, 401);
    }

    return await this.postsRepository.remove(existPost);
  }
}
