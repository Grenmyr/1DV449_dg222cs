Repo för kurs webbteknik II

###### Vad tror Du vi har för skäl till att spara det skrapade datat i JSON-format?

JSON format är endast ett objekt, och är enkelt för alla objektorientrade språk att använda.

###### Olika jämförelse siter är flitiga användare av webbskrapor. Kan du komma på fler typer av tillämplingar där webbskrapor förekommer?
 
 För undersökningar/forskning eventuellt undersöka en webbsidas användare, intressen relationer eller vad man är
 intresserad av.

###### Hur har du i din skrapning underlättat för serverägaren?
 
 När jag gör en request på en sida skickas ett header object med, som innehåller namn och email till mig.
 
###### Vilka etiska aspekter bör man fundera kring vid webbskrapning?
 
 Var försiktig med insamlad data, tänk på eventuella konsekvenser om de används fel. Exempelvis känslig data kanske ej ska publiseras eller kan jag bli stämd för skrapat denna data.

###### Vad finns det för risker med applikationer som innefattar automatisk skrapning av webbsidor? Nämn minst ett par stycken!
 
 * Medventen fejkad/felaktig data kan läsas in och ge konsekvenser.
 * Stämningar.

###### Tänk dig att du skulle skrapa en sida gjord i ASP.NET WebForms. Vad för extra problem skulle man kunna få då?
 
 <asp:Page EnableViewState ="true"/>

###### Välj ut två punkter kring din kod du tycker är värd att diskutera vid redovisningen. Det kan röra val du gjort, tekniska lösningar eller lösningar du inte är riktigt nöjd med.
 
 * Extremt mycket kod i samma fil, jag hade behövt bryta ut insamlingen av varje ny url till egen klass.
 * Är min lösning med Setintervall och hur jag använder en count för varje HrefLänk och Json.Courses.length en ok lösning?

###### Hitta ett rättsfall som handlar om webbskrapning. Redogör kort för detta.
 
 [Pete Warden](https://github.com/SheriefBadran/1DV449_sb222rf/blob/master/laboration1/reflection_lab1.md#r%C3%A4ttsfall)

###### Känner du att du lärt dig något av denna uppgift?
 
 japp, första gången Node med express och Cheerio. Men använde mest Cheerio.
