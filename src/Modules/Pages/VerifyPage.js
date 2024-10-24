import axios from "axios";
import { Page } from "../Models/Page";
import { App } from "../App";
import { URL } from "../Utils/options";
import { Loading } from "../Utils/Loading";
import { Toast } from "../Utils/Toast";
export class VerifyPage extends Page {
  otpInputs;

  afterRender() {
    this.getActivateCode();
  }

  getActivateCode() {
    this.otpInputs = document.querySelectorAll(".otp-input");
    this.otpInputs.forEach((input, index) => {
      input.addEventListener("input", (event) => {
        event.target.value = event.target.value.slice(0, 1);
        if (event.target.value.length === 1) {
          if (index < this.otpInputs.length - 1) {
            this.otpInputs[index+1].focus();
          } else {
            this.sendRequest();
          }
        }
      });
    });
  }
  async sendRequest() {
    Loading.showLoading();
    const { data: result } = await this.fetch();
    Loading.hideLoading();

    this.checkResult(result);
  }

  checkResult(result) {
    if (result.status === "ok") {
      new Toast("ثبت نام با موفقیت انجام شد").success();
      this.concatInput(2);
      App.emailServices().clearEmail();
      setTimeout(() => {
        App.getRouter().navigateTo("login");
      }, 1500);
    } else {
      this.concatInput(3);
    }
  }

  fetch() {
    const email = this.getEmail();
    const otp = this.concatInput(1);
    const formData = new FormData();
    formData.append("otp", otp);
    formData.append("email", email);
    return axios.post(`${URL}/otp`, formData);
  }


  concatInput(index) {
    let otpString = "";
    this.otpInputs.forEach((input) => {
      if (+index === 1) {
        otpString += input.value;
      } else if (+index === 2) {
        input.style.backgroundColor = "greenyellow";
      } else if (+index === 3) {
        input.style.backgroundColor = "#b31515";
      }
    });
    return otpString;
  }

  getEmail() {
    return App.emailServices().getEmail();
  }
}
