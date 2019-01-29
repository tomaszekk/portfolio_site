/*
 * Create a list that holds all of your cards
 */

 //initialization --TODO add to new function init!

 //collection of open cards - only current!
 //only 2 cards are open simultaneously!!!!
 let currentOpenCards = [];

 //collection of all open cards
 let openCards = [];
 //general counter
 let count = 0;

//show moves, points on the web
 let generalScore = document.querySelector(".moves");
 generalScore.innerHTML = "0";

//show raking on the web
 let ranking = document.querySelector(".stars");

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





//def. all all cards in DOM
const allCards = document.querySelectorAll(".card");

allCards.forEach(function(card) {
  card.addEventListener('click', function(){

    displayCard(card);
    addCardToCollection(card);
    //not click one more time the open cards
    if (currentOpenCards.length == 2) {
      if (currentOpenCards[0].innerHTML === currentOpenCards[1].innerHTML){
        matchCards(currentOpenCards[0], currentOpenCards[1]);
      } else {
        setTimeout(function() {
        hideCards(currentOpenCards[0], currentOpenCards[1]);
        removeCardFromCollection(card);
        }, 500);
      }
//TODO: 1. nie mozna klikac na juz otwarta kartę
//TODO: 2. nie mozna klikac na juz zmatchowane karty
    }
    if (openCards.length == 15) {
      endGame();
    }
    count += 1;
    console.log(openCards);
    console.log(currentOpenCards);

    console.log(count);

    generalScore.innerHTML = Number(dispalyScore());
  });

});


//function to show card
function displayCard(card){
   card.classList.add("open", "show");
 };

//function to add open card into the array (openCards)
function addCardToCollection(card){
  openCards.push(card);
  currentOpenCards.push(card);
}

//function to remove open card from the array (openCards)
function removeCardFromCollection(card){
  openCards.pop(card);
  openCards.pop(card);
  currentOpenCards=[];
}

//function to hide hard
function hideCards(card1, card2){
  card1.classList.remove("open", "show");
  card2.classList.remove("open", "show");
  //card.classList.remove("open", "show");
  currentOpenCards=[];
}

//do when two cards match
function matchCards(card1, card2){
  card1.classList.add("match");
  card2.classList.add("match");
  currentOpenCards=[];
}

function dispalyScore(){
  let generalScore;
  return generalScore += 1;
}
  //add open card into listener
 //push card into collection of open cards
/*
function addCard(card){
  openCards.push(card);
  currentOpenCards(card);
};
*/


//endGame function
//if all cards matched
function endGame() {
  // window.dialogArguments;
  // //window.showModalDialog("modal.htm", null, "width=200,height=200,left=300,modal=yes,alwaysRaised=yes", null);
  // // window.showModalDialog();
  // window.open("modal.htm", null, "width=200,height=200,left=300,modal=yes,alwaysRaised=yes", null);
  // alert
  // window.returnValue="end of the game!";

  //count stars li elements and convert them into asterix *
  const countStars = (ranking.innerHTML.match(/<li>/g) || []).length;

  if (confirm
    (`
    Congratulations! You win the game!
    Your score is:  ${count} moves.
    And your rating is: ${countStars}
    Are you wish to play again?
    `)) {
    console.log("koniec gry");
} else {
    // Do nothing!
}
}










/* another metdod to install addEventListener
document.addEventListener('click', function(el){
  if(el.target.nodeName==='LI'){
    console.log(el);
    console.log(el.target.);
  }
})
*/
