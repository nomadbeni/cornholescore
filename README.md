# 🌽 Cornhole Scorekeeper

Telefonbarát cornhole pontozó webapp. Egyetlen HTML fájl, telepítés, fiók és reklám nélkül, internet nélkül is működik.

## Funkciók

- **Két játékmód**
  - **ACL mód** – hivatalos kancellációs pontozás: a két csapat körönkénti pontjait egymásból vonja le, csak a különbség számít.
  - **Egyszerű mód** – minden zsák pontja összeadódik.
- **Lyuk és palán külön számolva** – lyuk = 3 pont, palán = 1 pont, nagy +/− gombokkal.
- **Kör nettó** – mentés előtt élőben látszik, mennyit ér a kör.
- **Célpontszám** – alapértelmezetten 21, 11 és 50 között állítható.
- **Körök története** – az előző körök táblázata lyuk/palán/nettó bontásban.
- **Statisztikák** – összpontszám, átlag pont/kör, lyuk és palán arány (%), összes dobott zsák.
- **Szabályok** – gyors ACL referencia a meccs közben.
- **Telepíthető (PWA)** – kezdőképernyőre tehető, teljes képernyőn fut, offline is indul.

## Használat

1. **Meccs** fül: válassz módot, add meg a csapatneveket és a célpontszámot, majd *Meccs indítása*.
2. Minden kör végén írd be a lyukba és a palánra került zsákok számát csapatonként, majd *Kör mentése ✓*.
3. A felső sáv mutatja az állást; a cél elérésekor megjelenik a győztes.
4. **Stat** fülön a meccs statisztikái, **Szabály** fülön az ACL szabályok.

> A meccs állása a böngésző memóriájában él: az oldal újratöltése vagy az *Új meccs* gomb törli. A mentett adatok a későbbi fejlesztések között szerepelnek.

## Futtatás

Nincs build lépés, nincs függőség.

```bash
git clone https://github.com/nomadbeni/cornholescore
cd cornholescore
# nyisd meg az index.html-t böngészőben, vagy szolgáld ki helyben:
python3 -m http.server 8000
```

Ezután: <http://localhost:8000>

A service worker (offline mód) és a telepítés csak HTTPS-en vagy `localhost`-on működik. Ha az `index.html`-t közvetlenül fájlként nyitod meg, az app ettől még teljes értékűen használható.

## Telepítés telefonra

**Android (Chrome):** menü (⋮) → *Telepítés* vagy *Hozzáadás a kezdőképernyőhöz*.
**iPhone (Safari):** Megosztás → *Hozzáadás a főképernyőhöz*.

Ehhez az appot HTTPS-en kell elérhetővé tenni (lásd lent), vagy a fájlt letöltve a böngészőből megnyitni.

## Közzététel (opcionális)

A repó statikus oldalként bármely tárhelyen futtatható:

- **GitHub Pages:** *Settings → Pages → Deploy from a branch → `main` / `(root)`*. Privát repónál ehhez fizetős GitHub-csomag kell.
- **Cloudflare Pages / Netlify:** a repó összekötése után build parancs nélkül, a gyökérkönyvtárból szolgálja ki.
- **Saját szerver:** a mappát tedd egy nginx/Caddy által kiszolgált könyvtárba.

## Fájlok

| Fájl | Tartalom |
|---|---|
| `index.html` | A teljes app (HTML, CSS, JavaScript egyben) |
| `manifest.json` | PWA leíró: név, ikonok, színek |
| `sw.js` | Service worker az offline működéshez |
| `icon.svg`, `icon-192.png`, `icon-512.png` | Appikonok |

Ha módosítod a fájlokat, a `sw.js`-ben emeld a `CACHE` verzióját (`cornhole-v2`, …), különben a telefonok a régi változatot mutatják.

## Pontozás röviden

| Dobás | Pont |
|---|---|
| Lyukba esett zsák | 3 |
| A palánon maradt zsák | 1 |
| Földre esett zsák | 0 |

**Kancellálás példa:** az 1. csapat 7 pontot, a 2. csapat 4 pontot dob → az 1. csapat 3 pontot kap, a 2. csapat 0-t.

## Fejlesztési ötletek

- Meccs mentése (`localStorage`), hogy újratöltés után se vesszen el
- Játékosnevek és hosszabb távú statisztika
- Visszavonás gomb az utolsó körhöz
- Angol nyelvi változat

## Licenc

Személyes projekt, jelenleg nincs megadott licenc.
