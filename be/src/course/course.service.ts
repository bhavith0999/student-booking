import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';

@Injectable()
export class CourseService {

    constructor( @InjectModel(Course.name) private readonly model: Model<CourseDocument>) {}

    async findAll(): Promise<Course[]> {
        return await this.model.find().exec();
      }
}
