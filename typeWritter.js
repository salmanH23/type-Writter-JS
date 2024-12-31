var quoteArray = [];
var index = 0;
var textPosition = 0;
var flag = true;
var quote = document.getElementById('quote');

const loadQuote = () => {
  const url = "https://api.quotable.io/random";

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then(data => {
      quoteArray[index] = data.content; 
      flag = true; 
      typewriter(); 
    })
    .catch(error => {
      console.log("Error fetching quote:", error);
      quoteArray[index] = "Failed to fetch quote.";
      typewriter(); 
    });
};

const typewriter = () => {
  if (flag && quoteArray[index]) {
   
    document.querySelector("#quote").innerHTML =
      quoteArray[index].substring(0, textPosition) + '<span>\u25AE</span>';

    
    if (textPosition++ < quoteArray[index].length) {
      setTimeout(typewriter, 100);
    } else {
     
      setTimeout(() => {
        quoteArray[index] = ""; 
        textPosition = 0; 
        flag = true; 
        loadQuote(); 
      }, 4000); 
    }
  }
};

window.addEventListener('load', loadQuote); 
