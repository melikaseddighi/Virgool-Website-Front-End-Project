import { HomePage } from "./Modules/Pages/HomePage";
import { LoginPage } from "./Modules/Pages/LoginPage";
import { ProfilePage } from "./Modules/Pages/ProfilePage";
import { RegisterPage } from "./Modules/Pages/RegisterPage";
import { BlogPage } from "./Modules/Pages/BlogPage";
import { TagPage } from "./Modules/Pages/TagPage";
import { VerifyPage } from "./Modules/Pages/VerifyPage";
import { SettingPage } from "./Modules/Pages/SettingPage";
import { PostPage } from "./Modules/Pages/PostPage";
import { TopicPage } from "./Modules/Pages/TopicPage";
import { UserPage } from "./Modules/Pages/UserPage";
import { SearchPage } from "./Modules/Pages/SearchPage";

export const routes = [
  new HomePage("home", "home.html"),
  new LoginPage("login", "login.html"),
  new ProfilePage("profile", "profile.html"),
  new RegisterPage("register", "register.html"),
  new BlogPage("blog", "blog.html"),
  new TagPage("tag", "tag.html"),
  new VerifyPage("verify", "verify.html"),
  new SettingPage("setting", "setting.html"),
  new PostPage("post", "post.html"),
  new TopicPage("topic", "topic.html"),
  new UserPage("user", "user.html"),
  new SearchPage("search", "search.html"),
];
