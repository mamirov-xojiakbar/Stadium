import { Module } from '@nestjs/common';
import { StadiumService } from './stadium.service';
import { StadiumController } from './stadium.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stadium } from './models/stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([Stadium])],
  controllers: [StadiumController],
  providers: [StadiumService],
})
export class StadiumModule {}
