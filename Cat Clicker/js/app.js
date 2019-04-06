let cat = document.querySelectorAll('.catImg');
let counterText = document.querySelector('.counter');

//cats name init
document.getElementById('cat1name').innerHTML=`Lucy`;
document.getElementById('cat2name').innerHTML=`Pussy`;

// cat.addEventListener("click", (function() {
//   let counter = 0;
//   return function() {
//     counter +=1;
//     counterText.innerHTML = `${counter}`;
//     console.log(`${counter}`);
//   };
// })());

//let counter = 0;
cat.forEach(function(el) {
  el.addEventListener("click", (function() {
    let counter = 0;
    return function() {
    counter +=1;
    counterText.innerHTML = `${counter}`;
    console.log(`${counter}`);
  };
})());
});

//zbudowac liste kotow do wyboru
//funkcjonalnosc wyboru kota z listy
//nastepnie wrzucic kota i jego imie do wyswietlenia i obsluzyc klikiem
