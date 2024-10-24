import axios from "axios";
import { URL } from "../Utils/options";
import { Loading } from "../Utils/Loading";
import { App } from "../App";
import { Toast } from "../Utils/Toast";
export class SubmitPostServices {
  constructor() {
    this.postTitle = document.querySelector(".post__title");
    this.postFile = document.querySelector("#file-input");
    this.postCategory = document.querySelector("#category-post");
    this.postRange = document.querySelector("#rangeInput");
    this.submitBtn = document.querySelector("#submit-post");
    this.postDescription;
    this.tags = [];
    this.handleEvent();
  }
  handleEvent() {
    this.submitBtn.addEventListener("click", this.handleAsyncTags.bind(this));
  }
  handleAsyncTags() {
    this.postDescription = document.querySelector(".ck-content");
    this.postTags = document.querySelectorAll(".tags-block-list--item > span");
    this.postTags.forEach((tag) => {
      this.tags.push(tag.textContent);
    });
    this.fetch();
  }

  async fetch() {
    const formData = new FormData();
    formData.append("title", this.postTitle.value);
    formData.append("description", this.postDescription.innerHTML);
    formData.append("categoryId", this.postCategory.value);
    formData.append("tags", this.tags);
    formData.append("timeread", this.postRange.value);
    formData.append("image", this.postFile.files[0], this.postFile.value);
    Loading.showLoading();
    const { data: result } = await axios.post(`${URL}/quotes`, formData);
    if (result.status === "ok") {
      App.getRouter().navigateTo("profile");
      new Toast("پست شما با موفقیت ایجاد شد").success();
    } else {
      new Toast("در ایجاد پست شما مشکلی پیش آمده است").errors();
    }
    Loading.hideLoading();
  }
}
