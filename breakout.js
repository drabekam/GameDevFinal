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



let ball, yellowBricks, redBricks, darkblueBricks, blueBricks, greenBricks, limeBricks, purpleBricks;


const game = new Phaser.Game(config);


function preload() {
    
    //Ball
    this.load.image('ball', 'assets/Ball/Ball.png');
    
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




  function update() {} // Basic function to update the frame NOTE* I kept these the same so for simplicity
