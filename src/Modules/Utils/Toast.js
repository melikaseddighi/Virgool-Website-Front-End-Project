export class Toast {
  constructor(text) {
    this.text = text;
    this.toastWrapper = document.getElementById("toastMessage");
    this.toastElm;
    this.createElement();
  }

  createElement() {
    this.toastElm = document.createElement("div");
    this.toastElm.classList.add("Toast");
    this.toastElm.textContent = this.text;
  }

  success() {
    this.toastElm.setAttribute("id", "addToast");
    this.toastWrapper.append(this.toastElm);
    this.remove();
  }

  errors() {
    this.toastElm.setAttribute("id", "delToast");
    this.toastWrapper.append(this.toastElm);
    this.remove();
  }

  remove() {
    setTimeout(() => {
      this.toastElm.remove();
    }, 2500);
  }
}
