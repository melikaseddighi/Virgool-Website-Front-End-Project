import axios from "axios";
import { URL } from "../Utils/options";
import { App } from "../App";
import { Loading } from "./Loading";
export class FormValidate {
  constructor() {
    this.errors = [];
    this.registerBtn = document.getElementById("register-btn");
    this.form = document.getElementById("form-register");
    this.inputs = document.querySelectorAll(".stuRegister__Input");
    this.name = document.getElementById("register-name");
    this.email = document.getElementById("register-email");
    this.phone = document.getElementById("register-phone");
    this.password = document.getElementById("register-password");
    this.rePassword = document.getElementById("register-repassword");
    this.errorWrapper = document.getElementById("errors-empty");
  }

  submit() {
    this.registerBtn.addEventListener("click", this.validate.bind(this));
  }

  validate() {
    this.clearErrors();
    this.checkValidate();
    this.checkPassword();
    this.errors.length > 0 ? this.showErrors() : this.getFormData();
  }

  getFormData() {
    const name = this.name.value;
    const email = this.email.value;
    const phone = this.phone.value;
    const password = this.password.value;
    this.submitForm(email, name, phone, password);
  }
  async submitForm(email, name, phone, password) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("password", password);
    Loading.showLoading();
    const { data: result } = await axios.post(`${URL}/register`, formData);
    Loading.hideLoading();
    result.status === "error"
      ? this.handleAPIErrors(result.errors)
      : this.verifyUser();
  }

  verifyUser() {
    const email = this.email.value;
    App.emailServices().setEmail(email);
    App.getRouter().navigateTo("verify");
  }

  handleAPIErrors(errors) {
    this.errorWrapper.innerHTML = "";
    const errorContainer = {
      email: document.getElementById("errors-email"),
      name: document.getElementById("errors-name"),
      phone: document.getElementById("errors-phone"),
      password: document.getElementById("errors-password"),
    };

    for (const container in errorContainer) {
      errorContainer[container].innerHTML = "";
    }

    for (const field in errors) {
      if (errors[field].length > 0) {
        const errorElement = errorContainer[field];
        for (const error of errors[field]) {
          const errorElm = document.createElement("LI");
          errorElm.classList.add("stuRegister__error");
          errorElm.textContent = error;
          errorElement.append(errorElm);
        }
      }
    }
  }

  showErrors() {
    this.errorWrapper.innerHTML = "";
    this.errors.forEach((error) => {
      const errorElm = document.createElement("LI");
      errorElm.classList.add("stuRegister__error");
      errorElm.textContent = error;
      this.errorWrapper.append(errorElm);
    });
  }

  checkPassword() {
    const password = this.password.value;
    const rePassword = this.rePassword.value;
    if (password != rePassword) {
      const message = "گذرواژه و تکرار گذرواژه همخوانی ندارد";
      this.errors.push(message);
    }
  }
  checkValidate() {
    this.inputs.forEach((input) => {
      if (input.value.trim() == "") {
        const name = input.getAttribute("data-title");
        let message = `فیلد ${name} نباید خالی باشد`;
        this.errors.push(message);
      }
    });
  }

  clearErrors() {
    this.errors = [];
  }
}
