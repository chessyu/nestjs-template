import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeModule } from './home/home.module';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('db.db_host'),
        port: configService.getOrThrow('db.db_port'),
        username: configService.getOrThrow('db.db_username'),
        password: configService.getOrThrow('db.db_passwd'),
        database: configService.getOrThrow('db.db_database'),
        timezone: '+08:00',
        synchronize: configService.getOrThrow('app.nodeEnv') === 'development',
        autoLoadEntities: true,
      }),
    }),
    LoginModule,
    HomeModule,
  ],
})
export class AppModule {}
