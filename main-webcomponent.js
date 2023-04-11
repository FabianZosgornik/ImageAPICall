(function () {
  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
    <style>
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    </style>
    <img id="image" src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="">
    `;

  class ImageAPICall extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

      this._props = {};

      this.addEventListener("click", (event) => {
        var event = new Event("onClick");
        this.callAPI();
        this.dispatchEvent(event);
      });
    }

    connectedCallback() {}

    disconnectedCallback() {}

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };

      this._shadowRoot.getElementById("image").src =
        this._props.imageurl;
    }

    callAPI() {
      $.ajax({
        url: this._props.apiurl,
        type: "GET",
        dataType: "jsonp",
        contentType: "application/x-www-form-urlencoded",
      });
    }

    // Settings

    set setAPIUrl(value) {
      this._props.apiurl = value;
    }

    set imageUrl(value) {
      this._shadowRoot.getElementById("image").src = value;
    }
  }

  customElements.define("custom-button", ImageAPICall);
})();
