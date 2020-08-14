import { CategoriesModel } from './categories.model';
import { RentTypeModel } from './rentType.model';
import { AddressProductRegister } from './address.model';

export class ProductRegister {
    public id?: number;
    public title: string;
    public description: string;
    public price: number;
    public isPhoneVisible: boolean;
    public userId: number;
    public address: AddressProductRegister;
    public category: CategoriesModel;
    public rentType: RentTypeModel;
}