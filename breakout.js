const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 640,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload,
        create,
        update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        },
    }
};

const game = new Phaser.Game(config);

//Variables for objects
let ball, paddle;

//Variable to check if game is started or not
let gameStarted = false;

//Variable for keyboard input
let cursors;
//Set Score
let scoreText;
let score = 0;

let startGameText, gameOverText, gameWinText;



function preload() {
    //Ball
    this.load.image('ball', 'assets/Ball/Ball.png');
    //Paddle
    this.load.image("paddle", "assets/Paddle/50-breakout-Tiles.png");
    //Bricks
    this.load.image('yellowBrick', 'assets/Bricks/Yellow1.png');
    this.load.image('redBrick', 'assets/Bricks/Red1.png');
    this.load.image('blueBrick', 'assets/Bricks/Blue1.png');
    this.load.image('darkblueBrick', 'assets/Bricks/DarkBlue1.png');
    this.load.image('greenBrick', 'assets/Bricks/Green1.png');
    this.load.image('limeBrick', 'assets/Bricks/Lime1.png');
    this.load.image('purpleBrick', 'assets/Bricks/Purple1.png');
}

function create() {
    // Paddle
    paddle = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height - 50, "paddle").setScale(0.3);


    // Ball
    ball = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "ball").setScale(0.3);
    ball.setCollideWorldBounds(true);
    ball.setBounce(1,1);

    // Bricks
    yellowBricks = createBrickGroups(this, 'yellowBrick', 140);
    redBricks = createBrickGroups(this, 'redBrick', 180);
    darkblueBricks = createBrickGroups(this, 'darkblueBrick', 220);
    blueBricks = createBrickGroups(this, 'blueBrick', 260);
    greenBricks = createBrickGroups(this, 'greenBrick', 300);
    limeBricks = createBrickGroups(this, 'limeBrick', 340);
    purpleBricks = createBrickGroups(this, 'purpleBrick', 380);

    // Collisions
    this.physics.add.collider(ball, paddle, ballPaddleCollision);
    this.physics.add.collider(ball, [yellowBricks, redBricks, darkblueBricks, blueBricks, greenBricks, limeBricks, purpleBricks], hitBrick, null, this);

    // Input for paddle
    this.input.on("pointermove", function(pointer) {
        paddle.x = pointer.x;
    });

    // Scoring
    scoreText = this.add.text(this.cameras.main.width / 2, 100, "Points: 0", {
        font: "18px Arial",
        fill: "#0095DD",
    }).setOrigin(0.5);

    cursors = this.input.keyboard.createCursorKeys(); //Keyboard input, takes Up Down Left Right Space and Shift
    this.physics.world.checkCollision.down = false;

    //Text
    startGameText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Press SPACE to Start the Game',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        },
    );
    startGameText.setOrigin(0.5);

    gameOverText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'Game Over',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        },
    );
    
    gameOverText.setOrigin(0.5);
    
      // Make it invisible until the player loses
    gameOverText.setVisible(false);
    
      // Create the game won text
    playerWonText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'You won!',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '50px',
            fill: '#fff'
        },
    );
    
    playerWonText.setOrigin(0.5);
    
      // Make it invisible until the player wins
    playerWonText.setVisible(false);
}


function createBrickGroups(scene, key, y) {
    let bricksGroup = scene.physics.add.group({
        key: key,
        repeat: 14,
        setXY: {
            x: 280,
            y: y,
            stepX: 96
        },
        setScale: {
            x: 0.25,
            y: 0.33
        }
    
    });
    bricksGroup.children.iterate(function(child) {
        child.setImmovable(true); // Ensure bricks don't move when hit
        child.body.setAllowGravity(false); // Disable gravity for bricks
        child.body.setCollideWorldBounds(true); // Ensure bricks collide with world bounds
    });

    return bricksGroup;
}

function hitBrick(ball, brick) {
    brick.destroy();
    score += 100;
    scoreText.setText(`Points: ${score}`);


    if (ball.body.velocity.x == 0) {
        randNum = Math.random(); 
        if (randNum >= 0.5) {
            ball.body.setVelocityX(150);
        } else {
            ball.body.setVelocityX(-150); 
        }
    }
}

function ballPaddleCollision(ball, paddle) {
    let diff = ball.x - paddle.x;

    // Set a fixed upward velocity for the ball
    ball.setVelocityY(-300);
    ball.setVelocityX(10 * diff);

}

function gameWin() {
    return yellowBricks.countActive() + redBricks.countActive() +  darkblueBricks.countActive() + blueBricks.countActive() +  greenBricks.countActive() +  limeBricks.countActive() +  purpleBricks.countActive() == 0;
}


function update() {
    //Start Game
    if (!gameStarted) {
        ball.setX(paddle.x);
        

        //Gives Ball initial Y velocity when the Space key is pressed
        if (cursors.space.isDown) {   
            gameStarted = true;
            ball.setVelocityY(-200);
            startGameText.setVisible(false);
        }
    }
    
    // Game Over check
    if (ball.y > this.physics.world.bounds.height) {
        gameOverText.setVisible(true);
        ball.disableBody(true, true);
        // You can add game over logic here
    } else if (gameWin()) {
        gameWinText.setVisible(true);
        ball.disableBody(true, true);
    } else {

    }


    paddle.body.setImmovable(true);
    
}

    