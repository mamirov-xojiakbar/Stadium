import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './model/district.model';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtRepo: typeof District,
  ) {}
  async createDistrict(createDistrictDto: CreateDistrictDto) {
    const district = await this.districtRepo.create(createDistrictDto);
    if (district) {
      throw new BadRequestException('There is such district');
    }
    return district;
  }

  async findAllDistrict() {
    return this.districtRepo.findAll({ include: { all: true } });
  }

  async findOneDistrict(id: number) {
    const district = await this.districtRepo.findByPk(id);
    if (!district) {
      throw new BadRequestException('There is not such district');
    }
    return district;
  }

  async updateDistrict(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.districtRepo.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
    if (!district) {
      throw new BadRequestException('There is not such district');
    }
    return district[1][0];
  }

  async removeDistrict(id: number) {
    const district = await this.districtRepo.destroy({ where: { id } });
    return district;
  }
}
