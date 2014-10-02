Polymer('livepal-ui', {
  // Create
  created: function () {
    this.test = 'test';
  },
  // Set observers
  observe: {
    //'$.username.inputValue': 'test'
  },
  // Methods
  isInvalid: function (string) {
    let usernameRegex = /^\S{5,20}$/;
    return !usernameRegex.test(string);
  },
  selfie: function () {
    this.gifshot.createGIF({}, obj => {
      if(!obj.error) {
        let image = obj.image;
        let animatedImage = this.$.gifie;
        animatedImage.src = image;
      }
    });
  },
  switch: function (event, detail, sender) {
    this.$.main.selected = sender.dataset.target;
  }
});