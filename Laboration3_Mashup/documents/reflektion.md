
#### Vad finns det för **krav** du måste anpassa dig efter i de olika API:erna?
*  **Krav sr :** Inga krav, förutom du får ej utföra ddos attacker typ.
*  **Krav google :** 25 000+ i snitt per dag under 90 dagar så kan jag behöva betala.  

#### Hur och hur länge **cachar** du ditt data för att slippa anropa API:erna i onödan?
*  **Cachning på server/sr :** Anropar sr Api var 20:e sekund. Om innehållet i GET mot sr är förändrad sedan föregående GET så sparas det i Json fil på server, om samma som tidigare sparas inget.

*  **Cachning server/client start av applikation :** Använde Node och websockets för communikation. När en eller flera klienter loggar på görs en emit från server med senast cachade data från sr.

*  **Cachning server/client drift av applikation :** Jag har här ett offline first tänk. Där server endast via websockets gör en emit mot alla uppkopplade användare då data har förändrats. Om uppkoppling mot server ej existerar så kan applikationen fortfarande användas. När anslutning till server eventuellt återstår kommer server emitta ut ny data (om ny data från sr har sparats sedan anslutning senast bröts).

#### Vad finns det för **risker** med din applikation?

*  **Risker :** Mina risker skulle kunna vara om jag får farlig data ifrån SR. Men jag användet .textcontent när jag spara datan. 


Hur har du tänkt kring säkerheten i din applikation?
Hur har du tänkt kring optimeringen i din applikation?
