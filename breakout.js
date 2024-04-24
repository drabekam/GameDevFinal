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

//Set Score and initalizing the variables for it
let scoreText;
let score = 0;

function preload() {
    //preloading the Ball
    this.load.image('ball', 'assets/Ball/Ball.png');
    //preloading the Paddle
    this.load.image("paddle", "assets/Paddle/50-breakout-Tiles.png");
    //preload the Bricks
    this.load.image('yellowBrick', 'assets/Bricks/Yellow1.png');
    this.load.image('redBrick', 'assets/Bricks/Red1.png');
    this.load.image('blueBrick', 'assets/Bricks/Blue1.png');
    this.load.image('darkblueBrick', 'assets/Bricks/DarkBlue1.png');
    this.load.image('greenBrick', 'assets/Bricks/Green1.png');
    this.load.image('limeBrick', 'assets/Bricks/Lime1.png');
    this.load.image('purpleBrick', 'assets/Bricks/Purple1.png');
    //preloading the pwoerups
    this.load.image('FastPowerUp', 'assets/Powerups/42-Breakout-Tiles.png')
    this.load.image('DoublePointsPowerUp', 'assets/Powerups/45-Breakout-Tiles.png')
}

function create() {


    fetchTimeAndUpdateBackground(this);
    
    // creating the Paddle
    paddle = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height - 50, "paddle").setScale(0.3);
   

    // creating the Ball
    ball = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "ball").setScale(0.3);
    ball.setCollideWorldBounds(true);
    ball.body.setBounce(1);
    ball.setVelocity(300, -300); // Set initial velocity raised to make testing easier can edit here 

    // creating the bricks Bricks
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
    let pointsEarned = 100;
    if (doublePointsActive) { // if double points is active it multiplies that points by 2
        pointsEarned *= 2;
    }
    score += pointsEarned;
    scoreText.setText(`Points: ${score}`);

    if (Math.random() < 0.30) {  // 30% chance to spawn powerups moved from 10%
        spawnPowerUp(this, brick.x, brick.y); 
    }

}

function spawnPowerUp(scene, x, y) {
    let type = Math.random() < 0.5 ? 'FastPowerUp' : 'DoublePointsPowerUp';
    let powerUp = scene.physics.add.sprite(x, y, type);  
    powerUp.setGravityY(50);
    powerUp.setData('type', type);
    scene.physics.add.overlap(ball, powerUp, activatePowerUp, null, scene);
}
// function for activating powerups

function activatePowerUp(ball, powerUp) {
    let type = powerUp.getData('type');
    powerUp.destroy();

    if (type === 'DoublePointsPowerUp') {
        activateDoublePoints();
    } else if (type === 'FastPowerUp') {
        increaseBallSpeed();
    }
}

let doublePointsActive = false;
let doublePointsTimer;

function activateDoublePoints() {
    if (doublePointsActive) {
        clearTimeout(doublePointsTimer); // Reset timer if power-up is collected again
    }
    doublePointsActive = true;
    doublePointsTimer = setTimeout(() => {
        doublePointsActive = false;
    }, 20000); // Effect lasts for 20 seconds
}

let originalBallSpeed = { x: 200, y: -200 };

function increaseBallSpeed() {
    ball.setVelocity(originalBallSpeed.x * 1.25, originalBallSpeed.y * 1.25);
    setTimeout(() => {
        ball.setVelocity(originalBallSpeed.x, originalBallSpeed.y);
    }, 15000);
}


function ballPaddleCollision(ball, paddle) {
    let diff = ball.x - paddle.x;

   
    ball.setVelocityY(-300);
    ball.setVelocityX(10 * diff);

}

// api function

async function fetchTimeAndUpdateBackground(scene) { // an ansync function does not prevent the excution of other code while waiting on this
    const url = 'https://worldtimeapi.org/api/ip';  // Gets the time of day based on the IP address that is calling it
    try {
        const response = await fetch(url);
        if (!response.ok) { // this is checking the response and if it got one
            throw new Error('Failed to fetch the time');
        }
        const data = await response.json(); // This parses the response to get the utc tieme
        const dateTime = new Date(data.utc_datetime);
        const hours = dateTime.getUTCHours();

        // Setting background color based on time
        if (hours < 12) {
            scene.cameras.main.setBackgroundColor('#ADD8E6'); // Light blue for morning
        } else if (hours >= 12 && hours < 20) {
            scene.cameras.main.setBackgroundColor('#FFA500'); // Orange for afternoon
        } else {
            scene.cameras.main.setBackgroundColor('#00008B'); // Dark blue for night
        }
    } catch (error) {
        console.error('Error fetching or processing time:', error);
        scene.cameras.main.setBackgroundColor('#FFFFFF'); // Default to white on error to make it easier for error hanelding
    }
}



function update() {
    // Game Over check if the ball goes below the paddle
    if (ball.y > paddle.y + ball.displayHeight / 2) {
        this.physics.pause(); // Pause the physics for the game so that the bvall does not move anymore
        scoreText.setText(`GameOver! Final Score: ${score}`);
        scoreText.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
        scoreText.setOrigin(0.5);
    }


    paddle.body.setImmovable(true);
    
}

    
  