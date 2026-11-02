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
- **Statisztikák** – összpontszám, átlag pont/kör, lyuk- és palánarány, dobott zsákok.
- **Játékosok** – csapatonként legfeljebb két játékos neve adható meg; a lezárt mérkőzések játékosstatisztikái összesítve láthatók.
- **Mérkőzésarchívum** – a befejezett meccsek eredménye, dátuma és játékmódja automatikusan mentődik; legfeljebb 100 mérkőzés marad meg.
- **Magyar / angol felület** – a nyelv a felső sávban váltható, a választás megmarad.
- **PWA-frissítésjelzés** – új verzió esetén külön Frissítés gomb jelenik meg, így a futó meccs közben nem történik automatikus újratöltés.
- **Szabályok** – gyors ACL referencia a meccs közben.
- **Offline** – egyetlen fájl, internet nélkül is fut.

## Használat

1. **Meccs** fül: válassz módot, add meg a csapatneveket és a célpontszámot, majd *Meccs indítása*.
2. Minden kör végén írd be a lyukba és a palánra került zsákok számát csapatonként, majd *Kör mentése ✓*.
3. A felső sáv mutatja az állást; a cél elérésekor megjelenik a győztes.
4. **Stat** fülön az aktuális meccs adatai, a korábbi mérkőzések és a játékosok összesített eredményei láthatók.
5. A csapatnevek alatt opcionálisan megadható két-két játékos. A játékosstatisztika a lezárt mérkőzésekből készül.
6. A felső sáv **EN / HU** gombjával válthatsz nyelvet.
7. Új PWA-verzió esetén a frissítést a megjelenő gombbal lehet jóváhagyni.


> A meccs és a lezárt mérkőzések archívuma automatikusan a böngésző helyi `localStorage` tárhelyére mentődik. Az archívum legfeljebb 100 lezárt mérkőzést tart meg. Az *Új meccs* gombbal indított új mérkőzés az aktuális, folyamatban lévő állást felülírja, a korábbi lezárt meccsek archívuma megmarad. A mentés az adott böngészőhöz és eszközhöz kötött; a böngészőadatok törlésekor elveszhet. Nincs felhőszinkronizáció.

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

- Több eszköz közötti mentésszinkronizáció (opcionális, későbbi fejlesztés)

## Tesztek

Node.js 22 vagy újabb verzióval futtathatók:

```bash
node --test
```

A GitHub Actions minden `main` ágra érkező push és pull request esetén automatikusan lefuttatja a teszteket.

## P2 fejlesztések – játékosok, archívum és nyelvváltás

- A játékosnevek opcionálisak, csapatonként két mező áll rendelkezésre.
- A mérkőzés akkor kerül az archívumba, amikor valamelyik csapat eléri a győzelmi feltételt.
- A játékosstatisztika a megadott játékosnevek alapján számolja a lejátszott mérkőzéseket, győzelmeket és a csapat pontjait. Páros játék esetén a csapat eredményét mindkét játékoshoz hozzárendeli.
- A mérkőzésarchívum legfeljebb 100 lezárt mérkőzést őriz.
- A nyelvváltás a navigációt, a pontozó felületet, a statisztikákat és a szabályokat is érinti.
- A PWA új verziója értesítést ad; az aktiválás felhasználói jóváhagyással történik.

## Licenc

[MIT](LICENSE)

## Mesterséges intelligencia

> **A projekt fejlesztésében mesterséges intelligencia is közreműködött.** Az alkalmazás első változatát, az ikonokat és az eredeti dokumentációt az Anthropic **Claude** nevű MI-asszisztense készítette (Claude Code, Claude Sonnet 5.5), `nomadbeni` kérésére és irányításával. A pontozási, körvalidációs, visszavonási és csapatnév-escape logikához Node.js automatizált tesztek tartoznak. Teljes körű mobilböngészős tesztelés nem történt; hibák előfordulhatnak.

## További fejlesztői közreműködés

A projekt kódjának felülvizsgálatában és továbbfejlesztésében az **OpenAI ChatGPT** is közreműködött. A ChatGPT segítségével készültek el többek között a P0 és P1 fejlesztések: a zsákszám-korlátozás, a mérkőzés lezárásának javításai, a kör visszavonása, a böngészőalapú automatikus mentés, a biztonságosabb megjelenítés, továbbá a P2 csomag játékoskezelése, mérkőzésarchívuma, magyar–angol kezelőfelülete és PWA-frissítésjelzése, valamint az ezekhez tartozó automatizált tesztek és GitHub Actions munkafolyamat. A fejlesztési irányokat és a végleges módosításokat a projekt gazdája határozta meg és hagyta jóvá.
