export class Tabs {
  constructor() {
    this.handleNavigate();
  }

  handleNavigate() {
    const liElements = document.querySelectorAll(".dashboard__item");
    const sectionElements = document.querySelectorAll(".section-item");

    liElements.forEach((item, index) => {
      item.addEventListener("click", () => {
        liElements.forEach((e) => e.classList.remove("active"));
        item.classList.add("active");
        sectionElements.forEach((event) => event.classList.add("d-none"));
        sectionElements[index].classList.remove("d-none");
      });
    });
  }
}
