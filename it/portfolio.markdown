---
layout: default
title: "Portfolio"
ref: "portfolio"
permalink: "/it/portfolio/"
---
# Portfolio  

{% assign localized_projects = site.portfolio | where: "lang", page.lang %}

{% if localized_projects.size == 0 %}
Qui troverai alcuni progetti personali su cui ho lavorato. Resta sintonizzato!
{% else %}
Ecco alcuni progetti personali su cui ho lavorato:
{% endif %}

<div class="portfolio-grid">
{% for project in localized_projects %}
  <a class="portfolio-card" href="{{ project.url | relative_url }}">
    <div class="portfolio-card__media">
      {% if project.thumbnail %}
      <img src="{{ project.thumbnail }}" alt="{{ project.thumbnail_alt | default: project.title }}">
      {% else %}
      <span class="portfolio-card__icon" aria-hidden="true">📦</span>
      {% endif %}
    </div>
    <div class="portfolio-card__body">
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>
    </div>
  </a>
{% endfor %}
</div>
