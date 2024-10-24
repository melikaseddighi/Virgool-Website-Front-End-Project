import { Page } from "../Models/Page";
import { LoginValidate } from "../Utils/LoginValidate";

export class LoginPage extends Page {
  afterRender() {
    new LoginValidate().submit();
  }
  restrictLogin() {
    return true;
  }
}
