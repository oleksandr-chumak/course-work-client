import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Discount} from "./discount.schema";
import * as mongoose from "mongoose";
import {CreateDiscountDto} from "./dto/create-discount.dto";
import {Good} from "../good/good.schema";
import { UpdateDiscountDto } from "./dto/update-discount.dto";

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel("Discount") private readonly discountModel:mongoose.Model<Discount>,
    @InjectModel("Good") private readonly goodModel:mongoose.Model<Good>
  ) {
  }
  async delete(id:string){
    const good = await this.goodModel.findOne({_id:id})
    if(!good){
      throw new NotFoundException("Good not found")
    }
    await this.discountModel.findOneAndDelete({good:id})
    good.discount = null;
    await good.save()
    return good;

  }
  async create(dto:CreateDiscountDto) {
    const good = await this.goodModel.findOne({_id:dto.goodId})
    if (!good){
      throw new NotFoundException("Good not found");
    }
    const discount = await this.discountModel.create(
      {
        newPrice: dto.newPrice,
        good: dto.goodId
      }
    )
    good.discount = discount._id;
    await good.save();
    return discount;
  }

  async getByName(name: string) {
    const regex = new RegExp(name,"i");
    return this.goodModel.find({name:{$regex:regex}}).select("-totalAmount -availableAmount -unit").populate({
      path:"discount"
    });
  }

  update(dto:UpdateDiscountDto) {
    return this.discountModel.findOneAndUpdate({_id:dto.discountId},{newPrice:dto.newPrice})
  }
}
