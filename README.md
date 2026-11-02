# 🌽 Cornhole Scorekeeper

Telefonbarát cornhole pontozó webapp. Egyetlen HTML fájl, telepítés, fiók és reklám nélkül.

## Funkciók

- **Két játékmód**
  - **ACL mód** – hivatalos kancellációs pontozás: a két csapat körönkénti pontjait egymásból vonja le, csak a különbség számít.
  - **Egyszerű mód** – minden zsák pontja összeadódik.
- **Lyuk és palán külön számolva** – lyuk = 3 pont, palán = 1 pont, nagy +/− gombokkal.
- **Kör nettó** – mentés előtt élőben látszik, mennyit ér a kör.
- **Célpontszám** – alapértelmezetten 21, 11 és 50 között állítható.
- **Körök története** – az előző körök táblázata lyuk/palán/nettó bontásban.
- **Visszavonás** – az utolsó mentett kör visszaállítható.
- **Automatikus mentés** – a meccs állása, csapatnevek és beállítások a böngésző `localStorage` tárhelyére kerülnek; újratöltés után a folyamatban lévő meccs folytatható.
- **Biztonságos csapatnevek** – a statisztikai nézet HTML-kódként nem értelmezi a megadott neveket.
- **Statisztikák** – összpontszám, átlag pont/kör, lyuk és palán arány (%), összes dobott zsák.
- **Szabályok** – gyors ACL referencia a meccs közben.
- **Offline** – egyetlen fájl, internet nélkül is fut.

## Használat

1. **Meccs** fül: válassz módot, add meg a csapatneveket és a célpontszámot, majd *Meccs indítása*.
2. Minden kör végén írd be a lyukba és a palánra került zsákok számát csapatonként, majd *Kör mentése ✓*.
3. A felső sáv mutatja az állást; a cél elérésekor megjelenik a győztes.
4. **Stat** fülön a meccs statisztikái, **Szabály** fülön az ACL szabályok.


> A meccs automatikusan a böngésző helyi tárhelyére mentődik. Az *Új meccs* gombbal indított új mérkőzés az előző mérkőzés aktuális állását felülírja. A mentés az adott böngészőhöz és eszközhöz kötött; a böngészőadatok törlésekor elveszhet.

## Futtatás

Nincs build lépés, nincs függőség.

```bash
git clone https://github.com/nomadbeni/cornholescore
cd cornholescore
# nyisd meg az index.html-t böngészőben, vagy szolgáld ki helyben:
python3 -m http.server 8000
```

Ezután: <http://localhost:8000>

Az `index.html` közvetlenül fájlként megnyitva is teljes értékűen működik.

## Használat telefonon

Töltsd le az `index.html` fájlt a telefonra (GitHubon: *Raw* → mentés), majd nyisd meg a böngészőben. Internet nem kell hozzá. A böngésző menüjéből a *Hozzáadás a kezdőképernyőhöz* paranccsal parancsikon tehető ki.

## Fájlok

| Fájl | Tartalom |
|---|---|
| `index.html` | A teljes app (HTML, CSS, JavaScript egyben) |
| `manifest.json`, `sw.js`, `icon*.svg/png` | Opcionális: HTTPS-en (pl. GitHub Pages) ettől lesz telepíthető PWA. Az app nélkülük is működik. |
| `LICENSE` | MIT licenc |

## Pontozás röviden

| Dobás | Pont |
|---|---|
| Lyukba esett zsák | 3 |
| A palánon maradt zsák | 1 |
| Földre esett zsák | 0 |

**Kancellálás példa:** az 1. csapat 7 pontot, a 2. csapat 4 pontot dob → az 1. csapat 3 pontot kap, a 2. csapat 0-t.

## Fejlesztési ötletek

- Játékosnevek és hosszabb távú statisztika
- Angol nyelvi változat

## Tesztek

Node.js 22 vagy újabb verzióval futtathatók:

```bash
node --test
```

A GitHub Actions minden `main` ágra érkező push és pull request esetén automatikusan lefuttatja a teszteket.

## Licenc

[MIT](LICENSE)

## Mesterséges intelligencia

> **Ezt az appot mesterséges intelligencia készítette.** A teljes kódot, az ikonokat és ezt a dokumentációt az Anthropic **Claude** nevű MI-asszisztense írta (Claude Code, Claude Sonnet 5.5), `nomadbeni` kérésére és irányításával. A pontozási, körvalidációs, visszavonási és csapatnév-escape logikához Node.js automatizált tesztek tartoznak. Teljes körű mobilböngészős tesztelés nem történt; hibák előfordulhatnak.

