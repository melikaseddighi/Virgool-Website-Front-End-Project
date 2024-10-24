import { Page } from "../Models/Page";
import { settingServices } from "../Services/SettingServices";
import { Tabs } from "../Utils/Tabs";

export class SettingPage extends Page {
  async beforeRender(content, idCategory) {
    const pageContent = document.createElement("section");
    pageContent.innerHTML = content;

    //!Get User Info
    this.setting = new settingServices();
    const getInfo = await this.setting.getUserData();
    this.setting.renderUserInfo(getInfo, pageContent);
    return pageContent.innerHTML;
  }

  afterRender() {
    new Tabs();
    this.setting.handleEvent();
    this.setting.deleteAccount();
  }

  mustBeLogin() {
    return true;
  }
}
