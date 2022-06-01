import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingRequestBody } from './booking.schema';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor(private readonly service: BookingService) {}

    @Get()
    async index() {
      return await this.service.findAll();
    }
    
    @Post('create-booking')
    async create(@Body() createbooking: BookingRequestBody) {
      return await this.service.create(createbooking);
    }

    @Get('/upcoming-bookings')
    async upcomingBookings() {
      return await this.service.upcomingBookings();
    }
}
