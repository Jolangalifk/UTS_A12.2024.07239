// === Dark Mode Toggle ===
const darkModeToggles = document.querySelectorAll("#darkModeToggle");
const body = document.body;

// Cek preferensi dark mode tersimpan
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  darkModeToggles.forEach((toggle) => toggle.classList.add("active"));
}

// Tambahkan event ke semua toggle
darkModeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    darkModeToggles.forEach((btn) => btn.classList.toggle("active"));

    // Simpan preferensi
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
});


// === Navigation ===
const navItems = document.querySelectorAll(".nav-item");
const navRail = document.querySelector(".nav-rail");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
const nav = document.querySelector(".nav-items");

let currentActiveIndex = 0;
let isHovering = false;

function updateNavPosition(index, setActive = false) {
  if (navRail) {
    navRail.style.setProperty("--index", index + 1);
  }

  if (setActive) {
    currentActiveIndex = index;
    navItems.forEach((item) => item.classList.remove("dot"));
    if (navItems[index]) navItems[index].classList.add("dot");
  }
}

// Desktop Navigation - Hover & Click
navItems.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    isHovering = true;
    updateNavPosition(index, false);
  });

  item.addEventListener("click", (e) => {
    const href = item.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      updateNavPosition(index, true);
      isHovering = false;

      const targetSection = document.querySelector(href);
      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }
  });
});

if (nav) {
  nav.addEventListener("mouseleave", () => {
    isHovering = false;
    updateNavPosition(currentActiveIndex, false);
  });
}

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });
}

mobileNavItems.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    if (hamburger) hamburger.classList.remove("active");
    if (mobileMenu) mobileMenu.classList.remove("active");

    if (index < navItems.length) {
      updateNavPosition(index, true);
    }

    const targetId = item.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }
  });
});

const sections = document.querySelectorAll("section[id]");
let scrollTimeout;

window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (isHovering) return;

    const scrollPosition = window.scrollY + 200;
    sections.forEach((section, index) => {
      if (index >= navItems.length) return;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        if (currentActiveIndex !== index) updateNavPosition(index, true);
      }
    });
  }, 50);
});

updateNavPosition(0, true);


// === Project Section ===
const projects = [
  {
    id: 1,
    title: "Website BTNG",
    desc: "BTNG (Basic Training for Next Generation)...",
    image: "/assets/btng/btng1.png",
    tech: ["React.ts", "Vite", "Tailwind"],
    images: ["/assets/btng/btng1.png", "/assets/btng/btng2.png"],
    date: "October 2025",
    role: "Front End Developer",
    team: "Team Project",
    duration: "2 Weeks",
    status: "Live & Active",
  },
  {
    id: 2,
    title: "Website Zezkun",
    desc: "Zezkun adalah platform online...",
    image: "/assets/zezkun/zezkun1.png",
    tech: ["Vue.js", "Vite", "Tailwind"],
    images: ["/assets/zezkun/zezkun1.png", "/assets/zezkun/zezkun2.png"],
    date: "April 2023",
    role: "Frontend Developer & Designer",
    team: "Team Project",
    duration: "3 Weeks",
    status: "Non Active",
  },
  {
    id: 3,
    title: "Creativ Labz",
    desc: "Creativlabz adalah platform resmi milik PT Kreatif Vapelab Indonesia...",
    image: "/assets/creativlabz/cl1.png",
    tech: ["Vue.js", "Vite", "Tailwind"],
    images: ["/assets/creativlabz/cl1.png", "/assets/creativlabz/cl2.png"],
    date: "February 2024",
    role: "Frontend Developer",
    team: "Team Project",
    duration: "1 Month",
    status: "Non Active",
  },
];

localStorage.setItem("projectsData", JSON.stringify(projects));

const grid = document.getElementById("project-grid");
const seeMoreBtn = document.getElementById("see-more-btn");
const btnText = document.getElementById("btn-text");

let visibleCount = 3;

