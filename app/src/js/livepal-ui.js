Polymer('livepal-ui', {
  // Create
  created: function () {
    this.disableForm = true;
  },
  // Set observers
  observe: {
    'nameClass': 'checkForm',
  },
  // Methods
  checkForm: function () {
    console.log('changed');
  },
  switch: function (event, detail, sender) {
    if(this.$.name.classList.contains('invalid')){
      console.log('not good');
    } else {
      this.$.main.selected = sender.dataset.target;
    }
  }
});