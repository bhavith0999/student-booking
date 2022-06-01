import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly model: Model<StudentDocument>,
  ) {}

  async findAll(): Promise<Student[]> {
    return await this.model.find().exec();
  }

  async create(req: any) {
    return await this.model.create(req.map(q => ({email: q})))
  }
}
