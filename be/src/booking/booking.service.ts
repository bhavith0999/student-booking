import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentService } from '../student/student.service';
import { Booking, BookingDocument, BookingRequestBody } from './booking.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly model: Model<BookingDocument>,
    private readonly studentService: StudentService
  ) {}

  async findAll(): Promise<Booking[]> {
    return await this.model.find().exec();
  }

  async create(bookingRequest: BookingRequestBody): Promise<Booking> {
    if(bookingRequest.students.length > 0) {
     const students: any = await this.studentService.create(bookingRequest.students);
    }
    return await new this.model(bookingRequest).save();
  }

  async upcomingBookings(): Promise<Booking[]> {
    return await this.model
      .find({ startDate: { $gte: new Date() } }).populate('course', 'name').populate('trainer', 'firstName lastName').populate('location', 'name')
  }
}
