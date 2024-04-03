import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IregionAttr {
  name: string;
}

@Table({ tableName: 'Region' })
export class Region extends Model<Region, IregionAttr> {
  @ApiProperty({ example: '1', description: 'uniqui ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'name', description: 'region name' })
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
