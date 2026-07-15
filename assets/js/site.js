document.addEventListener("DOMContentLoaded", function () {
    initTeamTooltips();
    initStickyNav();
    initReadingProgress();
    initBackToTop();
    initCopyLink();
    initSmoothScroll();
    initCategoryFilter();
    initSpotlightMonthFilter();
});

function initStickyNav() {
    var nav = document.querySelector(".site-navbar");
    if (!nav) return;

    function keepNavVisible() {
        nav.classList.remove("nav-up");
        nav.classList.add("nav-down");
        nav.style.top = "0px";
        nav.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    keepNavVisible();
    window.addEventListener("scroll", keepNavVisible, { passive: true });
}

function initTeamTooltips() {
    document.querySelectorAll(".team-member").forEach(function (member) {
        var wrapper = member.parentElement;
        if (!wrapper || wrapper.querySelector(".tooltip")) return;

        var tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.innerText = member.getAttribute("data-name") || "";
        wrapper.appendChild(tooltip);

        member.addEventListener("mouseenter", function () {
            tooltip.classList.add("visible");
        });
        member.addEventListener("mouseleave", function () {
            tooltip.classList.remove("visible");
        });
    });
}

function initReadingProgress() {
    var bar = document.querySelector(".reading-progress__bar");
    if (!bar) return;

    window.addEventListener("scroll", function () {
        var article = document.querySelector(".article-post");
        if (!article) return;

        var start = article.offsetTop - 80;
        var height = article.offsetHeight - window.innerHeight;
        if (height <= 0) return;

        var progress = (window.scrollY - start) / height;
        progress = Math.max(0, Math.min(1, progress));
        bar.style.width = (progress * 100) + "%";
    }, { passive: true });
}

function initBackToTop() {
    var button = document.getElementById("backToTop");
    if (!button) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
            button.classList.add("is-visible");
        } else {
            button.classList.remove("is-visible");
        }
    }, { passive: true });

    button.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initCopyLink() {
    document.querySelectorAll(".share-copy-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            var url = button.getAttribute("data-copy-url");
            if (!url || !navigator.clipboard) return;

            navigator.clipboard.writeText(url).then(function () {
                button.classList.add("is-copied");
                setTimeout(function () {
                    button.classList.remove("is-copied");
                }, 2000);
            });
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            var targetId = anchor.getAttribute("href");
            if (targetId.length <= 1) return;

            var target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

function initCategoryFilter() {
    var input = document.getElementById("categoryFilter");
    var grid = document.getElementById("categoriesGrid");
    var empty = document.getElementById("categoriesEmpty");
    if (!input || !grid) return;

    var cards = grid.querySelectorAll(".category-card");

    input.addEventListener("input", function () {
        var query = input.value.trim().toLowerCase();
        var visible = 0;

        cards.forEach(function (card) {
            var name = card.getAttribute("data-name") || "";
            var show = !query || name.indexOf(query) !== -1;
            card.style.display = show ? "" : "none";
            if (show) visible += 1;
        });

        if (empty) {
            empty.classList.toggle("categories-page__empty--hidden", visible > 0);
        }
    });
}

function initSpotlightMonthFilter() {
    var page = document.getElementById("spotlightPage");
    var dataEl = document.getElementById("spotlight-data");
    var select = document.getElementById("spotlightMonthSelect");
    if (!page || !select) return;

    var data = null;
    if (dataEl) {
        try {
            data = JSON.parse(dataEl.textContent);
        } catch (error) {
            data = null;
        }
    }

    if (data && data.month_options && data.month_options.length) {
        select.innerHTML = data.month_options.map(function (option) {
            return (
                '<option value="' + String(option.key).replace(/"/g, "&quot;") + '">' +
                String(option.label).replace(/</g, "&lt;") +
                "</option>"
            );
        }).join("");
    }

    if (!data || !data.months) return;

    var baseUrl = page.getAttribute("data-baseurl") || "";
    var monthLabel = document.getElementById("spotlightMonthLabel");
    var summary = document.getElementById("spotlightSummary");
    var dynamic = document.getElementById("spotlightDynamic");

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function articleLabel(count) {
        return count === 1 ? "article" : "articles";
    }

    function authorLabel(count) {
        return count === 1 ? "author" : "authors";
    }

    function renderAuthorStats(author) {
        var featuredMonth = author.featured_month || 0;
        var totalFeatured = author.total_featured || 0;

        function statTile(modifier, value, label, highlight) {
            var highlightClass = highlight ? " is-highlight" : "";
            return (
                '<div class="spotlight-stat spotlight-stat--' + modifier + highlightClass + '">' +
                    '<span class="spotlight-stat__value">' + value + "</span>" +
                    '<span class="spotlight-stat__label">' + label + "</span>" +
                "</div>"
            );
        }

        return (
            '<div class="spotlight-stat-grid">' +
                statTile("month", author.month_posts, "This month", false) +
                statTile("featured-month", featuredMonth, "Featured this month", featuredMonth > 0) +
                statTile("featured-total", totalFeatured, "Featured all time", totalFeatured > 0) +
                statTile("total", author.total_posts, "Posts all time", false) +
            "</div>"
        );
    }

    function renderLeaderboard(authors) {
        return authors
            .filter(function (author) { return author.total_posts > 0; })
            .map(function (author) {
                var activeClass = author.month_posts > 0 ? " is-active" : "";
                return (
                    '<div class="spotlight-leaderboard__row' + activeClass + '">' +
                        '<a href="' + baseUrl + escapeHtml(author.link) + '" class="spotlight-leaderboard__author">' +
                            '<img src="' + baseUrl + escapeHtml(author.image) + '" alt="' + escapeHtml(author.name) + '">' +
                            "<span>" + escapeHtml(author.name) + "</span>" +
                        "</a>" +
                        '<p class="spotlight-leaderboard__metrics">' +
                            '<span class="spotlight-metric"><strong>' + author.month_posts + "</strong> this month</span>" +
                            '<span class="spotlight-metric"><strong>' + (author.featured_month || 0) + "</strong> featured this month</span>" +
                            '<span class="spotlight-metric"><strong>' + (author.total_featured || 0) + "</strong> featured all time</span>" +
                            '<span class="spotlight-metric"><strong>' + author.total_posts + "</strong> total</span>" +
                        "</p>" +
                    "</div>"
                );
            })
            .join("");
    }

    function renderPodium(month) {
        if (!month.top_authors || month.top_authors.length === 0) {
            return (
                '<section class="spotlight-section spotlight-section--empty text-center" data-spotlight-section="empty">' +
                    '<h2 class="spotlight-section__title">No spotlight yet for ' + escapeHtml(month.month_label) + "</h2>" +
                    '<p class="spotlight-page__message">Once articles are published this month, top contributors will appear here automatically.</p>' +
                "</section>"
            );
        }

        var cards = month.top_authors.map(function (author, index) {
            var rank = index + 1;
            var articles = (author.month_articles || []).map(function (article) {
                var featured = article.featured ? '<span class="spotlight-chip">Featured</span>' : "";
                return (
                    "<li>" +
                        '<a href="' + baseUrl + escapeHtml(article.url) + '">' + escapeHtml(article.title) + "</a>" +
                        featured +
                    "</li>"
                );
            }).join("");

            var articlesBlock = articles
                ? '<div class="spotlight-card__articles">' +
                    '<p class="spotlight-card__articles-label">Published in ' + escapeHtml(month.month_label) + "</p>" +
                    "<ul>" + articles + "</ul>" +
                  "</div>"
                : "";

            return (
                '<article class="spotlight-card spotlight-card--rank-' + rank + '">' +
                    '<div class="spotlight-card__rank">#' + rank + "</div>" +
                    '<a href="' + baseUrl + escapeHtml(author.link) + '" class="spotlight-card__profile">' +
                        '<img src="' + baseUrl + escapeHtml(author.image) + '" alt="' + escapeHtml(author.name) + '" class="spotlight-card__avatar">' +
                        '<h3 class="spotlight-card__name">' + escapeHtml(author.name) + "</h3>" +
                    "</a>" +
                    renderAuthorStats(author) +
                    articlesBlock +
                "</article>"
            );
        }).join("");

        return (
            '<section class="spotlight-section" data-spotlight-section="podium">' +
                '<h2 class="spotlight-section__title">Top contributors this month</h2>' +
                '<div class="spotlight-podium">' + cards + "</div>" +
            "</section>"
        );
    }

    function renderBadges(badges) {
        if (!badges || badges.length === 0) return "";

        var items = badges.map(function (badge) {
            return (
                '<a href="' + baseUrl + escapeHtml(badge.link) + '" class="spotlight-badge">' +
                    '<img src="' + baseUrl + escapeHtml(badge.image) + '" alt="' + escapeHtml(badge.author) + '" class="spotlight-badge__avatar">' +
                    '<div class="spotlight-badge__body">' +
                        '<span class="spotlight-badge__label">' + escapeHtml(badge.label) + "</span>" +
                        '<strong class="spotlight-badge__author">' + escapeHtml(badge.author) + "</strong>" +
                        '<span class="spotlight-badge__detail">' + escapeHtml(badge.detail) + "</span>" +
                    "</div>" +
                "</a>"
            );
        }).join("");

        return (
            '<section class="spotlight-section" data-spotlight-section="badges">' +
                '<h2 class="spotlight-section__title">This month&apos;s highlights</h2>' +
                '<div class="spotlight-badges">' + items + "</div>" +
            "</section>"
        );
    }

    function renderMonth(key) {
        var month = data.months[key];
        if (!month) return;

        if (monthLabel) monthLabel.textContent = month.month_label;
        if (summary) {
            var activeCount = month.active_authors ? month.active_authors.length : 0;
            summary.textContent =
                month.total_month_articles + " " + articleLabel(month.total_month_articles) +
                " published by " + activeCount + " " + authorLabel(activeCount) +
                " in " + month.month_label + ".";
        }

        if (dynamic) {
            dynamic.innerHTML =
                renderPodium(month) +
                renderBadges(month.badges) +
                '<section class="spotlight-section spotlight-section--leaderboard" data-spotlight-section="leaderboard">' +
                    '<h2 class="spotlight-section__title">Full leaderboard</h2>' +
                    '<div class="spotlight-leaderboard" id="spotlightLeaderboard">' +
                        renderLeaderboard(month.all_authors || []) +
                    "</div>" +
                "</section>";
        }

        select.value = key;

        var url = new URL(window.location.href);
        if (key === data.current_key) {
            url.searchParams.delete("month");
        } else {
            url.searchParams.set("month", key);
        }
        window.history.replaceState({}, "", url);
    }

    select.addEventListener("change", function () {
        renderMonth(select.value);
    });

    var requestedMonth = new URLSearchParams(window.location.search).get("month");
    if (requestedMonth && data.months[requestedMonth]) {
        renderMonth(requestedMonth);
    }
}
