/* ============================================================
   Meridian & Co. — behaviour
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- header state + the route spine ---------- */
  var header = document.getElementById("siteHeader");
  var routeLine = document.getElementById("routeDrawn");
  var railNode = document.getElementById("railNode");
  var railReadout = document.getElementById("railReadout");
  var scrollMax = 0;
  var ticking = false;

  /* short, legible labels for the fixed rail readout */
  var RAIL_LEGS = {
    top:          ["ORIGIN", "MERIDIAN & CO."],
    destinations: ["WAYPOINT 02", "WHERE WE GO"],
    journeys:     ["WAYPOINT 03", "DEPARTING SOON"],
    process:      ["WAYPOINT 04", "HOW IT WORKS"],
    when:         ["WAYPOINT 05", "TIMING"],
    voices:       ["WAYPOINT 06", "TRAVELLERS"],
    planners:     ["WAYPOINT 07", "THE STUDIO"],
    practical:    ["WAYPOINT 08", "PRACTICALITIES"],
    notes:        ["WAYPOINT 09", "FIELD NOTES"],
    faq:          ["WAYPOINT 10", "QUESTIONS"],
    plan:         ["TERMINUS", "TRIP BRIEF"]
  };

  var railSections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  var activeLeg = null;

  function measureScroll() {
    scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  }

  function syncRail(ratio) {
    /* the route always shows a seed of itself at the top, so the spine reads as
       drawn from the first viewport rather than appearing only once you scroll */
    if (routeLine) routeLine.style.setProperty("--drawn", (0.05 + ratio * 0.95).toFixed(4));
    if (railNode) railNode.style.top = (ratio * 100).toFixed(3) + "%";

    var probe = window.scrollY + window.innerHeight * 0.38;
    var currentId = "top";

    railSections.forEach(function (section) {
      var top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= probe) currentId = section.id;
    });

    if (currentId === activeLeg) return;
    activeLeg = currentId;

    var leg = RAIL_LEGS[currentId];
    if (leg && railReadout) {
      railReadout.innerHTML = "ROUTE · <b>" + leg[0] + "</b> · " + leg[1];
    }
  }

  function syncScroll() {
    header.classList.toggle("is-stuck", window.scrollY > 40);
    var ratio = scrollMax > 0 ? Math.min(window.scrollY / scrollMax, 1) : 0;
    syncRail(ratio);
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

    /* safety net: nothing on screen may be left invisible if the observer
       is unavailable or throws, whatever it does below the fold */
    window.setTimeout(function () {
      revealables.forEach(function (el) {
        var box = el.getBoundingClientRect();
        var onScreen = box.top < window.innerHeight && box.bottom > 0;
        if (onScreen) el.classList.add("is-in");
      });
    }, 1200);
  }

  /* ---------- route ticker: duplicate the group for a seamless loop ---------- */
  var tickerGroup = document.querySelector(".ticker-group");
  var ticker = document.querySelector(".ticker");

  if (tickerGroup && !reduceMotion) {
    var clone = tickerGroup.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    tickerGroup.parentNode.appendChild(clone);

    /* it only moves while someone is actually looking at it */
    if (ticker && "IntersectionObserver" in window) {
      var tickerObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            ticker.classList.toggle("is-paused", !entry.isIntersecting);
          });
        },
        { threshold: 0 }
      );
      tickerObserver.observe(ticker);
    }
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
  var spotlightCards = document.querySelectorAll(".dest-card, .journey, .voice, .planner, .note-card");

  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    spotlightCards.forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var box = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((event.clientX - box.left) / box.width) * 100 + "%");
        card.style.setProperty("--my", ((event.clientY - box.top) / box.height) * 100 + "%");
      });
    });
  }

  /* ---------- when to go: month rail ---------- */
  var WHEN = {
    europe: {
      prime: [5, 6, 9],
      shoulder: [4, 7, 10],
      note: "May, June and September carry the same light as July with half the crowd. August is the one month we would steer you around, unless you are booked for a specific coast."
    },
    asia: {
      prime: [3, 11],
      shoulder: [2, 4, 10, 12],
      note: "March for blossom and November for dry, clear air. Skip Golden Week in early May and the rainy weeks from mid-June. The Indian Ocean runs later than you would think."
    },
    americas: {
      prime: [1, 2, 3, 11],
      shoulder: [4, 9, 10, 12],
      note: "Patagonia and the high Andes want the southern summer. Banff and the Rockies flip it — July to September, when the high passes finally open."
    },
    africa: {
      prime: [2, 3, 10, 11],
      shoulder: [4, 9, 12],
      note: "Cool, dry months for the desert and the Atlas passes. July and August belong to the coast and the islands, not the interior."
    }
  };

  var WHEN_LABELS = { prime: "Prime", shoulder: "Shoulder", off: "Off-season" };
  var monthRail = document.getElementById("monthRail");
  var whenSummary = document.getElementById("whenSummary");
  var whenChips = document.querySelectorAll("[data-when]");

  function paintMonths(region) {
    var data = WHEN[region];
    if (!data || !monthRail) return;

    monthRail.querySelectorAll(".month").forEach(function (month) {
      var index = parseInt(month.dataset.month, 10);
      var state =
        data.prime.indexOf(index) > -1
          ? "prime"
          : data.shoulder.indexOf(index) > -1
            ? "shoulder"
            : "off";

      month.classList.remove("is-prime", "is-shoulder", "is-off");
      month.classList.add("is-" + state);

      var badge = month.querySelector(".month-badge");
      if (badge) badge.textContent = WHEN_LABELS[state];
    });

    if (whenSummary) whenSummary.textContent = data.note;

    whenChips.forEach(function (chip) {
      chip.classList.toggle("is-active", chip.dataset.when === region);
    });
  }

  whenChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      paintMonths(chip.dataset.when);
    });
  });

  if (monthRail) paintMonths("europe");

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    var button = item.querySelector(".faq-q");
    if (!button) return;

    button.addEventListener("click", function () {
      var wasOpen = button.getAttribute("aria-expanded") === "true";

      /* one open at a time keeps a long list scannable */
      faqItems.forEach(function (other) {
        var otherButton = other.querySelector(".faq-q");
        if (!otherButton) return;
        var open = other === item && !wasOpen;
        other.classList.toggle("is-open", open);
        otherButton.setAttribute("aria-expanded", String(open));
      });
    });
  });

  /* ---------- dispatch signup ---------- */
  var dispatchForm = document.getElementById("dispatchForm");

  if (dispatchForm) {
    var dispatchEmail = document.getElementById("dispatchEmail");
    var dispatchStatus = document.getElementById("dispatchStatus");

    dispatchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      dispatchEmail.classList.remove("is-error");

      if (!validEmail(dispatchEmail.value.trim())) {
        dispatchEmail.classList.add("is-error");
        dispatchStatus.classList.add("is-error");
        dispatchStatus.textContent = "That address does not look complete — try again?";
        dispatchEmail.focus();
        return;
      }

      dispatchStatus.classList.remove("is-error");
      dispatchStatus.textContent = "You're on the list. The next dispatch goes out at the start of the month.";
      dispatchForm.reset();
    });
  }

  /* ---------- footer year ---------- */
  document.getElementById("year").textContent = String(new Date().getFullYear());
})();
