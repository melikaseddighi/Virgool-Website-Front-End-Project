import { URL } from "../Utils/options";
export class ProfileRenderServices {
  constructor(item) {
    for (let key in item) {
      this[key] = item[key];
    }
  }

  renderPost(template) {
    const postTemplate = document.importNode(template.content, true);
    postTemplate.querySelector("#post-image").src = `${URL}/${this.imageUrl}`;
    postTemplate.querySelector("#post-title").textContent = this.title;
    const dataIds = postTemplate.querySelectorAll(".post-blog");
    dataIds.forEach((data) => {
      data.setAttribute("data-select-id", this.id);
    });
    postTemplate.querySelector("#post-publish").textContent = this.time_frame;
    postTemplate.querySelector("#post-category").textContent =
      this.category_title;
    postTemplate.querySelector("#post-like").textContent = this.likecount;
    postTemplate.querySelector("#post-comment").textContent = this.commentcount;

    if (+this.valid === 1) {
      const status = postTemplate.querySelector("#publish-status");
      status.textContent = "منتشر شده";
      status.classList.replace("bg-danger", "bg-success");
    }
    return postTemplate;
  }
}
