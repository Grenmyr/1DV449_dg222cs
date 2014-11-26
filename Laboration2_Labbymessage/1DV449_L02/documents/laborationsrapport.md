### Del 1 - Säkerhetsproblem

###### Bristfällig inloggninsvalidering.
*  **Problem : check.php** Den loggar alltid in om fälten ej är tomma.
*  **Risk :**  Alla kan logga in.
*  **Fix :** lyfter in check.php som funtion i en modell klass som jag kallar Validate.php.
   se sen till att de endast ger inloggning mot admin:admin och user:user.

###### Placering av inloggningslogik.
*  **Problem : index.php** action='../../check.php' Jag vill ej att ett formulär ska ha direkt tillgång till min modell.
* **Risk :** Användare kan göra get på sidan och "dra" igång modell klasser med viktig logik.
* **Fix :** ta bort action="../../check.php" från formulär och låt LoginController.php lyssna om en post har skett.
 Logincontroller får nu association till index.php som döps om till LoginView.php.

###### Header Location döljer fel och försvårar avslutning av session.
* **Problem : check.php** header("Location: mess.php"); Gillar inte relocation ifrån vy. 
*  **Risk :** En risk att ha Header relocations överhuvudtaget i php. använd ej.
* **Fix :**  Gör om funktion så den returnerar true om användare loggar in så får kontroller sköta det istället vid rendering av vyer.

###### Gammal metod för hashning, + dåligt salt.
*  **Problem : check.php**   $_SESSION['login_string'] = hash('sha512', "123456" +$username);
* **Risk :** Lätt att dekrypterakryptera.
* **Fix :** vill hellre använda säkrare alternativ med bättre saltning så kör med.
 password_hash($password,PASSWORD_DEFAULT); för kryptering.
 Och dekryptering password_verify($password, $dbPassword);
 jag har även skapat en tabell där jag lagrar userID, username och det **crypterade** lösenordet.

###### Ej fungerande kod.
* **Problem : sec.php** logout i sec.php i funktionen logout fungerar ej.  
* **Risk :** Är ju bra att kunna avsluta inloggningssessioner.
* **Fix :** skrev en egen i validate.php.

###### Javascript gör redirect och förstör utloggning.
* **Problem : messageBoard.js** Skadlig kod document.getElementById("buttonLogout").onclick gör redirect så unset session ej funkar.
*  **Risk :** Dels ska ej utloggning skötas i vy med javascript. Dessutom ska man bara loggas ut om man har skript på?
*  **Fix :** kommentera bort skiten.

###### MessageBoard.js och Message.js
 * **Problem : message.js** Skrivit om så att message,user,time fått getter och setters. Tagit bort onödiga funktioner på prototypen.
 * **Risk :** Igentligen ingen risk förutom död kod är inte bra. Men genom skriva om scriptet kan jag validera typ på klienten. 
 * **Problem : MessageBoard.js**
 *  **Risk :** Använda **.InnherHtml** på dom är inte bra, då körs eventuella farliga skript när de genereras.
 **Fix :** Har modifierat MessageBoard.js så den ej använder **.innhtml utan istället .textcontent** som endast skriver ut text. Även om den skulle innehålla taggar så körs aldrig innehållet.

###### Ingen parametisering på server.
 *  **Problem : sec.php & get.php** Sql är ej parametiserad, dessutom sparas lösenord i klartext. 
 *  **Risk :** Skadlig kod kan köras i databasen.
 *  **Fix :** Parametisera sql anrop i Validate.php och LongPoll.php dessutom är password i databasen nu hasat med password_hash($password,PASSWORD_DEFAULT)

###### Eka ut databasinformation
  * **Problem : sec.php & get.php** De ekar ut exception message om ett sql anrop failar. 
  * **Risk :** Elaka användare får Information.
  * **Fix :** Om undantag kastas, skriver jag endast ut en generell "databse error" sträng.

