---
layout: portfolio
title: "NotAPlace"
ref: "notaplace"
permalink: "/en/portfolio/notaplace/"
date: 2025-03-09
github: "https://github.com/antoniocasto/NotAPlace"
description: "An iOS app built with SwiftUI to track places that evoke positive emotions."
technologies: ["SwiftUI", "MapKit", "CoreLocation", "UserDefaults", "DocumentDirectory", "Keychain", "LocalAuthentication", "PhotosUI", "Camera", "@StateObject", "@EnvironmentObject"]
published: true
---

*{{ page.description }}*

<div align="center">
  <img src="https://raw.githubusercontent.com/antoniocasto/NotAPlace/refs/heads/main/doc/56.PNG" width="180" alt="Map View">
  <img src="https://github.com/antoniocasto/NotAPlace/blob/main/doc/54.PNG?raw=true" width="180" alt="Location Details">
  <img src="https://github.com/antoniocasto/NotAPlace/blob/main/doc/39.PNG?raw=true" width="180" alt="User Settings">
  <img src="https://github.com/antoniocasto/NotAPlace/blob/main/doc/41.PNG?raw=true" width="180" alt="User Onboarding">
</div>

NotAPlace is an iPhone application built with **SwiftUI**, designed to track places around the world that evoke positive emotions in the user.

**📌 Note:**  
*This project represents an important step in my journey as an iOS developer. Since its development, I have improved my skills and adopted more advanced architectural patterns. While this code does not fully reflect my current level, it remains an example of my work and growth over time.*

### Key Features:
- **Map Integration:** Uses **MapKit** and **CoreLocation** to display places on a map.
- **Data Storage:** Saves user data and preferences using **UserDefaults** and **DocumentDirectory**.
- **Secure Access:** Implements **Keychain** and **LocalAuthentication** for Face ID / Touch ID authentication.
- **Multimedia Support:** Integrates **PhotosUI** and the **Camera** for capturing and managing images.
- **State Management:** Uses `@StateObject` and `@EnvironmentObject` for reactive state handling.
- **Permission Handling & Localization:** Ensures proper **permission management** and supports **English and Italian** translations.

The source code is available on **[GitHub]({{ page.github }})**.