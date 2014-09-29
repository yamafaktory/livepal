Polymer('livepal-ui', {
  // Create
  created: function () {
    this.disableForm = true;
  },
  // Set observers
  observe: {
    '$.name.inputValue': 'checkName'
  },
  // Methods
  checkName: function () {
    console.log(this.$.name.inputValue.length);
    if(this.$.name.inputValue.length < 5){
      this.$.name.classList.add('invalid');
      console.log('not valid');
    }
  },
  switch: function (event, detail, sender) {
    this.$.main.selected = sender.dataset.target;
  }
});