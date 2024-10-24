export class SoundRenderServices {
  constructor(item, template) {
    for (let key in item) {
      this[key] = item[key];
    }
    this.template = template;
  }

  renderSounds() {
    const soundTemplate = document.importNode(this.template.content, true);
    soundTemplate.querySelector("#sound-img").src = this.srccover;
    soundTemplate.querySelector("#sound-text").textContent = this.title;
    soundTemplate.querySelector("#sound-time").textContent = this.time;
    soundTemplate
      .querySelector("#sound-src")
      .setAttribute("data-src", this.podcasturl);
    return soundTemplate;
  }
}
