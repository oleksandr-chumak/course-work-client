import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Good } from "../good/good.schema";

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({required:true})
  cost:number
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Good' }] })
  good: Good[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);