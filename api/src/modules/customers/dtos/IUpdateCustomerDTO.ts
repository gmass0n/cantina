import { ICustomerAddress } from '../interfaces/ICustomerAddress';

export interface IUpdateCustomerDTO {
  customerId: string;
  name: string;
  email: string;
  avatar: string | null;
  phoneNumber: string | null;
  address: ICustomerAddress | null;
  document: string;
}
