export class Theme {
  constructor() {
    this.nameTheme = document.getElementById("name-theme");
    this.iconTheme = document.getElementById("theme-icon");
    this.htmlElement = document.documentElement;
    this.htmlTheme();
  }

  htmlTheme() {
    const getAttr = this.htmlElement.getAttribute("data-bs-theme");
    getAttr === "light" ? this.darkTheme() : this.lightTheme();
    this.setThemeToLocalStorage(getAttr);
  }

  lightTheme() {
    this.htmlElement.setAttribute("data-bs-theme", "light");
    this.nameTheme.textContent = "روز";
    this.iconTheme.classList.replace("fa-solid", "fa-regular");
  }
  darkTheme() {
    this.htmlElement.setAttribute("data-bs-theme", "dark");
    this.nameTheme.textContent = "شب";
    this.iconTheme.classList.replace("fa-regular", "fa-solid");
  }

  setThemeToLocalStorage(mode) {
    let theme = "";
    if (mode === "light") {
      theme = "dark";
    } else {
      theme = "light";
    }
    localStorage.setItem("Theme", theme);
  }
}
