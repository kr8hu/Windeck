# Windeck

Indítópult alkalmazás a Windows rendszert futtató Steam Deck eszközökre.

## Fő funkciók

- **Könnyű vezérlés**: Érintőképernyős és kontrolleres irányítás
- **Játékkönyvtár**: A könyvtárból könnyedén elérhetők és szerkeszthetők a felvett programok
- **Autostart**: A fiókba történő bejelentkezés után automatikusan elindul az alkalmazás

## Telepítési útmutató

1. **Csomagok telepítése**:
```bash
npm install
```

## Használati útmutató

**Frontend teszteléshez**:

```bash
npm run dev
```

**Tauri funkciók tesztelése**:

```bash
npm run tauri dev
```

**Build**:
```bash
npm run tauri dev
```

A folyamat befejeztével a target/release/bundle/msi könyvtárban található a telepítő.

## Rendszerkövetelmények

- **Platform**: Windows
- **Szükséges támogatás**: WebView2

Fejlesztéshez: [https://v1.tauri.app/v1/guides/getting-started/prerequisites/](https://v1.tauri.app/v1/guides/getting-started/prerequisites/)

## Képernyőképek
<div style="display: flex; justify-content: space-between;">
<img src="screenshots/screenshot.png" width="100%" height="auto">
</div>