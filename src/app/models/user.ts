import { AddressUserView } from './address.model';

export class User {
  public id: number;
  public name: string;
  public email: string;
  public phoneNumber: string;
  public roles: Array<string>;
  public isActive: boolean;
  public token: string;
}

export class UserLogin {
  public email: string;
  public password: string;
}

export class UserRegister {
  public name: string;
  public lastName: string;
  public email: string;
  public password: string;
}

export class UserView {
  id: number;
  name: string;
  lastName: string;
  email: string;
  gender: string;
  cpf: string;
  phoneNumber: string;
  address: AddressUserView;
}