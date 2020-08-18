export class RentTypeModel {
    public static rentTypes: Array<Object> = [
        { id: 1, name: "DAILY", title: "Diariamente" },
        { id: 2, name: "WEEKLY", title: "Semanalmente" },
        { id: 3, name: "MONTHLY", title: "Mensalmente" },
        { id: 4, name: "MORE_THAN_A_MONTH", title: "Mais de um mês" },
        { id: 5, name: "NEGOTIABLE", title: "Negociável" }
    ]
}

export class RentType {
    public static types: Object = {
        DAILY: { id: 1, name: "DAILY", title: "Diariamente" },
        WEEKLY: { id: 2, name: "WEEKLY", title: "Semanalmente" },
        MONTHLY: { id: 3, name: "MONTHLY", title: "Mensalmente" },
        MORE_THAN_A_MONTH: { id: 4, name: "MORE_THAN_A_MONTH", title: "Mais de um mês" },
        NEGOTIABLE: { id: 5, name: "NEGOTIABLE", title: "Negociável" }
    }
}

export enum RentTypeEnum {
    DAILY = 1,
    WEEKLY = 2,
    MONTHLY = 3,
    MORE_THAN_A_MONTH = 4,
    NEGOTIABLE = 5
}