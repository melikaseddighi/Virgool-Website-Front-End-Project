import { TopicRenderServices } from "./TopicRenderServices";
import { App } from "../App";

export class TopicServices {
  constructor() {
    this.topicList = [];
  }

  async getTopic() {
    if (this.topicList.length > 0) {
      return this.topicList;
    }
    const result = this.fetch();

    this.topicList = result.map((item) => new TopicRenderServices(item));

    return this.topicList;
  }

  fetch() {
    return App.getCategoryServices().categoryList;
  }
}
