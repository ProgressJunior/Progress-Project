<p align="center">
  <a href="" rel="noopener">
 <img width=400px height=400px src="https://www.progress.cc/fileadmin/templates/images/logos/Logo_ProgressAG.svg" alt="Project logo"></a>
</p>

<h3 align="center">Progress Sample Data Projekt</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/ProgressJunior/Progress-Project.svg)](https://github.com/ProgressJunior/Progress-Project/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ProgressJunior/Progress-Project.svg)](https://github.com/ProgressJunior/Progress-Project/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

</div>

---

<p align="center"> Eine Applikation die Beispieldaten in eine Maschinensimulationssoftware hineingibt
    <br> 
</p>

## 📝 Inhaltsangabe

* [Beschreibung](#Beschreibung)
* [Prerequisites/Voraussetzungen](#Voraussetzungen)
* [Installation](#Installation)
* [Ausführen](#Ausfuehren)
* [Authoren](#authors)




## 🧐 Beschreibung <a name = "Beschreibung"></a>

Das Progress Sample Data Projekt hat als Ziel ein Programm welches in Zusammenarbeit mit der Progress AG zusammen ensteht wo wir Beispieldaten in eine Datenbank schreiben und mithilfe deren eine 3D Darstellung der Maschinenabläufe der Progress erzielt wird. Es ensteht während der Projektwoche an der TFO Fallmerayer in Brixen. Eine Gruppe aus 5 Schülern bildet das Entwicklerteam. 



## Prerequisites/Voraussetzungen <a name = "Voraussetzungen"></a>

- Docker
- Docker Compose

    ### Oder

- NodeJS
- NPM

## Installation <a name = "Installation"></a>


Docker zu installieren ist auf beiden  Betriebssystemen recht ainfach. Zu Problemen kommt es bei Docker Compose

### Windows

Unter Windows wird Docker und Docker Compose zusammen installiert. Man kann es [hier](https://docs.docker.com/desktop/windows/install/) herunterladen

### Linux

Bei Linux werden Docker und Docker Compose separat installiert:

#### Docker
```
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

#### Docker Compose V2

```
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```

## Ausführen <a name = "Ausfuehren"></a>

Da die App aus zwei Servern besteht, einem NodeJS Express Server und einem Nginx-React Server müssen zwei Server gestartet werden. Um aber Probleme zu vermindern und das Ausführen zu vereinfachen wurde das ganze in ein [Dockerfile](https://docs.docker.com/engine/reference/builder/) gegegben. Voraussetzung dafür ist dass man docker und docker compose [installiert](#Installation ) hat.

```
docker compose build
docker compose up
```


## ✍️ Autoren <a name = "authors"></a>

- [@SilasDemez](https://github.com/SilasDemez) - Projektmanager/Developer
- [@Gavaii](https://github.com/Gavaii) - Allround Developer
- [@Christof03](https://github.com/Christof03) - Backend Developer
- [@Kurisu003](https://github.com/Kurisu003) - Frontend Developer
- [@Mrnoll3](https://github.com/Mrnoll3) - Backend Developer
