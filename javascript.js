/** Globals and consts */
const COLORS = [
  // By Gabriel Nunes & Todd Chaffee
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

let quotesData;

let currentQuote = '';
let currentAuthor = '';

/** Helper Functions */
function getQuotes() {
   // By Gabriel Nunes & Todd Chaffee
   return $.ajax({
     headers: {
       Accept: 'application/json'
     },
     url:
       'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
     success: function (jsonQuotes) {
       if (typeof jsonQuotes === 'string') {
         quotesData = JSON.parse(jsonQuotes);
         console.log('quotesData');
         console.log(quotesData);
       }
     }
   });
 }

function changeColors() {
  // this should be a part of state, but this is basic
  // TODO: update that

  let color = COLORS[Math.floor(Math.random() * COLORS.length)];


  $("body").css("background-color", color);
  $("body").css("color", color);
  $("#new-quote").css("background-color", color);
  $("#tweet-button").css("background-color", color);
}

function getRandomQuote() {
   return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function setQuote() {
   let quote = getRandomQuote();

   currentQuote = quote.quote;
   currentAuthor = quote.author;

   $('#text').text(currentQuote);
   $('#author').text(currentAuthor); 
   $('#tweet-quote').attr('href',
                           'https://www.twitter.com/intent/tweet?text=' +
                           encodeURIComponent('"') + currentQuote + 
                           encodeURIComponent('" ') + currentAuthor)

   changeColors();
}

$(document).ready(() => {
   getQuotes().then(() => {
      setQuote();
   });

   $("#new-quote").on("click", setQuote);
});
