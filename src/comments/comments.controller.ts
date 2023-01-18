import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@ApiTags("Comments")
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: "Comment malumotlarini kiritish" })
  @ApiResponse({ status: 200, type: Comment })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiOperation({ summary: "Barcha Comment ro'yxatini olish" })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @ApiOperation({ summary: "Comment haqida malumot olish" })
  @ApiResponse({ status: 200, type: Comment })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(+id);
  }

  @ApiOperation({ summary: "Comment ga o'zgartirish kiritish" })
  @ApiResponse({ status: 200, type: Comment })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @ApiOperation({ summary: "Comment o'chirish" })
  @ApiResponse({ status: 200, type: Comment })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentsService.remove(+id);
  }
}
