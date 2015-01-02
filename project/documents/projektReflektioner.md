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