
// ----Example set 1:----

var FoodCards = (function() {
	// card values:
	var food = ['apple','artichoke','banana','blueberry','carrot','cranberry'];

	function Ctor() {
		this.values = function() {
			return food.slice(); //return copy of values
		};
		this.match = function(str1,str2) {
			return str1[0]===str2[0]; //match if same initial letter
		};
		this.display = function(val) {
			return val; //display value is just card val
		};
	}

	return Ctor;

})();


// ----Example set 2:----

var AnimalCards = (function() {

	// card values (each card is a pair, array [name,num]) :
	var animals = [	['dog',1],['puppy',1],
					['cat',2],['kitten',2],
					['frog',3],['tadpole',3],
					['bird',4],['chick',4] ];

	function Ctor() {
		this.values = function() {
			return animals.slice();
		};
		this.match = function(pair1,pair2) {  //each pair is [name,num] 
			return (pair1[1]===pair2[1]); // check if num matches
		};
		this.display = function(val) { //val is pair [name,num]
			return val[0];  //display just the animal name
		};
	}

	return Ctor;

})();

// ----Example set 3:----

var AlphabetCards = (function() {
	// produces pairs 'a'=='A','b'=='B',...
	var alphabet = ' abcdefghijklmnopqrstuvwxyz';

	function Ctor(numPairs) { //numPairs is optional; defaults to 26
		if (numPairs < 1) numPairs = 1;
		if (!numPairs || (numPairs > 26)) numPairs = 26;

		// Generate subset of alphabet in pairs:
		var _values = []; //private array
		while (numPairs) {
			_values.push(alphabet[numPairs]); //'a'...
			_values.push(alphabet[numPairs].toUpperCase());//'A'...
			--numPairs;
		}

		// Instance methods:
		this.values = function() {
			return _values.slice();
		}
		this.match = function(a,b) {
			return a.toUpperCase() == b.toUpperCase();
		}
		this.display = function(val) {
			return val;
		}
	}

// See cardset-example.js for examples

	return Ctor;

})();


var NickCageCards = (function() {
	function Ctor() {
		//...
		var cards = [
			["Cameron Poe", "Con Air", 0], ["Put the bunny back in the box.", "Con Air", 1],
			["Castor Troy/Sean Archer", "Face/Off", 2], ["If you dress like Halloween, ghouls will try to get in your pants", "Face/Off", 3],
			["H.I. McDunnough", "Raising Arizona", 4], ["I’ll be taking these Huggies and whatever cash ya got.", "Raising Arizona", 5],
			["Peter Loew",  "Vampire's Kiss", 6], ["You just put it in the right file, according to alphabetical order! Y’know A, B , C, D, E, F, G!", "Vampire's Kiss", 7],
			["Milton",  "Drive Angry", 14], ["I never disrobe before gunplay", "Drive Angry", 15],
			["Terence McDonagh", "Bad Lieutenant: Port of Call New Orleans", 16], ["You don’t have a lucky crack pipe?", "Bad Lieutenant: Port of Call New Orleans", 17],
			["Seth", "City of Angels", 22], ["What’s that like? What’s it taste like? Describe it like Hemingway.", "City of Angels", 23],
			["Johnny Blaze / Ghost Rider", "Ghost Rider: Spirit of Vengeance", 24], ["You will tell me or I will eat your stinking soul!", "Ghost Rider: Spirit of Vengeance", 25],
			["Edward Malus", "The Wicker Man", 10], ["OH, NO! NOT THE BEES! NOT THE BEES! AAAAAHHHHH! OH, THEY’RE IN MY EYES! MY EYES! AAAAHHHHH! AAAAAGGHHH!", "The Wicker Man", 11],
			["Benjamin Franklin Gates", "National Treasure", 18], ["I'm gonna steal the Declaration of Independence", "National Treasure", 19],
			//TEMP HIDING THESE		
			// ["Benjamin Franklin Gates", "National Treasure: Book of Secrets", 20], ["I'm gonna kidnap the President of the United States", "National Treasure: Book of Secrets", 21],
			// ["Stanley Goodspeed", "The Rock", 8], ["How, in the name of Zeus’s butthole, did you get out of your cell?", "The Rock", 9],
			// ["David Spritz", "The Weather Man", 12], ["I mean, I’ll bet no one ever threw a pie at, like Harriet Tubman, the founder of the Underground railroad. I’ll bet you a million fucking dollars.", "The Weather Man", 13],
			// ["Sailor Ripley", "Wild at Heart", 26], ["This is a snakeskin jacket... and for me it's a symbol of my individuality and my belief in personal freedom.", "Wild at Heart", 27],
		];

		this.values = function() {
			return cards.slice();
		};

		this.match = function(a,b) {
			return (a[1]===b[1]);
		};
		/////FIX THIS
		this.display = function(val) {
			return val[0];
		};

		//my function for DOM display
		this.cardID = function(val) {
			return val[3];
		}
	}
	//...

	return Ctor;
})();