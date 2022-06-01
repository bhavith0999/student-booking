import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from '../student/student.module';
import { BookingController } from './booking.controller';
import { Booking, BookingSchema } from './booking.schema';
import { BookingService } from './booking.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]), StudentModule
  ],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
