---
layout: about
title: "About"
ref: "about"
permalink: "/en/about/"
---

{::nomarkdown}
<section class="about-hero">
  <div class="about-hero__identity">
    <div class="avatar-block">
      <div class="avatar-ring ac-avatar" data-ac-shape="rounded" data-ac-border="true">
        <img src="/assets/images/profile.jpeg" alt="Antonio Casto" class="avatar-image ac-avatar__image" loading="lazy" decoding="async" width="764" height="824">
      </div>
      <span class="role-badge ac-tag" data-ac-color="accent"><span class="ac-tag__label">iOS Developer</span></span>
    </div>
    <h1>Antonio Casto</h1>
    <p class="role-line">Based in Italy · Fully bilingual (English/Italian)</p>
    <div class="about-actions">
      <a class="about-action ac-button" data-ac-variant="secondary" href="/en/portfolio/"><span class="ac-button__label">View Portfolio</span></a>
      <a class="about-action ac-button" href="/en/contacts/"><span class="ac-button__label">Contact Me</span></a>
    </div>
  </div>
  <div class="about-hero__summary ac-card" data-ac-variant="filled">
    <p>I design and build iOS apps with a focus on modularity, scalability, and testability.</p>
    <p>From architecture to delivery, I collaborate closely with teams and ship reliable features with clear ownership.</p>
    <ul class="highlights-list">
      <li>SwiftUI &amp; UIKit with maintainable architectures (MVVM, VIPER, TCA, Coordinator, Repository pattern).</li>
      <li>CI/CD: Fastlane + GitLab CI/CD, SwiftLint, automated tests.</li>
      <li>R&amp;D work with ARKit, SceneKit, CoreML.</li>
      <li>Multiple environments with targets/schemes/build configs; Tuist.</li>
      <li>Distributed team collaboration across time zones.</li>
    </ul>
  </div>
</section>

<section class="about-section">
  {% include acd/section-header.liquid title="Work Experience" heading_tag="h2" size="regular" class="about-section__header" %}
  <div class="about-grid">
    <article class="about-card ac-card" data-ac-variant="filled">
      <header>
        <h3>iOS Developer — Hidonix</h3>
        <p class="meta">Catania, Italy · Oct 9, 2023 — Present</p>
      </header>
      <ul>
        <li>Design and development of iOS applications using SwiftUI and UIKit.</li>
        <li>Maintenance and iterative improvement of existing features and codebases.</li>
        <li>Research and development activities to evaluate new technologies and improve current solutions.</li>
        <li>Collaboration within the team to solve technical challenges and align on effective approaches.</li>
      </ul>
    </article>
    <article class="about-card ac-card" data-ac-variant="filled">
      <header>
        <h3>Developer — Research Scholarship</h3>
        <p class="meta">Nexa Center for Internet &amp; Society — Politecnico di Torino (DAUIN)</p>
        <p class="meta">Oct 2021 — Oct 2022 (Remote — Turin, Italy)</p>
      </header>
      <ul>
        <li>Contributed to a recommender system for the European Erasmus+ project CLIKC.</li>
        <li>Worked on an adaptive learning system leveraging semantic technologies to improve personalized content recommendations.</li>
      </ul>
    </article>
  </div>
</section>

<section class="about-section">
  {% include acd/section-header.liquid title="Core iOS Skills" heading_tag="h2" size="regular" class="about-section__header" %}
  <div class="about-card ac-card" data-ac-variant="filled">
    <ul class="skill-list">
      <li><strong>Frameworks:</strong> SwiftUI, UIKit, Core Data, MapKit, Core Location, User Defaults, ARKit, SceneKit, CoreML.</li>
      <li><strong>Architecture:</strong> MVVM, VIPER, The Composable Architecture (TCA), Coordinator, Repository pattern.</li>
      <li><strong>Concurrency:</strong> Swift Concurrency up to Swift 6.2 (Approachable Concurrency): async/await, structured concurrency (Task, TaskGroup), actors; Grand Central Dispatch (GCD): queues, sync/async coordination; bridging legacy APIs to async/await with continuations (checked/unsafe when needed).</li>
      <li><strong>Communication &amp; event streams:</strong> Advanced AsyncStream / AsyncSequence: consuming streams produced via AsyncStream.Continuation; handling cancellation; designing event pipelines; Combine (basic): observing @Published and reacting to value changes; delegate pattern; callbacks and completion handlers.</li>
      <li><strong>Localization:</strong> String Catalogs for iOS localization workflows.</li>
      <li><strong>Networking &amp; Data:</strong> REST APIs, Firebase (experience), MongoDB (experience), FastAPI (experience).</li>
    </ul>
  </div>
