# Bjorn Finance: overdracht

Stand: 24 november 2026, app-versie **v56** (lokaal gecommit; Bjorn pusht met `..\Push Be finance.cmd`). Dit document is voor een nieuwe Claude-sessie zonder voorkennis.

> Let op: deze repo is **publiek** en GitHub Pages serveert ook dit bestand. Zet hier nooit bedragen, rekeningnummers, wachtwoorden of sleutels.

---

## 1. Naam en doel
**Bjorn Finance** is Bjorns persoonlijke financiën-app, een PWA voor iPhone en laptop. Hij houdt er zijn inkomsten, uitgaven, spaarpotjes, balans en vermogen in bij.
Het dashboard toont per maand wat er binnenkwam, wat eruit ging en wat er overbleef. De prognose rekent uit wanneer elk spaarpotje vol is.
Sinds kort is er een losstaand onderdeel **Sales**, voor het kopen en doorverkopen van spullen.
Doel op termijn: samen met zijn vriendin grip houden op het huishouden. Ze komt bij hem wonen.

- Live: https://byornn1993.github.io/Bjorn-finance/
- Repo: https://github.com/Byornn1993/Bjorn-finance (branch `main`, publiek)
- Eigenaar: Bjorn (nl-BE, geen programmeur)

## 2. Huidige status
**Werkt (live):**
- Aanmelden met e-mail en wachtwoord. Nieuwe accounts aanmaken staat uit.
- **Dashboard**:
  - een maandkaart "in één oogopslag" (Binnen / Uit / Over);
  - KPI-vakjes: Vrije cashflow, Leven, Gespaard & belegd, Saldo, Vermogen;
  - blokken: Categorieën, Potjes, Abonnementen.
  
  De vakjes en blokken zijn te verplaatsen via "Dashboard indelen".
- Meldingen: op de 25ste een banner om de vaste lasten te kopiëren, en na 30 dagen een herinnering om een back-up te maken.
- **Transacties**:
  - standaard de lopende maand, met een periodekeuze, filters en zoeken;
  - snelle categorie-chips;
  - "Meer details" (potje, notitie, bonnetje);
  - verwijderen kan 6 seconden lang ongedaan gemaakt worden.
- **Jaaroverzicht**, **Spaarpotjes** met daaronder de **Prognose** per maand, **Balans**, **Abonnementen**.
- **Sales** (v50–v52):
  - artikels met aankoopprijs per stuk en aantal;
  - de vinkjes In voorraad en Te koop (allebei tegelijk kan);
  - "Verkoop registreren": de voorraad daalt vanzelf;
  - een verpakkingsprijs uit bulkaankoop;
  - Omzet, Kosten, Winst en marge per periode en per platform.
- **Meer**-menu: Sales, Abonnementen, Balans, Dashboard indelen, Back-up maken/terugzetten, Thema, Bedragen verbergen, Wachtwoord wijzigen, Afmelden.
- Thema donker/licht, offline werken (cache + outbox), werkt op de iPhone als app op het beginscherm.
- **Maandlogboek** (map `logboek/`, alleen lokaal) met een geplande taak elke 25ste om 19:00 (zie §10), en sinds 23 november 2026 een **midmaandreview** elke 10de om 18:31 (geplande taak "Midmaandreview Bjorn Finance", een Claude-taak die deze computer nodig heeft; inhoud in `logboek/LEES MIJ.md`). Alleen lezen, niets wijzigen in de app.

**Half af / open:**
- **v56** (25/11): nieuw transactietype **Terugbetaling** (`type:'terugbetaling'`, met een uitgavencategorie). Verlaagt de uitgaven in die categorie, telt nooit als inkomen. `stats()` geeft `bruto`, `terug`, `terugCats`; `uitgaven`, levenskosten en eindsaldo zijn netto. Dashboard toont bruto / terugbetaald / netto; categorieën netto met "€ x terugbetaald"; jaaroverzicht netto per categorie plus infoRegel "Terugbetaald"; Transacties: filterchip, groene +. Getest in een headless browser met nepgegevens (laptop en 375 px), niet op Bjorns echte iPhone.
- **v55** (24/11): de gekozen maand wordt onthouden (localStorage `bf-period` en `bf-month`) en is gedeeld tussen Dashboard, Transacties en Sales. Ze blijft staan tot Bjorn zelf een andere kiest, ook bij een nieuwe kalendermaand. Knop **Deze maand** (alleen zichtbaar als je niet op de huidige maand staat) springt terug. Logica getest met node; nog niet visueel getest op laptop en iPhone.
- **v54** (24/11): de "25" vóór de maand is weg in de Prognose (tabel, "vol"-vakjes) en bij Spaarpotjes ("Vol volgens prognose"); er staat nu gewoon "nov 2026". Live sinds 24/11.
- De gebruiksaanwijzing is bijgewerkt tot en met v52. v53 (Vrije cashflow zonder opnames uit potjes), v54 (maand zonder "25") en v55 (maand onthouden, knop Deze maand) en v56 (terugbetalingen) staan er nog niet in.
- Het logboek van november 2026 is een tussenstand en wordt op 25 november aangevuld.

