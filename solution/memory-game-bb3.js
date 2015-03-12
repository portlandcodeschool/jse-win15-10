var MemoryGame = (function() {

	var CardModel = Backbone.Model.extend({
	    defaults: {status:'facedown'}
	});

	var CardCollection = Backbone.Collection.extend({
		model:CardModel
	});

	function Ctor(cardset) {
		// slots array is now replaced with...
		var collection = this.collection = new CardCollection();
		cardset.values().forEach(function(cardval) {
			collection.add({value:cardval});
		});

		var length,//total slots, including gaps
			there; //position of face-up card if any, or false
			//_gui = null;

		// Helper functions which need access to closure vars;
		//  some fns will be made public as instance methods:
		var reset = function() {
			//slots = cardset.values();
			collection.reset(collection.shuffle());
			collection.models.forEach(function(model,pos) {
				model.set(model.defaults);
				model.set({'position':pos});
			});
			length = collection.models.length;
			there = false;
			//shuffle(slots);
		}
		reset();// reset now as part of init'ing

		/* No longer needed:
		var gui = function() {//accessor fn
			if (arguments.length === 0) 
				return _gui; //getter
			_gui = arguments[0]; //setter
		}*/

		var size = function() {
			return length;
		}
		this.cardset = function() {
			return cardset;
		}
		var remainsAt = function(where) {//--> boolean
			var status = collection.at(where).get('status');
			return (status === 'faceup' || status === 'facedown');
		}
		var valueAt = function(where) {//--> card val
			return collection.at(where).attributes.value;
		}
		var showAt = function(where,what) {
			collection.at(where).set({status:'faceup'},{where:where, what:what});
		}
		var removeAt = function(where) {
			collection.at(where).set({status:'matched'},{where:where});
		}
		var hideAt = function(where) {
			collection.at(where).set({status:'facedown'},{where:where});
		}
		var faceupValue = function() {//--> card val
			return valueAt(there);
		}
		var faceupWhere = function() {//--> integer
			return there;
		}
		var remaining = function() {//--> array of integers
			return collection.where({status:'facedown'})
					.map(function(model){
						return model.attributes.position;
					});
		}

		var lift = function(here) {//--> display string
			if (!isValid(here,length)) return false;
			if (!remainsAt(here)) return false;
			if (there===here) return false;

			// must be a face-down card here; proceed...
			var valHere = valueAt(here),
				displayHere = cardset.display(valHere);
			showAt(here,displayHere);
			if (there === false) {
				// no current face-up
				there = here; //turn here face-up
			} else {
				// check match with face-up
				if (cardset.match(valHere,valueAt(there))) {
					// match; remove both:
					removeAt(here);
					removeAt(there);
		            //collection.trigger('removeSoon',{where:[here,there]});
					//optional: report match
					console.log("Match!")
				} else {
					hideAt(here);
					hideAt(there);
					//collection.trigger('hideSoon',{where:[here,there]});
				}
				//either way, turn face-up to face-down:
				there = false;
			}
			//collection.trigger('show',{where:here, what:displayHere});
			return displayHere; 
		}

		// Make some functions public as instance methods:
		this.reset = reset;
		this.lift = lift;
		this.faceupValue = faceupValue;
		this.faceupWhere = faceupWhere;
		this.remaining = remaining;
		//this.gui = gui;
		this.size = size;
	}//end ctor

	// Private Functions shared by all boards:
	// these could be placed inside ctor,
	// but then they would be rebuilt for each instance
	function isValid(where,length) {
			return (typeof where === 'number')
				&& (where%1 === 0)
				&& (where>=0)
				&& (where<length)
		}

	return Ctor;
})();


