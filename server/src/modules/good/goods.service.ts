import {Injectable, NotFoundException} from "@nestjs/common";
import {Good} from "./good.schema";
import * as mongoose from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {GoodIncreaseData} from "./interface/GoodIncreaseData";


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
    return this.goodModel.find({deletedAt:null}).populate({
      path:"discount"
    });
  }
  async findGoodsByName(name:string){
    const regex = new RegExp(name,"i");
    return this.goodModel.find({name:{$regex:regex}})
  }
  async updateGoodCount(amount:number,id:string){
    return this.goodModel.updateOne({_id:id},
      {$inc:{
        availableAmount:+amount,
          totalAmount:+amount}}
    )
  }
  async updateGoodsCount(data:GoodIncreaseData[]){
    for(const item of data){
      const updatedGood = await this.goodModel.findOneAndUpdate(
        {_id:item.data},
        {$inc: {availableAmount:-item.orderCount}},
        {new:true}
      );
      if(!updatedGood){
        throw new NotFoundException("Good with this id not found");
      }
    }
  }
  async inventory(){
    const goods:Partial<Good>[] = await this.goodModel.find({deletedAt:null}).populate("discount")
    let totalValue:number = 0;
    const result = []
    for(let i = 0; i<goods.length; i++){
      const name = goods[i].name;
      const totalAmount = goods[i].totalAmount;
      const availableAmount = goods[i].availableAmount;
      // @ts-ignore
      const price = goods[i].discount ? goods[i].discount.newPrice : goods[i].price;
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
      totalValue += goods[i].availableAmount * price;
    }
    return {goods:result,totalValue} ;
  }

  deleteGood(id: string) {
    return this.goodModel.updateOne({_id:id},{deletedAt:new Date()});
  }
}