**Voorgesteld, nog niet gekozen:**
- een potje "Onvoorzien";
- afspraken voor het samenwonen (kosten verdelen).

**Bekend probleem (nog niet opgelost, eerst plan en akkoord):** de Prognose trekt in de lopende maand alleen de stortingen naar potjes af (`potMoves` → `dep`), niet de opnames. Haal je in een maand ook geld uit een potje, dan toont de prognose te weinig nog te sparen (gezien op 24/11/2026: november toonde 9.500 i.p.v. 10.000). Voorstel: met netto stortingen rekenen.

**Bewust afgewezen:** automatische update-knop, Excel-export (geschrapt in v46), het voorstel "L1" uit de analyse.

## 3. Mappenstructuur
```
Be finance/
├─ index.html              De hele app: HTML, CSS en JavaScript in één bestand (~186 KB)
├─ sw.js                   Service worker (offline cache). Constante CACHE = 'bjorn-finance-vNN'
├─ supabase.js             Supabase JS-client v2 (gebundeld, lokaal, geen CDN)
├─ manifest.webmanifest    PWA-manifest (naam, kleuren, iconen)
├─ favicon.png, apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png
├─ HANDOVER.md, CLAUDE.md  Dit document en de werkafspraken
├─ .gitignore              Houdt alles hieronder uit git
├─ bjorn-finance-export-*.json   Back-up met echte gegevens  (NIET in git)
├─ logboek/                Maandverslagen + LEES MIJ.md     (NIET in git)
├─ documenten/             Gebruiksaanwijzing en verslag (PDF/DOCX), afbeeldingen/logo's (NIET in git)
├─ prompts/                Prompts: huisstijl, kleurenpalet, huishouden, sales (NIET in git)
└─ werkbestanden/          Back-ups index.vNN.bak.html, node-scripts per wijziging, oude iconen (NIET in git)
```

## 4. Technologie
- Geen framework en geen build-stap. Alles zit in één statisch `index.html` (vanilla JavaScript, ES2020+, CSS met custom properties), met een eigen eenvoudige router via de hash (`#dashboard`, `#transacties`, `#sales`, …).
- **Supabase** (Auth + Postgres + Storage) via `supabase.js`, de gebundelde `@supabase/supabase-js` v2.
- Lettertype Inter via Google Fonts.
- Hosting op **GitHub Pages**, direct vanaf `main`.
- Hulpmiddelen: git (autocrlf=true, de bestanden zijn CRLF) en Node voor de eenmalige wijzigscripts en de syntaxcontrole.

## 5. Starten, testen en uitrollen
**Lokaal bekijken:** open https://byornn1993.github.io/Bjorn-finance/ en meld aan. Lokaal openen met `file://` werkt niet goed (service worker, login).

**Wijzigen:**
1. `git fetch` en `git status`. Kijk op github.com/Byornn1993/Bjorn-finance/commits/main of er commits van elders zijn, en neem die eerst mee (`git pull`).
2. Maak een back-up: `cp index.html werkbestanden/index.vNN.bak.html`.
3. Pas `index.html` aan, met Edit of een node-script in `werkbestanden/`. Normaliseer eerst met `.replace(/\r\n/g,'\n')`.
4. Controleer de syntax:
   `node -e "const h=require('fs').readFileSync('index.html','utf8');[...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach(m=>new Function(m[1]))"`
5. Verhoog `CACHE` in `sw.js` (bv. `bjorn-finance-v54`).

**Testen** (de login wordt gedeeld op hetzelfde domein):
1. `cp index.html test.html; git add -f test.html; git commit -m "Tijdelijke testpagina"; git push`
2. Wacht tot GitHub Pages klaar is (soms tot ~6 minuten). Open daarna `https://byornn1993.github.io/Bjorn-finance/test.html#dashboard`.
3. Test op laptopbreedte en op iPhone-breedte (375 px). **Sla geen testgegevens op in de echte database**: test zonder op te slaan. Zet `window.confirm=()=>true` als een dialoog in de weg staat.

