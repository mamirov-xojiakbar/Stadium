import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from '../../region/model/region.model';

interface IdistrictAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: 'District' })
export class District extends Model<District, IdistrictAttr> {
  @ApiProperty({ example: '1', description: 'users ID uniqe number' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'name', description: 'district name' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: '1', description: 'users ID uniqe number' })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;

  @BelongsTo(() => Region)
  regions: Region;
}
