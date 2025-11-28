// Smooth scroll
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

// Formspree handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Envoi en cours...";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        statusEl.textContent = "Message envoyé avec succès.";
        statusEl.classList.add("success");
        form.reset();
      } else {
        statusEl.textContent = "Erreur lors de l'envoi.";
        statusEl.classList.add("error");
      }

    } catch (error) {
      statusEl.textContent = "Impossible d'envoyer le message.";
      statusEl.classList.add("error");
    }
  });

  // Année dynamique
  document.getElementById("year").textContent = new Date().getFullYear();
});
