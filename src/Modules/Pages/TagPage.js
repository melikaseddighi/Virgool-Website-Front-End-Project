import { Page } from "../Models/Page";
import { App } from "../App";
import { URL } from "../Utils/options";
export class TagPage extends Page {
  async beforeRender(content, idCategory) {
    const pageContent = document.createElement("section");
    pageContent.innerHTML = content;

    //!Get Category Id
    const category = await App.getCategoryServices().fetchIdCategory(
      idCategory
    );

    //!Content
    this.categoryWrapper = pageContent.querySelector("#category-wrapper");
    this.categoryTemplate = pageContent.querySelector("#category-template");
    this.categoryName = pageContent.querySelector("#tag-content");

    this.renderCategoryId(category, pageContent);
    //!RETURN CONTENT
    return pageContent.innerHTML;
  }

  afterRender() {
    console.log("Tag PAGE");
  }

  renderCategoryId(categoryList) {
    this.categoryName.textContent = categoryList.name;

    //!Check Posts
    categoryList.posts.length > 0
      ? this.existPosts(categoryList.posts)
      : this.notExistPost(categoryList.name);
  }

  existPosts(posts) {
    posts.forEach((post) => {
      const catTemplate = document.importNode(
        this.categoryTemplate.content,
        true
      );
      catTemplate.querySelector("#post-image").src = `${URL}/${post.imageUrl}`;
      catTemplate.querySelector("#post-title").textContent = post.title;
      catTemplate
        .querySelector("#post-title")
        .setAttribute("data-select-id", post.id);
      catTemplate.querySelector("#post-publish").textContent = post.time_frame;
      catTemplate.querySelector("#post-like").textContent = post.likecount;
      catTemplate.querySelector("#post-comment").textContent =
        post.commentcount;
      this.categoryWrapper.append(catTemplate);
    });
  }

  notExistPost(name) {
    this.categoryWrapper.innerHTML = `<div class="mt-8 py-4 bg-danger text-white rounded-2 w-100 text-center">هیچ پستی برای
    ${name}
    وجود ندارد
    </div>`;
  }
}
