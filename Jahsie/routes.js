_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var template = _.template(
  " Click <a href='#{{route}}'>here</a> for the {{route}} view."
);

var MainView = Backbone.View.extend({
  el:'#memorygame',
  render: function() {
  	    this.$el.html("I'm the Nick Cage Game!" + template({route:'alternative'}));
  	  var cards = new NickCageCards(),
  		game  = new MemoryGame(cards),
  	 	gui = new MemoryGUI('memorygame', game);

  }
});

var OtherView = Backbone.View.extend({
  el:'#memorygame',
  render: function() {
  	  this.$el.html("I'm the main view!" + template({route:'default'})); 
  	  var cards = new RickCageCards(),
  		game  = new MemoryGame(cards),
  	 	gui = new MemoryGUI('memorygame', game);
  	 }
  	    
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'showMainView',
    'default': 'showMainView',
    'alternative': 'showOtherView',
  },
  showMainView: function() {
    this.view = new MainView();
    this.view.render();
  },
  showOtherView: function() {
    this.view = new OtherView();
    this.view.render();
  },
});

function go() {
  window.app = new Router();
  Backbone.history.start();
}

$(go);