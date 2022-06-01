import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './course.schema';
import { CourseService } from './course.service';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
