const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
const links = document.querySelectorAll(".mobile-link");

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");

const navbar = document.getElementById("navbar");

/*MENU MOBILE*/

function openMenu() {
  menu.classList.remove("translate-y-[-100%]", "opacity-0", "pointer-events-none");
  menu.classList.add("translate-y-0", "opacity-100", "pointer-events-auto");

  line1.style.transform = "translateY(8px) rotate(45deg)";
  line2.style.opacity = "0";
  line3.style.transform = "translateY(-8px) rotate(-45deg)";

  document.body.style.overflow = "hidden";

  if (navbar) {
    navbar.classList.remove("-translate-y-full");
  }
}

function closeMenu() {
  menu.classList.add("translate-y-[-100%]", "opacity-0", "pointer-events-none");
  menu.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");

  line1.style.transform = "";
  line2.style.opacity = "";
  line3.style.transform = "";

  document.body.style.overflow = "";
}

function toggleMenu() {
  const isOpen = menu.classList.contains("translate-y-0");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (btn && menu) {
  btn.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/*NAVBAR AUTO-HIDE*/

let lastScroll = 0;

window.addEventListener("scroll", () => {
  if (!navbar) return;

  const menuIsOpen = menu && menu.classList.contains("translate-y-0");

  if (menuIsOpen) {
    navbar.classList.remove("-translate-y-full");
    return;
  }

  const currentScroll = window.pageYOffset;

  if (currentScroll <= 10) {
    navbar.classList.remove("-translate-y-full");
    lastScroll = currentScroll;
    return;
  }

  if (currentScroll > lastScroll) {
    navbar.classList.add("-translate-y-full");
  } else {
    navbar.classList.remove("-translate-y-full");
  }

  lastScroll = currentScroll;
});

/*BAIXAR CURRÍCULO*/

const botaoCurriculo = document.getElementById("btn-curriculo");

if (botaoCurriculo) {
  botaoCurriculo.addEventListener("click", baixarCurriculo);
}

function baixarCurriculo() {
  const link = document.createElement("a");
  link.href = "./assets/Curriculo_NicolasGerbes.pdf";
  link.download = "Curriculo-NicolasGerbes.pdf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/*MODAL DOS PROJETOS*/

const projectCards = document.querySelectorAll(".project-card");
const modal = document.getElementById("project-modal");
const modalContent = document.getElementById("modal-content");
const closeModalBtn = document.getElementById("close-modal");

const modalProjectImage = document.getElementById("modal-project-image");
const modalProjectTitle = document.getElementById("modal-project-title");
const modalProjectDescription1 = document.getElementById("modal-project-description1");
const modalProjectDescription2 = document.getElementById("modal-project-description2");
const modalProjectFeatures = document.getElementById("modal-project-features");

const modalProjectLink = document.getElementById("modal-project-link");
const modalRepoLink = document.getElementById("modal-repo-link");
const modalLinkedinLink = document.getElementById("modal-linkedin-link");

function openModal(card) {
  if (!modal || !modalContent) return;

  const title = card.dataset.title;
  const image = card.dataset.image;
  const description1 = card.dataset.description1;
  const description2 = card.dataset.description2;
  const features = card.dataset.features ? card.dataset.features.split("|") : [];
  const projectLink = card.dataset.projectLink;
  const repoLink = card.dataset.repoLink;
  const linkedinLink = card.dataset.linkedinLink;

  modalProjectImage.src = image;
  modalProjectImage.alt = `Preview do projeto ${title}`;

  modalProjectTitle.textContent = title;
  modalProjectDescription1.textContent = description1;
  modalProjectDescription2.textContent = description2;

  modalProjectLink.href = projectLink;
  modalRepoLink.href = repoLink;
  modalLinkedinLink.href = linkedinLink;

  modalProjectFeatures.innerHTML = "";

  features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = `• ${feature}`;
    modalProjectFeatures.appendChild(li);
  });

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  requestAnimationFrame(() => {
    modal.classList.remove("opacity-0");
    modal.classList.add("opacity-100");

    modalContent.classList.remove("scale-95", "translate-y-6");
    modalContent.classList.add("scale-100", "translate-y-0");
  });

  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  if (!modal || !modalContent) return;

  modal.classList.remove("opacity-100");
  modal.classList.add("opacity-0");

  modalContent.classList.remove("scale-100", "translate-y-0");
  modalContent.classList.add("scale-95", "translate-y-6");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");

    if (!document.body.classList.contains("menu-open")) {
      document.body.style.overflow = "";
    }
  }, 300);
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeProjectModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });
}