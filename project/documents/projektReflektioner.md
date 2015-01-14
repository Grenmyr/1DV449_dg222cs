1/1 2015
* Arbetat med mongodb, problem med insert/upsert.
* ändrat collectionfunktionalitet, skapar nu collktions genom sätta ihop firmatyp och stad.
* skapat kodbas för detaljerad vy av företag.

2/1 2015
* Suttit med jade, klurat ut hur img ska länkas in bäst.
* Refaktorerat applikations, satt karta som bakgrunsbild och lagt på z index.
* mycket med css problem med z index, och positions, men fick det att funka.
* satt över 2 timmar med bugg i markers, pga skapade 2 instanser av en funktion för hålla ordning
på aktuell företag på kartan. Felet var att det instanserades 2 referencer till samma funktion om man bytte kategori
då räknade det även fel.

3/1 2015
*lagt in favicon genom "serve-favicon" i app.js även refaktorerat och kommenterat.

5/1
*Satt och försökte göra facebook inloggning på klienten fick problem med testa lokalt då
det ej fungerade lokalt så jag har avnrutit oauth inloggningnen just nu.
*refaktorerat företagsvy och lagt in länk till facebook.

6/1
*stylat min google map
*implementerat offline first cachning via localstorage. Funkar klockrent ev bara implementera meddelanden
för användare om nätet är nere under användning. ej implementerat cache manifest.
* Facebook inloggning via klient.

7/1
* ändrat om startsida så välkomstsida och inledande ssökning smälter ihop.
* lagt eventlisteners på alla markers som öppnar companyinfo.
* Ändrat kartans z index så det går använda pan, scrollzoom osv även tagit bort all defaultstyling på den.
* stylat om textfärger och lagt in hjälpmeddelanden.

8/1
* presenterar sökmeddelanden på klient.
* implementerat ping pong för kolla internetuppkoppling.
* första publisering.

12/1
* skrev in en funtion i app.js för hämta all sparad företagsinfo.
* publiserade igen.

13/1
* implementerade cache manifest.
* minifierat http://minifyjavascript.com/
* varierande bugfix för cache manifest och css, allt funkar pa chrome.

14/1
* Städat kod app.js
* skrivit rapport
* sista publisering
* demofilm klar.

