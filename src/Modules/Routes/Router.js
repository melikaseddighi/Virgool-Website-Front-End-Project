export class Router {
  constructor(allPages, app) {
    this.allPages = allPages;
    this.app = app;
  }

  navigateTo(route, link = null) {
    const page = this.allPages.find((page) => page.pageName === route);
    if (page) {
      page.renderContent(this.app.getContainer(), link);
      history.pushState({ content: route }, "", route);
    }
  }
}
