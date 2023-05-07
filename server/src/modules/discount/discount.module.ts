import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import {MongooseModule} from "@nestjs/mongoose";
import {DiscountSchema} from "./discount.schema";
import {GoodSchema} from "../good/good.schema";

@Module({
  controllers: [DiscountController],
  providers: [DiscountService],
  imports:[
    MongooseModule.forFeature([
      {name:"Discount",schema:DiscountSchema},
      {name:"Good",schema:GoodSchema}
    ])
  ]
})
export class DiscountModule {}
