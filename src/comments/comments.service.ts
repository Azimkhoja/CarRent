import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepository.create(createCommentDto);
  }

  async findAll() {
    let comments = await this.commentRepository.findAll({
      include: { all: true },
    });
    if (comments.length != 0) return comments;
    return "Empty table";
  }

  async findOne(id: number) {
    let comment = await this.commentRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!comment) return "not found by this id";
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    let find = await this.commentRepository.findOne({ where: { id } });
    if (!find) return "not found by this id";
    return await this.commentRepository.update(updateCommentDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const comment = await this.commentRepository.destroy({ where: { id } });
    if (comment != 0) return "Deleted";
  }
}
