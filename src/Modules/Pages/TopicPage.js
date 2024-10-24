import { App } from "../App";
import { Page } from "../Models/Page";
export class TopicPage extends Page {
  async beforeRender(content) {
    const pageContent = document.createElement("section");
    pageContent.innerHTML = content;

    //!Category RENDER
    const topic = await App.getTopicServices().getTopic();
    const topicTemplate = pageContent.querySelector("#topic-cat");
    const topicWrapper = pageContent.querySelector(".topic-wrapper");
    topic.forEach((top) => {
      topicWrapper.append(top.renderTopic(topicTemplate));
    });

    //!RETURN CONTENT
    return pageContent.innerHTML;
  }
  afterRender() {}
}
