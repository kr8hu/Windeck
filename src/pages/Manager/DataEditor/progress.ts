export const progress = {
    init: 0,
    setExecutable: 1,
    setImage: 2,
    setName: 3,
    summary: 4,
    edit: 5
}

export const progressData = [
    {
        title: "Alkalmazás felvétele a könyvtárba",
        text: "A kezdéshez kattints a gombra.",
        buttonLabel: "Kezdés"
    },
    {
        title: "Indítófájl kijelölése",
        text: "A gomb megnyomása után jelöld ki az alkalmazást indító fájlt.",
        buttonLabel: "Tallózás"
    },
    {
        title: "Borítókép kijelölése",
        text: "A gomb megnyomása után jelöld ki a könyvtárban megjelenő borítóképet. (Engedélyezett formátumok: .jpg, .jpeg, .png)",
        buttonLabel: "Tallózás"
    },
    {
        title: "Alkalmazás neve",
        text: "Add meg hogy az alkalmazás milyen névvel jelenjen meg a könyvtáradban.",
        buttonLabel: "Tovább"
    },
    {
        title: "Összegzés",
        text: "Ellenőrizd a felvett adatokat.",
        buttonLabel: "Felvétel a könyvtárba"
    }
]