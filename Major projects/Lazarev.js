function navScrollHandler() {
  const nav = document.querySelector("nav");

  const whiteSections = [
    "#page3",
    "#page4",
    "#page6",
    "#pageSeven"
  ];

  window.addEventListener("scroll", () => {

    // border + compact nav
    nav.classList.toggle("scrolled", window.scrollY > 10);

    let onWhiteBg = false;

    whiteSections.forEach(selector => {
      const section = document.querySelector(selector);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.top <= nav.offsetHeight && rect.bottom > nav.offsetHeight) {
        onWhiteBg = true;
      }
    });

    nav.classList.toggle("white-nav", onWhiteBg);
  });
}

function page2Animation() {
  document.querySelectorAll(".right-elem").forEach(elem => {
    const img = elem.querySelector(".img");

    if (!img) return;

    elem.addEventListener("mouseenter", () => {
      gsap.to(img, { opacity: 1, scale: 1 });
    });

    elem.addEventListener("mouseleave", () => {
      gsap.to(img, { opacity: 0, scale: 0 });
    });

    elem.addEventListener("mousemove", (e) => {
      const rect = elem.getBoundingClientRect();
      gsap.to(img, {
        x: e.clientX - rect.left - 50,
        y: e.clientY - rect.top - 190
      });
    });
  });
}

function page3Animation() {
  const trigger = document.querySelector(".page3-center");
  const video = document.querySelector("#page3 video");

  if (!trigger || !video) return;

  trigger.addEventListener("click", () => {
    video.play();
    gsap.to(video, {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      borderRadius: 0
    });
  });

  video.addEventListener("click", () => {
    video.pause();
    gsap.to(video, {
      scaleX: 0.7,
      scaleY: 0,
      opacity: 0,
      borderRadius: "30px"
    });
  });
}

function caseStudiesCardsAnimation() {
  document.querySelectorAll(".caseStudiesCards").forEach(card => {
    const video = card.querySelector("video");
    if (!video) return;

    card.addEventListener("mouseenter", () => video.play());
    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

function page8BgVideoAnimation() {
  document.querySelectorAll(".page8divs").forEach(card => {
    const video = card.querySelector("video");
    if (!video) return;

    card.addEventListener("mouseenter", () => video.play());
    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

function footerHoverAnimation() {
  const footer = document.querySelector(".footerimg");
  if (!footer) return;

  const book = footer.querySelector(".book");

  footer.addEventListener("mouseenter", () => {
    gsap.to(book, { opacity: 1, scale: 1 });
  });

  footer.addEventListener("mouseleave", () => {
    gsap.to(book, { opacity: 0, scale: 0 });
  });

  footer.addEventListener("mousemove", (e) => {
    const rect = footer.getBoundingClientRect();

    gsap.to(book, {
      x: e.clientX - rect.left - book.offsetWidth / 1,
      y: e.clientY - rect.top - book.offsetHeight / 1,
      duration: 0.25,
      ease: "power3.out"
    });
  });
}

function overlayOpenClose(){
let overlay = document.getElementById("contactOverlay");
const closeBtn = document.getElementById("closeForm");

document.querySelectorAll(".book, .letsTalk, .img").forEach(btn => {
  btn.addEventListener("click", () => overlay.classList.add("active"));
});

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
});

}

function formSubmit(){
overlay = document.getElementById("contactOverlay")
const form = document.getElementById("contactForm");
const successPopup = document.getElementById("successPopup");
const closeSuccess = document.getElementById("closeSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { name, email, phone, slot } = form;

  console.log(
    name.value,
    email.value,
    phone.value,
    slot?.value
  );

  successPopup.classList.add("active");
  form.reset();
});

closeSuccess.addEventListener("click", () => {
  successPopup.classList.remove("active");
  overlay.classList.remove("active");
});

}

navScrollHandler();
page2Animation();
page3Animation();
caseStudiesCardsAnimation();
page8BgVideoAnimation();
footerHoverAnimation();
overlayOpenClose();
formSubmit()

