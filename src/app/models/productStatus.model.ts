export class ProductStatusModel {
    public static rentTypes: Array<Object> = [
        { id: 1, name: "ACTIVE", title: "Active" },
        { id: 2, name: "INACTIVE", title: "Inactive" },
        { id: 3, name: "REMOVED", title: "Removed" }
    ]
}

export enum ProductStatusEnum {
    ACTIVE = 1,
    INACTIVE = 2,
    REMOVED = 3
}