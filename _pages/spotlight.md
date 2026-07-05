---
layout: default
title: Authors Spotlight
permalink: /spotlight
classes: page-spotlight
---

{% assign spotlight = site.data.author_spotlight %}

<div class="spotlight-page">
    <header class="spotlight-page__header text-center">
        <p class="spotlight-page__eyebrow">Monthly recognition</p>
        <h1 class="spotlight-page__title">Authors Spotlight</h1>
        <p class="spotlight-page__month">{{ spotlight.month_label }}</p>
        {% if spotlight.message %}
        <p class="spotlight-page__message">{{ spotlight.message }}</p>
        {% endif %}
        <p class="spotlight-page__summary">
            {{ spotlight.total_month_articles }} article{% if spotlight.total_month_articles != 1 %}s{% endif %}
            published by {{ spotlight.active_authors.size }} author{% if spotlight.active_authors.size != 1 %}s{% endif %} this month.
        </p>
    </header>

    {% if spotlight.top_authors.size > 0 %}
    <section class="spotlight-section">
        <h2 class="spotlight-section__title">Top contributors this month</h2>
        <div class="spotlight-podium">
            {% for author in spotlight.top_authors %}
            <article class="spotlight-card spotlight-card--rank-{{ forloop.index }}">
                <div class="spotlight-card__rank">#{{ forloop.index }}</div>
                <a href="{{ site.baseurl }}{{ author.link }}" class="spotlight-card__profile">
                    <img src="{{ site.baseurl }}{{ author.image }}" alt="{{ author.name }}" class="spotlight-card__avatar">
                    <h3 class="spotlight-card__name">{{ author.name }}</h3>
                </a>
                <ul class="spotlight-card__stats">
                    <li><strong>{{ author.month_posts }}</strong> this month</li>
                    <li><strong>{{ author.featured_month }}</strong> featured</li>
                    <li><strong>{{ author.total_posts }}</strong> all time</li>
                </ul>
                {% if author.month_articles.size > 0 %}
                <div class="spotlight-card__articles">
                    <p class="spotlight-card__articles-label">Published in {{ spotlight.month_label }}</p>
                    <ul>
                        {% for article in author.month_articles %}
                        <li>
                            <a href="{{ site.baseurl }}{{ article.url }}">{{ article.title }}</a>
                            {% if article.featured %}<span class="spotlight-chip">Featured</span>{% endif %}
                        </li>
                        {% endfor %}
                    </ul>
                </div>
                {% endif %}
            </article>
            {% endfor %}
        </div>
    </section>
    {% else %}
    <section class="spotlight-section spotlight-section--empty text-center">
        <h2 class="spotlight-section__title">No spotlight yet for {{ spotlight.month_label }}</h2>
        <p class="spotlight-page__message">Once articles are published this month, top contributors will appear here automatically.</p>
    </section>
    {% endif %}

    {% if spotlight.badges.size > 0 %}
    <section class="spotlight-section">
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

    <section class="spotlight-section spotlight-section--leaderboard">
        <h2 class="spotlight-section__title">Full leaderboard</h2>
        <div class="spotlight-leaderboard">
            {% include spotlight-leaderboard.html authors=spotlight.all_authors %}
        </div>
    </section>
</div>
