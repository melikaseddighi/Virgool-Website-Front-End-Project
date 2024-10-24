import { Page } from "../Models/Page";
import { FormValidate } from "../Utils/FormValidate";

export class RegisterPage extends Page {
  afterRender() {
    new FormValidate().submit();
  }
  restrictLogin() {
    return true;
  }
}
