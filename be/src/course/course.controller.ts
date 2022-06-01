import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(private readonly service: CourseService) {}

    @Get()
    async index() {
      return await this.service.findAll();
    }
}
