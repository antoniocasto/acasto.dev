---
layout: default
title: "Blog"
ref: "blog"
permalink: "/it/blog/"
---
# Blog  

In questa sezione pubblicherò articoli e tutorial sullo sviluppo iOS e tecnologia.

{% assign localized_posts = site.posts | where: "lang", page.lang %}

{% if localized_posts.size == 0 %}
_Non ci sono articoli al momento. Torna presto per aggiornamenti!_
{% endif %}

{% for post in localized_posts %}
- **[{{ post.title }}]({{ post.url | relative_url }})** <small>({{ post.date | date: "%d %B %Y" }})</small>
  - {{ post.excerpt }}
{% endfor %}