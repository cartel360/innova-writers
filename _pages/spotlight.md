---
layout: default
title: Authors Spotlight
permalink: /spotlight
classes: page-spotlight
---

{% assign spotlight = site.data.author_spotlight %}
{% assign cy = site.time | date: '%Y' %}
{% assign cm = site.time | date: '%m' | plus: 0 %}
{% assign default_key = cy | append: '-' %}
{% if cm < 10 %}
    {% assign default_key = default_key | append: '0' %}
{% endif %}
{% assign default_key = default_key | append: cm %}
{% assign active_key = spotlight.current_key | default: default_key %}

<div class="spotlight-page" id="spotlightPage" data-baseurl="{{ site.baseurl }}" data-current-key="{{ active_key }}">
    <header class="spotlight-page__header text-center">
        <p class="spotlight-page__eyebrow">Monthly recognition</p>
        <h1 class="spotlight-page__title">Authors Spotlight</h1>

        {% include spotlight-month-filter.html active_key=active_key %}

        <p class="spotlight-page__month" id="spotlightMonthLabel">{{ spotlight.month_label | default: site.time | date: '%B %Y' }}</p>
        {% if spotlight.message %}
        <p class="spotlight-page__message">{{ spotlight.message }}</p>
        {% endif %}
        <p class="spotlight-page__summary" id="spotlightSummary">
            {{ spotlight.total_month_articles }} article{% if spotlight.total_month_articles != 1 %}s{% endif %}
            published by {{ spotlight.active_authors.size }} author{% if spotlight.active_authors.size != 1 %}s{% endif %} in {{ spotlight.month_label }}.
        </p>
    </header>

    <div id="spotlightDynamic">
        {% include spotlight-podium.html month=spotlight %}

        {% if spotlight.badges.size > 0 %}
        <section class="spotlight-section" data-spotlight-section="badges">
            <h2 class="spotlight-section__title">This month&apos;s highlights</h2>
            <div class="spotlight-badges">
                {% for badge in spotlight.badges %}
                <a href="{{ site.baseurl }}{{ badge.link }}" class="spotlight-badge">
                    <img src="{{ site.baseurl }}{{ badge.image }}" alt="{{ badge.author }}" class="spotlight-badge__avatar">
                    <div class="spotlight-badge__body">
                        <span class="spotlight-badge__label">{{ badge.label }}</span>
                        <strong class="spotlight-badge__author">{{ badge.author }}</strong>
                        <span class="spotlight-badge__detail">{{ badge.detail }}</span>
                    </div>
                </a>
                {% endfor %}
            </div>
        </section>
        {% endif %}

        <section class="spotlight-section spotlight-section--leaderboard" data-spotlight-section="leaderboard">
            <h2 class="spotlight-section__title">Full leaderboard</h2>
            <div class="spotlight-leaderboard" id="spotlightLeaderboard">
                {% include spotlight-leaderboard.html authors=spotlight.all_authors %}
            </div>
        </section>
    </div>
</div>

<script type="application/json" id="spotlight-data">{{ site.data.author_spotlight | jsonify }}</script>
