

# Projektrapport dg222cs

    Min ide med Flytthjälpen var att skapa en applikation nichad mot användare som behöver finna information vid flytt till ny ort.
    Genom att kombinera google maps och eniro kan jag printa ut företag på en karta och presentera viktig information för min målgrupp.
    Eftersom företagen presenteras via kartan så får användaren en bild av var den finns i förhållande till deras nya omgivning. Tanken med
    applikationen är att inkludera mer företagstyper. Var finns närmsta matbutik? var kan jag klippa mig, var finns dagis för mina barn och
    information kring det är min vision med sidan. Kort o sagt en flytthjälp.

#### Linkande applikation
[Liknande apllikation](http://www.hitta.se/kartan)

### UML med relationer och viktiga funktioner för client
![client](http://yuml.me/450ac39b)

### Schematiska bild beskrivande externa API och min applikations beroende av dom.
![client](http://yuml.me/6803b6d2)

## Serversida

### Tekniker Server (app.js):

#### Node js & Javascript
    1. persistent lagring: Mongodb, Monk och Request.

        Mongodb och monk var båda helt nya tekniker för mig. Monk är en modul som gör
        användningen av mongodb enklare. Jag har strukturerat min persistenta lagring i collections som motsvarar
        en klassiskt tabell. Där varje företagstyp har en tabell. I varje tabell exempelvis flyttfirma lagras sökningar
        för varje stad/samhälle som enirodb har minst ett företag sparade så skapar jag ett Json objeckt.
        Ett Json objekt motsvararen rad i en klassisk databas.

        Funktionalitet: Det finns 3 funktioner som arbetar mot databasen, find() findAll() insert()

        find() returnerar objekt sparade i databas som motsvara sökning på client ex: flyttfirma i kalmar.
        findAll() retunerar alla objekt.
        insert() används för spara nya sökningar till databas.

        Detta ger full intern CRUD för server.

        Cachning:
            Use Case 1: data finns sparad med timestamp
            Användare gör sökning :
                Användare söker på Malmö och flyttfirma
                Socket.io gör emit('eniroSearch') till app.js
                app.js anropar find() och söker mot databasen.
                företagstyp med den orten finns sparad och giltig timestamp (1 vecka)
                find() retunerar objekt till app.js som via socket.io skickar till klient.
                Användare får sökning presenterad på klient.

             Use Case 2 data finns ej sparad eller gammal timestamp:
              Användare gör sökning :
                Användare söker på Malmö och flyttfirma
                Socket.io gör emit('eniroSearch') till app.js
                app.js anropar find() och söker mot databasen.
                data finns ej sparad eller gammal timestamp
                find() retunerar undefined till app.js
                app.js anropar requestEniroData() och skickar med klients sökning.
                requestEniroData() anropar eniro API med sökningen.

                   Alt1:
                    response retuneras från eniro API.
                    requestEniroData() anropar prepareData()
                    prepareData kör json parse på datan och lägger till attribut "timestamp" samt "city".
                    requestEniroData() retunerar objekt till app.js som via socket.io skickar till klient.
                    Användare får sökning presenterad på klient.
                    requestEniroData() anropar insert()
                    insert() tar om gammal data bort den från mongodb och sparar sparar den nya validerade sökningen i mongodb.

                   Alt2:
                    response är undefined från eniro
                    Inget händer.

    2. kommunikation till klient: socket.io , Express och Jade.

        Express serverar med hjälp av Jade generering av statiska filer som index.html, bilder, scriptfiler.

        Socket.io  sköter all form av dynamisk kommunikation med klient.


## Klientsida

### Tekniker Klient:

#### javascript, Express & Websockets

    1. Statisk data:
        Serveras genom express med hjälp av express och jade (se punkt 2 serversida).

    2. Dynamisk data:
        Serveras genom socket.io.js och map.js

    3.  Uppbygnad:
        Native javascript sköter all logik och flöde genom applikationen. Navet på klienten är Mashup.js.
        Mashup.js har tillgång till allt.
        Den har associationer till allt förutom till facebookOath.js och socket.io.js som den endast har beroende till.

        Mashup styr traffiken utifrån olika cases.
        Om fräsh data finns i localstorage så hämtas data från localstorage.js

        om data ej finns lokalt eller gammal timestamp (1 vecka) så hämtas data från server via socket.io.js

        om klient vill ladda ner offlineData sköts det via socket.io.js som sedan sparas med hjälp av localstorage.js

        om företagsinfo ska visas sköts det via companyView.js

        om användare vill logga in sköts det via facebookOauth.js

        om en användare gör en enirosökning på klienten registreras det via eniro.js en callback till mashup.js

        Gemensamt nästan allt flöde är att det sker via mashup.js som agerar liknande en controller.

        Jag har försökt ge en bra namngivning av mina script och flytta ut så mycket funktionalitet ur mashup.js som möjligt.
        Hade jag haft lite mer tid så hade jag gjort ett 2 script till som heter offline.js som hade skött styrning av offline status.
        Just nu ligger detta inbyggt i mashup.js
        Och andra skriptet hade fåt heta message.js och skött presentering av hjälp/felmeddelanden den funktionaliteten ligger i mashup.js mestadels.

    4. Cachning:

        Cache manifest sparar statiska filer som bilder och scriptfiler från server.

        localstorage sparar alla sökningar som klient gjort via server till localstorage, den läser även in timestamp som
        finns på datan från server och sparar i localstorage med samma timestamp. Därför kommer samma sökning endast gå via server
        en gång sålänge timestamp är fräsh.

        om användare väljer hämta offline data så anropas server och hämtar alla sökningar i alla städer och företagstyper med
        giltig timestamp. Detta sparas i localstorage. Då kommer server ej anropas alls om användare söker på det andra sökt inom senaste veckan.

    5. Felhantering/Användarhjälp:

        Mashup.js presenterar lite meddelanden utifrån olika scenarie exempelvis:
        Sökning antal träffar och ort eller om ingen träff så visas det med text,
        Om offlinedata hämtats ändras text på knapp,
        Navigeringshjälp första gången en användare kommer till sidan som tas bort när användare använder den,
        Om nät går ner skrivs det offline mode i header till höger på sida,
        Om nät går ner så döljs knapp för hämta offline data,
        välkommen header presenteras första laddning,
        om användare ej har internet visas ej hemsidor/facebooklänkar under företagsfönster,
        tel nummer i föregsfönster klipps automatiskt ut till eventuell mobil för ringa,
        google maps visar om tile ej kan laddas en blank tile.


## Säkerhet och prestandaoptimering
[mongodb sql attacks](http://docs.mongodb.org/manual/faq/developers/#how-does-mongodb-address-sql-or-query-injection)
[facebook Oauth (logga in facebook först)](https://developers.facebook.com/docs/facebook-login/login-flow-for-web/v2.2?locale=sv_SE)

    1. Säkerhet:

        Mongodb kräver json format på all data, det är ingen validering i sig, men eftersom json.parse() endast konverterar
        till json objekt och ej kör eventuell skadlig kod så är det säkert. Dessutom kastar Json.parse() undantag om datan ej är giltig.

        All data från server till client sköts via .textcontent vilket gör att ingen farligt script körs på klient.

        Jag har testat att söka med script taggar med alert() i via textfält, men server går ej ner. Det är eftersom mongodb gör om sökningar till
        BSON objekt.

        Allt detta förhindrar inte att jag skulle kunna få en response från mitt api med script i. Men skriptet körs aldrig.
        Inte på server och inte på klient. Det kommer endast skrivas ut på klient med .textcontent.

        minified.js innehåller all scriptkod på klient, förutom socket.io.js den är obfuskerad.

        Inloggning till Oauth 2.0 sker via klient mot facebook.

        Jag har ingen känslig data, jag visar endast publika facebooklänkar när användare är inloggad på facebook.
        Därför har jag inget skydd mot CSRF vid mitt input fält då det ej behövs.

    2. Prestandaoptimering

        Använder inte bootstrap eller Jquery så använder ej CDN.

        Minifiering minified.js ligger all javascript kod i förutom socket.io.js.

        Som nämt innan Cache manifest cachar alla statiska filer som script, css och bilder.

        google maps cachar tiles själv.

    3. Kompabilitet

       Chrome : 100%
       Opera : 100%
       firefox : kan ej starta offline från cache manifest men fungerar offline om startad med nät.
       safari : kan ej starta offline från cache manifest men fungerar offline om startad med nät.
       Explorer : fungerar inte alls, eftersom explorer inte stöder .remove() på dom element.

       Plattor & mobiler: Allt funkar, dock lite små knappar,
       hade kanske behövt en style för småskärmar där jag förstorat knappar och input fält.

## Offline-first: Hur har du tänkt kring offline-first?

    Jag valde implementera en egen ping/pong anrop via websockets till server. Så har jag koll på om
    användare är offline eller inte. Den är en counter i en intervallfunktion som räknar upp co hskickar intergern till server.
    Server retunerar pong, som är senaste skickad siffra. Om de ej stämmer överrens vet min klient att server ej finns och då kan
    jag att nätet/server är nere.

    Mitt mål har hela tiden att få applikationen att fungera till 100% offline first.
    Det gör den, i google chrome. Om användare laddar sidan en gång, och hämtar offline data.
    Så fungerar applikationen med google maps inkluderat till 100% även om man startar om den utan nät. Gör man sökningar
    på data som är sparat i localstorage så visar den det, om man gör en sökning som ej finns sparad meddelas användaren att
    det ej finns och den väntar på serverresponse. Om nät kommer, så görs sökningen automatiskt, om användare istället vill söka
    på annat tills nätet kommer så går det.

    Jag är mycket nöjd med funktionaliteten i google chrome.

    I andra webbläsare fungerar den inte att starta upp utan nät, men eftersom websockets är fantastiskt så går den
    att använda utan stabil internet uppkoppling sålänge man inte startar om applikationen (ctrl f5 eller enter).
    Jag har inte kommit på om det är google maps eller wensockets som ej fungerar att köra från cachemanifest i andra
    webbläsare. Men något fungerar inte när man ska starta appen ifrån offline.

    Men om man har nät när applikationen startar, så kan nätet gå upp och ner hur mycket som helst, applikationen kommer i första hand
    hämta data från localstorage och om det ej finns där så kommer den via webbsockets hämta från server såfort nätet kommmer tillbaka.

    Sammanfattninsvis en mycket stabil app på tåget eller i bilen i firefox. I google chrome är den grym.

## Reflektion

    1. Negava refklektioner:

         * Jag måste fixa explorer buggen antar jag, trots att de är eftblivna och inte stöder .remove()
         * Google maps funkar ej starta i offline läge i firefox och safari dock funkar  appen perfekt för övrigt.
         * Eniro ger mig bara max 100 response per sökning av företagstyp.

    2. Positiva reflektioner
         * Jag är stolt jag fått den 100% offline i 2 webbläsare och i övriga mycket bra offline funktionalitet.

## Risker för applikationen

[google maps limit](https://developers.google.com/maps/documentation/javascript/usage)

    1. Api data kan ändra format eller stänga data.
    2. Externa tjänster som facebookOauth kan ändra funktionalitet.
    3. Kompabilitetsförändringar i utvecklingsverktyg/språk.
    4. Bättre konkurrenter
    5. Om många användare kan server behöva skalas upp.
    6. Kostnader om för många sökningar på google maps (25 000/dag)

    Allt detta är relevanta risker med min applikation som man får ta i hänseende i given uppkommen situation.

    Jag anser inte ha några moraliska eller etiska risker med min applikation just nu.
    Då det endast handlar om företagsdata.


## Betygshöjande

    1. Nya tekniker: Allt i node.js som är min backend. Exempelvis websocket,mongodb, express mm.
    Jade template engine var också helt nytt.
    2. Design: funkar bra på alla enheter jag har skrivit all css själv, det enda som inte är 100% i små enheter är knappstorlek.
    3. Min egna ping/pong funktion som nyttjar websocket linan för kolla online status var tredje sekund. Och all funktionalitet
    som är implementerad utefter status är.
    3. har du inte läst rapporten? går det höja mer?

###  David Grenmyr











