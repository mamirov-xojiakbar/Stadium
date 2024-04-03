import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './model/comfort.model';

@Injectable()
export class ComfortService {
  constructor(
    @InjectModel(Comfort) private readonly comfortRepo: typeof Comfort,
  ) {}
  async createComfort(createComfortDto: CreateComfortDto) {
    const comfort = await this.comfortRepo.create(createComfortDto);
    if (comfort) {
      throw new BadRequestException('There is such comfort');
    }
    return comfort;
  }

  async findAllComfort() {
    return this.comfortRepo.findAll();
  }

  async findOneComfort(id: number) {
    const comfort = await this.comfortRepo.findByPk(id);
    if (!comfort) {
      throw new BadRequestException("There isn't such comfort");
    }
    return comfort;
  }

  async updateComfort(id: number, updateComfortDto: UpdateComfortDto) {
    const comfort = await this.comfortRepo.update(updateComfortDto, {
      where: { id },
      returning: true,
    });
    if (!comfort) {
      throw new BadRequestException("There isn't such comfort");
    }
    return comfort[1][0];
  }

  async removeComfort(id: number) {
    const comfort = await this.comfortRepo.destroy({ where: { id } });
    if (!comfort) {
      throw new BadRequestException("There isn't such comfort");
    }
    return comfort;
  }
}
