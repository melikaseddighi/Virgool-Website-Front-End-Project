export class Loading {
  static showLoading() {
    document
      .querySelector(".loading-container")
      .setAttribute("data-show", "true");
  }

  static hideLoading() {
    document
      .querySelector(".loading-container")
      .setAttribute("data-show", "false");
  }
}
