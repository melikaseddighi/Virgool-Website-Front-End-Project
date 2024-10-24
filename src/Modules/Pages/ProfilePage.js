import { App } from "../App";
import { Page } from "../Models/Page";
import { Loading } from "../Utils/Loading";
import { Tabs } from "../Utils/Tabs";
import { Toast } from "../Utils/Toast";

export class ProfilePage extends Page {
  async beforeRender(content) {
    const pageContent = document.createElement("section");
    pageContent.innerHTML = content;

    //!Profile Name User
    pageContent.querySelector("#user-name").textContent =
      App.getAuthServices().name;
    Loading.showLoading();
    //!GET All Posts User
    const result = await App.getProfileServices().getPosts();
    const postTemplate = pageContent.querySelector("#post-template");
    const postWrapper = pageContent.querySelector("#post-container");
    if (result) {
      result.forEach((post) => {
        postWrapper.append(post.renderPost(postTemplate));
      });

      if (result.length > 0) {
        pageContent.querySelector(".dashboard__empty").classList.add("d-none");
      }
    }
    Loading.hideLoading();

    return pageContent.innerHTML;
  }
  afterRender() {
    this.handleNavigate();
    this.handleDeletePost();
  }

  async handleDeletePost() {
    const delElements = document.querySelectorAll(".delete-post");
    delElements.forEach((elm) => {
      elm.addEventListener("click", async (event) => {
        const targetId = event.currentTarget.getAttribute("data-select-id");
        const conf = confirm("آیا از حدف این پست مطمئن هستین؟");
        if (!conf) {
          return;
        }
        const { data: result } = await App.getProfileServices().deletePost(
          targetId
        );
        result.status === "OK" ? this.deleteSuccess(elm) : this.deleteFailed();
      });
    });
  }
  deleteSuccess(elm) {
    elm.closest(".col-4").remove();
    new Toast("حذف پست با موفقیت انجام شد").success();
    App.getHomeServices().changeFlag();
  }
  deleteFailed() {
    new Toast("عملیات با شکست مواجه شد").errors();
  }

  handleNavigate() {
    new Tabs();
  }

  mustBeLogin() {
    return true;
  }
}
