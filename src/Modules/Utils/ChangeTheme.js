export class ChangeTheme {
  constructor() {
    this.themeName = document.getElementById("name-theme");
    this.themeIcon = document.getElementById("theme-icon");
    this.htmlElement = document.documentElement;
  }

  getFromLocalStorage() {
    const theme = localStorage.getItem("Theme");
    if (theme) {
      let mode = "";
      theme === "light" ? (mode = "dark") : (mode = "light");
      this.getModeTheme(mode);
    }
  }

  handleTheme() {
    const theme = this.htmlElement.getAttribute("data-bs-theme");
    this.getModeTheme(theme);
  }

  getModeTheme(theme) {
    theme === "light" ? this.darkTheme() : this.lightTheme();
    this.setToLocalStorage(theme);
  }
  darkTheme() {
    this.htmlElement.setAttribute("data-bs-theme", "dark");
    this.themeName.textContent = "شب";
    this.themeIcon.classList.replace("fa-regular", "fa-solid");
  }
  lightTheme() {
    this.htmlElement.setAttribute("data-bs-theme", "light");
    this.themeName.textContent = "روز";
    this.themeIcon.classList.replace("fa-solid", "fa-regular");
  }

  setToLocalStorage(theme) {
    let mode = "";
    theme === "light" ? (mode = "dark") : (mode = "light");
    localStorage.setItem("Theme", mode);
  }
}
