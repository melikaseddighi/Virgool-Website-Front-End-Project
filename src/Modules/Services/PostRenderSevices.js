export class PostRenderServices {
  constructor(item) {
    for (let key in item) {
      this[key] = item[key];
    }
  }

  renderPost() {
    const optionElm = document.createElement("option");
    optionElm.textContent = this.name;
    optionElm.setAttribute("value", this.id);
    return optionElm;
  }
}
