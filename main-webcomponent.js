(function () {
  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
        <img id="image" src="" alt="">
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
