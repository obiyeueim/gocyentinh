(function () {
  "use strict";

  window.GAMING_MOTION_MANAGED = true;

  var root = document.documentElement;
  var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var initialized = false;
  var transitionBusy = false;

  function reducedMotion() {
    return mediaQuery.matches || root.classList.contains("reduce-motion");
  }

  function cubicBezier(x1, y1, x2, y2) {
    function sampleCurveX(t) {
      return ((1 - 3 * x2 + 3 * x1) * t + (3 * x2 - 6 * x1)) * t * t + 3 * x1 * t;
    }

    function sampleCurveY(t) {
      return ((1 - 3 * y2 + 3 * y1) * t + (3 * y2 - 6 * y1)) * t * t + 3 * y1 * t;
    }

    function sampleCurveDerivativeX(t) {
      return (3 * (1 - 3 * x2 + 3 * x1) * t + 2 * (3 * x2 - 6 * x1)) * t + 3 * x1;
    }

    function solveCurveX(x) {
      var t = x;
      var i;

      for (i = 0; i < 8; i += 1) {
        var error = sampleCurveX(t) - x;
        if (Math.abs(error) < 0.000001) return t;
        var derivative = sampleCurveDerivativeX(t);
        if (Math.abs(derivative) < 0.000001) break;
        t -= error / derivative;
      }

      var lower = 0;
      var upper = 1;
      t = x;
      while (lower < upper) {
        var estimate = sampleCurveX(t);
        if (Math.abs(estimate - x) < 0.000001) return t;
        if (x > estimate) lower = t;
        else upper = t;
        t = (upper + lower) * 0.5;
        if (Math.abs(upper - lower) < 0.000001) break;
      }
      return t;
    }

    return function (progress) {
      return sampleCurveY(solveCurveX(progress));
    };
  }

  var kineticEase = cubicBezier(0.76, 0, 0.24, 1);

  function unique(nodes) {
    return nodes.filter(function (node, index) {
      return node && nodes.indexOf(node) === index;
    });
  }

  function queryAll(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function ensureOverlay() {
    var overlay = document.getElementById("gmPageTransition");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "gmPageTransition";
    overlay.className = "gm-page-transition";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML =
      '<div class="gm-transition-grid"></div>' +
      '<div class="gm-transition-core"></div>';
    document.body.prepend(overlay);
    return overlay;
  }

  function glitch(overlay) {
    overlay.classList.remove("is-glitching");
    void overlay.offsetWidth;
    overlay.classList.add("is-glitching");
    window.setTimeout(function () {
      overlay.classList.remove("is-glitching");
    }, 200);
  }

  function revealPage(gsap) {
    var overlay = ensureOverlay();
    if (reducedMotion()) {
      overlay.hidden = true;
      overlay.style.pointerEvents = "none";
      return;
    }

    overlay.hidden = false;
    overlay.style.pointerEvents = "auto";
    gsap.set(overlay, { yPercent: 0, force3D: true });
    glitch(overlay);
    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.72,
      ease: kineticEase,
      force3D: true,
      onComplete: function () {
        overlay.hidden = true;
        overlay.style.pointerEvents = "none";
        gsap.set(overlay, { yPercent: 100 });
      },
    });
  }

  function coverAndNavigate(gsap, href) {
    if (transitionBusy) return;
    transitionBusy = true;

    if (reducedMotion()) {
      window.location.assign(href);
      return;
    }

    var overlay = ensureOverlay();
    overlay.hidden = false;
    overlay.style.pointerEvents = "auto";
    gsap.set(overlay, { yPercent: 100, force3D: true });

    gsap.timeline({
      onComplete: function () {
        window.location.assign(href);
      },
    })
      .to(overlay, {
        yPercent: 0,
        duration: 0.52,
        ease: kineticEase,
        force3D: true,
      })
      .call(function () {
        glitch(overlay);
      }, null, 0.3);
  }

  function installNavigation(gsap) {
    document.addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      var link = event.target.closest("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      var rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.charAt(0) === "#" || /^(tel:|mailto:|javascript:)/i.test(rawHref)) return;

      var destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;

      event.preventDefault();
      coverAndNavigate(gsap, destination.href);
    });
  }

  function initHero(gsap) {
    var hero = unique(queryAll(
      ".reveal-hero, [data-gm-hero], .hero-copy > *, .hero-visual, .nav .brand, .nav .nav-right",
    ));

    if (!hero.length) {
      var firstSection = document.querySelector("main section");
      if (firstSection) hero = queryAll(":scope > *", firstSection).slice(0, 6);
    }

    if (!hero.length || reducedMotion()) {
      gsap.set(hero, { autoAlpha: 1, clearProps: "transform,filter,willChange" });
      return;
    }

    gsap.set(hero, {
      autoAlpha: 0,
      y: 34,
      filter: "blur(7px)",
      willChange: "opacity,transform,filter",
      force3D: true,
    });

    gsap.timeline({ delay: 0.12 })
      .to(hero, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.94,
        stagger: 0.095,
        ease: kineticEase,
        force3D: true,
        clearProps: "transform,filter,willChange",
      });
  }

  function initScrollReveal(gsap, ScrollTrigger) {
    var revealNodes = unique(queryAll(
      ".reveal, [data-gm-reveal], main article, main .surface-card, main .section-head",
    )).filter(function (node) {
      return !node.classList.contains("reveal-hero");
    });

    if (!revealNodes.length || reducedMotion()) {
      gsap.set(revealNodes, { autoAlpha: 1, clearProps: "transform,filter,willChange" });
      return;
    }

    gsap.set(revealNodes, {
      autoAlpha: 0,
      y: 38,
      filter: "blur(5px)",
      willChange: "opacity,transform,filter",
      force3D: true,
    });

    ScrollTrigger.batch(revealNodes, {
      start: "top 90%",
      once: true,
      interval: 0.09,
      batchMax: 5,
      onEnter: function (batch) {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.86,
          stagger: 0.085,
          ease: kineticEase,
          force3D: true,
          overwrite: "auto",
          clearProps: "transform,filter,willChange",
        });
      },
    });
  }

  function initInteractive(gsap) {
    var interactive = unique(queryAll(
      ".btn, .button-primary, .button-secondary, .card, .res, .principle, .surface-card, [data-gm-interactive]",
    ));

    interactive.forEach(function (element) {
      element.classList.add("gm-interactive");
    });

    if (reducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    queryAll(".card, .res, .principle, .surface-card, [data-gm-tilt]").forEach(function (element) {
      element.addEventListener("pointermove", function (event) {
        var rect = element.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.willChange = "transform";
        gsap.to(element, {
          "--gm-tilt-x": String(y * -4.5) + "deg",
          "--gm-tilt-y": String(x * 5.5) + "deg",
          duration: 0.34,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      element.addEventListener("pointerleave", function () {
        gsap.to(element, {
          "--gm-tilt-x": "0deg",
          "--gm-tilt-y": "0deg",
          duration: 0.48,
          ease: kineticEase,
          overwrite: "auto",
          onComplete: function () {
            element.style.willChange = "";
          },
        });
      });
    });
  }

  function initParallax(gsap) {
    if (reducedMotion() || !window.ScrollTrigger) return;

    unique(queryAll("[data-gm-parallax], .media, .card, .res, .principle, .sign-aside")).forEach(function (element, index) {
      element.classList.add("gm-parallax");
      if (!element.classList.contains("gm-interactive")) element.classList.add("gm-interactive");

      var distance = 10 + (index % 3) * 3;
      gsap.fromTo(element,
        { "--gm-parallax-y": String(distance) + "px" },
        {
          "--gm-parallax-y": String(-distance) + "px",
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
          },
        },
      );
    });
  }

  function initMotion(gsap, ScrollTrigger) {
    if (initialized) return;
    initialized = true;
    root.classList.add("gm-motion-ready");

    gsap.config({ force3D: true, nullTargetWarn: false });
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    revealPage(gsap);
    initHero(gsap);
    if (ScrollTrigger) initScrollReveal(gsap, ScrollTrigger);
    initInteractive(gsap);
    initParallax(gsap);
    installNavigation(gsap);

    if (document.fonts && document.fonts.ready && ScrollTrigger) {
      document.fonts.ready.then(function () {
        ScrollTrigger.refresh();
      });
    }

    window.addEventListener("pageshow", function (event) {
      if (event.persisted) {
        transitionBusy = false;
        revealPage(gsap);
      }
    });
  }

  function fallback() {
    var overlay = ensureOverlay();
    overlay.hidden = true;
    queryAll(".reveal, .reveal-hero, [data-gm-reveal], [data-gm-hero]").forEach(function (element) {
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.transform = "none";
      element.style.filter = "none";
    });
  }

  function waitForGsap(attempt) {
    if (window.gsap) {
      initMotion(window.gsap, window.ScrollTrigger || null);
      return;
    }
    if (attempt > 180) {
      fallback();
      return;
    }
    window.requestAnimationFrame(function () {
      waitForGsap(attempt + 1);
    });
  }

  waitForGsap(0);
})();
