import { App } from "../App";

export class Page {
  constructor(pageName, urlName) {
    this.pageName = pageName;
    this.urlName = urlName;
  }
  renderContent(container, link) {
    if (this.mustBeLogin() && !App.getAuthServices().checkLogin()) {
      App.getRouter().navigateTo("login");
      return;
    }

    if (this.restrictLogin() && App.getAuthServices().checkLogin()) {
      App.getRouter().navigateTo("profile");
      return;
    }

    fetch(`./pages/${this.pageName}.html`)
      .then((response) => response.text())
      .then((html) => this.beforeRender(html, link))
      .then((result) => {
        container.innerHTML = result;
        this.afterRender();
      });
  }

  beforeRender(content) {
    return content;
  }
  afterRender() {
    console.log("Default Rendering");
  }

  restrictLogin() {
    return false;
  }
  mustBeLogin() {
    return false;
  }
}
