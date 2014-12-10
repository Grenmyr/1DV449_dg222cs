
## Reflektion laboration 3
#### Vad finns det för **krav** du måste anpassa dig efter i de olika API:erna?
*  **Krav sr :** Inga krav, förutom du får ej utföra ddos attacker typ.
*  **Krav google :** 25 000+ i snitt per dag under 90 dagar så kan jag behöva betala.  

#### Hur och hur länge **cachar** du ditt data för att slippa anropa API:erna i onödan?
*  **Cachning på server/sr :** Anropar sr Api var 20:e sekund. Om innehållet i GET mot sr är förändrad sedan föregående GET så sparas det i Json fil på server, om samma som tidigare sparas inget.

*  **Cachning server/client start av applikation :** Använde Node och websockets för communikation. När en eller flera klienter loggar på görs en emit från server med senast cachade data från sr.

*  **Cachning server/client drift av applikation :** Jag har här ett offline first tänk. Där server endast via websockets gör en emit mot alla uppkopplade användare då data har förändrats. Om uppkoppling mot server ej existerar så kan applikationen fortfarande användas. När anslutning till server eventuellt återstår kommer server emitta ut ny data (om ny data från sr har sparats sedan anslutning senast bröts).


#### Vad finns det för **risker** med din applikation?

*  **Risker :**En risk är förändringar i sr och googles publika apier som påverkar min applikation. 
* **Risker :** Om applikationen skulle få hög eller stötig traffik är risken hög att den krashar då jag ej använt extern CDN för server.

#### Hur har du tänkt kring **säkerheten** i din applikation?

*  **säkerheten :** Allt känns säkert, traffik till sr går via min server till sr. Data från sr skrivs med .textcontent till infowindows. Sedan tar google hand om valideringen åt mig då de ej tillåter script taggar i några former. 

#### Hur har du tänkt kring **optimeringen** i din applikation?

*  **optimeringen :**  
*  Använder ej Jquery alls, har minifierad bootstrap.
*  Har en eventlistener för min Ul, sedan en för varje marker. Så har optimerat där. 
*  Delar av koden som endast behöver köras en gång körs bara en gång. Exempelvis generering av karta och populering av alla marker arrayer sker endast en gång. Efter det genereras bara arrayer efter vilken kategori som väljs.
*  Har tagit bort irrelavant data från Json object som ej är relevant för min mashup. Exempelvis  exactlocation som ej används i min applikation.

###### dg222cs David Grenmyr
