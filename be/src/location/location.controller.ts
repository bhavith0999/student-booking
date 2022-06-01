import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly service: LocationService) {}

    @Get()
    async index() {
      return await this.service.findAll();
    }

    @Get(':city')
    async find(@Param('city') city: string) {
      return await this.service.findByCity(city);
    }
  
}