**Uitrollen:**
0. Vanuit Cowork kan Claude niet pushen: Bjorn dubbelklikt dan op `..\Push Be finance.cmd` (doet alleen `git push` in deze map).
1. `git rm test.html`
2. `git add index.html sw.js`
3. `git commit -m "vNN: korte uitleg"`, eindigend met een Co-Authored-By-regel.
4. `git push`
5. Controleer dat `sw.js?t=…` live het nieuwe versienummer toont.
6. Zeg Bjorn: op de laptop **F5**, op de iPhone de app **twee keer helemaal sluiten** en weer openen.

## 6. Data
**Supabase** (een eigen project, apart van Bjorns andere apps). Eén tabel `items`:

| kolom | inhoud |
|---|---|
| `user_id` | eigenaar (RLS: elke gebruiker ziet alleen zijn eigen rijen) |
| `soort` | CHECK-constraint: alleen `tx`, `pots`, `balance`, `networth`, `prognose` |
| `id` | sleutel binnen de soort |
| `gegevens` | JSON met de inhoud |

- `tx`: transactie `{date, type (inkomen/uitgave/sparen/overboeking…), amount, cat, potIn, potOut, note, receipt…}`
- `pots`: spaarpotje `{name, goal, start, startDate…}`
- `balance`, `networth`: balans- en vermogensposten
- `prognose`: wordt ook gebruikt voor losse documenten, omdat de constraint geen nieuwe soorten toelaat:
  - `plan`: prognose-instellingen (maanden, gepland, extra, volgorde);
  - `indeling`: categorieën;
  - `dashboard`: volgorde van de vakjes en blokken;
  - `backup`: datum van de laatste back-up;
  - `sale-<id>`: een Sales-artikel `{kind:'sale', name, shop, buyDate, buyPrice (per stuk), qty, status:'voorraad'|'verkocht', inStock, forSale, sellDate, platform, sellPrice (totaal), feeCost, packCost, otherCost, note}`;
  - `pack-<id>`: een verpakkingsaankoop `{kind:'pack', desc, qty, price, date}`.
- **Storage**-bucket voor bonnetjes (privé).

**In de browser (localStorage):**
- `bf-data-<uid>`: offline cache;
- `bf-outbox-<uid>`: wijzigingen die nog verstuurd moeten worden;
- `bf-theme`, `bf-email`, `bf-pv` (bedragen verbergen), `bf-cp-skip`, `bf-period` en `bf-month` (gekozen maand, sinds v55).

**Lokaal:** de back-up `bjorn-finance-export-JJJJ-MM-DD.json` (knop *Back-up maken*) en `logboek/*.md`.

## 7. Instellingen en variabelen (alleen namen)
- `SB_URL`, `SB_KEY` in `index.html`: de Supabase-projecturl en de **publishable/anon** sleutel. Die mogen publiek staan, want de beveiliging zit in RLS.
- `CACHE` in `sw.js`.
- `COPY_DAY = 25` (dag van de vaste-lastenbanner), `DASH_DEFAULT` (standaardindeling van het dashboard), `SALE_PLATFORMS`.
- Er is geen `.env`. De **service_role/secret key** en het **databasewachtwoord** worden nooit gevraagd of gebruikt.

