export class EmailServices {
  constructor() {
    this.email = "";
  }

  setEmail(email) {
    this.email = email;
    localStorage.setItem("email", email);
  }

  loadEmailFromLocalStorage() {
    this.email = localStorage.getItem("email");
  }

  clearEmail() {
    localStorage.removeItem("email");
  }

  getEmail() {
    return this.email;
  }
}
