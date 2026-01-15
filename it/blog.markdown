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
{% else %}
<div id="category-filters">
  <h3>Filtra per categoria</h3>
  <div class="tiles-container">
    {% assign categories = "" %}
    {% for post in localized_posts %}
      {% for cat in post.categories %}
        {% unless categories contains cat %}
          {% assign categories = categories | append: cat | append: "," %}
        {% endunless %}
      {% endfor %}
    {% endfor %}
    {% assign categories = categories | split: "," | uniq %}
    {% for normCat in categories %}
      {% if normCat != "" %}
        <div class="filter-tile" data-value="{{ normCat }}">
          {{ normCat | capitalize }}
        </div>
      {% endif %}
    {% endfor %}
  </div>
</div>
<br>
{% endif %}


<div id="posts-list">
  {% for post in localized_posts %}
    {% assign postCategories = "" %}
    {% for cat in post.categories %}
      {% assign postCategories = postCategories | append: cat %}
      {% unless forloop.last %}
        {% assign postCategories = postCategories | append: "," %}
      {% endunless %}
    {% endfor %}
    <p>
    <div class="post-item" data-categories="{{ postCategories }}">
        <strong><a href="{{ post.url | relative_url }}">{{ post.title }}</a></strong>
      <div class="post-categories">
        {% for cat in post.categories %}
          <span class="category-tile">{{ cat | capitalize }}</span>
        {% endfor %}
      </div>
      <small class="post-date"><i>{% if page.lang == "it" %}
    ({{ site.data.localization[page.lang].post.published_on }} {{ post.date | date: "%d %B %Y" 
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
  {% endif %}</i></small>
    </div>
    </p>
  {% endfor %}
</div>