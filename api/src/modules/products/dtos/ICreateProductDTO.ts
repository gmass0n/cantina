export interface ICreateProductDTO {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  picture: string;
  quantity: number;
}
