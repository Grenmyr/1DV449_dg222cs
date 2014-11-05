Krav

    Scriptet ska vara helt automatiserat och börja sin skrapning på URL:en http://coursepress.lnu.se/kurser
    Du ska göra regelbundna commits av din kod och synkronisera denna till GitHub.

    Informationen som ska skrapas är:
        Kursens namn
        Den URL kurswebbplatsen har
        Kurskod
        URL till kursplanen
        Den inledande texten om varje kurs
        Senaste inläggets rubrik, författare samt datum/klockslag för detta inlägg (på formatet YYYY-MM-DD HH:MM)
        Finns inte den aktuella informationen på något av fälten ska de ersättat med texten "no information". T.ex. "coursecode" : "no information".
        Du ska också låta ditt skript ta reda på viss statistik kring skrapningen genom att att i ditt JSON-dokument inkludera även hur många kurser som skrapats ner samt en timestamp om när senaste skrapningen gjordes (bör användas vid din cachningsstrategi).

    All data ska sparas på disk i en fil i korrekt JSON-format som man ska kunna komma åt via en URL efter skrapningen är gjord. Fundera över hur du strukturerar upp din JSON på ett bra sätt! Använd jsonlint.org eller lämpligt plugin till din editor för att validera json-strukturen du skapar.
    Du ska bara skrapa kurser! (dock ej för extrauppgiften) observera att visa sidor hör till ett projekt, ämne, blogg eller t.ex. är coursepress startsida. Hitta ett enkelt sätt att särskilja dem!
    Du ska implementera en enklare cachingsstategi som gör att om man anropar sidan som kör ditt script ska bara själva skrapningen göras ifall fem minuter har passerat sedan sista gången. Det ska dock vara enkelt att kicka igång skrapan vid redovisning genom en enkel ändring i koden eller borttagning av JSON-filen.
    Din webbskrapas alla HTTP-anrop mot coursepress webbserver ska identifiera dig på lämpligt sätt.
    Du ska skriva ner dina reflektioner (se nedan) i ett dokument i md-format som ska vara enkelt åtkommligt från ditt GitHub-repo.
    När du anser dig klar med uppgiften gör du en release/tag på GitHub. Döp den liknande L01-v.1.0. Vid eventuella kompletteringar gör du en ny release L01-v.1.1 o.s.v.
