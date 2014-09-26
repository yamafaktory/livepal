Polymer('livepal-ui', {
  change: function (event, detail, sender) {
    this.$.main.selected = sender.dataset.target;
  }
});