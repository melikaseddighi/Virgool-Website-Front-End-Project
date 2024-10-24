import axios from "axios";
import { URL } from "./options";
import { App } from "../App";
import { Toast } from "./Toast";
export class LoginValidate {
  constructor() {
    this.errors = [];
    this.loginBtn = document.getElementById("login-btn");
    this.loginInputs = document.querySelectorAll(".stuLogin-input");
    this.errorWrapper = document.getElementById("errors-empty");
    this.email = document.getElementById("login-email");
    this.password = document.getElementById("login-password");
  }

  submit() {
    this.loginBtn.addEventListener("click", this.validate.bind(this));
  }

  validate() {
    this.checkLogin();
    if (this.errors.length > 0) {
      this.showError();
    } else {
      this.sendRequest();
    }
  }
  async sendRequest() {
    const { data: result } = await this.fetch();
    console.log(result.message);
    result.status === "ok"
      ? this.successLogin(result)
      : this.handleError(result.message);
  }
  successLogin(result) {
    const name = result.data.name;
    const token = result.data.token;
    new Toast(" ورود با موفقیت انجام شد").success();
    App.getAuthServices().setLoginToLocalStorage(name, token);
    App.getRouter().navigateTo("profile");
  }
  handleError(message) {
    this.errors.push(message);
    this.showError();
  }

  fetch() {
    const email = this.email.value;
    const password = this.password.value;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return axios.post(`${URL}/login`, formData);
  }

  showError() {
    this.errorWrapper.innerHTML = "";
    this.errors.forEach((error) => {
      const errorElm = document.createElement("LI");
      errorElm.classList.add("stuRegister__error");
      errorElm.textContent = error;
      this.errorWrapper.append(errorElm);
    });
  }

  checkLogin() {
    this.errors = [];
    this.loginInputs.forEach((input) => {
      if (input.value.trim() === "") {
        const inputData = input.getAttribute("data-title");
        const message = `فیلد
        ${inputData}
        نباید خالی باشد
        `;
        this.errors.push(message);
      }
    });
  }
}
