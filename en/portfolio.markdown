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
Here are some personal projects I worked on:
{% endif %}

{% for project in localized_projects %}
**{{ project.title }}** – {{ project.description }}  
<small>[Source code]({{ project.github }})</small>
{% endfor %}