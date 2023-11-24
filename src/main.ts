import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllConfigType } from './config/config.type';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<AllConfigType>); //获取全局配置的环境变量
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
  ); // 注册全局路径前缀
  app.useGlobalFilters(new HttpExceptionFilter()); //注册全局的 Filters
  app.useGlobalInterceptors(new TransformInterceptor()); //注册全局的 interceptors

  //设置 swagger 文档
  const config = new DocumentBuilder()
    .setTitle('后台管理')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
  console.log(
    '服务已启动:  http://localhost:' +
      configService.getOrThrow('app.port', { infer: true }),
  );
}
bootstrap();
