import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from '../../categories/model/category.model';

interface IStadiumCreationAttr {
  categoryId: number;
  ownerId: number;
  contact_with: string;
  name: string;
  volume: string;
  address: string;
  regionId: number;
  districtId: string;
  location: string;
  buildAt: string;
  start_time: string;
  end_time: string;
}

@Table({ tableName: 'stadium' })
export class Stadium extends Model<Stadium, IStadiumCreationAttr> {
  @ApiProperty({ example: '1', description: 'users ID unique number' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @ApiProperty({ example: 1, description: 'Owner ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;

  @ApiProperty({ example: 'John Doe', description: 'Contact person' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contact_with: string;

  @ApiProperty({ example: 'My Stadium', description: 'Stadium name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '10000', description: 'Stadium volume' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  volume: string;

  @ApiProperty({ example: '123 Main St', description: 'Stadium address' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({ example: 1, description: 'Region ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  regionId: number;

  @ApiProperty({ example: 'ABC123', description: 'District ID' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  districtId: string;

  @ApiProperty({
    example: 'Latitude,Longitude',
    description: 'Stadium location',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;

  @ApiProperty({ example: '2024-04-01', description: 'Date of construction' })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  buildAt: string;

  @ApiProperty({ example: '08:00', description: 'Stadium opening time' })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  start_time: string;

  @ApiProperty({ example: '20:00', description: 'Stadium closing time' })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  end_time: string;

  @BelongsTo(() => Category)
  category: Category;

  // @BelongsToMany(() => Comfort, () => ComfortStadium)
  // comfort: Comfort[];
}
