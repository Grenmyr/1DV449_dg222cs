###### Del 1 - Säkerhetsproblem

* check.php **Problem :** Den loggar alltid in om fälten ej är tomma.
  **Fix :** lyfter in check.php som funtion i en modell klass som jag kallar Validate.php.
   se sen till att de endast ger inloggning mot admin:admin och user:user.

* index.php **Problem :** action='../../check.php' Jag vill ej att ett formulär ska ha tillgång till min modell.
 **Fix :** ta bort action="../../check.php" från formulär och låt LoginController.php lyssna om en post har skett.
 Logincontroller får nu association till index.php som döps om till LoginView.php.

* check.php **Problem :** header("Location: mess.php"); Gillar inte relocation ifrån vy. gör om funktion så den returnerar
true om användare loggar in så får kontroller sköta det istället.

* check.php **Problem :**   $_SESSION['login_string'] = hash('sha512', "123456" +$username);
 **Fix :** vill hellre använda säkrare alternativ med bättre saltning så kör med.
 password_hash($password,PASSWORD_DEFAULT); för kryptering.
 Och dekryptering password_verify($password, $dbPassword);
 jag har även skapat en tabell där jag lagrar userID, username och det crypterade lösenordet.

* sec.php **Problem :** logout i sec.php i funktionen logout fungerar ej.  **Fix :** skrev en egen i validate.php.

* messageBoard.js **Problem :** Skadlig kod document.getElementById("buttonLogout").onclick gör redirect så unset session ej funkar.
    **Fix :** kommentera bort skiten.

 * message.js **Problem :** Skrivit om så att message,user,time fått getter och setters. Tagit bort all funktioner på prototypen
    förutom.
     **Fix :** Har modifierat MessageBoard.js så den ej använder .innhtml utan istället textcontent som endast skriver ut text
     Även om den skulle innehålla taggar så körs aldrig innehållet.

 * sec.php & get.php **Problem :** Sql är ej parametiserad, dessutom sparas lösenord i klartext. **Fix :** Parametisera sql anrop i
   Validate->getPasswordByUserName() dessutom är password i databasen hasat med password_hash($password,PASSWORD_DEFAULT)

  * sec.php & get.php **Problem :** De ekar ut exception message om ett sql anrop failar. Risk, onödig info.
  **Fix :** Om undantag kastas, skriver jag endast ut en generell "databse error" sträng.

 * Allmän säkerhetsrisk **Problem :** Inget skydd mot cross site request factory.  **Fix :** Skapa hidden input field i
    MessageView.php och generera random string som dess value. och matcha sen vid post i longpoll.php.

 * Allmän säkerhetsrisk **Problem :** Ingen validering vid request av longpoll.php **Fix :** Kolla om användare är
    inloggad i longpoll.php init() funktionen. Om ej inloggad retunera.

  * db.db **Problem :** Det är bara att skriva in db.db på webbhotell o ladda ner **Fix :** Skapat egen databas mysql på webbhotell.


###### Del 2 - Optimering


* index.php & message.php **Problem :** Delar flera meta taggar.
  ** Fix :** Skapa en commonHtml som sätter default som båda använder och läs sedan in resten via index.php och message.php.

 * mess.php **Problem :**  html {background:url(pic/b.jpg);} **Fix :** Tog bort nod då den inte syntes ändå.

 * mess.php **Problem :** jquery.js laddas två gånger. **Fix :** ta bort <script type='text/javascript' src='js/jquery.js'></script>

 * mess.php & index.php **Problem :** script.js och bootstrap.js är samma fil och läses båda in.  **Fix :** Läs endast in bootstrap.js.

 * mess.php & index.php **Problem :** värdelösa båda två behövs ej för läsa bootstrap.css **Fix :** ta bort bootstrap.js

 * mess.php **Problem :** jquery.js är inte minifierad.  **Fix :** Ladda in jquery-1.10.2.min.js som är minifierad.

 * bootstrap.css **Problem :** onödigt stor bootstrap fil. **Fix :**
  skapa en bootstrap.min.css istället. Storlek gick ner från 123,5 till 20,6 kb.


####### TOTAL Storlek på get vid inloggad vy Innan optimeringar 984,7 kb
####### TOTAL Storlek på webbhotell vid inloggad vy 83,0 kb

####### TOTAL Storlek vid inloggninsskärm Innan optimeringar 191,0 kb
####### TOTAL Storlek webbhotell vid inloggninsskärm Innan optimeringar 5,2 kb


###### Del 3 - Long-polling

######## Tagit stor inspiration från [Denna](http://portal.bluejack.binus.ac.id/tutorials/webchatapplicationusinglong-pollingtechnologywithphpandajax) guide

* ** Problem: **  Applikationen vi hade implementerade ej longpoll alls. Den hade en insert (via get) till db.db om en användare tryckte på skicka
meddelande knappen. Sedan fick man göra en get genom ladda om sidan för läsa nya meddelanden.

* **Fix :** Implementerat Longpopolling med delay 20 sekunder. klasser som använder den är MessageBoard.js som initierar. Longpoll.js
fungerar som en router och kallar på min LongPoll.php som implementerar funktioner för hämta eller posta meddelanden via LongPoll.php.
Båda två skickas via Post och ej Get längre.