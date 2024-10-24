import { App } from "../App";
import { Page } from "../Models/Page";
import { Loading } from "../Utils/Loading";

export class BlogPage extends Page {
  async beforeRender(content, idTarget) {
    const pageContent = document.createElement("section");
    pageContent.innerHTML = content;

    Loading.showLoading();
    //!Get Post
    let getPost = App.getHomeServices().findPost(idTarget);
    if (!getPost) {
      getPost = await App.getHomeServices().fetchDataId(idTarget);
    }
    this.renderBlogPage(getPost, pageContent);
    Loading.hideLoading();

    //!RETURN CONTENT
    return pageContent.innerHTML;
  }

  afterRender() {
    this.handlerPublish();
  }

  handlerPublish() {
    document
      .querySelector(".publish-post")
      .addEventListener("click", (event) => {
        const id = event.currentTarget.getAttribute("data-select-id");
        App.getProfileServices().updatePost(id);
      });
  }

  renderBlogPage(blog, pageContent) {
    const imgAuthor = pageContent.querySelectorAll(".img-author");
    imgAuthor.forEach((author) => {
      author.setAttribute("src", blog.user_imageurl);
    });

    const nameAuthor = pageContent.querySelectorAll(".name-author");
    nameAuthor.forEach((name) => {
      name.textContent = blog.username;
      name.setAttribute("data-select-id", blog.user_id);
    });

    pageContent.querySelector("#time-blog").textContent = blog.timeread;
    pageContent.querySelector("#time-publish").textContent = blog.time_frame;
    pageContent.querySelector("#blog-title").textContent = blog.title;
    pageContent.querySelector("#blog-description").innerHTML = blog.description;
    pageContent.querySelector("#description-author").innerHTML = blog.user_bio;

    if (+blog.valid === 0) {
      const publish = pageContent.querySelector(".publish-post");
      publish.classList.remove("d-none");
      publish.setAttribute("data-select-id", blog.id);
    }
  }
}
