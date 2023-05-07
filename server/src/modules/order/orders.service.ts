import {Injectable} from "@nestjs/common";
import {OrderDto} from "./dto/Order.dto";
import {GoodsService} from "../good/goods.service";
import {InjectModel} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Order} from "./order.schema";
import {STATUS_CODES} from "http";

@Injectable()
export class OrdersService{
  constructor(
    private goodsService:GoodsService,
    @InjectModel("Order") private readonly goodModel: mongoose.Model<Order>
  ) {
  }
  async create(userId:string,data:OrderDto){
    console.log(data)
    await this.goodsService.updateGoodsCount(data.data)
    return await this.goodModel.create({
      price:data.totalPrice,
      good:data.data,
      user:userId
    })
  }
  async getAll({id}){
    console.log(id)
    return this.goodModel.find({user:id},).select("-user").populate({
      path:'good.data',
      select:'imageUrl name price _id'
    })
  }
}