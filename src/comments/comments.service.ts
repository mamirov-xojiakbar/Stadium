import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentRepo: typeof Comment) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepo.create(createCommentDto);
  }

  findAll() {
    return this.commentRepo.findAll();
  }

  findOne(id: number) {
    return this.commentRepo.findByPk(id);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const update = this.commentRepo.update(updateCommentDto, {
      where: { id },
      returning: true,
    });
    return update[1][0];
  }

  remove(id: number) {
    return this.commentRepo.destroy({ where: { id } });
  }
}
