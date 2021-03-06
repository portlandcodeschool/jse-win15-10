
var MemoryGUI = (function() { // begin IIFE

// Ctor for master gui object:
function GUI(container,game) {
    //game.gui(this); //no longer needed
    // ensure that a string container begins with '#'
        if (typeof container === 'string')
            if (container[0] !== '#')
                container = '#' + container;


    // Generate all views:
    var mainview =
    this.mainview = new MainView({
        el:container,
        // Pass a reference to game downward to all views:
        game:game
    });

    function findCardView(where) {
        return mainview.gridview.cardviews[where];
    }
    function hideAt(where) {
        findCardView(where).hide();
    }
    function removeAt(where) {
        findCardView(where).remove();
    }

    game.collection.on({
        'show':function(opts) {
            findCardView(opts.where).show(opts.what);
        },
        'hideSoon':function(opts) {
            window.setTimeout(function() {
                opts.where.forEach(hideAt);
            }, 1000);
        },
        'removeSoon':function(opts) {
            window.setTimeout(function() {
                opts.where.forEach(removeAt);
            }, 1000);
        }
    });
}

var MainView = Backbone.View.extend({
    events: {
        // define click on reset button
        'click .resetBtn': 'resetAll'
    },
    className:'memorygame',

    //...
    initialize: function(opts) {
        //opts should include el and game
        this.game = opts.game;
        this.gridview = new GridView({
            //pass some options downward:
            game:opts.game,
            //...
        });
        // attach gridview.el below this.el
        this.$el.append(this.gridview.$el);

        // create and attach a reset button:
        $('<button>').html('Reset')
                    .addClass('resetBtn')
                    .prependTo(this.gridview.$el);
    },
    
    resetAll: function() {
        this.game.reset();
        this.gridview.reset();
    }
});

var  GridView = Backbone.View.extend({
    //tagName: 'span', //use this tag to make a new div
    className:'memorygrid',

    initialize: function(opts) {
        this.game = opts.game;//
        this.cardviews = []; // grid's subviews
        var len = this.game.size(),
            cols = Math.ceil(Math.sqrt(len));
            
        for (var i=0; i<len; ++i) {
            // generate each subview:
            var card = new CardView({
                //pass some options downward:
                game: opts.game,
                where: i,
                isFirstCol: (i%cols===0)
            });
            this.cardviews.push(card);
            // connect card's element to DOM;
            // i.e. attach card.el to this.el
            this.$el.append(card.el);
        }
    },

    reset: function() {
        //loop over all card views to reset them
        this.cardviews.forEach(function(view){
            view.reset();
        })
    }
    
});

var CardView = Backbone.View.extend({
    //tagName: 'div', //use this tag to make a new el
    events: {
        'click': 'lift'
    },
    className: 'memorycell',
    
    initialize: function(opts) {
        // Each subview view will have a reference to game:
        this.game = opts.game;  //receive custom option
        this.where= opts.where;
        // opts should also contain an id...
        if (opts.isFirstCol)
            this.$el.addClass('firstcol');
    },
    // Each view should respond to a click with this method:
    lift: function() {
        this.game.lift(this.where);
    },
    // Each view should know how to re-render its own card
    // in these four ways:
    show: function(what) { //turn face-up with value _what_
        this.$el.attr('value',what)
                .addClass('faceup');
    },
    remove: function() { //remove as matched
        this.$el.addClass('missing');
    },
    hide: function() { //turn face-down
        this.$el.removeClass('faceup');
    },
    reset: function() { //return to starting state
        this.$el.removeClass('faceup')
                .removeClass('missing');
    }
});

return GUI;

})(); //end GUI IIFE
