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
 
 
 
let ball, yellowBricks, redBricks, paddle;
 
 
const game = new Phaser.Game(config);
 
 
function preload() {
    // Scaling items for things that are ran in web browser
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.sacle.pageAlignVertically = true;
    // creating the paddle
    game.load.image("paddle", "assets/Paddle/50-breakout-Tiles.png")
    this.load.image('ball', 'assets/Ball/Ball.png');
    this.load.image('yellowBrick', 'assets/Bricks/Yellow1.png');
    this.load.image('redBrick', 'assets/Bricks/Red1.png');
 
    // note this might need to be game instead of this need to research but ran out of time
 
 
  } // Basic function to preload the assest
  
  
  function create() {
    //might need to add physics items here outisde of the items being loaded
 
    // Creating the paddle
 
    paddle = game.add.sprite(
        game.world.width * 0.5, // this is how to position the paddle
        game.world.height - 5,
        "paddle",
    );
    paddle.anchor.set(0.5,1);
    game.physics.enable(paddle, Phaser.Physics.arcade);
 
 
    yellowBricks = this.physics.add.group({
        key: 'yellowBrick',
        repeat: 9,
        setXY: {
            x:430,
            y: 140,
            stepX: 115
        },
        setScale: {
            x: 0.25,
            y: 0.33
        }
    });
    
 
  } // basic funtion that runs when everything is ready
  
  
  
  function update() {
    game.physics.arcade.collide(ball, paddle);
    // method of allowing paddle to move but will need to look into on sunday more
    paddle.x = game.input.x || game.world.wodth*0.5;
 
  } // Basic function to update the frame NOTE* I kept these the same so for simplicity