import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {Good} from "../good/good.schema";

export type DiscountDocument = HydratedDocument<Discount>;

@Schema({ timestamps: true })
export class Discount {
  @Prop({required:true})
  newPrice:number;
  @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Good",required:true})
  good:mongoose.Types.ObjectId;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);