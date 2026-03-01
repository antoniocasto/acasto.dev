---
layout: default
title: "Blog"
ref: "blog"
permalink: "/en/blog/"
---
# Blog  

In this section, I will publish articles and tutorials about iOS development and technology.

{% assign localized_posts = site.posts | where: "lang", page.lang %}

{% if localized_posts.size == 0 %}
_There are no articles at the moment. Check back soon for updates!_
{% else %}
<div id="category-filters">
  <h3>{{ site.data.localization[page.lang].a11y.filter_by_category }}</h3>
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
        <button type="button" class="filter-tile" data-value="{{ normCat }}" aria-pressed="false">
          {{ normCat | capitalize }}
        </button>
      {% endif %}
    {% endfor %}
  </div>
</div>
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
    <div class="post-item" data-categories="{{ postCategories }}">
      <strong><a href="{{ post.url | relative_url }}">{{ post.title }}</a></strong>
      <div class="post-categories">
        {% for cat in post.categories %}
          <span class="category-tile">{{ cat | capitalize }}</span>
        {% endfor %}
      </div>
      <small class="post-date"><i>({{ site.data.localization[page.lang].post.published_on }} {{ post.date | date: "%d %B %Y" }})</i></small>
    </div>
  {% endfor %}
</div>
