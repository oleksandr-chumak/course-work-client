export interface Good{
  _id:string;
  name: string;
  unit: string;
  price: number;
  availableAmount?: number;
  totalAmount: number;
  imageUrl: string;
  deletedAt: Date | null;
  updatedAt: string;
  discount?:{
    _id:string,
    good:string,
    newPrice:number
  }
}
