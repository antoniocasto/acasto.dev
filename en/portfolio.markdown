---
layout: default
title: "Portfolio"
ref: "portfolio"
permalink: "/en/portfolio/"
---
{% assign localized_projects = site.portfolio | where: "lang", page.lang %}
{% if localized_projects.size == 0 %}
  {% assign portfolio_intro = "Here you will find some personal projects I worked on. Stay tuned!" %}
{% else %}
  {% assign portfolio_intro = "Here are some personal projects I worked on. They mark stages of my growth and don't fully reflect where I am today." %}
{% endif %}
{% include site/page-header.html title="Portfolio" subtitle=portfolio_intro heading_tag="h1" size="large" %}

{::nomarkdown}
<div class="portfolio-grid">
{% for project in localized_projects %}
  {% include site/project-card.html project=project %}
{% endfor %}
</div>
{:/nomarkdown}
