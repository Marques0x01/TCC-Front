export class CategoriesModel {
    public static categories: Array<Object> = [
        { id: 1, name: "eletronic", title: "Eletrônico" },
        { id: 2, name: "party", title: "Festa" },
        { id: 3, name: "sports", title: "Esporte" },
        { id: 4, name: "books", title: "Livro" },
        { id: 5, name: "music", title: "Musica" },
        { id: 6, name: "furniture", title: "Mobílias" },
        { id: 7, name: "cloths", title: "Roupa" },
        { id: 8, name: "others", title: "Outros" }
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