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
- **[{{ post.title }}]({{ post.url | relative_url }})** <small> {% if page.lang == "it" %}
    (Pubblicato il {{ post.date | date: "%d %B %Y" 
       | replace: "January", "Gennaio" 
       | replace: "February", "Febbraio" 
       | replace: "March", "Marzo" 
       | replace: "April", "Aprile" 
       | replace: "May", "Maggio" 
       | replace: "June", "Giugno" 
       | replace: "July", "Luglio" 
       | replace: "August", "Agosto" 
       | replace: "September", "Settembre" 
       | replace: "October", "Ottobre" 
       | replace: "November", "Novembre" 
       | replace: "December", "Dicembre" }})
  {% endif %} </small>
{% endfor %}