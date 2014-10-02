'use strict';

// Import gifshot
import gifshot from 'gifshot/build/gifshot.min.js';

// Import components as prototypes
import './livepal-ui';

// When all components are ready, do stuff
window.addEventListener('polymer-ready', event => {
  //  Select livepal-ui
  var livepal = document.querySelector('livepal-ui');
  //  Attach gifshot as a property on livepal-ui
  livepal.gifshot = gifshot;
});