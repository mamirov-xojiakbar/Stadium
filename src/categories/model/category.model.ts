import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICategoriesAttr {
  name: string;
  parentId: number;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, ICategoriesAttr> {
  @ApiProperty({ example: '1', description: 'users ID uniqe number' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
  })
  parentId: number;
}
