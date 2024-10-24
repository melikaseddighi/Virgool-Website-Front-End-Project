import axios from "axios";
import { URL } from "../Utils/options";
import { PodcastRenderServices } from "./PodcastRenderServices";
import { Toast } from "../Utils/Toast";
export class PodcastServices {
  constructor() {
    this.podcastList = [];
    this.sounds;
  }

  async getPodcast() {
    if (this.podcastList.length > 0) {
      return this.podcastList;
    }
    const { data: result } = await this.fetch();
    this.podcastList = result.podcasts.map(
      (item) => new PodcastRenderServices(item)
    );

    return this.podcastList;
  }

  handlePlayPodcast() {
    this.sounds = document.querySelectorAll(".sound-link");
    this.sounds.forEach((sound) => {
      sound.addEventListener("click", (event) => {
        const srcAttr = event.currentTarget.getAttribute("data-src");

        this.playPodcast(srcAttr, event.currentTarget);
        this.changeIconPodcast(event.currentTarget);
      });
    });
  }

  changeIconPodcast(event) {
    this.sounds.forEach((sound) => {
      sound.children[0].classList.remove("fa-pause");
      sound.children[0].classList.add("fa-play");
    });

    const child = event.children[0];
    child.classList.remove("fa-play");
    child.classList.add("fa-spin", "fa-spinner");
  }

  playPodcast(srcAttr, event) {
    const child = event.children[0];
    const audio = document.getElementById("audio-player");
    audio.setAttribute("src", srcAttr);
    audio.classList.remove("d-none");
    audio
      .play()
      .then(() => {
        console.log("PLAY");
        child.classList.remove("fa-spin", "fa-spinner");
        child.classList.add("fa-pause");
      })
      .catch((error) => {
        child.classList.remove("fa-spin", "fa-spinner");
        new Toast("لطفا منتظر باشید....").errors();
      });
  }

  fetch() {
    return axios.get(`${URL}/podcast`);
  }
}
