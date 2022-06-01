import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Location } from '../location/location.schema';
import { Student } from '../student/student.schema';
import { Trainer } from '../trainer/trainer.schema';
import { Course } from '../course/course.schema';

export type BookingDocument = Booking & Document;

export interface BookingRequestBody {
  course: string;
  trainer: string;
  location: string;
  startDate: Date;
  endDate: Date;
  provideCertificate: boolean;
  students: string[];
  comments: string;
}

@Schema()
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  course: Course;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true,
  })
  trainer: Trainer;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  })
  location: Location;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, default: false })
  certificateRequired: boolean;

  @Prop()
  comments: string;

  @Prop({ default: [] })
  students: string[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
