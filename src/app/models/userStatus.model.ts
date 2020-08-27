export class UserStatusModel {
    public static rentTypes: Array<Object> = [
        { id: 1, name: "ACTIVE", title: "Active" },
        { id: 2, name: "INACTIVE", title: "Inactive" },
        { id: 3, name: "BANNED", title: "Banned" },
        { id: 4, name: "PENDING", title: "PENDING" }
    ]
}

export enum UserStatusEnum {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BANNED = "BANNED",
    PENDING = "PENDING"
}