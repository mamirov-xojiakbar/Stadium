import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { Stadium } from './models/stadium.model';

@Injectable()
export class StadiumService {
  constructor(
    @InjectModel(Stadium)
    private readonly stadiumModel: typeof Stadium,
  ) {}

  async create(createStadiumDto: CreateStadiumDto): Promise<Stadium> {
    return await this.stadiumModel.create(createStadiumDto);
  }

  async findAll(): Promise<Stadium[]> {
    return await this.stadiumModel.findAll();
  }

  async findOne(id: number): Promise<Stadium | null> {
    return await this.stadiumModel.findByPk(id);
  }

  async update(id: number, updateStadiumDto: UpdateStadiumDto) {
    const update = await this.stadiumModel.update(updateStadiumDto, {
      where: { id },
      returning: true,
    });

    return update[1][0];
  }

  async remove(id: number) {
    const stadium = await this.findOne(id);
    await stadium.destroy();

    return "Deleted";
  }
}
