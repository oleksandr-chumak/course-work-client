export interface Inventory {
  goods: {
    name: string;
    totalAmount: number;
    availableAmount: number;
    priceForOne: number;
    totalAvailablePrice: number;
    totalPrice: number;
  }[];
  totalValue:number
}

