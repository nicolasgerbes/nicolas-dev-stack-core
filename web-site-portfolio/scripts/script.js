/*navbar e menu mobile*/

function initNavbar() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-link");

  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const line3 = document.getElementById("line3");

  const navbar = document.getElementById("navbar");

  if (!btn || !menu || !line1 || !line2 || !line3 || !navbar) {
    console.warn("Navbar: algum elemento não foi encontrado.");
    return;
  }

  function openMenu() {
    menu.classList.remove(
      "-translate-y-full",
      "opacity-0",
      "pointer-events-none"
    );

    menu.classList.add(
      "translate-y-0",
      "opacity-100",
      "pointer-events-auto"
    );

    line1.style.transform = "translateY(8px) rotate(45deg)";
    line2.style.opacity = "0";
    line3.style.transform = "translateY(-8px) rotate(-45deg)";

    document.body.style.overflow = "hidden";

    navbar.classList.remove("-translate-y-full");
  }

  function closeMenu() {
    menu.classList.add(
      "-translate-y-full",
      "opacity-0",
      "pointer-events-none"
    );

    menu.classList.remove(
      "translate-y-0",
      "opacity-100",
      "pointer-events-auto"
    );

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

  btn.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* NAVBAR AUTO-HIDE */

  let lastScroll = window.scrollY;

  window.addEventListener("scroll", () => {
    const menuIsOpen = menu.classList.contains("translate-y-0");

    if (menuIsOpen) {
      navbar.classList.remove("-translate-y-full");
      return;
    }

    const currentScroll = window.scrollY;

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
}


/* =========================
   BAIXAR CURRÍCULO
========================= */

function initCurriculumButton() {
  const botaoCurriculo = document.getElementById("btn-curriculo");

  if (!botaoCurriculo) {
    return;
  }

  botaoCurriculo.addEventListener("click", () => {
    const link = document.createElement("a");

    link.href = "./assets/CurriculoNícolasGerbes.pdf";
    link.download = "CurriculoNícolasGerbes.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}


/* =========================
   MODAL DOS PROJETOS
========================= */

/* =========================
   MODAL DOS PROJETOS
========================= */

function initProjectModal() {
  const projectCards = document.querySelectorAll(".project-card");

  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  const closeModalBtn = document.getElementById("close-modal");

  const modalProjectImage = document.getElementById("modal-project-image");
  const modalProjectTitle = document.getElementById("modal-project-title");
  const modalProjectStatus = document.getElementById("modal-project-status");
  const modalProjectDescription1 = document.getElementById("modal-project-description1");
  const modalProjectDescription2 = document.getElementById("modal-project-description2");
  const modalProjectFeatures = document.getElementById("modal-project-features");

  const modalProjectLink = document.getElementById("modal-project-link");
  const modalRepoLink = document.getElementById("modal-repo-link");
  const modalLinkedinLink = document.getElementById("modal-linkedin-link");

  const modalElementsExist =
    modal &&
    modalContent &&
    closeModalBtn &&
    modalProjectImage &&
    modalProjectTitle &&
    modalProjectDescription1 &&
    modalProjectDescription2 &&
    modalProjectFeatures &&
    modalProjectLink &&
    modalRepoLink &&
    modalLinkedinLink;

  if (!modalElementsExist || projectCards.length === 0) {
    return;
  }

  modalProjectLink.dataset.originalText = "Acessar projeto";
  modalRepoLink.dataset.originalText = "Acessar repositório";
  modalLinkedinLink.dataset.originalText = "Ver post no LinkedIn";

  function setupModalLink(element, url, disabledText, isProduction) {
    element.classList.remove(
      "opacity-50",
      "opacity-60",
      "cursor-not-allowed",
      "pointer-events-none",
      "bg-gray-600",
      "hover:bg-gray-600"
    );

    element.classList.add("bg-blue-600", "hover:bg-blue-700");
    element.setAttribute("target", "_blank");

    if (isProduction || !url || url === "#") {
      element.removeAttribute("href");
      element.removeAttribute("target");
      element.textContent = disabledText;

      element.classList.remove("bg-blue-600", "hover:bg-blue-700");
      element.classList.add(
        "bg-gray-600",
        "hover:bg-gray-600",
        "opacity-60",
        "cursor-not-allowed",
        "pointer-events-none"
      );

      return;
    }

    element.href = url;
    element.textContent = element.dataset.originalText;
  }

  function openModal(card) {
    const title = card.dataset.title || "";
    const image = card.dataset.image || "";
    const description1 = card.dataset.description1 || "";
    const description2 = card.dataset.description2 || "";
    const status = card.dataset.status || "";
    const isProduction = status === "production";

    const features = card.dataset.features
      ? card.dataset.features.split("|")
      : [];

    const projectLink = card.dataset.projectLink || "#";
    const repoLink = card.dataset.repoLink || "#";
    const linkedinLink = card.dataset.linkedinLink || "#";

    modalProjectImage.src = image;
    modalProjectImage.alt = `Preview do projeto ${title}`;

    modalProjectTitle.textContent = title;
    modalProjectDescription1.textContent = description1;
    modalProjectDescription2.textContent = description2;

    if (modalProjectStatus) {
      if (isProduction) {
        modalProjectStatus.textContent = "Em produção";
        modalProjectStatus.classList.remove("hidden");
      } else {
        modalProjectStatus.classList.add("hidden");
      }
    }

    modalProjectFeatures.innerHTML = "";

    features.forEach((feature) => {
      const li = document.createElement("li");
      li.textContent = `• ${feature}`;
      modalProjectFeatures.appendChild(li);
    });

    setupModalLink(
      modalProjectLink,
      projectLink,
      "Projeto em produção",
      isProduction
    );

    setupModalLink(
      modalRepoLink,
      repoLink,
      "Repositório em produção",
      isProduction
    );

    setupModalLink(
      modalLinkedinLink,
      linkedinLink,
      "Post em produção",
      isProduction
    );

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

  function closeModal() {
    modal.classList.remove("opacity-100");
    modal.classList.add("opacity-0");

    modalContent.classList.remove("scale-100", "translate-y-0");
    modalContent.classList.add("scale-95", "translate-y-6");

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "";
    }, 300);
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  closeModalBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}


/* =========================
   SWIPER DOS DEPOIMENTOS
========================= */

function initTestimonialsSwiper() {
  const testimonialsSwiper = document.querySelector(".testimonials-swiper");

  if (!testimonialsSwiper) {
    console.warn("Swiper: seção de depoimentos não encontrada.");
    return;
  }

  if (typeof Swiper === "undefined") {
    console.warn("Swiper: biblioteca não foi carregada.");
    return;
  }

  new Swiper(testimonialsSwiper, {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,

    navigation: {
      nextEl: ".testimonials-next",
      prevEl: ".testimonials-prev",
    },

    pagination: {
      el: ".testimonials-pagination",
      clickable: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },

      1024: {
        slidesPerView: 3,
      },
    },
  });
}


/* =========================
   INÍCIO DA APLICAÇÃO
========================= */

async function startApp() {
  await loadComponents();

  initNavbar();
  initCurriculumButton();
  initProjectModal();
  initTestimonialsSwiper();
}

startApp().catch((error) => {
  console.error("Erro ao iniciar a aplicação:", error);
});