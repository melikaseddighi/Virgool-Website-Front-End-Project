import axios from "axios";
import { URL } from "../Utils/options";
import { App } from "../App";
export class SearchServices {
  constructor() {}

  handleSearch(value) {
    this.getSearch(value);
  }

  async getSearch(value) {
    const { data: result } = await this.fetch(value);
    App.getRouter().navigateTo("search", { searchResult: result });
  }

  fetch(value) {
    return axios.get(`${URL}/quotes/search/${value}`);
  }
}
