import { App } from "../App";
import { PostRenderServices } from "./PostRenderSevices";

export class PostServices {
  constructor() {
    this.catList = [];
    //!Category Content
    this.categoryWrapper = document.getElementById("category-post");
    //!Range Content
    this.range;
    //!Tag Content
    this.tagWrapper;
    this.tagInput;
  }
  //!CATEGORY METHOD
  async fetchCategory() {
    const category = await App.getCategoryServices().getCategory();
    this.catList = category.map((item) => new PostRenderServices(item));

    return this.catList;
  }

  //!RANGE METHOD
  rangeReadPost() {
    this.range = document.getElementById("rangeInput");
    this.range.addEventListener("input", this.updateRange.bind(this));
  }
  updateRange() {
    const rangeValue = document.getElementById("value");
    const value = this.range.value;
    rangeValue.textContent = value;
    this.range.value = value;
  }

  //!TAGS METHOD

  setTagsContent() {
    this.tagWrapper = document.querySelector(".tags-block-list");
    this.tagInput = document.querySelector(".tags-block--add");
    this.setTagPost();
  }
  setTagPost() {
    this.tagInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === "-") {
        event.preventDefault();
        const tagValue = this.tagInput.value;
        if (tagValue.trim() !== "") {
          this.createTagElements(tagValue);
        }
      }
    });
  }
  createTagElements(tagValue) {
    const liElm = document.createElement("LI");
    const spanElm = document.createElement("SPAN");
    liElm.classList.add("tags-block-list--item");
    spanElm.textContent = tagValue;
    liElm.append(spanElm);
    liElm.innerHTML += `<button class="tags-block-list--remove">x</button>`;
    this.tagWrapper.append(liElm);
    this.tagInput.value = "";
    this.removeTagElements(liElm);
  }
  removeTagElements(liElm) {
    liElm
      .querySelector(".tags-block-list--remove")
      .addEventListener("click", () => {
        this.tagWrapper.removeChild(liElm);
      });
  }

  //!IMAGE FILE METHOD
  setPostImage() {
    const wrapper = document.getElementById("upload-div");
    const inputElm = document.getElementById("file-input");
    const prevElm = document.getElementById("preview-image");
    wrapper.addEventListener("click", () => {
      inputElm.click();
    });

    inputElm.addEventListener("change", (event) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        prevElm.src = event.target.result;
      };

      if (inputElm.files[0]) {
        reader.readAsDataURL(inputElm.files[0]);
      }
    });
  }
}
