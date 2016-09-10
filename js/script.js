// Initializes a time delay in milliseconds for the printQuote function
var timeDelay = window.setInterval(printQuote, 8000);

// If user clicks anywhere on the button, the "printQuote()" function is executed
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// Function generates and returns a string that creates a random RGB color for CSS styling
function randomRGB() {

	var r;
	var g;
	var b;
	var rgb = "";

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


// Function that returns a random and unique index of an array of quotes objects, checking if all indices have been displayed, then resetting the list once all quotes have been displayed before returning the randomQuoteIndex
function getRandomQuote () {	
	
	var currentRandomQuoteIndex = Math.floor ( Math.random() * quotes.length );
	//Sets currentRandomQuoteIndex to random integer 0 to number of quotes minus 1 for indexing in calledQuotes array	
	while (calledQuotes.indexOf(quotes[currentRandomQuoteIndex]) !== -1) {
		currentRandomQuoteIndex = Math.floor ( Math.random() * quotes.length );
	}

	// Pushes the quotes.(currentRandomIndex).quote string to the calledQuotes[] array
	calledQuotes.push(quotes[currentRandomQuoteIndex]);

	// Checks to see if calledQuotes[] array is the same length as the quotes[] array. If the lengths are equal 
	//     calledQuotes is reset, or emptied, so that the next unique and random quote can be stored in the array 
	if (calledQuotes.length === quotes.length) {
		calledQuotes = [];
	}

	// Returns the quote string of the current random quotation from the quotes object
	return quotes[currentRandomQuoteIndex];
}


// Function that prints a quote and other information to the screen by creating a string referenced by index.html
function printQuote () {
	
	var randomQuoteObject = getRandomQuote();
	var HTML;	

	//get rid of currentRandomQuoteIndex part of this function

	// Set each variable to take the value from the quotes object to which the variable corresponds using currentRandomQuoteIndex
	var quotation = randomQuoteObject.quote;
	var source = randomQuoteObject.source;
	var citation = randomQuoteObject.citation;
	var year = randomQuoteObject.year;
	var tags = randomQuoteObject.tags.join(", ");

	// Resets timeDelay to avoid premature printing of quotes with the set timeDelay
	window.clearTimeout(timeDelay);
	timeDelay = window.setInterval(printQuote, 8000);

	// Builds HTML string that is used to properly display information from quotes array into the quotebox
	HTML = '<p class = "quote">' + quotation + '</p>';
	
	// Checks for defined source value before adding proper text to the HTML string
	if (source) {
		HTML += '<p class="source">' + source;
	}
	
	// Checks for defined citation value before adding proper text to the HTML string
	if (citation) {
		HTML += '<span class="citation">' + citation + '</span>';
	}
	
	// Checks for defined year value before adding proper text to the HTML string
	if (year) {
		HTML += '<span class="year"> ' + year + '</span>';
	} 
	
	// Checks for defined tags value before adding proper text to the HTML string
	if (tags) {
		
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