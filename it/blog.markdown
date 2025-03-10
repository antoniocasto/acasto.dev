---
layout: default
title: "Blog"
ref: "blog"
permalink: "/it/blog/"
---
# Blog  

In questa sezione pubblicherò articoli e tutorial sullo sviluppo iOS e tecnologia.

{% assign localized_posts = site.posts | where: "lang", page.lang %}

<div id="category-filters">
  <h3>Filtra per Categoria</h3>
  <div class="tiles-container">
    {% assign categories = "" %}
    {% for post in localized_posts %}
      {% for cat in post.categories %}
        {% assign normalizedCat = cat %}
        {% if page.lang == "it" %}
          {% if cat == "sviluppo" or cat == "development" %}
            {% assign normalizedCat = "development" %}
          {% endif %}
        {% endif %}
        {% unless categories contains normalizedCat %}
          {% assign categories = categories | append: normalizedCat | append: "," %}
        {% endunless %}
      {% endfor %}
    {% endfor %}
    {% assign categories = categories | split: "," | uniq %}
    {% for normCat in categories %}
      {% if normCat != "" %}
        <div class="filter-tile" data-value="{{ normCat }}">
          {% if page.lang == "it" and normCat == "development" %}
            sviluppo
          {% else %}
            {{ normCat | capitalize }}
          {% endif %}
        </div>
      {% endif %}
    {% endfor %}
  </div>
</div>

{% if localized_posts.size == 0 %}
_Non ci sono articoli al momento. Torna presto per aggiornamenti!_
{% endif %}

<div id="posts-list">
  {% for post in localized_posts %}
    {% assign postCategories = "" %}
    {% for cat in post.categories %}
      {% assign normalizedCat = cat %}
      {% if page.lang == "it" %}
        {% if cat == "sviluppo" or cat == "development" %}
          {% assign normalizedCat = "development" %}
        {% endif %}
      {% endif %}
      {% assign postCategories = postCategories | append: normalizedCat %}
      {% unless forloop.last %}
        {% assign postCategories = postCategories | append: "," %}
      {% endunless %}
    {% endfor %}
    <div class="post-item" data-categories="{{ postCategories }}">
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <div class="post-categories">
        {% for cat in post.categories %}
          {% if page.lang == "it" %}
            {% if cat == "sviluppo" or cat == "development" %}
              <span class="category">sviluppo</span>
            {% else %}
              <span class="category">{{ cat | capitalize }}</span>
            {% endif %}
          {% else %}
            <span class="category">{{ cat | capitalize }}</span>
          {% endif %}
        {% endfor %}
      </div>
      <small>
        {% if page.lang == "it" %}
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
        {% endif %}
      </small>
    </div>
  {% endfor %}
</div>