/* ============================================================
   Meridian & Co. — behaviour
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- header state + scroll progress ---------- */
  var header = document.getElementById("siteHeader");
  var progressBar = document.getElementById("scrollProgress");
  var scrollMax = 0;
  var ticking = false;

  function measureScroll() {
    scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  }

  function syncScroll() {
    header.classList.toggle("is-stuck", window.scrollY > 40);
    if (progressBar) {
      var ratio = scrollMax > 0 ? Math.min(window.scrollY / scrollMax, 1) : 0;
      progressBar.style.transform = "scaleX(" + ratio + ")";
    }
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(syncScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", measureScroll, { passive: true });
  measureScroll();
  syncScroll();

  /* ---------- mobile navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  function setNav(open) {
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  }

  navToggle.addEventListener("click", function () {
    setNav(navToggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setNav(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setNav(false);
      navToggle.focus();
    }
  });

  /* ---------- scroll reveal ---------- */
  var revealables = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("is-in");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );
    revealables.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- boarding pass: tabs + search ---------- */
  var passForm = document.getElementById("passForm");
  var passStatus = document.getElementById("passStatus");
  var regionSelect = document.getElementById("region");
  var passTabs = passForm.querySelectorAll(".pass-tab");
  var bookingKind = "journey";

  passTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      passTabs.forEach(function (other) {
        var active = other === tab;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-selected", String(active));
      });
      bookingKind = tab.dataset.kind;
    });
  });

  /* ---------- destination filtering ---------- */
  var grid = document.getElementById("destGrid");
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".dest-card"));
  var chips = document.querySelectorAll(".chip");
  var emptyState = document.getElementById("emptyState");
  var activeRegion = "all";

  var REGION_NAMES = {
    all: "every region",
    europe: "Europe",
    asia: "Asia",
    americas: "the Americas",
    africa: "Africa & the Middle East"
  };

  var KIND_LABELS = { journey: "journeys", stay: "stays", guide: "local guides" };

  function applyFilter(region, announce) {
    activeRegion = region;
    var shown = 0;

    cards.forEach(function (card) {
      var match = region === "all" || card.dataset.region === region;
      card.classList.toggle("is-hidden", !match);
      if (match) shown += 1;
    });

    chips.forEach(function (chip) {
      chip.classList.toggle("is-active", chip.dataset.filter === region);
    });

    emptyState.hidden = shown !== 0;
    measureScroll(); /* the grid just changed height */

    if (announce) {
      var season = document.getElementById("season").value;
      passStatus.textContent =
        "Showing " +
        shown +
        " " +
        (shown === 1 ? KIND_LABELS[bookingKind].replace(/s$/, "") : KIND_LABELS[bookingKind]) +
        " in " +
        REGION_NAMES[region] +
        " · " +
        season;
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      applyFilter(chip.dataset.filter, false);
      passStatus.textContent =
        activeRegion === "all"
          ? "Showing every destination."
          : "Showing " + REGION_NAMES[activeRegion] + " only.";
    });
  });

  emptyState.querySelector("[data-reset]").addEventListener("click", function () {
    applyFilter("all", false);
    passStatus.textContent = "Showing every destination.";
  });

  passForm.addEventListener("submit", function (event) {
    event.preventDefault();
    applyFilter(regionSelect.value, true);
    document.getElementById("destinations").scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });
  });

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");

  function runCounter(el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || "";

    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1400;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- trip brief form ---------- */
  var planForm = document.getElementById("planForm");
  var formStatus = document.getElementById("formStatus");

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  planForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = planForm.elements.name;
    var email = planForm.elements.email;
    var idea = planForm.elements.idea;
    var problems = [];

    [name, email, idea].forEach(function (field) {
      field.classList.remove("is-error");
    });

    if (!name.value.trim()) {
      problems.push(name);
    }
    if (!validEmail(email.value.trim())) {
      problems.push(email);
    }
    if (idea.value.trim().length < 10) {
      problems.push(idea);
    }

    if (problems.length) {
      problems.forEach(function (field) {
        field.classList.add("is-error");
      });
      formStatus.classList.add("is-error");
      formStatus.textContent =
        problems.length === 1
          ? "Check the highlighted field and send again."
          : "Check the " + problems.length + " highlighted fields and send again.";
      problems[0].focus();
      return;
    }

    formStatus.classList.remove("is-error");
    formStatus.textContent = "Sending…";

    window.setTimeout(function () {
      formStatus.textContent =
        "Thanks, " + name.value.trim().split(" ")[0] +
        " — a planner will write to " + email.value.trim() + " within one working day.";
      planForm.reset();
    }, 700);
  });

  /* ---------- cursor-tracked highlight on glass cards ---------- */
  var spotlightCards = document.querySelectorAll(".dest-card, .journey, .voice");

  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    spotlightCards.forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var box = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((event.clientX - box.left) / box.width) * 100 + "%");
        card.style.setProperty("--my", ((event.clientY - box.top) / box.height) * 100 + "%");
      });
    });
  }

  /* ---------- footer year ---------- */
  document.getElementById("year").textContent = String(new Date().getFullYear());
})();
