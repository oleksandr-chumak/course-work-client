import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {Discount} from "../discount/discount.schema";

export type GoodDocument = HydratedDocument<Good>;

@Schema({ timestamps: true })
export class Good {
  @Prop({required:true,unique:true})
  name: string;
  @Prop({required:true})
  unit: string;
  @Prop({required:true})
  price: number;
  @Prop()
  availableAmount: number;
  @Prop({required:true})
  totalAmount: number;
  @Prop({isNaN:true})
  imageUrl: string;
  @Prop({type:mongoose.Schema.Types.ObjectId,ref: "Discount",isRequired:false,default:null})
  discount: mongoose.Types.ObjectId;
  @Prop({type:Date,default:null})
  deletedAt:Date
}

export const GoodSchema = SchemaFactory.createForClass(Good);