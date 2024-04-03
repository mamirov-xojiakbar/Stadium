import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';


interface IComfortAttr {
  name: string;
}
@Table({ tableName: 'Comfort' })
export class Comfort extends Model<Comfort, IComfortAttr> {
  @ApiProperty({ example: '1', description: 'users ID uniqe number' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'name', description: 'comfort name' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  // @BelongsToMany(() => Stadium, () => ComfortStadium)
  // stadium: Stadium[];
}
