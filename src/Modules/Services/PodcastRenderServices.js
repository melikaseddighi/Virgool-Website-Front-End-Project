export class PodcastRenderServices {
  constructor(item) {
    for (let key in item) {
      this[key] = item[key];
    }
  }

  renderPodcast(template) {
    const podcastTemplate = document.importNode(template.content, true);
    podcastTemplate.querySelector("#swiper-img").src = this.thumbnail;
    podcastTemplate.querySelector("#swiper-img").setAttribute("alt", this.name);
    podcastTemplate
      .querySelector(".swiper-slide")
      .setAttribute("data-select-id", this.id);
    return podcastTemplate;
  }
}
