---
layout: default
title: "Blog"
ref: "blog"
permalink: "/en/blog/"
---
# Blog  

In this section, I will publish articles and tutorials about iOS development and technology.

{% assign localized_posts = site.posts | where: "lang", page.lang %}

<div id="category-filters">
  <h3>Filter by Category</h3>
  {% assign categories = "" %}
  {% for post in localized_posts %}
    {% for cat in post.categories %}
      {% unless categories contains cat %}
        {% assign categories = categories | append: cat | append: "," %}
      {% endunless %}
    {% endfor %}
  {% endfor %}
  {% assign categories = categories | split: "," | uniq %}
  {% for cat in categories %}
    {% if cat != "" %}
      <label>
        <input type="checkbox" class="category-checkbox" value="{{ cat }}" />
        {{ cat | capitalize }}
      </label><br />
    {% endif %}
  {% endfor %}
</div>

{% if localized_posts.size == 0 %}
_There are no articles at the moment. Check back soon for updates!_
{% endif %}

<div id="posts-list">
  {% for post in localized_posts %}
    <div class="post-item" data-categories="{% for cat in post.categories %}{{ cat }}{% unless forloop.last %},{% endunless %}{% endfor %}">
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <div class="post-categories">
        {% for cat in post.categories %}
          <span class="category">{{ cat | capitalize }}</span>
        {% endfor %}
      </div>
      <small>(Published on {{ post.date | date: "%d %B %Y" }})</small>
    </div>
  {% endfor %}
</div>