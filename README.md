<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://www.progress.cc/fileadmin/templates/images/logos/Logo_ProgressAG.svg" alt="Project logo"></a>
</p>

<h3 align="center">Progress Sample Data Projekt</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/ProgressJunior/Progress-Project.svg)](https://github.com/ProgressJunior/Progress-Project/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ProgressJunior/Progress-Project.svg)](https://github.com/ProgressJunior/Progress-Project/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Eine Applikation die Beispieldaten in eine Maschinensimulationssoftware hineingibt
    <br> 
</p>

## 📝 Inhaltsangabe

* [Beschreibung](#Beschreibung)
* [API Beschreibung](#APIBeschreibung)
* [Südtiroler Transport Webservices](#stawebs)
* [OpenWeather Map](#openweathermap)
* [Eigene API --> Teacher of the Week](#toftw)
* [Fallmerayer News](#webscraper)
* [Installation](#instalation)
* [Authoren](#authors)




## 🧐 Beschreibung <a name = "Beschreibung"></a>

Das Progress Sample Data Projekt hat als Ziel ein Programm welches in Zusammenarbeit mit der Progress AG zusammen ensteht wo wir Beispieldaten in eine Datenbank schreiben mithilfe deren eine 3D Darstellung der Maschinenabläufe der Progress erzielt wird. Es ensteht während der Projektwoche an der TFO Fallmerayer in Brixen. Eine Gruppe aus 5 Schülern bildet das Entwicklerteam

## 👾 API_Beschreibung <a name = "APIBeschreibung"></a>

### Südtiroler Transport Webservices <a name = "stawebs"></a>

Die Südtiroler Transportagentur bietet eine angenehme API an, um auf die aktuellen Busse/Züge zuzugreifen. Dabei gibt es eine zentrale URL auf die man zugreift: 

url : https://efa.sta.bz.it/apb/XML_DM_REQUEST

Für uns relevant sind zwei Varianten der Request. Einmal lassen wir uns die Haltestellen für einen Ort ausgeben um die HaltestellenID zu bekommen von der wir mit der zweiten Abfrage die vorbeikommenden Busse und Züge abrufen. Hier sind nochmal die Parameter und die für uns relevanten Rückgabewerte

#### Haltestellen für Ort anzeigen lassen

#### parameters:

    locationServerActive: 1
    stateless: 1
    type_dm: any
    name_dm: <Ortname>
    mode: direct
    outputFormat: JSON

##### Response 
    Array mit Haltestellen unter: response.dm.points[]
    name:           <Haltestellenname>
    stateless:      <HaltestellenID>
    ref.coords:     <Koordinaten>

#### Abfahrende Busse/Züge anzeigen lassen

##### parameters:

    locationServerActive:   1
    stateless:              1
    type_dm:                any
    name_dm:                <HaltestelleName> oder <Stateless(HaltestellenID)>
    mode:                   direct
    outputFormat:           JSON

##### Response
    Array mit Daten unter: departureList[]
    .servingline.direction: <Zielort>
    .servingLine.destID:    <ZielhaltestellenID>
    .servingLine.number:    <Buslinie>
    .dateTime.monat:        <Monat>
    .dateTime.day:          <Tag>
    .dateTime.hour:         <Stunde>
    .dateTime.minute:       <Minute>
    
### OpenWeatherMap <a name = "openweathermap"></a>

Die OpenWeatherMap API ist eine einfache und kostenlose WetterAPI. Man kann mit ihr allerhand Wetterdaten abrufen.

Wir benutzen die OpenWeatherMap API um das tägliche Wetter anzuzeigen. Das passiert über diesen link:

url: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

Es wird für einen bestimmten Ort (Koordinaten das Wetter angezeigt)

#### parameters:

    lat:        <Koordinaten des Zielorts>
    lon:        <Koordinaten des Zielorts>
    exclude:    <Berichte ausschließen (minutely, hourly, daily)>
    appid:      <API Key den man bei der Registrierung für die API bekommt>
    lang:       <Sprache der zurückgegebenen Daten>

#### response:

    Array mit täglichen Daten unter daily[]
    .temp               <Temperatur des Tages>
    .feels_like         <Gefühlte Temperatur>
    .humidity           <Feuchtigkeit>
    .wind_speed         <Windgeschwindigkeit>
    .wind_deg           <Windgrad>
    .description        <Wetterbeschreibung z.B.: wolkig>
    .weather[0].icon    <Id des Wettericons>


### Eigene API - Teacher Of The Week <a name = "toftw"></a>

Beid er Teacher Of The Week API handelt es sich um ein Programm mit welchem man den besten Leherer der Woche wählen kann. Es gibt einLeaderborad und eine Votingseite wo man seine/n Lieblingslehrer/in übers Smartphone oder PCs wählen kann. Für mehr Infos besuche:

[Teacher-Of-The-Week](https://github.com/kaffarell/teacher-of-the-week)


## 👌 Fallmerayer news <a name = "news"></a>

Auf der Website von unserere Schule gibt es immer interessante News und Artikel. Deswegen werden diese Neuigkeiten mithilfe der WordPress API abgerufen und in das Dashboard geschrieben. Die Wordpress API funktioniert deswegeen weil die Fallmerayer Website mit WordPress arbeitet


## Installation

Um die App zu bearbeiten muss man zuerst NodeJS und NPM installiert haben. Das kann man ganz einfach vom Browser herunterladen (Windows) oder mit ein paar Befehlen instllieren (Linux)

Anschließend muss man ein Terminal aufmachen und sich zum Ordner begeben. Um das Projekt zuum Laufen zu bringen mus s man zuerst express installieren
    
    npm install express

Anschließend kann man die App starten:

node app.js

Dies startet den lokalen Webserver auf dem Port 3000

Im Browser dann die url: localhost:3000 angeben und die App wird abgerufen


## ✍️ Autoren <a name = "authors"></a>

- [@SilasDemez](https://github.com/SilasDemez) - Allround Developer
- [@Gavaii](https://github.com/Gavaii) - Allround Developer