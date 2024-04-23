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

//Set Score
let scoreText;
let score = 0;

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
    ball.body.setBounce(1);
    ball.setVelocity(200, -200); // Set initial velocity

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

   
    if (ball.body.velocity.y > 0) {
        ball.setVelocityY(-200); 
    } else {
        ball.setVelocityY(200); 
    }
}


function ballPaddleCollision(ball, paddle) {
    let diff = ball.x - paddle.x;

    // Set a fixed upward velocity for the ball
    ball.setVelocityY(-300);
    ball.setVelocityX(10 * diff);

}



function update() {
    // Game Over check
    if (ball.y > this.physics.world.bounds.height) {
        console.log("Game Over");
        // You can add game over logic here
    }
  

    paddle.body.setImmovable(true);
    
}

    
  