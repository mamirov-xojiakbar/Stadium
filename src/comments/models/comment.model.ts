import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/model/user.model';
import { Stadium } from '../../stadium/models/stadium.model';

interface ICommentCreationAttr {
  userId: number;
  stadiumId: number;
  impression: string;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, ICommentCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the comment',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who created the comment',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the stadium associated with the comment',
  })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumId: number;

  @ApiProperty({
    example: 'positive',
    description: 'The impression of the stadium',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  impression: string;

  @BelongsTo(() => User)
  users: User;

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
