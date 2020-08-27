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

export class Category {
    public static category: Object = {
        ELETRONIC: { id: 1, name: "ELETRONIC", title: "Eletrônico" },
        PARTY: { id: 2, name: "PARTY", title: "Festa" },
        SPORT: { id: 3, name: "SPORT", title: "Esporte" },
        BOOKS: { id: 4, name: "BOOKS", title: "Livro" },
        MUSIC: { id: 5, name: "MUSIC", title: "Musica" },
        FURNITURE: { id: 6, name: "FURNITURE", title: "Mobílias" },
        CLOTH: { id: 7, name: "CLOTH", title: "Roupa" },
        OTHERS: { id: 8, name: "OTHERS", title: "Outros" }
    }
}

export enum CategoriesEnum {
    ELETRONIC,
    PARTY,
    SPORTS,
    BOOKS,
    MUSIC,
    FURNITURE,
    CLOTHS,
    OTHERS 
}