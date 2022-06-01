import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

export enum Topic {
    Frontend = "Frontend", 
    Backend = "Backend",
    Fullstack = "Fullstack",
    Cloud = "Cloud",
    Security = "Security"
  }

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  topic: Topic;

  @Prop({ required: true }) 
  duration: Number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);