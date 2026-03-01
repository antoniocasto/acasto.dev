---
layout: portfolio
title: "SwiftUIClima"
ref: "swiftui-clima"
permalink: "/en/portfolio/swiftui-clima/"
date: 2025-03-09
github: "https://github.com/antoniocasto/SwiftUIClima"
description: "An iOS weather app built with SwiftUI."
thumbnail_bg: "linear-gradient(135deg, #0ea5e9, #1d4ed8)"
technologies: ["SwiftUI", "LottieFiles", "OpenWeather API", "MVVM", "CoreData", "CoreLocation", "UserDefaults", "URLSession"]
published: true
---

*{{ page.description }}*

SwiftUIClima is an iPhone application built with **SwiftUI** that allows users to track weather conditions in their current location and favorite places.

It leverages the versatility of **SwiftUI** and the visual appeal of **LottieFiles** to provide a simple and engaging user interface.

The application uses the **OpenWeather API** to fetch real-time weather data.

**📌 Note:**  
*This project represents an important milestone in my journey as an iOS developer. Since then, I have refined my skills and adopted more advanced approaches to designing modular and scalable apps. While the code does not fully reflect my current development level, it remains a valuable example of my work and professional growth over time.*

### Key Features:
- **MVVM architecture** for clear separation between UI and business logic.
- **Networking** with `URLSession` and `Decodable` protocol for fetching weather data.
- **Data persistence** using `CoreData` to store favorite locations.
- **Geolocation** via `CoreLocation` to detect the current position.
- **User preferences management** with `UserDefaults` and `@AppStorage`.
- **State management** with `@StateObject` and `ObservableObject`.
- **Permission handling** for location access.
- **Multilingual support** (English and Italian).

Screenshots and demo states are documented in the repository.

The source code is available on **[GitHub]({{ page.github }})**.
