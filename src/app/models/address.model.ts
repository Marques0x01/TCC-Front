export class AddressProductRegister {
    public zipCode: string;
    public street: string;
    public district: string;
    public city: string;
    public state: string;
    public country: string;
    public userIds?: number;
}

export class AddressBasicaData {
    public id: number;
    public zipCode: string;
    public district: string;
    public city: string;
    public state: string;
    public country: string;
}

export class AddressUserView {
    public id: number;
    public zipCode: string;
    public number: number;
    public complement: string;
    public district: string;
    public city: string;
    public state: string;
    public country: string;
}

export class AddressUpdate {
    public id: number;
    public zipCode: string;
    public number: number;
    public complement: string;
    public district: string;
    public city: string;
    public state: string;
    public country: string;
    public userId: number;
}