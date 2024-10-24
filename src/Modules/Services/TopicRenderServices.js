export class TopicRenderServices {
  constructor(item) {
    for (let key in item) {
      this[key] = item[key];
    }
  }
  renderTopic(template) {
    const topicTemplate = document.importNode(template.content, true);
    topicTemplate.querySelector(".main-topic").textContent = this.name;
    topicTemplate
      .querySelector(".main-topic")
      .setAttribute("data-select-id", this.id);
    this.children.forEach((child) => {
      const listWrapper = topicTemplate.querySelector(".list-group");
      const elm = document.createElement("A");
      elm.className =
        "list-group-item childTopic text-subtitle mt-3 fs-4 w-100 d-flex topic-item";
      elm.textContent = child.name;
      elm.setAttribute("data-select-id", child.id);
      elm.setAttribute("href", "/tag");
      listWrapper.append(elm);
    });
    return topicTemplate;
  }
}
