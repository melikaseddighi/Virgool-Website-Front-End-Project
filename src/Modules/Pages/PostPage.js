import { App } from "../App";
import { Page } from "../Models/Page";
import { SubmitPostServices } from "../Services/SubmitPostServices";
import { PostSubmit } from "../Utils/PostSubmit";

export class PostPage extends Page {
  async beforeRender(content) {
    //!page CONTENT
    const pageContent = document.createElement("section");
    pageContent.innerHTML = content;

    //!GET CATEGORY
    const postWrapper = pageContent.querySelector("#category-post");
    const categories = await App.getPostServices().fetchCategory();
    categories.forEach((cat) => {
      postWrapper.append(cat.renderPost());
    });

    //!RETURN
    return pageContent.innerHTML;
  }
  afterRender() {
    //!CKEDITOR
    this.ckEditorSetting();
    //!GET CATEGORY
    new PostSubmit().handleEvents();
    //!Range Post
    App.getPostServices().rangeReadPost();
    //!Tag Post
    App.getPostServices().setTagsContent();
    //!Image Post
    App.getPostServices().setPostImage();
    //!Submit Post
    new SubmitPostServices();
  }

  mustBeLogin() {
    return true;
  }

  ckEditorSetting() {
    ClassicEditor.create(document.querySelector("#editor"), {
      language: "fa",
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "bold",
          "italic",
          "|",
          "link",
          "uploadImage",
          "insertTable",
          "mediaEmbed",
          "|",
          "heading",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          // "code",
          // "codeBlock",
          // "sourceEditing",
        ],
      },
      ui: {
        viewportOffset: {
          top: window.innerHeight / 8,
        },
      },
    })
      .then((editor) => {
        window.editor = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }
}
