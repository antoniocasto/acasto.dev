---
layout: default
title: "Portfolio"
ref: "portfolio"
permalink: "/it/portfolio/"
---
{% assign localized_projects = site.portfolio | where: "lang", page.lang %}
{% if localized_projects.size == 0 %}
  {% assign portfolio_intro = "Qui troverai alcuni progetti personali su cui ho lavorato. Resta sintonizzato!" %}
{% else %}
  {% assign portfolio_intro = "Ecco alcuni progetti personali su cui ho lavorato. Sono tappe della mia crescita e non riflettono completamente il mio livello attuale." %}
{% endif %}
{% include site/page-header.html title="Portfolio" subtitle=portfolio_intro heading_tag="h1" size="large" %}

{::nomarkdown}
<div class="portfolio-grid">
{% for project in localized_projects %}
  {% include site/project-card.html project=project %}
{% endfor %}
</div>
{:/nomarkdown}
