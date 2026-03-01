---
layout: default
title: "Portfolio"
ref: "portfolio"
permalink: "/en/portfolio/"
---
# Portfolio  

{% assign localized_projects = site.portfolio | where: "lang", page.lang %}

{% if localized_projects.size == 0 %}
Here you will find some personal projects I worked on. Stay tuned!
{% else %}
Here are some personal projects I worked on. They mark stages of my growth and don’t fully reflect where I am today.
{% endif %}

<div class="portfolio-grid">
{% for project in localized_projects %}
  {% assign thumbnail_src = project.thumbnail %}
  {% if project.thumbnail and project.thumbnail contains "://" %}
    {% assign thumbnail_src = project.thumbnail %}
  {% elsif project.thumbnail %}
    {% assign thumbnail_src = project.thumbnail | relative_url %}
  {% endif %}
  <a class="portfolio-card" href="{{ project.url | relative_url }}">
    <div class="portfolio-card__media"{% if project.thumbnail_bg %} style="--portfolio-thumb-bg: {{ project.thumbnail_bg }};"{% endif %}>
      {% if thumbnail_src %}
      <img src="{{ thumbnail_src }}" alt="{{ project.thumbnail_alt | default: project.title }}" loading="lazy" decoding="async">
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
