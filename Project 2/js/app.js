/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//initialization --TODO add to new function init!
//collection of open cards
let openCards = [];
let count = 0;
const allCards = document.querySelectorAll(".card");

allCards.forEach(function(card) {
  card.addEventListener('click', function(){

    // let open1stCard = openCards[0];
    // let open2ndCard = openCards[1];

    //not click one more time the open cards
    if (!card.classList.contains("open", "show")){
      displayCard(card);
      addCard(card);
      count += 1;
      if (openCards.length == 2) {
        if (openCards[0].innerHTML === openCards[1].innerHTML){
          openCards[0].classList.add("match");
          openCards[1].classList.add("match");
          openCards=[];
        } else {
          setTimeout(function() {
            openCards[0].classList.remove("open", "show");
            openCards[1].classList.remove("open", "show");
            openCards=[];
          }, 1000)
        }
        console.log(openCards);
      };
    };



    // console.log(open1stCard);
    // console.log(open2ndCard);
    console.log(count);
  });

});


//function to show card
function displayCard(card){
   card.classList.add("open", "show");
 };

  //add open card into listener
 //push card into collection of open cards
function addCard(card){
  openCards.push(card);
};





/* another metdod to install addEventListener
document.addEventListener('click', function(el){
  if(el.target.nodeName==='LI'){
    console.log(el);
    console.log(el.target.);
  }
})
*/
