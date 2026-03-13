---
layout: default
title: "Certificates"
ref: "certificates"
permalink: "/en/certificates/"
---
# {{ site.data.localization[page.lang].certificates.heading }}

{{ site.data.localization[page.lang].certificates.intro }}

{% assign localized_certificates = site.data.certificates %}

{% if localized_certificates.size == 0 %}
_{{ site.data.localization[page.lang].certificates.empty_state }}_
{% else %}
<section class="certificates" data-certificates-carousel>
  <div class="certificates__header">
    <p class="certificates__hint">{{ site.data.localization[page.lang].certificates.carousel_hint }}</p>
    <div class="certificates__controls">
      <button type="button" class="certificates__button" data-certificates-prev aria-label="{{ site.data.localization[page.lang].certificates.previous }}">
        <span aria-hidden="true">&larr;</span>
      </button>
      <button type="button" class="certificates__button" data-certificates-next aria-label="{{ site.data.localization[page.lang].certificates.next }}">
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  </div>

  <div class="certificates__track" data-certificates-track role="region" aria-label="{{ site.data.localization[page.lang].certificates.region_label }}" tabindex="0">
    {% for certificate in localized_certificates %}
      {% assign course_title = certificate.title[page.lang] | default: certificate.title[site.default_lang] %}
      {% assign provider_name = certificate.provider[page.lang] | default: certificate.provider[site.default_lang] %}
      {% assign image_alt = certificate.certificate_alt[page.lang] | default: certificate.certificate_alt[site.default_lang] %}
      {% assign course_link = certificate.course_url %}
      {% if certificate.course_url and certificate.course_url contains "://" %}
        {% assign course_link = certificate.course_url %}
      {% elsif certificate.course_url %}
        {% assign course_link = certificate.course_url | relative_url %}
      {% endif %}

      <article class="certificate-card" data-certificate-slide>
        <div class="certificate-card__media">
          <img src="{{ certificate.certificate_image | relative_url }}" alt="{{ image_alt }}" loading="lazy" decoding="async">
        </div>
        <div class="certificate-card__body">
          <p class="certificate-card__provider">
            <span>{{ site.data.localization[page.lang].certificates.provider_label }}: {{ provider_name }}</span>
            <a class="certificate-card__course-link" href="{{ course_link }}" target="_blank" rel="noopener noreferrer">
              {{ site.data.localization[page.lang].certificates.course_link_label }} <span aria-hidden="true">↗</span>
            </a>
          </p>
          <h2>{{ course_title }}</h2>
        </div>
      </article>
    {% endfor %}
  </div>
</section>
{% endif %}
