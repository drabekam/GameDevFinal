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



let ball, yellowBricks, redBricks;


const game = new Phaser.Game(config);


function preload() {
    this.load.image('ball', 'assets/Ball/Ball.png');
    this.load.image('yellowBrick', 'assets/Bricks/Yellow1.png');
    this.load.image('redBrick', 'assets/Bricks/Red1.png');



  } // Basic function to preload the assest
  
  
  function create() {

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
  
  
  
  function update() {} // Basic function to update the frame NOTE* I kept these the same so for simplicity
