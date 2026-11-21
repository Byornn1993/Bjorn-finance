# Bjorn Finance: werkafspraken voor Claude

Dit bestand wordt bij elke sessie in deze map gelezen. Houd het actueel. Lees voor de volledige achtergrond eerst [HANDOVER.md](HANDOVER.md).

## Werkmap
- Werk **altijd** in `C:\Users\Gebruiker\OneDrive\Documenten\Persoonlijke apps\Be finance` (git, branch `main`).
- Sla alles op in deze map: scripts en back-ups in `werkbestanden/`, documenten in `documenten/`, prompts in `prompts/`, maandverslagen in `logboek/`.
- Live: https://byornn1993.github.io/Bjorn-finance/ (repo `Byornn1993/Bjorn-finance`, **publiek**).

## Communicatie
- Antwoord altijd in het **Nederlands** (Belgisch), kort en concreet. Bjorn is geen programmeur.
- Eén stap per bericht, met de exacte knopnamen uit de app.
- Leg vóór grotere wijzigingen eerst een duidelijk plan voor, en wacht op zijn akkoord.
- Zeg eerlijk wat getest is en wat niet.

## Harde regels
- **Vraag nooit naar en gebruik nooit** de secret- of service_role-sleutel, het databasewachtwoord of Bjorns wachtwoord.
- **Raak bestaande data in Supabase nooit aan zonder het eerst te vragen.** Maak altijd eerst een back-up of een migratieplan. Schrijf geen testgegevens naar de echte database.
- **Verander geen rekenregels** zonder dat Bjorn erom vraagt.
- **Persoonlijke gegevens nooit in git:** `bjorn-finance-export-*.json`, `logboek/`, `documenten/`, `prompts/` en `werkbestanden/` staan in `.gitignore`. Zet geen bedragen of e-mailadressen in code of in md-bestanden in de repo.
- Kijk vóór elke push op github.com/Byornn1993/Bjorn-finance/commits/main of er commits van elders zijn. Neem die eerst mee.
- Verhoog na elke wijziging `CACHE` in `sw.js`.
- Test eerst op een tijdelijke `test.html` (laptop- en iPhone-breedte), en verwijder die daarna.
- Werk na elke wijziging de gebruiksaanwijzing bij.
- Schrap niets zonder het eerst te vragen.
- Het Supabase-project van Be Strong, Boodschappenlijst en Our Network is een ander project. Raak het vanuit hier nooit aan.

## Stijl
- Huisstijl:
  - kleuren #101418, #2C3E50, #B08D57 (goud), #DCC9A6, #FBF6EE;
  - een donker en een licht thema, met de gloed op de achtergrond en doorschijnende kaarten;
  - lettertype Inter.
- Mobile-first (iPhone), maar ook netjes op de laptop.
- Bedragen in Belgische notatie: € 1.234,56.
- Eenvoud gaat voor: minder knoppen en minder schermen.
- Commits: `vNN: korte uitleg in het Nederlands`, eindigend met de Co-Authored-By-regel.
