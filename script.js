// --------------------------------------------Scroll------------------------------------------------------------------------------------
document.querySelectorAll(".container .child").forEach((item) => {
  item.addEventListener("click", (event) => {
    const scrollToElement = event.currentTarget;
    const container = scrollToElement.parentElement;
    const scrollAmount = scrollToElement.offsetTop - container.offsetTop;

    container.scrollTo({
      bottom: scrollAmount,
      behavior: "smooth",
    });
  });
});

//  -------------------------------------------------ACTIVE NAV-----------------------------------------------------------------------------

const navLinkELs = document.querySelectorAll(".nav__links");
const sections = document.querySelectorAll("section");
let isManualNavigation = false;

navLinkELs.forEach((navLinkEL) => {
  navLinkEL.addEventListener("click", (event) => {
    event.preventDefault();

    // Temporarily disable the observer
    isManualNavigation = true;

    // Remove active class from previously active link
    document.querySelector(".nav__links.active")?.classList.remove("active");

    // Add active class to the clicked link
    navLinkEL.classList.add("active");

    // Smooth scroll to the target section
    const targetSectionId = navLinkEL.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetSectionId);
    targetSection.scrollIntoView({ behavior: "smooth" });

    // Re-enable the observer after the scroll completes
    setTimeout(() => {
      isManualNavigation = false;
    }, 1000); // Adjust timeout duration based on scroll animation duration
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    if (isManualNavigation) return;

    entries.forEach((entry) => {
      const sectionId = entry.target.getAttribute("id");
      const correspondingNavLink = document.querySelector(
        `.nav__links[href="#${sectionId}"]`
      );

      if (entry.isIntersecting) {
        correspondingNavLink.classList.add("active");
      } else {
        correspondingNavLink.classList.remove("active");
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => {
  observer.observe(section);
});
