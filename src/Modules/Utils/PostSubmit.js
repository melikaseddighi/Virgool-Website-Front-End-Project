export class PostSubmit {
  constructor() {
    this.postTitle = document.querySelector(".post__title");
    this.publish = document.getElementById("published");
    this.errorMessage = document.getElementById("error-published");
    this.prevPost = document.querySelector(".prev-post");
    this.closePrev = document.querySelector("#close-setting");
  }

  handleEvents() {
    this.publish.addEventListener("click", this.validate.bind(this));
    this.closePrev.addEventListener("click", this.closePostPrev.bind(this));
  }

  validate() {
    this.checkPost();
  }

  checkPost() {
    if (this.postTitle.value.trim() === "") {
      this.errorMessage.textContent =
        "برای ورود به بخش تنظیمات عنوان نباید خالی باشد";
    } else {
      this.errorMessage.innerHTML = "";
      this.prevPost.classList.remove("hidden");
    }
  }
  closePostPrev() {
    this.prevPost.classList.add("hidden");
  }
}
