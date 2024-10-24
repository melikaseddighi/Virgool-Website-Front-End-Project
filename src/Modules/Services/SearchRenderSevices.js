import { URL } from "../Utils/options";
export class SearchRenderServices {
  renderUser(res, template) {
    const userTemplate = document.importNode(template.content, true);
    userTemplate
      .querySelector("#image-search")
      .setAttribute("src", res.profile_image);
    userTemplate.querySelector("#name-search").textContent = res.name;
    userTemplate
      .querySelector("#name-search")
      .setAttribute("data-select-id", res.id);
    userTemplate.querySelector("#bio-search").textContent = res.bio;
    return userTemplate;
  }

  renderPost(res, template) {
    const postTemplate = document.importNode(template.content, true);
    const blogIds = postTemplate.querySelectorAll(".post-blog");

    blogIds.forEach((blog) => {
      blog.setAttribute("data-select-id", res.id);
    });
    postTemplate.querySelector("#author-image").src = res.user_imageurl;
    postTemplate.querySelector("#author-name").textContent = res.username;
    postTemplate
      .querySelector("#author-name")
      .setAttribute("data-select-id", res.user_id);

    postTemplate.querySelector("#post-publish").textContent = res.time_frame;
    postTemplate.querySelector("#post-title").textContent = res.title;
    postTemplate.querySelector("#post-description").innerHTML = res.description;
    postTemplate.querySelector("#post-image").src = `${URL}/${res.imageUrl}`;
    postTemplate.querySelector("#post-category").textContent =
      res.category_title;
    postTemplate
      .querySelector("#post-category")
      .setAttribute("data-select-id", res.categoryId);
    postTemplate.querySelector("#post-readtime").textContent = res.timeread;

    return postTemplate;
  }
}
