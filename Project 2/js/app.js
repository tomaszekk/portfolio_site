//author: Tomasz Konopka
//01.02.2019


/***********************
//1// GENERAL DEFINITION, MAIN PROGRAMME (init)
***********************/

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

  //def. all all cards in DOM
  let allCards = document.querySelectorAll(".card");

 //show raking on the web
  let ranking = document.querySelector(".stars");

 //INITIALIZATION
 //function to generate cards on the deck with suffling cards
 const cards = ["fa fa-diamond", "fa fa-diamond",
 "fa fa-paper-plane-o", "fa fa-paper-plane-o",
 "fa fa-anchor", "fa fa-anchor",
 "fa fa-bolt", "fa fa-bolt",
 "fa fa-cube", "fa fa-cube",
 "fa fa-leaf", "fa fa-leaf",
 "fa fa-bicycle", "fa fa-bicycle",
 "fa fa-bomb", "fa fa-bomb"
];
const cardsDeck = document.querySelector(".deck");

//start game = default init run functionality
initGame();

//objects DOM DEFINITIONS

//programining restart option to the repeat button
btnRepeatGame = document.querySelector(".fa-repeat");


/*********************
//2 Events Listeners
*********************/

//I moved addEventListener for a card (li element) to function initGame
//casue we need add addEvent every time we remove object by RESET or play again!
//MAIN PROGRAMME!
//take all cards from HTML - DOM
// allCards = document.querySelectorAll(".card");
//
// //MAIN PROGRAMME! we add event listener just in case we removed
// allCards.forEach(function(card) {
//   card.addEventListener('click', respondToTheClick);
// });


//event listener to repeat button
btnRepeatGame.addEventListener("click", function(){
  resetResults();
  initGame();
  //MAIN PROGRAMME!
  // allCards.forEach(function(card) {
  //   card.addEventListener('click', respondToTheClick);
  //   }
  // );
});



/*************************
//3 Functions' DEFINITIONS
**************************/

//function definition to initialize the game
//generate cards and apply addEventListener
function initGame(){
  //definition of all card for the game
//function to generate all cards into one element
function generateCards(){
  const cardsHTML = document.createDocumentFragment();
  for (let card of shuffle(cards)){
    const newElementHTML = document.createElement("li");
    newElementHTML.classList.add("card");
    newElementHTML.id=Math.random();
    //TODO add unique identifier as we check cards later - compare uniquness
    newElementHTML.innerHTML = `<i class="${card}">`
    //console.log(newElementHTML);
    cardsHTML.appendChild(newElementHTML);
    }
  return cardsHTML;
  };

  //put cards into HTML
  //def. deck
  cardsDeck.appendChild(generateCards());

  //take all cards from HTML - DOM
  allCards = document.querySelectorAll(".card");

  //MAIN PROGRAMME! we add event listener just in case we removed
  allCards.forEach(function(card) {
    card.addEventListener("click", respondToTheClick);
  });

  document.body("onmouseup", function(){

  });
  //reset counter moves - counting moves and rating
  count = 0;
  generalScore.innerHTML = "0";
  //reset ranking
  ranking.innerHTML = calculateScore(count);
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

//MAIN FUNCTION - MAIN PROGRAMME
//Used for Event listener for click on li (card)
//need reusable funtion for click for new elements li when restart!:)
function respondToTheClick(card){
  //console.log(card.target); -- show object
  //card.stopPropagation(); - not very helpful
  //console.log(currentOpenCards[0]);
  //console.log(card.target.id);
  //console.log(this.id);

  if (currentOpenCards[0] == null || currentOpenCards[1] == null ||
    !(currentOpenCards[0].id === currentOpenCards[1].id)){
    displayCard(card.target);
    addCardToCollection(card.target);
    //console.log("-------");
    //console.log(currentOpenCards[0].id);
    //console.log(currentOpenCards[1].id);
    //console.log(this);
    //not to click card one more time
    currentOpenCards[0].removeEventListener('click', respondToTheClick);

    //not click one more time the open cards
    if (currentOpenCards.length == 2 && !currentOpenCards[0].classList.contains("match")
    && !currentOpenCards[1].classList.contains("match")) {
      if (currentOpenCards[0].innerHTML === currentOpenCards[1].innerHTML){
        //if cards match use function to add class match and remove click event listener for cards
        matchCards(currentOpenCards[0], currentOpenCards[1]);
        this.removeEventListener('click', respondToTheClick);


      } else {
        //this.style.cursor ="hide";
        // document.querySelectorAll(".card").forEach(function(el){
        //   el.removeEventListener('click', respondToTheClick);
        // });
        setTimeout(function() {
        hideCards(currentOpenCards[0], currentOpenCards[1]);
        removeCardFromCollection(card.target);
        ;
      }, 300);
        currentOpenCards[0].addEventListener('click', respondToTheClick);
      }
      ranking.innerHTML = calculateScore(count);
    }
    //currentOpenCards[0].addEventListener('click', respondToTheClick);
    ranking.innerHTML = calculateScore(count);
    //count += 1; - move counter to the function
    //console.log(openCards);
    //console.log(currentOpenCards);
    //console.log(count);
  }
  generalScore.innerHTML = dispalyScore();
  //condition of the game end
  if ((openCards.length == 16) /*&& (openCards.classList.contains("match"))*/) {
    endGame();
  };
}


/****
helpful functions to the main programme
*/

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

//function to calculate score
function calculateScore(count){
  let HTMLtext;
  if (count < 26)
   return HTMLtext=
   `<li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li>
   <li><i class="fa fa-star"></i></li>`;
  else if (count >=26 && count <40) {
    return HTMLtext =
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star-o"></i></li>`;
  } else if (count>=40&& count <56) {
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
/****
end of helpful functions to the main programme
*/


//function reset all clicked cards!
function resetResults(){
  const cardsToRemove = document.querySelectorAll(".card");
  //console.log(cardsToRemove);
  cardsToRemove.forEach(function(el){
    el.remove();
  });
}

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
    And your rating is: ${countStars} star
    Are you wish to play again?
    `)) {
    resetResults();
    initGame();
} else {
    // Do nothing!
}
}









/*************************************
OTHER - not used
**************************************/

/* another metdod to install addEventListener
document.addEventListener('click', function(el){
  if(el.target.nodeName==='LI'){
    console.log(el);
    console.log(el.target.);
  }
})
*/
