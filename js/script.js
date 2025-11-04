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
    desc: "BTNG (Basic Training for Next Generation) merupakan program pelatihan DNCC Universitas Dian Nuswantoro yang berfokus pada pengembangan kemampuan teknologi dan soft skill. Saya berkontribusi sebagai Front-End Web Developer, merancang dan mengimplementasikan antarmuka website yang modern dan responsif.",
    image: "/assets/btng/btng1.png",
    tech: ["React.ts", "Vite", "Tailwind"],
    images: [
      "/assets/btng/btng1.png",
      "/assets/btng/btng2.png",
      "/assets/btng/btng3.png",
      "/assets/btng/btng1.png",
    ],
    date: "October 2025",
    role: "Front End Developer",
    team: "Team Project",
    duration: "2 Weeks",
    status: "Live & Active",
  },
  {
    id: 2,
    title: "Website Zezkun",
    desc: "Zezkun adalah platform online yang menghadirkan pilihan jaket gunung thrift berkualitas dengan harga terjangkau. Website ini didesain modern dan informatif, memudahkan pengunjung menemukan berbagai produk jaket outdoor second dari brand ternama seperti Columbia, Eider, Lafuma, Blackyak, Kappa,",
    image: "/assets/zezkun/zezkun1.png",
    tech: ["Vue.js", "Vite", "Tailwind"],
    images: [
      "/assets/zezkun/zezkun1.png",
      "/assets/zezkun/zezkun2.png",
      "/assets/zezkun/zezkun3.png",
      "/assets/zezkun/zezkun4.png",
    ],
    date: "April 2023",
    role: "Frontend Developer & Designer",
    team: "Team Project",
    duration: "3 Weeks",
    status: "Non Active",
  },
  {
    id: 3,
    title: "Creativ Labz",
    desc: "Creativlabz adalah platform resmi milik PT Kreatif Vapelab Indonesia, distributor terkemuka produk liquid USA sejak 2016. Website ini dirancang untuk menghadirkan pengalaman belanja modern dengan tampilan elegan, navigasi intuitif, dan informasi produk yang komprehensif.",
    image: "/assets/creativlabz/cl1.png",
    tech: ["Vue.js", "Vite", "Tailwind"],
    images: [
      "/assets/creativlabz/cl1.png",
      "/assets/creativlabz/cl2.png",
      "/assets/creativlabz/cl3.png",
      "/assets/creativlabz/cl4.png",
    ],
    date: "February 2024",
    role: "Frontend Developer",
    team: "Team Project",
    duration: "1 Months",
    status: "Non Active",
  },
  {
    id: 4,
    title: "Website Unisains",
    desc: "Unisains adalah sebuah website untuk media belajar atau kursus Sains yang di dukung teknologi Augmented Reality yang ditujukan kepada masyarakat umum.",
    image: "/assets/unisains/uni1.png",
    tech: ["Vue.js", "Tailwind", "Vite"],
    images: [
      "/assets/unisains/uni1.png",
      "/assets/unisains/uni2.png",
      "/assets/unisains/uni3.png",
      "/assets/unisains/uni4.png",
    ],
    date: "Mei 2023",
    role: "Frontend Developer & Designer",
    team: "Team Project",
    duration: "6 Moths",
    status: "Non Active",
  },
  {
    id: 5,
    title: "Website Space Tourism",
    desc: "Analytics dashboard for social media management with data visualization, post scheduling, and engagement metrics.",
    image: "/assets/space-tourism/st1.png",
    tech: ["Vue.js", "Tailwind", "Vite"],
    images: [
      "/assets/space-tourism/st1.png",
      "/assets/space-tourism/st2.png",
      "/assets/space-tourism/st3.png",
      "/assets/space-tourism/st4.png",
    ],
    date: "Januari 2024",
    role: "Frontend Developer",
    team: "Solo Project",
    duration: "2 Weeks",
    status: "Non Active",
  },
  {
    id: 6,
    title: "Coming Soon",
    desc: "-",
    image:
      "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23FCBAD3' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' fill='white'%3ECooming Soon%3C/text%3E%3C/svg%3E",
    tech: ["-", "-", "-"],
    images: [
      "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23FCBAD3' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='32' text-anchor='middle' fill='white' font-weight='bold'%3ECurrent Weather%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23ECAAC3' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='32' text-anchor='middle' fill='white' font-weight='bold'%3E7-Day Forecast%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23DC9AB3' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='32' text-anchor='middle' fill='white' font-weight='bold'%3EHourly Forecast%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23CC8AA3' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='32' text-anchor='middle' fill='white' font-weight='bold'%3EMap View%3C/text%3E%3C/svg%3E",
    ],
    date: "-",
    role: "-",
    team: "-",
    duration: "-",
    status: "-",
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
      <img src="${project.image}" alt="${
    project.title
  }" class="w-full h-64 object-cover" />
      <div class="project-content p-6">
        <h2 class="text-xl font-semibold mb-3">${project.title}</h2>
        <p class="project-desc text-sm leading-relaxed mb-4" style="color: var(--text-secondary)">${
          project.desc
        }</p>
        <div class="flex flex-wrap gap-2 mb-6">
          ${project.tech
            .map(
              (tech) =>
                `<span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-300">${tech}</span>`
            )
            .join("")}
        </div>
        <a href="project-detail.html?id=${
          project.id
        }" class="group relative inline-flex items-center gap-2 font-medium transition-all duration-300 hover:gap-4">
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
      "Sertifikasi komprehensif yang berfokus pada framework Vue.js, mencakup arsitektur berbasis komponen, sistem reaktivitas, manajemen state menggunakan Pinia/Vuex, routing dengan Vue Router, serta penerapan Composition API. Menyelesaikan berbagai proyek praktis yang menunjukkan kemampuan dalam membangun aplikasi web modern, responsif, dan skalabel menggunakan Vue.js.",
  },
  {
    title: "Sertifikat Peserta BTNG Divisi Web",
    issuer: "DNCC",
    date: "2024",
    image: "/assets/certificate/BTNG-DNCC.jpg",
    description:
      "Telah mengikuti kegiatan Basic Training for Next Generation (BTNG) Divisi Web yang diselenggarakan oleh DNCC Universitas Dian Nuswantoro, dengan fokus pada pengembangan keterampilan dasar Front-End Web Development menggunakan teknologi web modern serta peningkatan kemampuan kolaborasi dan problem solving di bidang teknologi informasi.",
  },
  {
    title: "Sertifikat Kursus HTML",
    issuer: "Sololearn",
    date: "2022",
    image: "/assets/certificate/CourseSololearnHTML.jpg",
    description:
      "Telah menyelesaikan kursus HTML Fundamentals di SoloLearn, yang mencakup pemahaman struktur dasar halaman web, elemen dan tag HTML, pembuatan hyperlink, tabel, formulir, serta penerapan praktik terbaik dalam membangun struktur website yang semantik dan terstandarisasi.",
  },
  {
    title: "Sertifikat Kursus CSS",
    issuer: "Sololearn",
    date: "2022",
    image: "/assets/certificate/CourseSololearnCSS.jpg",
    description:
      "Telah menyelesaikan kursus CSS Fundamentals di SoloLearn, yang mencakup pemahaman dasar tentang pengaturan tampilan halaman web menggunakan CSS, termasuk selektor, properti, layout, warna, tipografi, serta penerapan konsep responsive design untuk meningkatkan estetika dan pengalaman pengguna.",
  },
  {
    title: "Sertifikat Pelatihan Fundamental Flutter",
    issuer: "CourseNet",
    date: "2022",
    image: "/assets/certificate/CourseNetFlutter.jpg",
    description:
      "Telah menyelesaikan Pelatihan Fundamental Flutter di Course-Net Indonesia, yang berfokus pada penguasaan dasar pengembangan aplikasi mobile lintas platform menggunakan framework Flutter. Materi mencakup struktur proyek Flutter, penggunaan widget, state management, layout responsif, serta integrasi dasar dengan komponen UI interaktif.",
  },
  {
    title: "Sertifikat Kursus Fundamental C#",
    issuer: "Sololearn",
    date: "2022",
    image: "/assets/certificate/CCertificateSololearn.jpg",
    description:
      "Telah menyelesaikan kursus Introduction to C# di SoloLearn, yang membahas dasar-dasar pemrograman menggunakan bahasa C#. Materi meliputi struktur program, variabel, tipe data, operator, kontrol alur, fungsi, array, serta konsep dasar pemrograman berorientasi objek (OOP) sebagai pondasi pengembangan aplikasi berbasis .NET.",
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
      <img src="${cert.image}" alt="${
    cert.title
  }" class="w-full h-48 object-cover" />
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