function createProjectCard(project, index) {
  return `
    <div class="project-card border shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn" style="animation-delay: ${
      index * 0.1
    }s">
      <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover" />
      <div class="project-content p-6">
        <h2 class="text-xl font-semibold mb-3">${project.title}</h2>
        <p class="project-desc text-sm leading-relaxed mb-4" style="color: var(--text-secondary)">${project.desc}</p>
        <div class="flex flex-wrap gap-2 mb-6">
          ${project.tech
            .map(
              (tech) =>
                `<span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-300">${tech}</span>`
            )
            .join("")}
        </div>
        <a href="project-detail.html?id=${project.id}" class="group relative inline-flex items-center gap-2 font-medium transition-all duration-300 hover:gap-4">
          <span class="relative">
            Lihat Project
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF0000] transition-all duration-300 group-hover:w-full"></span>
          </span>
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </div>
  `;
}

function renderProjects() {
  const visibleProjects = projects.slice(0, visibleCount);
  grid.innerHTML = visibleProjects
    .map((project, index) => createProjectCard(project, index))
    .join("");
  btnText.textContent =
    visibleCount >= projects.length ? "Lebih Sedikit" : "Lebih Banyak";
}

seeMoreBtn.addEventListener("click", () => {
  visibleCount = visibleCount >= projects.length ? 3 : projects.length;
  renderProjects();

  if (visibleCount === 3) {
    const projectSection = document.getElementById("project");
    const headerHeight = document.querySelector("header").offsetHeight;
    const targetPosition = projectSection.offsetTop - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  }
});

renderProjects();


// === Certificates ===
const certificates = [
  {
    title: "Sertifikat Intern Front End Web Developer",
    issuer: "CAN Creative",
    date: "2023 - 2024",
    image: "/assets/certificate/MagangCANCreative.jpg",
    description:
      "Pelatihan mendalam tentang Vue.js, mencakup arsitektur berbasis komponen dan Composition API.",
  },
  {
    title: "Sertifikat Peserta BTNG Divisi Web",
    issuer: "DNCC",
    date: "2024",
    image: "/assets/certificate/BTNG-DNCC.jpg",
    description:
      "Kegiatan BTNG Divisi Web untuk mengembangkan keterampilan Front-End Developer.",
  },
];

const certGrid = document.getElementById("certificate-grid");
const certModal = document.getElementById("certModal");
const closeCertModal = document.getElementById("closeCertModal");
const backCertModal = document.getElementById("backCertModal");

function createCertificateCard(cert, index) {
  return `
    <div class="certificate-card border shadow-sm hover:shadow-xl transition-all duration-300 animate-fadeIn" style="animation-delay: ${
      index * 0.1
    }s; background: var(--bg-primary); border-color: var(--border-color)">
      <img src="${cert.image}" alt="${cert.title}" class="w-full h-48 object-cover" />
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-2">${cert.title}</h2>
        <p class="text-sm mb-1">${cert.issuer}</p>
        <p class="text-xs mb-4">${cert.date}</p>
        <button onclick="openCertModal(${index})" class="group inline-flex items-center gap-2 text-[#FF0000] font-medium">
          <svg class="eye-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          <span class="relative">
            Lihat Sertifikat
            <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF0000] transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
      </div>
    </div>
  `;
}

certGrid.innerHTML = certificates
  .map((cert, index) => createCertificateCard(cert, index))
  .join("");

// Modal Functions
window.openCertModal = function (index) {
  const cert = certificates[index];
  document.getElementById("certModalImage").src = cert.image;
  document.getElementById("certModalTitle").textContent = cert.title;
  document.getElementById("certModalIssuer").textContent = cert.issuer;
  document.getElementById("certModalDate").textContent = cert.date;
  document.getElementById("certModalDesc").textContent = cert.description;
  certModal.classList.add("active");
  document.body.style.overflow = "hidden";
};

function closeCertificateModal() {
  certModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

closeCertModal.addEventListener("click", closeCertificateModal);
backCertModal.addEventListener("click", closeCertificateModal);
