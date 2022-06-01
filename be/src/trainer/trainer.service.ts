import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trainer, TrainerDocument } from './trainer.schema';

@Injectable()
export class TrainerService {
  constructor(
    @InjectModel(Trainer.name) private readonly model: Model<TrainerDocument>,
  ) {}

  async findAll(): Promise<Trainer[]> {
    return await this.model.find().exec();
  }

  async findByTopic(
    course: string,
    needWheelchair: string,
  ): Promise<Trainer[]> {
    return await this.model
      .find({ competencies: course, needWheelchair: needWheelchair === 'true' ? true : false })
      .exec();
  }
}
