import {GoodData} from "../_interface/goodOrder"
export interface Order{
  _id:string;
  price:number;
  good:OrderGood[]
}
export interface OrderGood{
  data:GoodData;
  orderCount:number;
  price:number;
}

