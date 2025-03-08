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

{% for project in localized_projects %}
**[{{ project.title }}]({{ project.url | relative_url }})** – {{ project.description }}
{% endfor %}