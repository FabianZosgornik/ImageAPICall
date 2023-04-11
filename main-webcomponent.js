(function () {
  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
    <style>
      image {
        width: 100%;
      }
    </style>
    <img id="image" src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="">
    `;
  
  class ImageAPICall extends HTMLElement {
    constructor() {
      super();
      this._export_settings = {};
      this._export_settings.apiurl = "";
      this._export_settings.imageurl = "";

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

      this.addEventListener("click", (event) => {
        var event = new Event("onClick");
        this.callAPI();
        this.dispatchEvent(event);
      });
    }

    callAPI() {
      console.log(this._export_settings.apiurl);
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
