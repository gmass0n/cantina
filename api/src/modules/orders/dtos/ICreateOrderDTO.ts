interface IProduct {
  productId: string;
  quantity: number;
}

export interface ICreateOrderDTO {
  customerId: string;
  products: IProduct[];
  total: number;
}
