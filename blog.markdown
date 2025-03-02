---
layout: default
title: Blog
---
# Blog  
In this section, I will publish articles and tutorials about iOS development and technology.

{% if site.posts.size == 0 %}
*_There are no articles at the moment. Check back soon for updates!_*
{% endif %}

{% for post in site.posts %}
- **[{{ post.title }}]({{ post.url | relative_url }})** <small>({{ post.date | date: "%d %B %Y" }})</small>
  - {{ post.excerpt }}
{% endfor %}