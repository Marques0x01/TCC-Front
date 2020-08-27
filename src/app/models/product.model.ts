import { CategoriesModel, CategoriesEnum } from './categories.model';
import { RentTypeModel, RentTypeEnum } from './rentType.model';
import { AddressProductRegister, AddressBasicaData } from './address.model';
import { Image } from './image.model';
import { ProductStatusEnum } from './productStatus.model';
import { User } from './user';
import { Timestamp } from 'rxjs';

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

export class ProductView {
    public id: number;
    public image: Image;
    public price: number;
    public title: string;
}

export class ProductBasicData {
    public id: number;
    public isPhoneVisible: boolean;
    public address: AddressBasicaData;
    public images: Array<Image>;
    public user: User;
    public price: number;
    public rentType: RentTypeEnum;
    public status: ProductStatusEnum;
    public title: string;
    public description: string;
}

export class ProductSearchResult {
    public id: number;
    public title: string;
    public price: number;
    public creationDate: number;
    public image: Image;
    public district: string;
    public city: string;
    public state: string;
}

export class ProductSearch {
    public id: number;
    public title: string;
    public minPrice: number;
    public maxPrice: number;
    public category: CategoriesEnum;
    public rentType: RentTypeEnum ;
    public city: string;
    public state: string;
}