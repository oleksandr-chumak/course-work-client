import {Injectable} from "@nestjs/common";
import {Good} from "./good.schema";
import * as mongoose from "mongoose";
import {InjectModel} from "@nestjs/mongoose";


@Injectable()
export class GoodsService{
  constructor(@InjectModel("Good") private readonly goodModel: mongoose.Model<Good>) {
  }
  async getGood(id:number):Promise<number>{
    return id
  }
  async createGood(data:Partial<Good>):Promise<Good>{
    return await this.goodModel.create({...data, availableAmount: data.totalAmount});
  }
  async getAll(){
    return this.goodModel.find();
  }
  async inventory(){
    const goods:Partial<Good>[] = await this.goodModel.find()
    let totalValue:number = 0;
    const result = {}
    for(let i = 0; i<goods.length; i++){
      const name = goods[i].name;
      const totalAmount = goods[i].totalAmount;
      const availableAmount = goods[i].availableAmount;
      const price = goods[i].price;
      const totalAvailablePrice = price * availableAmount;
      const totalPrice = price * totalAmount;
      result[i] = {
        name,
        totalAmount,
        availableAmount,
        priceForOne:price,
        totalAvailablePrice,
        totalPrice
      }
      totalValue += goods[i].availableAmount * goods[i].price;
    }
    return { ...result,totalValue };
  }
}