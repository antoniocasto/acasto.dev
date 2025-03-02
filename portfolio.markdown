---
layout: default
title: Portfolio
---
# Portfolio  
{% if site.portfolio.size == 0 %}
Here you will find some personal projects I worked on. Stay tuned!
{% else %}
Here are some personal projects I worked on:
{% endif %}

{% for project in site.portfolio %}
**{{ project.title }}** – {{ project.description }}  
<small>[Source code]({{ project.github }})</small>
{% endfor %}