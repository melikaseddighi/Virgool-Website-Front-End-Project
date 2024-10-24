import { routes } from "../routes";
import { AccountBtn } from "./Components/AccountBtn";
import { Router } from "./Routes/Router";
import { AuthServices } from "./Services/AuthServices";
import { CategoryServices } from "./Services/CategoryServices";
import { EmailServices } from "./Services/EmailServices";
import { HomeServices } from "./Services/HomeServices";
import { PodcastServices } from "./Services/PodcastServices";
import { PostServices } from "./Services/PostServices";
import { ProfileServices } from "./Services/ProfileServices";
import { SearchRenderServices } from "./Services/SearchRenderSevices";
import { SearchServices } from "./Services/SearchServices";
import { SoundServices } from "./Services/SoundServices";
import { TopicServices } from "./Services/TopicServices";
import { UserServices } from "./Services/UserServices";
import { ChangeTheme } from "./Utils/ChangeTheme";

export class Lunched {
  constructor() {
    this.container = document.getElementById("container");
    const pages = routes;
    this.router = new Router(pages, this);
    this.handleNavigateLinks();
    this.handleHistory();
    this.handleFirstPage();
    this.homeServices = new HomeServices();
    this.podcastServices = new PodcastServices();
    this.categoryServices = new CategoryServices();
    this.soundServices = new SoundServices();
    this.emailServices = new EmailServices();
    this.authServices = new AuthServices();
    this.accountBtn = new AccountBtn();
    this.postServices = new PostServices();
    this.profileServices = new ProfileServices();
    this.changeTheme = new ChangeTheme();
    this.changeTheme.getFromLocalStorage();
    this.topicServices = new TopicServices();
    this.userServices = new UserServices();
    this.searchServices = new SearchServices();
    this.searchRenderServices = new SearchRenderServices();
  }

  handleNavigateLinks() {
    document.addEventListener("click", (event) => {
      if (event.target.tagName === "INPUT") {
        return;
      }
      event.preventDefault();
      let target = null;

      if (event.target.tagName != "A") {
        target = event.target.closest("A");
      }

      if (event.target.tagName === "A" && event.target.getAttribute("href")) {
        target = event.target;
      }

      if (!target) {
        return;
      }

      this.router.navigateTo(
        target.getAttribute("href").substring(1),
        target.getAttribute("data-select-id")
      );
    });
  }

  handleHistory() {
    window.addEventListener("popstate", (event) => {
      const target = event.state ? event.state.content : "home";
      this.router.navigateTo(target);
    });
  }

  handleFirstPage() {
    this.router.navigateTo("home");
  }
  getContainer() {
    return this.container;
  }
}
