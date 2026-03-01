---
layout: portfolio
title: "SwiftUIClima"
ref: "swiftui-clima"
permalink: "/it/portfolio/swiftui-clima/"
date: 2025-03-09
github: "https://github.com/antoniocasto/SwiftUIClima"
description: "Un'app iOS per il meteo scritta in SwiftUI."
thumbnail: "https://raw.githubusercontent.com/antoniocasto/SwiftUIClima/refs/heads/main/doc/1.png"
thumbnail_alt: "Schermata meteo di SwiftUIClima"
thumbnail_bg: "linear-gradient(135deg, #0ea5e9, #1d4ed8)"
technologies: ["SwiftUI", "LottieFiles", "OpenWeather API", "MVVM", "CoreData", "CoreLocation", "UserDefaults", "URLSession"]
published: true
---

*{{ page.description }}*

SwiftUIClima è un'applicazione per iPhone, scritta in **SwiftUI**, che consente di tenere traccia delle condizioni meteorologiche nel luogo in cui ti trovi e nei tuoi luoghi preferiti.

Sfrutta la versatilità di **SwiftUI** e la bellezza di **LottieFiles** per presentare un'interfaccia utente semplice e attraente.

L'applicazione utilizza l'**API OpenWeather** per ottenere informazioni aggiornate sulle condizioni meteorologiche.

**📌 Nota:**  
*Questo progetto rappresenta un'importante tappa del mio percorso come sviluppatore iOS. Da allora, ho affinato le mie competenze e adottato approcci più avanzati per la progettazione di app modulari e scalabili. Sebbene il codice non rifletta il mio attuale livello di sviluppo, resta un esempio significativo del mio lavoro e della mia evoluzione nel tempo.*

### Feature principali:
- **Architettura MVVM** per una separazione chiara tra UI e logica di business.
- **Networking** con `URLSession` e il protocollo `Decodable` per il fetch dei dati meteo.
- **Persistenza dati** con `CoreData` per salvare localmente le città preferite.
- **Geolocalizzazione** tramite `CoreLocation` per rilevare la posizione attuale.
- **Gestione preferenze utente** con `UserDefaults` e `@AppStorage`.
- **Gestione dello stato** tramite `@StateObject` e `ObservableObject`.
- **Gestione dei permessi** per l'accesso alla posizione.
- **Traduzione multilingua** (italiano e inglese).

Screenshot e stati principali sono documentati nel repository.

Il codice sorgente è disponibile su **[GitHub]({{ page.github }})**.
