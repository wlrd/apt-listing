const header = document.querySelector("[data-header]");
const galleryButtons = Array.from(document.querySelectorAll("[data-gallery] .photo"));
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxCount = document.querySelector("[data-lightbox-count]");
const inquiryForm = document.querySelector("[data-inquiry-form]");
const formNote = document.querySelector("[data-form-note]");

// The contact address is reconstructed only when the form is submitted so it
// is not exposed as plain text to basic source-code and mailto-link scrapers.
const contactToken = [44, 58, 55, 62, 62, 63, 54, 58, 55, 50, 48, 98, 110, 27, 60, 54, 58, 50, 55, 117, 56, 52, 54];
const decodeContact = () => String.fromCharCode(...contactToken.map((value) => value ^ 91));

let activePhotoIndex = 0;

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

const showPhoto = (index) => {
  activePhotoIndex = (index + galleryButtons.length) % galleryButtons.length;
  const activeButton = galleryButtons[activePhotoIndex];
  lightboxImage.src = activeButton.dataset.src;
  lightboxImage.alt = activeButton.dataset.alt;
  lightboxCaption.textContent = activeButton.querySelector("span")?.textContent || "Photo tour";
  lightboxCount.textContent = `${activePhotoIndex + 1} / ${galleryButtons.length}`;
};

const openLightbox = (index) => {
  showPhoto(index);
  document.body.classList.add("lightbox-open");
  lightbox.showModal();
};

const closeLightbox = () => {
  lightbox.close();
};

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => openLightbox(index));
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
document.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => showPhoto(activePhotoIndex - 1));
document.querySelector("[data-lightbox-next]")?.addEventListener("click", () => showPhoto(activePhotoIndex + 1));

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightbox?.addEventListener("close", () => {
  document.body.classList.remove("lightbox-open");
  galleryButtons[activePhotoIndex]?.focus();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.open) return;
  if (event.key === "ArrowLeft") showPhoto(activePhotoIndex - 1);
  if (event.key === "ArrowRight") showPhoto(activePhotoIndex + 1);
});

inquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const ownerEmail = decodeContact();
  if (!ownerEmail.includes("@")) {
    formNote.textContent = "The contact link is temporarily unavailable. Please try again later.";
    formNote.classList.add("setup-warning");
    return;
  }

  const data = new FormData(inquiryForm);
  const name = data.get("name")?.toString().trim();
  const senderEmail = data.get("email")?.toString().trim();
  const moveIn = data.get("moveIn")?.toString().trim() || "Not specified";
  const leaseLength = data.get("leaseLength")?.toString().trim() || "Flexible between 1 and 2 years";
  const tourTimes = data.get("tourTimes")?.toString().trim();
  const message = data.get("message")?.toString().trim() || "No additional questions.";
  const subject = "Viewing request — Bellevue Towers Unit 2008";
  const body = [
    `Hello, I’m interested in Bellevue Towers Unit 2008.`,
    "",
    `Name: ${name}`,
    `Email: ${senderEmail}`,
    `Desired move-in: ${moveIn}`,
    `Preferred lease length: ${leaseLength}`,
    `Preferred tour times: ${tourTimes}`,
    "",
    message,
    "",
    "Please let me know about possible viewing times and next steps.",
  ].join("\n");

  window.location.href = `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formNote.textContent = "Your email app should open with a pre-filled message.";
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