</section>

<section class="about-section">
  {% include acd/section-header.liquid title="Quality & Delivery" heading_tag="h2" size="regular" class="about-section__header" %}
  <div class="about-card ac-card" data-ac-variant="filled">
    <ul class="skill-list">
      <li><strong>Dependency management:</strong> Swift Package Manager (adding dependencies and reusable internal packages), CocoaPods.</li>
      <li><strong>CI/CD and automation:</strong> Fastlane, GitLab CI/CD.</li>
      <li><strong>Project configuration:</strong> multiple environments (development, staging, release) using targets, schemes, and build configurations; Tuist.</li>
      <li><strong>Release:</strong> App Store submissions and TestFlight beta distribution.</li>
      <li><strong>Monitoring:</strong> Firebase Crashlytics.</li>
      <li><strong>Testing and quality:</strong> XCTest, UI Testing, TDD, Mocking, SwiftLint.</li>
    </ul>
  </div>
</section>

<section class="about-section">
  {% include acd/section-header.liquid title="Education" heading_tag="h2" size="regular" class="about-section__header" %}
  <div class="about-card ac-card" data-ac-variant="filled">
    <ul class="skill-list">
      <li>M.Sc. Computer Engineering (Software) — Politecnico di Torino (2018–2022).</li>
      <li>B.Sc. Computer Engineering — Politecnico di Torino (2014–2018).</li>
      <li>Scientific High School (P.N.I.) — I.I.S. “Matteo Raeli”, Noto (2008–2013).</li>
      <li>IELTS 5.5 — British Council.</li>
    </ul>
  </div>
</section>

<section class="about-section">
  {% include acd/section-header.liquid title="Continuous Learning" heading_tag="h2" size="regular" class="about-section__header" %}
  <div class="about-card ac-card" data-ac-variant="filled">
    <p>Continuous learning is part of my daily routine: I study every week, experiment, and apply new ideas immediately.</p>
    <p>I stay sharp through Hacking with Swift, Design+Code, and Point-Free, alongside official documentation and books.</p>
    <p>Mentors I follow consistently include Sean Allen, Donny Wals, Antoine van der Lee, and Paul Hudson.</p>
    <p>I track WWDC updates closely and follow iOS community discussions on Reddit and LinkedIn.</p>
  </div>
</section>

<section class="about-section">
  {% include acd/section-header.liquid title="Additional Technologies" heading_tag="h2" size="regular" class="about-section__header" %}
  <details class="about-details ac-card" data-ac-variant="filled">
    <summary>View supporting tools and platforms</summary>
    <div class="about-details__content">
      <p><strong>Platforms (past experience):</strong> Flutter, React, Angular, Spring Boot.</p>
      <p><strong>Languages:</strong> Swift, Objective-C, Python, Dart, Kotlin, Java, C, SQL, JavaScript, TypeScript.</p>
      <p><strong>Tools:</strong> Xcode, VS Code, Android Studio — Postman, Proxyman, Swagger — GitHub, GitLab.</p>
    </div>
  </details>
</section>

<section class="about-section">
  <div class="about-actions about-actions--full">
    <a class="about-action ac-button" data-ac-variant="secondary" href="/en/portfolio/"><span class="ac-button__label">View Portfolio</span></a>
    <a class="about-action ac-button" data-ac-variant="secondary" href="/en/certificates/"><span class="ac-button__label">View Certificates</span></a>
    <a class="about-action ac-button" href="/en/contacts/"><span class="ac-button__label">Contact Me</span></a>
  </div>
</section>
{:/nomarkdown}
