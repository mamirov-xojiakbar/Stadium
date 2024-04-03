import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './models/media.model';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media)
    private readonly mediaModel: typeof Media,
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    return await this.mediaModel.create(createMediaDto);
  }

  async findAll(): Promise<Media[]> {
    return await this.mediaModel.findAll();
  }

  async findOne(id: number): Promise<Media> {
    const media = await this.mediaModel.findByPk(id);
    if (!media) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }
    return media;
  }

  async update(
    id: number,
    updateMediaDto: UpdateMediaDto,
  ): Promise<[number, Media[]]> {
    const [updatedRowsCount, updatedMedia] = await this.mediaModel.update(
      updateMediaDto,
      {
        where: { id },
        returning: true, 
      },
    );
    if (updatedRowsCount === 0) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }
    return [updatedRowsCount, updatedMedia];
  }

  async remove(id: number): Promise<void> {
    const deletedRowCount = await this.mediaModel.destroy({
      where: { id },
    });
    if (deletedRowCount === 0) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }
  }
}
