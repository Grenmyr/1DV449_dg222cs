
    ### Vad finns det för krav du måste anpassa dig efter i de olika API:erna?
    
        ###### Bristfällig inloggninsvalidering.
    *  **Problem : check.php** Den loggar alltid in om fälten ej är tomma.
    *  **Risk :**  Alla kan logga in.
    *  **Fix :** lyfter in check.php som funtion i en modell klass som jag kallar Validate.php.
   se sen till att de endast ger inloggning mot admin:admin och user:user.

    ### Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?
    ### Vad finns det för risker med din applikation?
    ### Hur har du tänkt kring säkerheten i din applikation?
    ### Hur har du tänkt kring optimeringen i din applikation?
