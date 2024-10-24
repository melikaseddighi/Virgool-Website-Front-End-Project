import axios from "axios";
import { URL } from "../Utils/options";
import { App } from "../App";
import { Toast } from "../Utils/Toast";
export class settingServices {
  constructor() {
    this.settingElm;
    this.name;
    this.bio;
    this.userName;
    this.email;
    this.phone;
  }

  handleEvent() {
    this.settingElm = document.querySelectorAll(".setting__prev");
    this.handleSetting();
  }

  handleSetting() {
    this.settingElm.forEach((setting) => {
      setting.addEventListener("click", this.getSettingInfo.bind(this));
    });
  }
  getSettingInfo(event) {
    const targetName = event.currentTarget.getAttribute("data-name");
    this.completeSetting(targetName);
  }

  async completeSetting(targetName) {
    const result = await this.getUserData();
    let titleSetting, nameAttr, valueAttr;
    switch (targetName) {
      case "name":
        titleSetting = "نام نمایشی";
        nameAttr = "name";
        valueAttr = result.name;
        break;
      case "bio":
        titleSetting = "شرح مختصری از خودتان را وارد کنید";
        nameAttr = "bio";
        valueAttr = result.bio;
        break;
      case "username":
        titleSetting = "نام کاربری شما";
        nameAttr = "username";
        valueAttr = result.username;
        break;
      case "email":
        titleSetting = "ایمیل شما";
        nameAttr = "email";
        valueAttr = result.email;
        break;
      case "phone":
        titleSetting = "شماره همراه شما";
        nameAttr = "phone";
        valueAttr = result.phone;
        break;
      case "password":
        titleSetting = "تغییر گذرواژه";
        nameAttr = "password";
        valueAttr = "";
        break;
    }
    this.beforeShowSetting(titleSetting, nameAttr, valueAttr);
  }

  beforeShowSetting(titleSetting, nameAttr, valueAttr) {
    const titleElm = document.getElementById("name-seting-user");
    const inputElm = document.getElementById("input-seting-user");
    titleElm.textContent = titleSetting;
    inputElm.setAttribute("name", nameAttr);
    inputElm.setAttribute("value", valueAttr);
    this.afterShowSetting();
  }
  afterShowSetting() {
    const settingWrapper = document.getElementById("show-setting");
    const closeSetting = document.querySelector(".close-setting");
    const submit = document.getElementById("submit-setting");
    //!Show Wrapper
    settingWrapper.classList.remove("d-none");

    //!Hide Wrapper
    closeSetting.addEventListener("click", () => {
      settingWrapper.classList.add("d-none");
    });

    //!Submit Form
    submit.addEventListener("click", this.submitSetting.bind(this));
  }

  async submitSetting() {
    const inputValue = document.getElementById("input-seting-user");
    const name = inputValue.getAttribute("name");
    const value = inputValue.value;
    const formData = new FormData();
    formData.append("key", name);
    formData.append("value", value);
    const { data: result } = await axios.post(`${URL}/update`, formData);
    result.status === "ok" ? this.successSubmit(result) : this.errorSubmit();
  }
  successSubmit(result) {
    console.log(result);
    App.getRouter().navigateTo("setting");
    App.getAuthServices().setLoginToLocalStorage(
      result.data.name,
      result.data.token
    );
    new Toast("ویرایش با موفقیت انجام شد").success();
  }
  errorSubmit() {
    new Toast("ویرایش با شکست مواجه شد").errors();
  }

  async getUserData() {
    const { data: result } = await axios.get(`${URL}/getuser`);
    return result;
  }

  renderUserInfo(data, pageContent) {
    this.getContent(pageContent);
    this.renderContent(data);
  }

  getContent(pageContent) {
    this.name = pageContent.querySelector("#Name");
    this.bio = pageContent.querySelector("#Description");
    this.userName = pageContent.querySelector("#userName");
    this.email = pageContent.querySelector("#email");
    this.phone = pageContent.querySelector("#phone");
  }
  renderContent(data) {
    this.name.textContent = data.name;
    this.bio.textContent = data.bio;
    this.userName.textContent = data.username;
    this.email.textContent = data.email;
    this.phone.textContent = data.phone;
  }

  deleteAccount() {
    const accountElm = document.getElementById("delete-account");
    accountElm.addEventListener("click", this.checkDeleteAccount.bind(this));
  }

  checkDeleteAccount() {
    const boxElm = document.getElementById("delete-box");
    const closeElm = document.querySelector(".delete-setting");
    const inputElm = document.getElementById("input-delete-user");
    const submit = document.getElementById("submit-delete");
    closeElm.addEventListener("click", () => {
      boxElm.classList.add("d-none");
    });
    boxElm.classList.remove("d-none");
    submit.addEventListener("click", () => {
      if (inputElm != "" && inputElm.value === "delete") {
        this.deleteFetch();
      }
    });
  }

  async deleteFetch() {
    axios
      .delete(`${URL}/deleteUser`)
      .then(() => {
        new Toast("اکانت شما با موفقیت حذف شد").success();
        App.getAuthServices().logOut();
        App.getHomeServices().changeFlag();
        App.getRouter().navigateTo("home");
      })
      .catch((error) => {
        console.log(error);
        new Toast("در حذف اکانت شما مشکلی به وجود آمد").errors();
      });
  }
}
