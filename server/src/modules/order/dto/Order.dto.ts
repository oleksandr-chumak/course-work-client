export class OrderDto{
  readonly data: {
    data:string,
    orderCount:number,
    price:number
  }[];
  readonly totalPrice:number
}