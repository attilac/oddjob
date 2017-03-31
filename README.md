# Oddjob
###### Attila Cederbygd, JavaScript2, Fend 16 @Nackademin

AJAX Assignment - Open APIs

###### Projektlänkar
**Livesida:** https://attilac.github.io/ajax-open-apis/

**Github Repo:** https://github.com/attilac/ajax-open-apis/

## Beskrivning av appen
Del av hemsida till bandet Oddjob för att presentera deras album och visa videos.

Syftet är dels att uppdatera deras befintliga sida till att bli anpassad för fler enheter (responsiv).
Dels underlätta uppdatering genom att använda data från API-er som YouTube.
När nya klipp läggs upp reflekteras det på hemsidan. Man slipper uppdatera samma data på flera ställen.

Hemsidan blir en slags uppsamlingshubb för allt relaterat till bandet.

## Funktionalitet
* Albumdata hämtas från egen json-server som hostas på Heroku. 
* När man klickar på individuella album hämtas låtdata från Last.fm API.
* Länkar till Spotify och iTunes finns på detaljvyn och går även att komma åt från listvyn genom länkar. Genom nya fetchanrop visas dem upp i en modal.
* Videosidan hämtar paginerad playlistdata från YouTube och visar upp den som HTML. 
* Navigationen gör ny anrop till YouTube och hämtar data.

### Arbetsprocess
Förra uppgiften med designpatterns gav mersmak, så jag bestämde tidigt för att dela upp koden i moduler i en löst hållen Model-View pattern.

Album och film-delarna delades in i tre delar, den första View med funktioner som har hand om interfacet, den andra en api-modul som anropar API-t, returnerar arrayer med objekt av JSON-data och skickas vidare till en tredje template-modul som populeras med objektens properties för att slutligen returnera html. Template-modulens funktioner använder sig av arrow-functions för att kunna skicka vidare properties i nästlade templates. 

Separationen känns clean då man kan editera html-en utan att behöva röra de andra modulerna. Målet var att kunna återanvända modulerna till andra projekt. Tanken var att möjliggöra edits på ett enkelt sätt av molekyler som t.ex. header och bild genom att separera varje del och sedan kunna sätta ihop de till organismer.

### Teknologier
* JSON-Server
* Fetch
* Vanilla JavaScript
* Bootstrap
* jQuery(for Bootstrap)

### API-er
* YouTube IFrame Player API: https://developers.google.com/youtube/iframe_api_reference
* YouTube Data API: https://developers.google.com/youtube/v3/
* Last.fm API: https://www.last.fm/api
* JSON-Server https://oddjob-albums.herokuapp.com/

### TODO
###### Albums
* Next/Prev Navigation for album detail-view
* Sticky Audio Player to preview tracks
* Display album description (flip-card on cover or carousel-like interface)

###### Videos
* Menu to choose different playlists. 

###### General
* News Section on startpage (facebook API)
* Fetching gig data from facebook API 

