---
layout: portfolio
title: "NotAPlace"
ref: "notaplace"
permalink: "/it/portfolio/notaplace/"
date: 2025-03-09
github: "https://github.com/antoniocasto/NotAPlace"
description: "Un'app iOS sviluppata in SwiftUI per tracciare i luoghi che evocano emozioni positive."
technologies: ["SwiftUI", "MapKit", "CoreLocation", "UserDefaults", "DocumentDirectory", "Keychain", "LocalAuthentication", "PhotosUI", "Fotocamera", "@StateObject", "@EnvironmentObject"]
published: true
---

*{{ page.description }}*

<div align="center">
  <img src="https://raw.githubusercontent.com/antoniocasto/NotAPlace/refs/heads/main/doc/56.PNG" width="180" alt="Map View">
  <img src="https://github.com/antoniocasto/NotAPlace/blob/main/doc/54.PNG?raw=true" width="180" alt="Location Details">
  <img src="https://github.com/antoniocasto/NotAPlace/blob/main/doc/39.PNG?raw=true" width="180" alt="User Settings">
  <img src="https://github.com/antoniocasto/NotAPlace/blob/main/doc/41.PNG?raw=true" width="180" alt="User Onboarding">
</div>

NotAPlace è un'applicazione per iPhone sviluppata in **SwiftUI**, progettata per tracciare i luoghi nel mondo che suscitano emozioni positive negli utenti.

**<img src="{{ '/assets/images/icons/pin.svg' | relative_url }}" class="inline-icon" alt="Pin icon">Nota:**  
*Questo progetto rappresenta un'importante tappa del mio percorso come sviluppatore iOS. Da allora, ho affinato le mie competenze e adottato approcci più avanzati per la progettazione di app modulari e scalabili. Sebbene il codice non rifletta il mio attuale livello di sviluppo, resta un esempio significativo della mia evoluzione professionale nel tempo.*

### Caratteristiche principali:
- **Integrazione con Mappe:** Utilizza **MapKit** e **CoreLocation** per visualizzare i luoghi su una mappa.
- **Salvataggio Dati:** Memorizza i dati dell'utente e le preferenze tramite **UserDefaults** e **DocumentDirectory**.
- **Accesso Sicuro:** Implementa **Keychain** e **LocalAuthentication** per lo sblocco con Face ID / Touch ID.
- **Supporto Multimediale:** Integra **PhotosUI** e la **Fotocamera** per la gestione delle immagini.
- **Gestione dello Stato:** Utilizza `@StateObject` e `@EnvironmentObject` per una gestione reattiva dello stato.
- **Gestione Permessi e Localizzazione:** Garantisce un'adeguata **gestione dei permessi** e supporta le traduzioni in **italiano e inglese**.

Il codice sorgente è disponibile su **[GitHub]({{ page.github }})**.
