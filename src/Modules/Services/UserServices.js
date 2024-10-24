import axios from "axios";
import { URL } from "../Utils/options";
import { HomeRenderServices } from "./HomeRenderServices";
export class UserServices {
  constructor() {
    this.userPostList = [];
  }

  async getUserPost(userId) {
    const { data: result } = await this.fetchUserPost(userId);
    console.log(result);
    if (result.length > 0) {
      this.userPostList = result.map((item) => new HomeRenderServices(item));
      return this.userPostList;
    }
  }

  async getInfo(userId) {
    const { data: result } = await this.fetchUserInfo(userId);
    return result;
  }
  fetchUserPost(userId) {
    return axios.get(`${URL}/quotes/user/${userId}`);
  }
  fetchUserInfo(userId) {
    const formData = new FormData();
    formData.append("id", userId);
    return axios.post(`${URL}/userid`, formData);
  }
}
