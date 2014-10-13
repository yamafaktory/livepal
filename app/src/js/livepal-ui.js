Polymer('livepal-ui', {
  created: function () {
    // Init some properties
    this.devices = {};
    this.gifieProgress = 0;
    this.pageTransitionIsActive = false;
    // Custom listeners for pages transition
    this.WatchPagesTransition();
  },
  // Set observers
  observe: {
    //'$.usernameSection': 'hideFab'
  },
  // Methods
  WatchPagesTransition: function () {
    window.addEventListener('core-animated-pages-transition-prepare', event => {
      this.pageTransitionIsActive = true;
      console.log('transition');
    });
    window.addEventListener('core-animated-pages-transition-end', event => {
      this.pageTransitionIsActive = false;
      console.log('transition-end');
    });
  },
  isInvalid: function (string) {
    let usernameRegex = /^\S{5,20}$/;
    return !usernameRegex.test(string);
  },
  makeGifie: function () {
    this.gifshot.createGIF({
      // Number of web workers
      'numWorkers': 4,
      // Number of frames
      'numFrames': 20,
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
        console.log('done');
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
  },
  zValue: function (isMobile) {
    return isMobile ? 0 : 1;
  }
});