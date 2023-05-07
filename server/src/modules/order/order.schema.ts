import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {Good} from "./interface/Good";
import {User} from "../auth/user.schema";

export type OrderDocument = HydratedDocument<Order>;

@Schema({timestamps: true})
export class Order {
  @Prop({required: true})
  price: number;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: mongoose.Types.ObjectId;
  @Prop( {
    required:true,
    type: [{
      data:{type:mongoose.Schema.Types.ObjectId, ref: "Good"},
      orderCount:{type: Number, required:true},
      price:{type:Number,required:true}
    }]
  })
  good: {data: mongoose.Types.ObjectId, orderCount: number, price:number}[];

}

export const OrderSchema = SchemaFactory.createForClass(Order);