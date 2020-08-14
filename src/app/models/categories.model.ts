export class CategoriesModel {
    public static categories: Array<Object> = [
        { id: 1, name: "ELETRONIC", title: "Eletrônico" },
        { id: 2, name: "PARTY", title: "Festa" },
        { id: 3, name: "SPORT", title: "Esporte" },
        { id: 4, name: "BOOKS", title: "Livro" },
        { id: 5, name: "MUSIC", title: "Musica" },
        { id: 6, name: "FURNITURE", title: "Mobílias" },
        { id: 7, name: "CLOTH", title: "Roupa" },
        { id: 8, name: "OTHERS", title: "Outros" }
    ]
}

export enum CategoriesEnum {
    ELETRONIC = 1,
    PARTY = 2,
    SPORTS = 3,
    BOOKS = 4,
    MUSIC = 5,
    FURNITURE = 6,
    CLOTHS = 7,
    OTHERS = 8
}