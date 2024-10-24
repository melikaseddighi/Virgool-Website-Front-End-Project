export class AuthServices {
  constructor() {
    this.name = null;
    this.token = null;
    this.checkLogin();
  }

  login(name, token) {
    this.name = name;
    this.token = token;
    this.renderUserAccount();
  }

  setLoginToLocalStorage(name, token) {
    this.login(name, token);
    localStorage.setItem("name", name);
    localStorage.setItem("token", token);
  }

  renderUserAccount() {
    const login = document.querySelector(".login-activate");
    const account = document.querySelector(".login-NoActivate");
    const allUsers = document.querySelectorAll(".name-user");
    if (this.checkLogin()) {
      login.classList.add("hidden");
      account.classList.remove("hidden");
      allUsers.forEach((user) => {
        user.textContent = this.name;
      });
    } else {
      login.classList.remove("hidden");
      account.classList.add("hidden");
    }
  }

  logOut() {
    this.name = null;
    this.token = null;
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    this.renderUserAccount();
  }

  checkLogin() {
    if (this.name && this.token) {
      return true;
    }
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("token");
    if (name && token) {
      this.login(name, token);
      return true;
    }

    return false;
  }
}
