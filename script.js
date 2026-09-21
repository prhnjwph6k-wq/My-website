/* Antoine Mercier — Paid Media Manager · interactions */
(function () {
  "use strict";

  /* ---- Header scroll state ---- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---- Footer year ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Reveal on scroll ---- */
  var revealTargets = [
    ".hero-stats > div",
    ".trust-logos li",
    ".card",
    ".process li",
    ".case",
    ".testimonial",
    ".apropos-points li",
    ".aside-card",
    ".expertise-badges span",
    ".contact-direct li",
    ".contact-form"
  ];
  var els = [];
  revealTargets.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add("reveal");
      els.push(el);
    });
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }

/* ---- Contact form: client-side validation + envoi via FormSubmit ---- */
var form = document.getElementById("devis-form");
var status = document.getElementById("form-status");
var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var ENDPOINT = "https://formsubmit.co/ajax/mercierantoine7@gmail.com";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  status.className = "form-status";
  status.textContent = "";

  var nom = form.nom.value.trim();
  var email = form.email.value.trim();
  var message = form.message.value.trim();

  if (!nom || !email || !message) {
    status.classList.add("err");
    status.textContent = "Merci de renseigner votre nom, votre email et votre message.";
    return;
  }
  if (!emailRe.test(email)) {
    status.classList.add("err");
    status.textContent = "Votre adresse email semble invalide.";
    return;
  }
  if (form._honey && form._honey.value) {
    form.reset();
    return;
  }

  var btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Envoi en cours…";

  var payload = {
    _subject: "Nouvelle demande depuis votre site — " + nom,
    _template: "table",
    _captcha: "false",
    _replyto: email,
    "Nom complet": nom,
    "Email": email,
    "Entreprise": form.entreprise.value.trim(),
    "Téléphone": form.telephone.value.trim(),
    "Budget ads mensuel": form.budget.value,
    "Prestations envisagées": form.services.value,
    "Projet": message
  };

  window.fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function () {
      status.classList.add("ok");
      status.textContent = "Merci " + nom + " ! Votre demande a bien été envoyée. Je vous réponds sous 24h ouvrées.";
      form.reset();
    })
    .catch(function () {
      status.classList.add("err");
      status.textContent = "Une erreur est survenue lors de l'envoi. Vous pouvez me contacter directement à mercierantoine7@gmail.com.";
    })
    .then(function () {
      btn.disabled = false;
      btn.textContent = "Envoyer ma demande";
    });
});
