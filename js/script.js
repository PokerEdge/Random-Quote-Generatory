//fix CSS issue with button overflow


// Sets a millisecond time delay for the function that prints quotes to the screen
var timeDelay = window.setInterval(printQuote, 8000);

// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var color;
var r;
var g;
var b;
var rgb = "";

//Function generates and returns a random RGB color string for CSS styling
function randomRGB() {

	//Assigns random number from 0 to 255 to a variable	
	r = Math.floor( Math.random() * 256);
	g = Math.floor( Math.random() * 256);
	b = Math.floor( Math.random() * 256);

//Assign value to rgb variable as a string ready to use as a CSS style for a random RGB color
	rgb = "rgb(" + r + "," + g + "," + b + ")";

	return rgb;
}


var calledQuotes = [];

var currentRandomQuoteIndex = Math.floor ( Math.random() * quotes.length );

//Function that returns a random and unique index of an array of quotes objects, checking if all indices have been displayed, then resetting the list once all quotes have been displayed
function getQuoteIndex () {	
	
	//Sets currentRandomQuoteIndex to random integer 0 to number of quotes minus 1 for indexing in calledQuotes array	
	while (calledQuotes.indexOf(currentRandomQuoteIndex) !== -1) {
		currentRandomQuoteIndex = Math.floor ( Math.random() * quotes.length );
	}

	calledQuotes.push(currentRandomQuoteIndex);

	if (calledQuotes.length === quotes.length) {
		calledQuotes = [];
	}

	return currentRandomQuoteIndex;
}


//Holds unique random quotation index until the full quote list has been called, then the variable is reset
var index;

//function that gets a random quotation out of the array of objects in quotes.js
function getRandomQuote () {
	
	index = getQuoteIndex();
	
	var newQuote = quotes[index].quote;

	return newQuote;
}


var HTML;
var quotation = "";
var source = "";
var citation = "";
var year = "";
var tags = [];

function printQuote () {
	
	var newRandomColor = randomRGB();

	//Reset timeDelay to avoid premature printing of quotes with the set timeDelay
	window.clearTimeout(timeDelay);
	timeDelay = window.setInterval(printQuote, 8000);

	quotation = getRandomQuote();
	source = quotes[index].source;
	citation = quotes[index].citation;
	year = quotes[index].year;	
	tags = quotes[index].tags.join(", ");

	HTML = '<p class = "quote">' + quotation + '</p>';
	HTML += '<p class="source">' + source;
	
	//Checks for empty citation string
	if (citation !== "") {
		HTML += '<span class="citation">' + citation + '</span>';
	}
	
	//Checks for empty or invalid year value 
	if (year !== "" || year === NaN) {
		HTML += '<span class="year"> ' + year + '</span>';
	} 
	
	//Checks for empty tags array
	if (tags.length !== 0) {
		
		HTML += '<span class="tags"> ' + tags + '</span>';
	}
	

	HTML += '</p>';

	var outputDiv = document.getElementById('quote-box');
	document.body.style.backgroundColor = newRandomColor;
	outputDiv.innerHTML = HTML;
}