###### CSRF Skydd saknas
 *  **Problem :** Inget skydd mot cross site request factory.  
 *  **Risk :** Alltså för min chat är det väl ingen större skada om någon kan posta några meddelanden utifrån. Men labben handlar ju om säkerhet så det är väl inte bra.
 *  **Fix :** Skapa hidden input field i
    MessageView.php och generera random string med formeln "substr(hash('sha512',uniqid(rand(), true)), 0, 15);" som dess value. och matcha sen vid post i LongPoll.php när meddelanden ska postas.

###### Validering vid Get av LongPoll.Php
 * **Problem :** Ingen validering vid request av longpoll.php 
 * **Risk :** Ej inloggade kan komma åt innehåll.
 * **Fix :** Kolla om användare är
    inloggad i longpoll.php init() funktionen. Om ej inloggad retunera.

###### Gamla databasen är tillgänglig för nedladdning.
  * **Problem : db.db** Den ligger i rot och är fil, så kan laddas ner.
  *  **Risk :** Dumma användare kan skriva /db.db och ladda ner.
  *  **Fix :** Skapat egen databas i mysql på webbhotell. Obs ej nedladdningsbar :-)


### Del 2 - Optimering
####### Dålig rapportdel här ber om ursäkt, hamnade lite i ofas.

*  **Problem : index.php & message.php** Delar flera meta taggar.  
*  **Fix :** Skapa en commonHtml som sätter default som båda använder och läs sedan in resten via index.php och message.php.

 *  **Problem : mess.php**  html {background:url(pic/b.jpg);}     
   **Fix :** Tog bort nod då den inte syntes ändå.

 *  **Problem : mess.php** jquery.js laddas två gånger.   
   **Fix :** ta bort <script type='text/javascript' src='js/jquery.js'></script>

 *  **Problem : mess.php & index.php** script.js och bootstrap.js är samma fil och läses båda in.    
   **Fix :** Läs endast in bootstrap.js.

 *  **Problem : mess.php & index.php** värdelösa båda två behövs ej för läsa bootstrap.css   
   **Fix :** ta bort bootstrap.js

 *  **Problem : mess.php** jquery.js är inte minifierad.    
   **Fix :** Ladda in jquery-1.10.2.min.js som är minifierad.

 *  **Problem : bootstrap.css** onödigt stor bootstrap fil.   
   **Fix :** skapa en bootstrap.min.css istället. Storlek gick ner från 123,5 till 20,6 kb.

 * **Problem : mess.php** dubbelkod.  
  **Fix :** Ta bort document.onload det har jag redan in min MessageBoard.js som kör init när dokumentet har laddat.


#### TOTAL Storlek på get vid inloggad vy Innan optimeringar 984,7 kb
#### TOTAL Storlek på webbhotell vid inloggad vy 83,0 kb

#### TOTAL Storlek vid inloggninsskärm Innan optimeringar 191,0 kb
#### TOTAL Storlek webbhotell vid inloggninsskärm Innan optimeringar 5,2 kb


### Del 3 - Long-polling

###### Tagit stor inspiration från [Denna](http://portal.bluejack.binus.ac.id/tutorials/webchatapplicationusinglong-pollingtechnologywithphpandajax) guide

 **Problem:**  Applikationen vi hade implementerade ej longpoll alls. Den hade en insert (via get) till db.db om en användare tryckte på skicka
meddelande knappen. Sedan fick man göra en get genom ladda om sidan för läsa nya meddelanden.

 **Fix :** LONGPOLL 20 sec delay implementerat i LongPoll.php. klassen som initierar flödet är MessageBoard.js som initierar Longpoll.js. LongPoll.js fungerar som en router och kallar på min LongPoll.php via ajaxanrop. LongPoll.php implementerar longpoll på server genom använda en while loop som jämför timestamp på inlägg hos vy, mot timestamp på senaste inlägg i tabell. LongPoll.php har all funktionalitet för hämta eller posta nya meddelanden mot server.
Det finns skydd för CRSF vid postning, och för använda LongPoll.php krävs inloggat läge.
