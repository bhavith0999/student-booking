import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly model: Model<LocationDocument>,
  ) {}

  async findAll(): Promise<Location[]> {
    return await this.model.find().exec();
  }

  async findByCity(city: string): Promise<Location[]> {
    return await this.model.find({ city }).exec();
  }
}
