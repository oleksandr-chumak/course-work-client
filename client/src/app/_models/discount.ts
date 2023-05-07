export interface Discount{
  _id:string;
  name: string;
  price: number;
  imageUrl: string;
  discount?:{
    _id:string;
    newPrice:number;
  }
}
