import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './model/region.model';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionRepo: typeof Region,
  ) {}
  async createRegion(createRegionDto: CreateRegionDto) {
    const region = await this.regionRepo.create(createRegionDto);
    if (region) {
      throw new BadRequestException('There is such Region');
    }
    return region;
  }

  async findAllRegion() {
    return this.regionRepo.findAll();
  }

  async findOneRegion(id: number) {
    const region = await this.regionRepo.findByPk(id);
    if (!region) {
      throw new BadRequestException('There is not such Region');
    }
    return region;
  }

  async updateRegion(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionRepo.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
    if (!region) {
      throw new BadRequestException('There is not such Region');
    }

    return region[1][0];
  }

  async removeRegion(id: number) {
    return this.regionRepo.destroy({ where: { id } });
  }
}
