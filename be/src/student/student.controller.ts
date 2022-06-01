import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly service: StudentService) {}

    @Get()
    async index() {
      return await this.service.findAll();
    }
  
}
