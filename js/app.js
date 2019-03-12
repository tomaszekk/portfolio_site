//const modal = document.querySelector('.modal');
const win = document.querySelector('.modalWin-content');
const lost = document.querySelector('.modalLost-content');
// Enemies our player must avoid
var Enemy = function(x = -100, y = 0, speed = 200) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.stepH = 101;
    this.stepV = 83;
    this.x = x;
    //this.startY = this.stepV/2;
    this.y = y + this.stepV/2;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < this.stepH*5) {
      this.x += this.speed * dt;
    } else {
      this.x = -500;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor(){
    // def moves
    //step horizontal
    this.stepH = 101;
    //step vertical
    this.stepV = 83;
    //def. start position
    this.startX = this.stepH * 2;
    this.startY = this.stepV * 5 - this.stepV/2;
    this.x = this.startX;
    this.y = this.startY;

    this.sprite = 'images/char-cat-girl.png';
  }

  //render method
  //draw player from image and set starting position
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  update(){
    //check collision
    //checing enemies position
    //console.log("moja pozycja " + this.y);
    for(let enemy of allEnemies)
      if (this.y === enemy.y && (enemy.x + enemy.stepH*0.7 > this.x && enemy.x < this.x + this.stepH/2)) {
        //(this.x >= (enemy.x - enemy.stepH/3) || this.x <= (enemy.x + enemy.stepH/3){
        // console.log(`ta sama pozycja
        //   pozycja wroga ${enemy.x},
        // pozycja moja ${this.x}`);
        //alert(`End of the game! You lost!:((`);
        modal.classList.toggle('unhide');
        win.style.display ='none';
        lost.style.display ='block';
        this.reset();
      }

      if (this.y<this.stepV) {
        //alert(`Congrats! You won the game!!!`);
        modal.classList.toggle('unhide');
        lost.style.display = 'none';
        win.style.display = 'block';
        //win.cancelAnimationFrame(sessionId);
        //this.reset();
      } else {
        //sessionId = win.requestAnimationFrame(main);
      }

    }




  //handleInput method
  //react object to move upon keys
  handleInput(input) {
    switch(input) {
      case 'up':
        if (this.y > 0){
          this.y -= this.stepV;
        }
        break;
      case 'down':
        if (this.y < this.startY){
          this.y += this.stepV;
        }
        break;
      case 'left':
        if (this.x > 0) {
          this.x -= this.stepH;
        }
        break;
      case 'right':
        if (this.x < this.stepH * 4){
          this.x += this.stepH;
        }
        break;
    }
  }
  //resting player position after collision
  reset(){
    //reset player position to starting
    this.x = this.startX;
    this.y = this.startY;
    //win.requestAnimationFrame(main);
  }
}

// Now instantiate your objects.
let allEnemies=[];
// Place all enemy objects in an array called allEnemies

// random function for enemies' x (horizontal) position starting from - 101
function randomX() {
  let x = -101 * Math.floor(Math.random()*5);
  return x;
}

//random function for enemies' y (vertical) position between 0, 1, 2 rows
function randomY(){
  let y = 83 * Math.floor(Math.random()*3);
  return y;
}

//random functions for enemies' speed starting from 100-500 dt
function randomSpeed(){
  let speed = 50 + 100 * Math.floor(Math.random()*4);
  return speed;
}


const bug1 = new Enemy(randomX(), randomY(),randomSpeed());
const bug2 = new Enemy(randomX(), randomY(),randomSpeed());
const bug3 = new Enemy(randomX(), randomY(),randomSpeed());
const bug4 = new Enemy(randomX(), randomY(),randomSpeed());
const bug5 = new Enemy(randomX(), randomY(),randomSpeed());
allEnemies.push(bug1, bug2, bug3, bug4, bug5);

// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
