import { Controller, Get, Param } from '@nestjs/common';
import { TrainerService } from './trainer.service';

@Controller('trainer')
export class TrainerController {
    constructor(private readonly service: TrainerService) {}

    @Get()
    async index() {
      return await this.service.findAll();
    }

    @Get('/getTrainerByTopic/:topic/:needWheelchair')
    async find(@Param('topic') topic: string, @Param('needWheelchair') needWheelchair: string) {
      return await this.service.findByTopic(topic, needWheelchair);
    }
  
}
