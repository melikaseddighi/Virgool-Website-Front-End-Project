import { App } from "../App";
import { Page } from "../Models/Page";
import { Tabs } from "../Utils/Tabs";
export class SearchPage extends Page {
  async beforeRender(content, searchValue) {
    const pageContent = document.createElement("section");
    pageContent.innerHTML = content;
    const { searchResult } = searchValue;
    this.userContainer = pageContent.querySelector("#user-container");
    this.userTemplate = pageContent.querySelector("#user-template");
    if (searchResult.users.length > 0) {
      searchResult.users.forEach((user) => {
        this.userContainer.append(
          App.getSearchRenderServices().renderUser(user, this.userTemplate)
        );
      });
    } else {
      this.userContainer.innerHTML = `<div class="mt-5 py-4 text-white bg-danger rounded-2 text-center fw-bold">هیچ کاربری با این کلمه کلیدی وجود ندارد</div>`;
    }

    this.postContainer = pageContent.querySelector("#post-container");
    this.postTemplate = pageContent.querySelector("#post-template");

    if (searchResult.quotes.length > 0) {
      searchResult.quotes.forEach((post) => {
        this.postContainer.append(
          App.getSearchRenderServices().renderPost(post, this.postTemplate)
        );
      });
    } else {
      this.postContainer.innerHTML = `<div class="mt-5 py-4 text-white bg-danger rounded-2 text-center fw-bold">هیچ پستی با این کلمه کلیدی وجود ندارد</div>`;
    }
    //!RETURN CONTENT
    return pageContent.innerHTML;
  }

  afterRender() {
    new Tabs();
  }
}
