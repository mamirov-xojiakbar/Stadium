import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IMediaAttr {
  stadiumId: number;
  photo: string;
  description: string;
}

@Table({ tableName: 'media' })
export class Media extends Model<Media, IMediaAttr> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the stadium associated with this media',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumId: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL of the photo',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  photo: string;

  @ApiProperty({
    example: 'Beautiful sunset at the stadium',
    description: 'Description of the media',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
}
