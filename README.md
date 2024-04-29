# Webprojekti

## Esittely 

Webprojekti on Oulun ammattikorkeakoulun 2. vuoden monimuoto-opiskelijoiden toteuttama sovellusprojekti, jossa tehtiin neljän hengen ryhmätyönä kuvitteellinen sivusto elokuvien ja tv-sarjojen faneille.  

Tarkoituksena oli tehdä fullstack-projekti jossa front-end tehdään Javascriptillä React-kirjastolla. Back-end toteutettiin Node.js-ajoympäristöllä ja PostgreSQL-tietokannalla. Osa palveluista on kirjautumisen takana ja osaa voi käyttää kirjautumatta. 


## Tietokannan suunnittelu

Tietokannan luokkakaavio kuvattu kuvassa 1.

![Kuva 1. Tietokannan luokkakaavio](/documents/er-diagram/ER-Diagram.png)
***Kuva 1. Tietokannanluokkakaavio.***


## Sivun käyttöliittymä 

### UI-Wireframe 

Käyttöliittymän suunnittelu aloitettiin Wireframe-tekniikalla, jossa hahmotellaan käyttöliittymän luuranko. Kuvissa 2 ja 3 on esimerkkinä muutaman sivun luonnos. 

![Kuva 2. Arvostelu-sivun luonnos.](/documents/UI-Wireframe/ui_arvostelut.png)
***Kuva 2. Arvostelut-sivun luonnos***

![Kuva 3. Haku-sivun luonnos.](/documents/UI-Wireframe/ui_haku.png)
***Kuva 3. Haku-sivun luonnos.***

## Lopullinen käyttöliittymä 

Käyttöliittymän yläpalkista löytyy navigaatiopalkki, jolla pääsee eri sivuille, sekä linkit asiakastille kirjautumiseen.  Jos käyttäjä yrittää mennä kirjautumatta sivulle, joka vaatii kirjautumista, hänet siirretään kirjautumissivulle (kuva 4). Kirjautumisessa on mahdollisuus luoda uusi käyttäjä, jos tiliä ei ole vielä olemassa. 

![Kuva 4. Kirjautumissivu](/documents/Final-UI/finalui_kirjaudu.png)
***Kuva 4. Lopullinen kirjautumissivu.***

Arvostelut-sivulle (kuva 5) käyttäjät voivat kirjoittaa elokuva- ja sarja-arvosteluja ja antaa arvosanoja. Arvosteluja voi kirjoittaa vain kirjautunut käyttäjä, mutta niitä voi selata kirjautumatta.

![Kuva 5. Arvostelut-sivu.](/documents/Final-UI/finalui_arvostelut.png)
***Kuva 5. Lopullinen Arvostelut-sivu.***

Haku-sivulla (kuva 6) käyttäjä voi hakea elokuvia eri suodatuksilla tai suoraan elokuvien tai sarjojen nimillä. Käyttäjä voi lisätä elokuvia ja sarjoja omalle suosikkilistalle, ryhmiin tai lisätä arvostelun arvostelusivulle. 

![Kuva 6. Haku-sivu.](/documents/Final-UI/finalui_haku.png)
***Kuva 6. Lopullinen Haku-sivu.***

Näytökset sivulla (kuva 7) voi selata Finnkino-teattereiden näytösaikoja eri paikkakunnilta ja eri päiviltä. Käyttäjä voi linkittää näytösaikoja myös kuulumiinsa ryhmiin ryhmäsivulla. 

![Kuva 7. Näytökset sivu.](/documents/Final-UI/finalui_naytokset.png)
***Kuva 7. Lopullinen Näytökset-sivu.***

## Mobiilikäyttöliittymä 

Sivu tukee mobiilikäyttöä (kuva 8). Navigointipalkki siirtyy käyttöliittymän vasempaan yläreunaan, ja sen avaamalla voi siirtyä toisille sivuille. Sivujen sisältö reagoi myös mobiilinäkymään. Valikot siirtyvät allekkain ja sivulla esitetään vähemmän kuvia rinnakkain. 

![Kuva 8. Mobiilinäkymä.](/documents/Final-UI/finalui_mobiili.png)

***Kuva 8. Lopullinen mobiilinäkymä.***

## Käytetyt työkalut ja tekniikat 

UI/UX Wireframe, Node.js, React, JavaScript, PostgreSQL, pgAdmin, VS Code, Postman 

## Tekijät ja suoritetut osa-alueet 

Lehto Santeri 

- Näytökset-sivu 
- Arvostelut-sivu 
- Arvostelujen, elokuvien, sarjojen lisääminen Haku-sivulta muille sivuille 
- Ryhmä-sivun osia

Luiro Jarkko 

- Haku-sivu 
- Etusivu 

Malinen Tatu 

- Backendin alustus 
- Oma-sivu 
- Login-sivu 
- Ryhmä-sivun osia
- Postman-dokumentaatio ja luokkakaavio tietokannasta

Moskuvaara Aake 

- Projektin backlogin tekeminen ja johtaminen 
- UI-Wireframe 
- Frontendin alustus 
- Rekisteröintisivu 
- Testauskoodit 
- Käyttöliittymän responsiivisuus ja ulkonäkö 
- Suosikit-sivu