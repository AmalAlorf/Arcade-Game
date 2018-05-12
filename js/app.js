// Enemies our player must avoid

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //Position the image on the canvas display by (x,y)
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    //use the beow methood to randomize the position of enemy 
    this.y = (getRandomNumber()) * 50;
    //declare speed property
    this.speed = (getRandomNumber()) * 120;
};
//////////////// function to get the random number for enemy speed and position//////
let getRandomNumber = function() {
    let random_Number = Math.floor((Math.random() * 3) + 1)
    return random_Number;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Get the Width of canvas and compare it with x
    let canvasWidth = 505;
    if (this.x >= canvasWidth) {
        this.x = 0;
        this.y = (getRandomNumber()) * 69;
    }
    this.x += this.speed * dt;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 410;
    this.speed = 90;
    this.win = 0;
    this.life = 5;
    this.lose = 0;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();
///////////reset the player properities except the life and speed and this function called in tow cases 
//1) when the player lose the life . 2)when the player out of boarder
Player.prototype.playerReset = function() {
    this.x = 200;
    this.y = 410;
    this.lose = 0;
    this.win = 0;
};
////////// this function resets the game once all lives are used up//////////////
Player.prototype.gameReset = function() {
    this.x = 200;
    this.y = 410;
    this.life = 5;
    this.win = 0;
    this.lose = 0;
};
///////when  the player touches the enemy ,he is automatically sent back to the beginningof the game .///////
Player.prototype.checkCollisions = function() {
    for (let i = 0; i < allEnemies.length; i++) {
        if ((allEnemies[i].x) <= this.x + 25 &&
            (allEnemies[i].x + 25) >= (this.x) &&
            (allEnemies[i].y) <= this.y + 25 &&
            (allEnemies[i].y + 25) >= (this.y)) {
            this.lose = 1;
            //decrease the life points of player when he lose the game //
            this.life -= 1;
            alert('Ohhh ,You lose! try again');
            this.playerReset();
        }
    }
};
///check if the player is win depending in y value /////
Player.prototype.checkIfWinner = function() {
    if (this.y <= 0) {
        this.win += 1;
        alert('Congratulation ! You win , Play again ');
    }
};
//check if the player out of border
Player.prototype.checkBorderForPlayer = function() {
    if (this.x <= 0 || this.x >= 470 || this.y <= 0 || this.y >= 500) {
        this.playerReset();
    }
};
//reset the game if the life is equal 0
Player.prototype.gameOver = function() {
    alert('Game Over!! Play again');
    this.gameReset();
}

//// update function check for player Collisions , player win and if the player putof boarder 
Player.prototype.update = function() {
    this.checkCollisions();
    if (this.lose === 0) {
        this.checkIfWinner();
        if (this.win === 1) {
            this.playerReset();
        } else {
            this.checkBorderForPlayer();
        }
    }
    // check if the life is equal 0 then the game is over
    if (this.life === 0 && this.win === 0) {
        this.gameOver();
    }
};
///////////////////
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
///////////////////
Player.prototype.handleInput = function(action_p) {
    if (action_p == 'left') {
        this.x -= this.speed;
    }
    if (action_p == 'right') {
        this.x += this.speed;
    }

    if (action_p == 'up') {
        this.y -= this.speed;
    }
    if (action_p == 'down') {
        this.y += this.speed;
    }

};
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