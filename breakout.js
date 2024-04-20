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


//Variables for objects
let ball, yellowBricks, redBricks, darkblueBricks, blueBricks, greenBricks, limeBricks, purpleBricks, paddle;

//Set Score
let scoreText;
let score = 0;


const game = new Phaser.Game(config);


function preload() {
    
    //Ball
    this.load.image('ball', 'assets/Ball/Ball.png');
    
    //Paddle
    this.load.image("paddle", "assets/Paddle/50-breakout-Tiles.png")

    //Bricks
    this.load.image('yellowBrick', 'assets/Bricks/Yellow1.png');
    this.load.image('redBrick', 'assets/Bricks/Red1.png');
    this.load.image('blueBrick', 'assets/Bricks/Blue1.png');
    this.load.image('darkblueBrick', 'assets/Bricks/DarkBlue1.png');
    this.load.image('greenBrick', 'assets/Bricks/Green1.png');
    this.load.image('limeBrick', 'assets/Bricks/Lime1.png');
    this.load.image('purpleBrick', 'assets/Bricks/Purple1.png');



  } // Basic function to preload the assest
function create() {
    // Bricks
    yellowBricks = createBrickGroups(this,'yellowBrick', 140);
    redBricks = createBrickGroups(this,'redBrick', 180);
    darkblueBricks = createBrickGroups(this,'darkblueBrick', 220);
    blueBricks = createBrickGroups(this,'blueBrick', 260);
    greenBricks = createBrickGroups(this,'greenBrick', 300);
    limeBricks = createBrickGroups(this,'limeBrick', 340);
    purpleBricks = createBrickGroups(this,'purpleBrick', 380);

    this.physics.add.collider(ball, yellowBricks, hitBrick, null, this);
    this.physics.add.collider(ball, redBricks, hitBrick, null, this);
    this.physics.add.collider(ball, darkblueBricks, hitBrick, null, this);
    this.physics.add.collider(ball, blueBricks, hitBrick, null, this);
    this.physics.add.collider(ball, greenBricks, hitBrick, null, this);
    this.physics.add.collider(ball, limeBricks, hitBrick, null, this);
    this.physics.add.collider(ball, purpleBricks, hitBrick, null, this);

    //Scoring
    scoreText = this.add.text(800, 100, "Points: 0",{
        font: "18px Arial",
        fill: "#0095DD",
    });
} // basic funtion that runs when everything is ready

function createBrickGroups(scene, key, y) {
    return scene.physics.add.group({
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
    })
}

function hitBrick(ball, brick) {
    brick.kill();

    //Updating Score
    Score += 100;
    scoreText.setText('Points: ${score}');
}


function isGameOveer(world) {
    return ball.body.y > world.bounds.height;
}


function update() {
    
  } // Basic function to update the frame NOTE* I kept these the same so for simplicity
