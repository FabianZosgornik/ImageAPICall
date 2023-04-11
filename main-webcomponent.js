(function () {
  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
    <style>
      image {
        width: 100%;
      }
    </style>
    <form id="form" autocomplete="off">
        <fieldset> 
          <legend>General</legend>
          <table>
            <tr>
              <td><label for="REST API URL">REST API URL</label></td>
              <td><input id="restapiurl" name="restapiurl" type="text"></td>
            </tr>
            <tr>
              <td><label for="Widget Name">Widget Name</label></td>
              <td><input id="name" name="name" type="text"></td>
            </tr>
          </table>
        </fieldset>
        <button type="submit" hidden>Submit</button>
      </form>
      <img id="image" src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="">
    `;
  
  class ImageAPICall extends HTMLElement {
    constructor() {
      this._export_settings = {};
      this._export_settings.apiurl = "";
      this._export_settings.imageurl = "";

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

      super();
      this.init();
    }

    init() {
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
      this.addEventListener("click", (event) => {
        var event = new Event("onClick");
        this.callAPI();
        this.dispatchEvent(event);
      });
    }

    callAPI() {
      $.ajax({
        url: this._export_settings.apiurl,
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
      });
    }

    // Settings

    set setAPIUrl(value) {
      this._export_settings.apiurl = value;
    }

    set imageUrl(value) {
      this._shadowRoot.getElementById("image").src = value;
    }
  }

  customElements.define("custom-button", ImageAPICall);
})();
