import { App } from "../App";
import { Page } from "../Models/Page";
import { SoundRenderServices } from "../Services/SoundRenderServices";
import { SoundServices } from "../Services/SoundServices";
import { Loading } from "../Utils/Loading";

export class HomePage extends Page {
  async beforeRender(content) {
    const pageContent = document.createElement("section");
    pageContent.innerHTML = content;
    Loading.showLoading();

    //!POST RENDER
    const result = await App.getHomeServices().getPosts();
    const postTemplate = pageContent.querySelector("#post-template");
    const postWrapper = pageContent.querySelector("#post-container");
    result.forEach((post) => {
      postWrapper.append(post.renderPost(postTemplate));
    });

    //!Podcast RENDER
    const podcasts = await App.getPodcastServices().getPodcast();
    const podcastTemplate = pageContent.querySelector("#podcast-template");
    const podcastWrapper = pageContent.querySelector("#podcast-wrapper");
    podcasts.forEach((podCast) => {
      podcastWrapper.append(podCast.renderPodcast(podcastTemplate));
    });

    pageContent.querySelector("#podcast-name").textContent = podcasts[0].name;

    //!Music RENDER
    const musics = await App.getSoundServices().getSounds(podcasts[0].id);
    console.log(musics);
    const musicWrapper = pageContent.querySelector("#sound-wrapper");
    const musicTemplate = pageContent.querySelector("#sound-template");
    musics.forEach((music) => {
      const soundRender = new SoundRenderServices(
        music,
        musicTemplate
      ).renderSounds();
      musicWrapper.append(soundRender);
    });

    //!Category RENDER
    const category = await App.getCategoryServices().getCategory();
    const categoryTemplate = pageContent.querySelector("#category-template");
    const categoryWrapper = pageContent.querySelector("#category-wrapper");
    category.forEach((cat) => {
      categoryWrapper.append(cat.renderCategory(categoryTemplate));
    });

    Loading.hideLoading();

    //!RETURN CONTENT
    return pageContent.innerHTML;
  }
  afterRender() {
    this.handleSwiper();
    this.search();
    new SoundServices().handleGetPodcast();
    this.handlerPodcast();
  }

  handlerPodcast() {
    App.getPodcastServices().handlePlayPodcast();
  }

  handleSwiper() {
    new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: "auto", // Set this option to 1 to snap to each slide
    });
  }

  search() {
    const search = document.getElementById("search");
    search.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const searchValue = search.value.trim();
        if (searchValue != "") {
          App.getSearchServices().handleSearch(searchValue);
        }
      }
    });
  }
}
