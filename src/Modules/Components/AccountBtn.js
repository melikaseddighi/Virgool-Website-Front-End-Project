import { App } from "../App";
import { Toast } from "../Utils/Toast";
export class AccountBtn {
  constructor() {
    this.loginElm = document.querySelector(".login-NoActivate");
    this.accountElm = document.querySelector(".account");
    this.logOut = document.getElementById("logOut");
    this.changeBtn = document.getElementById("change-theme");
    this.handlerEvent();
  }

  handlerEvent() {
    this.loginElm.addEventListener("click", this.renderAccount.bind(this));
    this.logOut.addEventListener("click", this.logOutUser.bind(this));
    this.changeBtn.addEventListener("click", this.changeTheme.bind(this));
  }

  changeTheme() {
    App.getChangeTheme().handleTheme();
  }

  logOutUser() {
    App.getAuthServices().logOut();
    App.getRouter().navigateTo("home");
    new Toast("شما از پنل کاربری خارج شدید").success();
  }

  renderAccount() {
    this.accountElm.classList.toggle("hidden");
  }
}
