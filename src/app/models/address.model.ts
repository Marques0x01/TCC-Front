export class AddressProductRegister {
    public zipCode: string;
    public street: string;
    public district: string;
    public city: string;
    public state: string;
    public country: string;
    public userIds?: Array<number>;
}

export class AddressBasicaData {
    public id: number;
    public zipCode: string;
    public district: string;
    public city: string;
    public state: string;
    public country: string;
}