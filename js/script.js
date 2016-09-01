// Initializes a time delay in milliseconds for the printQuote function
var timeDelay = window.setInterval(printQuote, 8000);

// If user clicks anywhere on the button, the "printQuote()" function is executed
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var color;
var r;
var g;
var b;
var rgb = "";

// Function generates and returns a string that will create a random RGB color for CSS styling
function randomRGB() {

	// Assigns random number from 0 to 255 to variable. This is done 3 times for each of the r, g and b variables
	r = Math.floor( Math.random() * 256);
	g = Math.floor( Math.random() * 256);
	b = Math.floor( Math.random() * 256);

	// Assign string value to rgb variable ready to use as a CSS style for a random RGB color
	rgb = "rgb(" + r + "," + g + "," + b + ")";

	return rgb;
}

// Array that stores indices of quotes in the array of quote objects that have been printed to the screen by the printQuote function
var calledQuotes = [];

// Creates a randomized index integer from 0 to the length of the quotes array
var currentRandomQuoteIndex = Math.floor ( Math.random() * quotes.length );

// Function that returns a random and unique index of an array of quotes objects, checking if all indices have been displayed, then resetting the list once all quotes have been displayed before returning the randomQuoteIndex
function getQuoteIndex () {	
	
	//Sets currentRandomQuoteIndex to random integer 0 to number of quotes minus 1 for indexing in calledQuotes array	
	while (calledQuotes.indexOf(currentRandomQuoteIndex) !== -1) {
		currentRandomQuoteIndex = Math.floor ( Math.random() * quotes.length );
	}

	calledQuotes.push(currentRandomQuoteIndex);

	// Checks to see if calledQuotes array is the same length as the quotes array. If the 2 values are equal, calledQuotes is reset and a new currentRandomIndex value is created
	if (calledQuotes.length === quotes.length) {
		calledQuotes = [];
	}

	return currentRandomQuoteIndex;
}

// Holds index value so that new quote can be called
var index;
var HTML;
var quotation = "";
var source = "";
var citation = "";
var year = "";
var tags = [];

// Function that prints a quote and other information to the screen by creating a string referenced by index.html
function printQuote () {

	// Resets timeDelay to avoid premature printing of quotes with the set timeDelay
	window.clearTimeout(timeDelay);
	timeDelay = window.setInterval(printQuote, 8000);

	// Stores random quotation from quotes array of objects
	index = getQuoteIndex();
	
	quotation = quotes[index].quote;
	source = quotes[index].source;
	citation = quotes[index].citation;
	year = quotes[index].year;	
	tags = quotes[index].tags.join(", ");

	// Builds HTML string that is used to properly display information from quotes array into the quotebox
	HTML = '<p class = "quote">' + quotation + '</p>';
	HTML += '<p class="source">' + source;
	
	// Checks for empty citation string before adding proper text to the HTML string
	if (citation !== "") {
		HTML += '<span class="citation">' + citation + '</span>';
	}
	
	// Checks for empty or invalid year value before adding proper text to the HTML string
	if (year !== "" || year === NaN) {
		HTML += '<span class="year"> ' + year + '</span>';
	} 
	
	// Checks for empty tags array before adding proper text to the HTML string
	if (tags.length !== 0) {
		
		HTML += '<span class="tags"> ' + tags + '</span>';
	}

	HTML += '</p>';

	// Locates HTML tag to where HTML string will be thrown
	var outputDiv = document.getElementById('quote-box');

	// Prints the background with a random RGB color each time printQuote function is executed
	document.body.style.backgroundColor = randomRGB();

	// Throws HTML string to index.html for use in browser in order to display properly styled and structured data stored in "quotes" array of objects
	outputDiv.innerHTML = HTML;
}