## 8. Beslissingen en waarom
- **Eén statisch bestand, geen build.** Eenvoudig voor Bjorn, en direct te hosten op GitHub Pages.
- **Nieuwe data als `prognose`-rij** (sale-, pack-, plan, …). De CHECK-constraint laat geen nieuwe soorten toe, en zo hoeft er niets aan de database te veranderen.
- **Rekenregels** (veranderen alleen op Bjorns vraag):
  - Een overboeking van potje naar rekening is een **opname** en telt in de maandstatistiek als inkomen. Van rekening naar potje is een **storting** en telt als sparen.
  - Alleen op het dashboard: **Gespaard & belegd = sparen − opname** (v49) en **Vrije cashflow = cashflow − opname** (v53). Geld uit een potje is geen echt inkomen. Overzicht, jaaroverzicht en saldo blijven ongewijzigd.
  - Een saldo wordt vanaf november 2026 overgedragen naar de volgende maand (carry-in).
  - **Prognose** (v48):
    - Voorbije maanden tonen alleen de echte bewegingen in en uit de potjes.
    - De lopende en latere maanden tonen het plan plus extra, min wat die maand al echt gestort is.
    - Bewegingen vóór de startdatum van een potje tellen niet; die zitten al in het startbedrag.
  - **Terugbetaling** (v56): geld terug voor een gedeelde uitgave (Payconiq van Stephanie, collega's). Verlaagt de uitgave in de gekozen categorie, is geen inkomen. Bruto uitgaven − terugbetaald = netto uitgaven; Leven, Vrije cashflow en Over rekenen netto. Oudere app-versies negeren dit type: altijd eerst pushen, dan pas terugbetalingen boeken.
  - **Sales staat volledig los** van het dashboard, het jaaroverzicht, de potjes, de prognose en de balans. "Kosten" telt de aankoopprijs pas als een artikel verkocht is. Bjorn vindt dat goed zo.
- **Vereenvoudiging (v46).** De pagina Inkomsten is opgegaan in Transacties, de Prognose staat onder Spaarpotjes, en Excel is geschrapt. Minder schermen en makkelijker in gebruik.
- **Huisstijl:**
  - kleuren #101418, #2C3E50, #B08D57 (goud), #DCC9A6, #FBF6EE;
  - een donker en een licht thema, met een gloed op de achtergrond en doorschijnende kaarten;
  - mobile-first;
  - Belgische notatie (€ 1.234,56);
  - logo met een gouden €.

  Zie `prompts/Bjorn huisstijl prompt.txt`.

## 9. Bekende bugs en valkuilen
- **De iPhone toont na een update de oude versie** → de app twee keer helemaal sluiten. Vergeet ook nooit `CACHE` in `sw.js` te verhogen.
- **Overschrijven van wijzigingen van elders.** Dat is één keer gebeurd: het glow-design ging verloren en is hersteld in v46. Altijd eerst fetchen en pullen.
- **CRLF.** Zoekstrings in scripts falen als je `\r\n` niet normaliseert.
- **Een native `confirm()`-dialoog bevriest een geautomatiseerd testtabblad.** Overschrijf `window.confirm` in tests.
- **Schrijven van testgegevens naar de echte Supabase wordt (terecht) geblokkeerd.** Test zonder op te slaan.
- **GitHub Pages heeft soms een paar minuten nodig.** Controleer met `?t=` dat de nieuwe versie live is.
- **`statCache`.** De memo van `stats(y,m)` moet leeg na elke wijziging aan de data (render, putLocal, remove, loadAll).

## 10. Volgende stappen
1. **25 november 2026:** het maandgesprek via de geplande taak "Maandgesprek Bjorn Finance". Die staat in `C:\Users\Gebruiker\.claude\scheduled-tasks\bjorn-finance-maandgesprek\SKILL.md` en verwijst naar `…\Persoonlijke apps\Be finance\logboek`. Werk `logboek/2026-11 november.md` bij (de waarom-kolom, wat anders). De gegevens alleen lezen.
2. Zet de wijziging van v53 in de gebruiksaanwijzing. Die staat als Claude Doc (https://claude.ai/artifact/WhKpxqJChAQzZ8KcyEVPjf), met een export in `documenten/`.
3. **10 december 2026:** eerste midmaandreview (geplande taak, zie §2). Nakijken of hij goed liep en de cijfers kon lezen.
4. In december: het laatste maandgesprek plus `logboek/2026 jaarsamenvatting.md`.
5. Als zijn vriendin er woont: een plan voor gedeelde kosten. Eerst een plan voorleggen en niets bouwen zonder akkoord. Daarna eventueel het potje "Onvoorzien".

## 11. Samenhang met Bjorns andere apps
Alle apps staan in `C:\Users\Gebruiker\OneDrive\Documenten\Persoonlijke apps\`. Ze delen dezelfde huisstijl (goud en antraciet, licht en donker) en worden op dezelfde manier gehost op GitHub Pages onder `byornn1993`.

| App | Map | Repo | Supabase |
|---|---|---|---|
| **Bjorn Finance** | `Be finance` | Bjorn-finance | **eigen project, staat los van de andere** |
| Be Strong (fitness) | `Be strong` | Be-strong | gedeeld project (eigenaar) |
| Boodschappenlijst | `B lists` | Boodschappenlijst | gedeeld project, tabellen `lists_` |
| Our Network | `Our Network` | Our-Network | gedeeld project, tabellen `net_` |

Er is geen technische koppeling: Bjorn Finance leest of schrijft niets in de andere apps, en omgekeerd. Raak vanuit dit project nooit het gedeelde Supabase-project aan. Zie `SUPABASE_SHARED.md` in de andere mappen.
