export class RentTypeModel {
    public static rentTypes: Array<Object> = [
        { id: 1, name: "daily", title: "Diariamente" },
        { id: 2, name: "weekly", title: "Semanalmente" },
        { id: 3, name: "monthly", title: "Mensalmente" },
        { id: 4, name: "moreThanAMonth", title: "Mais de um mês" },
        { id: 5, name: "negotiable", title: "Negociável" }
    ]
}

export enum RentTypeEnum {
    DAILY = 1,
    WEEKLY = 2,
    MONTHLY = 3,
    MORE_THAN_A_MONTH = 4,
    NEGOTIABLE = 5
}