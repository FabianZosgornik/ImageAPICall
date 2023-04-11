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
      this.apiurl = "https://camelot-itlab-gmbh-camelot-itlab-gmbh-cf-business-analy17752ce5.cfapps.eu10.hana.ondemand.com/bwd-spotify-get/newSpotifyData()";

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

      this.addEventListener("click", (event) => {
        var event = new Event("onClick");
        this.callAPI();
        this.dispatchEvent(event);
      });
    }

    callAPI() {
      console.log(this.apiurl);
      $.ajax({
        url: this.apiurl,
        type: "GET",
        dataType: "jsonp",
        contentType: "application/x-www-form-urlencoded",
      });
    }

    // Settings

    set setAPIUrl(value) {
      console.log(value);
      this.apiurl = value;
      console.log(this.apiurl);
    }

    set imageUrl(value) {
      console.log(value);
      this._shadowRoot.getElementById("image").src = value;
      console.log(this._shadowRoot.getElementById("image").src);
    }
  }

  customElements.define("custom-button", ImageAPICall);
})();
