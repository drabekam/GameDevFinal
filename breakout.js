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
let ball, yellowBricks, redBricks, darkblueBricks, blueBricks, greenBricks, limeBricks, purpleBricks, paddle;

//Set Score
let scoreText;
let score = 0;





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

    // Paddle
    paddle = this.add.sprite(      //Create Paddle
        this.cameras.main.width / 2,        //this.camera.main.width uses the the full width of the canvas, so divide by 2 to get half of screen
        this.cameras.main.height - 50,
        "paddle",
    );

    paddle.setScale(.3); //Scake paddle sprite to appropriate size
    
    
    //Ball
    ball = this.add.sprite(         //Create Ball
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,      //this.camera.main.height uses the the full height of the canvas, so divide by 2 to get half of screen
        "ball"
    );

    ball.setScale(0.3); //Scale ball


    // Bricks
    yellowBricks = createBrickGroups(this,'yellowBrick', 140);      //Creates bricks and calls createBrickGroups function to create each row 
    redBricks = createBrickGroups(this,'redBrick', 180);
    darkblueBricks = createBrickGroups(this,'darkblueBrick', 220);
    blueBricks = createBrickGroups(this,'blueBrick', 260);
    greenBricks = createBrickGroups(this,'greenBrick', 300);
    limeBricks = createBrickGroups(this,'limeBrick', 340);
    purpleBricks = createBrickGroups(this,'purpleBrick', 380);

    this.physics.add.collider(ball, yellowBricks, hitBrick, null, this);    //Adds collision to the bricks and calls the hitBrick function
    this.physics.add.collider(ball, redBricks, hitBrick, null, this);
    this.physics.add.collider(ball, darkblueBricks, hitBrick, null, this);
    this.physics.add.collider(ball, blueBricks, hitBrick, null, this);
    this.physics.add.collider(ball, greenBricks, hitBrick, null, this);
    this.physics.add.collider(ball, limeBricks, hitBrick, null, this);
    this.physics.add.collider(ball, purpleBricks, hitBrick, null, this);


    

    //Scoring
    scoreText = this.add.text(this.cameras.main.width / 2, 100, "Points: 0",{   //Adds the initial Score text to the top center of the screen
        font: "18px Arial",
        fill: "#0095DD",
    });
} // basic funtion that runs when everything is ready

function createBrickGroups(scene, key, y) {     //Uses the scene, key, and y value passed from the Create function to condense the creation of each row of bricks
    return scene.physics.add.group({
        key: key,
        repeat: 14,                             //Creates 15 Bricks total
        setXY: {
            x: 280,                                                
            y: y,                           
            stepX: 96                           //Space between each brick sprite
        },
        setScale: {                             //Scales the bricks to be an appropriate size
            x: 0.25,
            y: 0.33
        }
    })
}

function hitBrick(ball, brick) {        //Function for what to do after ball collision with brick
    brick.kill();                       //Removes the brick from screen

    //Updating Score
    Score += 100;                       //Adds 100 to the score for each brick
    scoreText.setText('Points: ${score}');      //Updates the score text
}


function isGameOveer(world) {
    return ball.body.y > world.bounds.height;
}


function update() {
    
  } // Basic function to update the frame NOTE* I kept these the same so for simplicity