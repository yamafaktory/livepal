Polymer('livepal-ui', {
  // Create
  created: function () {
    this.disableForm = true;
  },
  // Set observers
  observe: {
    //'$.username.inputValue': 'test'
  },
  // Methods
  switch: function (event, detail, sender) {
    this.$.main.selected = sender.dataset.target;
  }
});