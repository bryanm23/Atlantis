(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  const year = document.querySelector("[data-year]");

  if (year) year.textContent = String(new Date().getFullYear());

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  };

  const openMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "true");
    menu.classList.add("is-open");
  };

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else openMenu();
    });

    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.tagName.toLowerCase() === "a") closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (!header) return;
      if (!header.contains(target)) closeMenu();
    });
  }

  // Demo-only form handler: shows a success message without a backend.
  window.ATG = {
    handleContactSubmit(event) {
      event.preventDefault();
      const form = event.currentTarget;
      if (!(form instanceof HTMLFormElement)) return false;

      const btn = form.querySelector('button[type="submit"]');
      if (btn instanceof HTMLButtonElement) {
        btn.disabled = true;
        btn.textContent = "Sent — we’ll reply shortly";
      }

      const note = document.createElement("div");
      note.setAttribute("role", "status");
      note.style.marginTop = "10px";
      note.style.padding = "12px";
      note.style.borderRadius = "16px";
      note.style.border = "1px solid rgba(255,255,255,0.14)";
      note.style.background = "rgba(0,0,0,0.18)";
      note.style.color = "rgba(255,255,255,0.88)";
      note.style.fontWeight = "700";
      note.textContent =
        "Thanks — message received. For production, we can connect this form to your CRM or email provider.";

      form.appendChild(note);
      return false;
    },
  };
})();


