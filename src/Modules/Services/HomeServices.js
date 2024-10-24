import axios from "axios";
import { URL } from "../Utils/options";
import { HomeRenderServices } from "./HomeRenderServices";
export class HomeServices {
  constructor() {
    this.postList = [];
    this.changePostList = false;
  }

  async getPosts() {
    if (this.postList.length > 0 && !this.changePostList) {
      return this.postList;
    }
    if (this.changePostList) {
      this.changePostList = false;
    }

    const { data: result } = await this.fetch();
    this.postList = result.map((item) => new HomeRenderServices(item));

    return this.postList;
  }

  changeFlag() {
    this.changePostList = true;
  }

  findPost(id) {
    return this.postList.find((item) => +item.id === +id);
  }

  async fetchDataId(id) {
    const { data: result } = await axios.get(`${URL}/quotes/${id}`);

    return result;
  }

  fetch() {
    return axios.get(`${URL}/quotes`);
  }
}
