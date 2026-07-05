document.addEventListener("DOMContentLoaded", function () {
    initTeamTooltips();
    initStickyNav();
    initReadingProgress();
    initBackToTop();
    initCopyLink();
    initSmoothScroll();
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
