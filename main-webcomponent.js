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
      this.apiurl =
        "https://camelot-itlab-gmbh-camelot-itlab-gmbh-cf-business-analy17752ce5.cfapps.eu10.hana.ondemand.com/bwd-spotify-get/newSpotifyData()";

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

      this._props = {};

      console.log(this._props);

      this.addEventListener("click", (event) => {
        var event = new Event("onClick");
        //this.callAPI();
        this.dispatchEvent(event);
      });
    }

    connectedCallback() {}

    disconnectedCallback() {}

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
      console.log("after");
      console.log(changedProperties);
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };

      console.log("before");
      console.log(changedProperties);

      this._shadowRoot.getElementById("image").src =
        this._props.imageurl;
    }

    callAPI() {
      console.log(this._props.apiurl);
      $.ajax({
        url: this._props.apiurl,
        type: "GET",
        dataType: "jsonp",
        contentType: "application/x-www-form-urlencoded",
      });
    }

    // Settings

    set setAPIUrl(value) {
      console.log(value);
      this._props.apiurl = value;
      console.log(this._props.apiurl);
    }

    set imageUrl(value) {
      console.log(value);
      this._shadowRoot.getElementById("image").src = value;
      console.log(this._shadowRoot.getElementById("image").src);
    }
  }

  customElements.define("custom-button", ImageAPICall);
})();
