import { Lunched } from "./Lunched";
import axios from "axios";
import { Authorization } from "./Utils/options";
export class App {
  static init() {
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common["Authorization"] = Authorization;
    this.lunched = new Lunched();
  }

  static getContainer() {
    return this.lunched.container;
  }

  static getHomeServices() {
    return this.lunched.homeServices;
  }

  static emailServices() {
    return this.lunched.emailServices;
  }

  static getAuthServices() {
    return this.lunched.authServices;
  }

  static getPostServices() {
    return this.lunched.postServices;
  }

  static getProfileServices() {
    return this.lunched.profileServices;
  }

  static getPodcastServices() {
    return this.lunched.podcastServices;
  }

  static getSoundServices() {
    return this.lunched.soundServices;
  }

  static getCategoryServices() {
    return this.lunched.categoryServices;
  }

  static getRouter() {
    return this.lunched.router;
  }

  static getChangeTheme() {
    return this.lunched.changeTheme;
  }

  static getTopicServices() {
    return this.lunched.topicServices;
  }

  static getUserServices() {
    return this.lunched.userServices;
  }

  static getSearchServices() {
    return this.lunched.searchServices;
  }

  static getSearchRenderServices() {
    return this.lunched.searchRenderServices;
  }
}
