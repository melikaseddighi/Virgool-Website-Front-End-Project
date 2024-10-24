import { URL } from "../Utils/options";
export class HomeRenderServices {
  constructor(item) {
    for (let key in item) {
      this[key] = item[key];
    }
  }

  renderPost(template) {
    const postTemplate = document.importNode(template.content, true);
    const blogIds = postTemplate.querySelectorAll(".post-blog");
    blogIds.forEach((blog) => {
      blog.setAttribute("data-select-id", this.id);
    });
    postTemplate.querySelector("#author-image").src = this.user_imageurl;
    postTemplate.querySelector("#author-name").textContent = this.username;
    postTemplate
      .querySelector("#author-name")
      .setAttribute("data-select-id", this.user_id);

    postTemplate.querySelector("#post-publish").textContent = this.time_frame;
    postTemplate.querySelector("#post-title").textContent = this.title;
    postTemplate.querySelector("#post-description").innerHTML =
      this.description;
    postTemplate.querySelector("#post-image").src = `${URL}/${this.imageUrl}`;
    postTemplate.querySelector("#post-category").textContent =
      this.category_title;
    postTemplate
      .querySelector("#post-category")
      .setAttribute("data-select-id", this.categoryId);
    postTemplate.querySelector("#post-readtime").textContent = this.timeread;
    postTemplate.querySelector("#post-like").textContent = this.likecount;
    postTemplate.querySelector("#post-comment").textContent = this.commentcount;

    return postTemplate;
  }
}
