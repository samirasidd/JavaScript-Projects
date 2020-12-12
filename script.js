// creates an array of objects to store quote related information
let quotes = [
    {
        quote: "A reader lives a thousand lives before he dies.",
        source: "George R R Martin",
        category: "#books"
    },
    {
        quote: "I do believe something very magical can happen when you read a good book.",
        source: "J K Rowling",
        category: "#books"
    },
    {
        quote: "Keep reading. It's one of the most marvelous adventures anyone can have.",
        source: "Lloyd Alexander",
        category: "#books"
    },
    {
        quote: "So many books, so little time.",
        source: "Frank Zappa",
        category: "#books"
    },
    {
        quote: "Be the change you want to see in this world.",
        source: "Gandhi",
        category: "#growth"
    },
    {
        quote: "Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbour. Catch the trade winds in your sails. Explore. Dream. Discover.",
        source: "Mark Twain",
        category: "#growth"
    },
    {
        quote: "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.",
        source: "Buddha",
        category: "#growth"
    },
    {
        quote: "Accept responsibility for your life. Know that it is you who will get you where you want to go, no one else.",
        source: "Les Brown",
        category: "#growth"
    },
    {
        quote: "Thinking is the hardest work there is, which is probably the reason so few engage in it.",
        source: "Henry Ford",
        category: "#work"
    },
    {
        quote: "Eighty percent of success is showing up.",
        source: "Woody Allen",
        category: "#success"
    },
    {
        quote: "Self-education is, I firmly believe, the only kind of education there is.",
        source: "Isaac Asimov",
        category: "#learning"
    },
    {
        quote: "Work hard, have fun, make history.",
        source: "Jeff Bezos",
        category: "#work"
    },
    {
        quote: "Be kind, for everyone you meet is fighting a harder battle.",
        source: "Plato",
        category: "#kindness"
    },
    {
        quote: "Be mindful. Be grateful. Be positive. Be true. Be kind.",
        source: "Roy T Bennett",
        category: "#kindness"
    },
    {
        quote: "No one has ever become poor by giving.",
        source: "Anne Frank",
        category: "#kindness"
    },
    {
        quote: "Be a little kinder than you have to.",
        source: "E Lockhart",
        category: "#kindness"
    },
    {
        quote: "The way to get started is to quit talking and begin doing.",
        source: "Walt Disney",
        category: "#success"
    },
    {
        quote: "If you really want to do something, you'll find a way. If you don't, you'll find an excuse.",
        source: "Jim Rohn",
        category: "#success"
    },
    {
        quote: "Fall seven times and stand up eight.",
        source: "Japanese Proverb",
        category: "#perseverance"
    },
    {
        quote: "Being a student is easy. Learning requires actual work.",
        source: "William Crawford",
        category: "#learning"
    },
    {
        quote: "Anything worth doing well is worth doing poorly at first.",
        source: "Ray Congdon",
        category: "#learning"
    }
];
// creates an array of objects to store background and button color information
// I didn't want to randomize the background color because it can sometimes get hard to read quotes
let colors = [
    {
        background: "#606060FF",
        button: "#D6ED17FF"
    },
    {
        background: "#00adb5", 
        button: "#393e46"
    },
    {
        background: "#f38181", 
        button: "#625772"
    },
    {
        background: "#435E55FF", 
        button: "#D64161FF"
    },
    {
        background: "#00539CFF", 
        button: "#EEA47FFF"
    },
    {
        background: "#006B38FF", 
        button: "#101820FF"
    },
    {
        background: "#DF6589FF", 
        button: "#3C1053FF"
    },
    {
        background: "#E94B3CFF", 
        button: "#2BAE66FF"
    },
    {
        background: "#C7D3D4FF", 
        button: "#603F83FF"
    },
    {
        background: "#B1624EFF",
        button: "#5CC8D7FF"
    }
];
let timer;

// generates a random number, assigns it to a variable, then uses it to return a random object from the quotes array
function getRandomQuote() {
    let randomQuote = Math.floor(Math.random() * quotes.length);

    return quotes[randomQuote];
}

// generates a random number, assigns it to a variable, then uses it to return a random object from the colors array
function getRandomColor() {
    let randomColor = Math.floor(Math.random() * colors.length);

    return colors[randomColor];
}

// assigns a setInterval method to the variable so that the printQuote function will automatically run after 10 seconds
function startTimer() {
    timer = setInterval(printQuote, 8000);
}

// clears the setInterval method from the timer variable
function clearTimer() {
    clearInterval(timer);
}

function printQuote() {
    // creates the currentQuoute variable and sets the value to the random object that is returned when the getRandomQuote function is called
    // creates the currentColor variable and sets the value to the random object that is returned when the getRandomColor function is called
    // creates the html variable and uses the currentQuote variable along with key values to build a string
    let currentQuote = getRandomQuote();
    let currentColor = getRandomColor();
    let html = "<p class='quote'> " + currentQuote.quote + "</p>";
    html += "<p class='source'> " + currentQuote.source;
    // tests to see if the citation property is present in the currentQuote and if so, adds it to the string
    if ("citation" in currentQuote) {
        html += "<span class='citation'> " + currentQuote.citation + "</span>";
    }
    // tests to see if the date property is present in the currentQuote and if so, adds it to the string
    if ("date" in currentQuote) {
        html += "<span class='year'> " + currentQuote.date + "</span>";
    }
    html += "<span class='category'> " + currentQuote.category + "</span>";

    // writes the info from the html variable to the div with the quote-box id
    // uses the currentColor variable to change the background color
    // uses the currentColor variable to change the button color
    document.getElementById("quote-box").innerHTML = html;
    document.body.style.background = currentColor.background;
    document.getElementById("loadQuote").style.background = currentColor.button;

    // clears any previous timers that might be running and starts a new one
    clearTimer();
    startTimer();
}

// runs the printQuote function upon initial page load
printQuote();

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);