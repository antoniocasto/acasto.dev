---
layout: portfolio
title: "NotAPlace"
ref: "notaplace"
permalink: "/it/portfolio/notaplace/"
date: 2025-03-09
github: "https://github.com/antoniocasto/NotAPlace"
description: "Un'app iOS sviluppata in SwiftUI per tracciare i luoghi che evocano emozioni positive."
thumbnail_bg: "linear-gradient(135deg, #111827, #334155)"
technologies: ["SwiftUI", "MapKit", "CoreLocation", "UserDefaults", "DocumentDirectory", "Keychain", "LocalAuthentication", "PhotosUI", "Fotocamera", "@StateObject", "@EnvironmentObject"]
published: true
---

*{{ page.description }}*

NotAPlace è un'applicazione per iPhone sviluppata in **SwiftUI**, progettata per tracciare i luoghi nel mondo che suscitano emozioni positive negli utenti.

**📌 Nota:**  
*Questo progetto rappresenta un'importante tappa del mio percorso come sviluppatore iOS. Da allora, ho affinato le mie competenze e adottato approcci più avanzati per la progettazione di app modulari e scalabili. Sebbene il codice non rifletta il mio attuale livello di sviluppo, resta un esempio significativo della mia evoluzione professionale nel tempo.*

### Caratteristiche principali:
- **Integrazione con Mappe:** Utilizza **MapKit** e **CoreLocation** per visualizzare i luoghi su una mappa.
- **Salvataggio Dati:** Memorizza i dati dell'utente e le preferenze tramite **UserDefaults** e **DocumentDirectory**.
- **Accesso Sicuro:** Implementa **Keychain** e **LocalAuthentication** per lo sblocco con Face ID / Touch ID.
- **Supporto Multimediale:** Integra **PhotosUI** e la **Fotocamera** per la gestione delle immagini.
- **Gestione dello Stato:** Utilizza `@StateObject` e `@EnvironmentObject` per una gestione reattiva dello stato.
- **Gestione Permessi e Localizzazione:** Garantisce un'adeguata **gestione dei permessi** e supporta le traduzioni in **italiano e inglese**.

Screenshot e flussi dell'app sono disponibili nella documentazione del repository.

Il codice sorgente è disponibile su **[GitHub]({{ page.github }})**.
