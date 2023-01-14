import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save(createCommentDto);
  }

  async findAll() {
    let comments = await this.commentRepository.find();
    if (comments.length != 0) return comments;
    return "Empty table";
  }

  async findOne(id: number) {
    let comment = await this.commentRepository.findOneBy({ id });
    if (!comment) return "not found by this id";
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    let find = await this.commentRepository.findOneBy({ id });
    if (!find) return "not found by this id";
    return await this.commentRepository.update({ id }, updateCommentDto);
  }

  async remove(id: number) {
    return this.commentRepository.delete({ id });
  }
}
