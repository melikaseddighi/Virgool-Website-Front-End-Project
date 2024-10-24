import axios from "axios";
import { URL } from "../Utils/options";
import { ProfileRenderServices } from "./ProfileRenderServices";
import { Loading } from "../Utils/Loading";
import { App } from "../App";
import { Toast } from "../Utils/Toast";
export class ProfileServices {
  constructor() {
    this.postList = [];
  }

  async getPosts() {
    const { data: result } = await this.fetch();
    if (result.status === "success") {
      this.postList = result.quotes.map(
        (item) => new ProfileRenderServices(item)
      );
      return this.postList;
    }
  }

  async updatePost(id) {
    const { data: result } = await axios.put(`${URL}/quotes/${id}`);
    App.getRouter().navigateTo("profile");
    new Toast("انتشار پست با موفقیت انجام شد").success();
    App.getHomeServices().changeFlag();
  }

  async deletePost(id) {
    return await axios.delete(`${URL}/quotes/${id}`);
  }

  fetch() {
    return axios.get(`${URL}/myquotes`);
  }
}
