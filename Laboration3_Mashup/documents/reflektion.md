
#### Vad finns det för krav du måste anpassa dig efter i de olika API:erna?
*  **krav sr :** Inga krav, förutom du får ej utföra ddos attacker typ.
*  **krav google :** 25 000+ i snitt per dag under 90 dagar så kan jag behöva betala.  

#### Hur och hur länge cachar du ditt data för att slippa anropa API:erna i onödan?
*  **cachning på server/sr :** Anropar sr Api var 20:e sekund. Om innehållet i GET mot sr är förändrad sedan föregående GET så sparas det i Json fil på server, om samma som tidigare sparas inget.

*  **cachning server/client :** 

Vad finns det för risker med din applikation?
Hur har du tänkt kring säkerheten i din applikation?
Hur har du tänkt kring optimeringen i din applikation?
