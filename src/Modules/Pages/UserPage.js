import { App } from "../App";
import { Page } from "../Models/Page";
import { Loading } from "../Utils/Loading";
export class UserPage extends Page {
  async beforeRender(content, userId) {
    const pageContent = document.createElement("section");
    pageContent.innerHTML = content;

    Loading.showLoading();
    const userInfo = await App.getUserServices().getInfo(userId);
    pageContent.querySelector("#user-name").textContent = userInfo.name;
    pageContent.querySelector("#user-bio").textContent = userInfo.bio;

    //!POST RENDER
    const getUserPost = await App.getUserServices().getUserPost(userId);
    const postTemplate = pageContent.querySelector("#post-template");
    const postWrapper = pageContent.querySelector("#post-container");
    getUserPost.forEach((post) => {
      postWrapper.append(post.renderPost(postTemplate));
    });
    Loading.hideLoading();

    //!RETURN CONTENT
    return pageContent.innerHTML;
  }
  afterRender() {}
}
