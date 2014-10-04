Polymer('livepal-ui', {
  // Create
  created: function () {
    this.gifieCardTitle = 'Make a gifie';
    this.gifieProgress = 0;
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
  makeGifie: function () {
    this.gifshot.createGIF({
      // Number of web workers
      'numWorkers': 4,
      // Number of frames
      'numFrames': 30,
      // Video element
      'webcamVideoElement': this.$.video,
      // Camera always on
      'keepCameraOn': true,
      // Reinject the cameraStream
      'cameraStream': this.cameraStream || null,
      // Gifie dimensions
      'gifWidth': 200,
      'gifHeight': 200,
      // In progress
      'progressCallback': step => {
        // Update gifieProgress in percent 
        this.gifieProgress = step * 100;
      },
      // Done
      'completeCallback': () => {
        //this.gifieCardTitle = 'Cool one!';
      }
    }, obj => {
      if(!obj.error) {
        // Inject the computed gif data in the avatar
        this.$.gifie.src = obj.image;
        // Save data & camera stream
        this.gifieData = obj.image;
        this.cameraStream = obj.cameraStream;
      }
    });
  },
  switch: function (event, detail, sender) {
    this.$.main.selected = sender.dataset.target;
  }
});