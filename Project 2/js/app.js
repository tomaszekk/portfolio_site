/*
 * Create a list that holds all of your cards
 */

 //initialization --TODO add to new function init!
 //function to generate cards on the deck with suffling cards
 function initGame(){

  //definition of all card for the game
  const cards = ["fa fa-diamond", "fa fa-diamond",
  "fa fa-paper-plane-o", "fa fa-paper-plane-o",
  "fa fa-anchor", "fa fa-anchor",
  "fa fa-bolt", "fa fa-bolt",
  "fa fa-cube", "fa fa-cube",
  "fa fa-leaf", "fa fa-leaf",
  "fa fa-bicycle", "fa fa-bicycle",
  "fa fa-bomb", "fa fa-bomb"
];

//function to generate all cards into one element
function generateCards(){
  const cardsHTML = document.createDocumentFragment();
  for (let card of shuffle(cards)){
    const newElementHTML = document.createElement("li");
    newElementHTML.classList.add("card");
    //TODO add unique identifier as we check cards later - compare uniquness
    newElementHTML.innerHTML = `<i class="${card}">`
    cardsHTML.appendChild(newElementHTML);
  }
  return cardsHTML;
};

//put cards into HTML
//def. deck

const cardsDeck = document.querySelector(".deck");
cardsDeck.appendChild(generateCards());

 }

initGame();
//TODO - poprawić restart!

//programining restart option to the repeat button
btnRepeatGame = document.querySelector(".fa-repeat");
//event listener to repeat button
btnRepeatGame.addEventListener("click", function(){
  const deckToRemove = document.querySelector(".deck");
  console.log(deckToRemove.childNodes);
  
  initGame();
});




//collection of open cards - only current!
//only 2 cards are open simultaneously!!!!
//open last cards - only max. two collection [0], [1]
 let currentOpenCards = [];

 //collection of all open cards inc. last two plus all matched
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
  card.addEventListener('click', function(evt){

    displayCard(card);
    addCardToCollection(card);
    
    
    //not click one more time the open cards
    if (currentOpenCards.length == 2 && !currentOpenCards[0].classList.contains("match") 
    && !currentOpenCards[1].classList.contains("match")) {
      if (currentOpenCards[0].innerHTML === currentOpenCards[1].innerHTML){
        matchCards(currentOpenCards[0], currentOpenCards[1]);
      } else {
        setTimeout(function() {
        hideCards(currentOpenCards[0], currentOpenCards[1]);
        removeCardFromCollection(card);
        }, 500);
      }
//TODO: 1. nie mozna klikac na juz otwarta kartę

    }
    ranking.innerHTML = calculateScore(count);
    if ((openCards.length == 15) && (openCards.classList.contains("match"))) {
      endGame();
    }
    //count += 1; - move counter to the function
    console.log(openCards);
    console.log(currentOpenCards);
    console.log(count);

    generalScore.innerHTML = dispalyScore();
  });

});


//function to show card
function displayCard(card){
   card.classList.add("open", "show");
 };

//function to add open card into the array (openCards)
function addCardToCollection(card){
  return openCards.push(card), currentOpenCards.push(card);
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

//SCORE & RATING
function dispalyScore(){
  count += 1;
  return count;
}
  //add open card into listener
 //push card into collection of open cards
/*
function addCard(card){
  openCards.push(card);
  currentOpenCards(card);
};
*/

//function to calculate score
function calculateScore(count){
  let HTMLtext;
  if (count < 20)
   return HTMLtext=
   `<li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li>`;
  else if (count >=20 && count <32) {
    return HTMLtext = 
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star-o"></i></li>`;
  } else if (count>=32 && count <50) {
    return HTMLtext = 
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star-o"></i></li>
    <li><i class="fa fa-star-o"></i></li>`
  } else {
    return HTMLtext = 
    `<li><i class="fa fa-star-o"></i></li>
    <li><i class="fa fa-star-o"></i></li>
    <li><i class="fa fa-star-o"></i></li>`
  }
}

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
  const countStars = (ranking.innerHTML.match(/<i class="fa fa-star">/g) || []).length;

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
