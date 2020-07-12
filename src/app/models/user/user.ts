export class User {
  public username: string;
  public email: string;
  public password: string;
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
  public email: string;
  public password: string;
}

