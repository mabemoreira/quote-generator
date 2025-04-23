const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const xBtn = document.getElementById('x');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    //picks random quotes from the array 
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author is blank, replace with unknown
    authorText.textContent = quote.author ? quote.author : 'Unknown';

    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote'); // como quote text é global, se na outra chamada tinha adicionado long-quote vamos remover
    }
   

    quoteText.textContent = quote.text
    complete();

}

// Gets quotes from API
async function fetchQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);// só vai ser inicializada quando a requisição for concluída
        apiQuotes = await response.json(); // espera a resposta ser convertida em json
        newQuote();
     } catch (error){
        alert('Error fetching quotes: ' + error);
    }
}

function postQuote(){
    const xUrl = `https://x.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(xUrl,'_blank');
}

newQuoteBtn.addEventListener('click',newQuote);
xBtn.addEventListener('click',postQuote);

fetchQuotes();