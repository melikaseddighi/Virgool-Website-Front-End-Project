import axios from "axios";
import { URL } from "../Utils/options";
import { SoundRenderServices } from "./SoundRenderServices";
import { Loading } from "../Utils/Loading";
export class SoundServices {
  constructor() {
    this.soundList = [];
    this.id = null;
    this.musicWrapper = document.querySelector("#sound-wrapper");
    this.musicTemplate = document.querySelector("#sound-template");
    this.namePodcast = document.querySelector("#podcast-name");
  }

  async getSounds(id) {
    if (+this.id === +id) {
      return this.soundList;
    }
    this.id = id;
    this.clearData();
    Loading.showLoading();
    const { data: result } = await this.fetch(id);
    Loading.hideLoading();
    //!Get Post Result
    return this.postResult(result);
  }

  postResult(result) {
    if (result.status === "success") {
      this.soundList = result.sounds.map(
        (item) => new SoundRenderServices(item, this.musicTemplate)
      );
      return this.soundList;
    } else {
      return;
    }
  }

  clearData() {
    this.soundList = [];
  }

  async handleGetPodcast() {
    const swiperAll = document.querySelectorAll(".swiper-slide");
    swiperAll.forEach((swiper) => {
      swiper.addEventListener("click", (event) => {
        const target = event.currentTarget.getAttribute("data-select-id");

        //!Get Data
        this.showPodcastName(event.target);
        this.getSoundData(target);
      });
    });
  }

  showPodcastName(target) {
    const altPodcast = target.getAttribute("alt");
    this.namePodcast.textContent = altPodcast;
  }

  async getSoundData(soundId) {
    const result = await this.getSounds(soundId);
    result ? this.renderSounds(result) : this.noData();
  }

  noData() {
    this.musicWrapper.innerHTML = `<div class="bg-danger text-white w-100 py-3 text-center mt-2 rounded-2 fw-bold">هیچ پادکسی وجود ندارد</div>`;
  }

  renderSounds(sounds) {
    this.musicWrapper.innerHTML = "";
    sounds.forEach((sound) => {
      this.musicWrapper.append(sound.renderSounds());
    });
  }

  fetch(id) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("limit", 5);

    return axios.post(`${URL}/podcastId`, formData);
  }
}
