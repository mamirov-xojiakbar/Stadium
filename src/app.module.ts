import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/model/user.model';
import { ComfortModule } from './comfort/comfort.module';
import { CategoriesModule } from './categories/categories.module';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { Category } from './categories/model/category.model';
import { Comfort } from './comfort/model/comfort.model';
import { District } from './district/model/district.model';
import { Region } from './region/model/region.model';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { StadiumModule } from './stadium/stadium.module';
import { Stadium } from './stadium/models/stadium.model';
import { MediaModule } from './media/media.module';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/models/comment.model';
import { Bot } from './bot/models/bot.model';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Category,
        Comfort,
        District,
        Region,
        Admin,
        Stadium,
        Comment,
        Bot,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    ComfortModule,
    CategoriesModule,
    DistrictModule,
    RegionModule,
    MailModule,
    AdminModule,
    StadiumModule,
    MediaModule,
    BotModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
