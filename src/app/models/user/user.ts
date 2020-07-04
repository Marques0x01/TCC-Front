import { Roles } from '../roles';

export class User {

  public username: string;

  public email: string;

  public password: string;

  public roles: Array<string>;

  public isActive: boolean;

  public token: string;

}
