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
{% endif %}

{% for post in localized_posts %}
- **[{{ post.title }}]({{ post.url | relative_url }})** <small>(Published on {{ post.date | date: "%d %B %Y" }})</small>
{% endfor %}