export class CategoryRenderServices {
  constructor(item) {
    for (let key in item) {
      this[key] = item[key];
    }
  }

  renderCategory(template) {
    const catTemplate = document.importNode(template.content, true);
    catTemplate.querySelector("#tags").textContent = this.name;
    catTemplate.querySelector("#tags").setAttribute("data-select-id", this.id);
    return catTemplate;
  }
}
