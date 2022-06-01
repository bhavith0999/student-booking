import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  latitude: Number;

  @Prop({ required: true })
  longitude: Number;

  @Prop({ required: true })
  wheelchairAccessible: boolean;

  @Prop({ required: true })
  country: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);