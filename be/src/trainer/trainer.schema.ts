import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Topic } from '../course/course.schema';

export type TrainerDocument = Trainer & Document;

@Schema()
export class Trainer {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ default: [] })
  competencies: Array<Topic>;

  @Prop({ required: true })
  needWheelchair: boolean;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
