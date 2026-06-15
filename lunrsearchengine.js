---
layout: null
sitemap: false
---

{% assign counter = 0 %}
var documents = [{% for page in site.pages %}{% if page.url contains '.xml' or page.url contains 'assets' or page.url contains 'category' or page.url contains 'tag' %}{% else %}{
    "id": {{ counter }},
    "url": "{{ site.url }}{{site.baseurl}}{{ page.url }}",
    "title": "{{ page.title | replace: '"', ' ' | replace: "'", " " }}",
    "body": "{{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' | replace: "'", " " }}"{% assign counter = counter | plus: 1 %}
    }, {% endif %}{% endfor %}{% for page in site.without-plugin %}{
    "id": {{ counter }},
    "url": "{{ site.url }}{{site.baseurl}}{{ page.url }}",
    "title": "{{ page.title | replace: '"', ' ' | replace: "'", " " }}",
    "body": "{{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' | replace: "'", " " }}"{% assign counter = counter | plus: 1 %}
    }, {% endfor %}{% for page in site.posts %}{
    "id": {{ counter }},
    "url": "{{ site.url }}{{site.baseurl}}{{ page.url }}",
    "title": "{{ page.title | replace: '"', ' ' | replace: "'", " " }}",
    "body": "{{ page.date | date: "%Y/%m/%d" }} - {{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' | replace: "'", " " }}"{% assign counter = counter | plus: 1 %}
    }{% if forloop.last %}{% else %}, {% endif %}{% endfor %}];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});

function lunr_search(term) {
    var resultsEl = document.getElementById('lunrsearchresults');
    if (!resultsEl) return false;

    var ul = resultsEl.querySelector('ul');
    if (!ul) return false;

    ul.innerHTML = '';
    term = (term || '').trim();

    if (!term) {
        resultsEl.style.display = 'none';
        return false;
    }

    var results = idx.search(term);
    resultsEl.style.display = 'block';

    if (results.length > 0) {
        var limit = Math.min(results.length, 8);
        for (var i = 0; i < limit; i++) {
            var ref = results[i]['ref'];
            var doc = documents[ref];
            var body = doc['body'].substring(0, 120) + '...';
            ul.innerHTML += "<li class='lunrsearchresult'><a href='" + doc['url'] + "'><span class='title'>" + doc['title'] + "</span><br /><small><span class='body'>" + body + "</span></small></a></li>";
        }
    } else {
        ul.innerHTML = "<li class='lunrsearchresult no-results'>No results found</li>";
    }

    return false;
}

$(function () {
    var input = document.getElementById('lunrsearch');
    var resultsEl = document.getElementById('lunrsearchresults');
    var searchSection = document.querySelector('.search-section');

    if (!input || !resultsEl) return;

    input.addEventListener('input', function () {
        lunr_search(this.value);
    });

    input.addEventListener('focus', function () {
        if (this.value.trim()) {
            lunr_search(this.value);
        }
    });

    var searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function () {
            lunr_search(input.value);
            input.focus();
        });
    }

    document.addEventListener('click', function (e) {
        if (searchSection && !searchSection.contains(e.target)) {
            resultsEl.style.display = 'none';
        }
    });
});
