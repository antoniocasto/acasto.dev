---
layout: default
title: "Blog"
ref: "blog"
permalink: "/en/blog/"
---
{% include site/page-header.html
  title="Blog"
  subtitle="In this section, I will publish articles and tutorials about iOS development and technology."
  heading_tag="h1"
  size="large"
%}

{% assign localized_posts = site.posts | where: "lang", page.lang %}

{% if localized_posts.size == 0 %}
_There are no articles at the moment. Check back soon for updates!_
{% else %}
{::nomarkdown}
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
        <button type="button" class="filter-tile ac-tag" data-ac-variant="outlined" data-ac-color="surface" data-value="{{ normCat }}" aria-pressed="false">
          <span class="ac-tag__label">{{ normCat | capitalize }}</span>
        </button>
      {% endif %}
    {% endfor %}
  </div>
</div>

<div id="posts-list">
  {% for post in localized_posts %}
    {% include site/post-list-row.html post=post lang=page.lang %}
  {% endfor %}
</div>
{:/nomarkdown}
{% endif %}
