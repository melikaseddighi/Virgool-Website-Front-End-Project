import axios from "axios";
import { URL } from "../Utils/options";
import { CategoryRenderServices } from "./CategoryRenderServices";
export class CategoryServices {
  constructor() {
    this.categoryList = [];
  }

  async getCategory() {
    if (this.categoryList.length > 0) {
      return this.categoryList;
    }
    const { data: result } = await this.fetch();
    this.categoryList = result.map((item) => new CategoryRenderServices(item));

    return this.categoryList;
  }

  async fetchIdCategory(id) {
    const { data: result } = await axios.get(`${URL}/category/${id}`);
    return result;
  }

  fetch() {
    return axios.get(`${URL}/category`);
  }
}
