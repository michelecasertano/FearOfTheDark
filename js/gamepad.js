
//add listner for gamePad. Print status to console to check controller is connected
window.addEventListener("gamepadconnected", function(e) {
  game.gamepadStatus = 'connected'
  const gp = navigator.getGamepads()[e.gamepad.index];
  console.log("Gamepad connected from index %d: %s",
	e.gamepad.index, e.gamepad.id);
  gamepadHandler(e,true)
});

//add listner for gamePad. Print status to console to check controller is disconnected
window.addEventListener("gamepaddisconnected", function(e) {
  game.gamepadStatus = 'disconnected'
  console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);
  gamepadHandler(e,false)
});


//reads controller status while in menus
function menuControllerTimer(){
  const intervalId = setInterval(() => {
    if(game.gamepadStatus === 'disconnected') return false
    if (game.state !== 'play') gameLoop()
    else clearInterval(intervalId)
  },100)
}

// call previous function while state of game is not play.
// without this, controller would only work during game
menuControllerTimer()

// create object of gamepad objects
const gamepads = {};

// once a controller is connected, add the correspoding object to the gamepad object.
function gamepadHandler(event, connecting) {
  const gamepad = event.gamepad;

  if (connecting) {
    gamepads[gamepad.index] = gamepad;
  } else {
    delete gamepads[gamepad.index];
  }
}

// check that the button presses is a button of a connected gamepad
function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}


// check with button was pressed
function gameLoop() {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads) {
    return;
  }

  //access first and second gamepad
  const gamepad = gamepads[0];
  const gamepad2 = gamepads[1]


  // 1st player buttons
  if(game.state === 'menu' && buttonPressed(gamepad.buttons[16])) {
    graphics.drawPlayerSelection()
    setTimeout(() => {
        game.state = 'playerSelection'
      },500)
  }

  if(game.state === 'playerSelection' && (buttonPressed(gamepad.buttons[14]))) {
    setTimeout(() => {
      if(game.numberOfPlayers === 2) game.numberOfPlayers = 1
      else if(game.numberOfPlayers === 1) game.numberOfPlayers = 2
      graphics.drawPlayerSelection()
    },500)
  }

  if(game.state === 'playerSelection' && (buttonPressed(gamepad.buttons[15]))) {
    setTimeout(() => {
      if(game.numberOfPlayers === 2) game.numberOfPlayers = 1
      else if(game.numberOfPlayers === 1) game.numberOfPlayers = 2
      graphics.drawPlayerSelection()
    },500)
  }

  if(game.state === 'playerSelection' && (buttonPressed(gamepad.buttons[16]))) {
    game.launch()
  }

  if(game.state === 'gameOver' &&buttonPressed(gamepad.buttons[16])) {
    game.launch()
  }

  if(game.state === 'play'){
    if (buttonPressed(gamepad.buttons[15])) {
      game.moveHero(68)
    }
    if (buttonPressed(gamepad.buttons[14])) {
      game.moveHero(65)
    }
    if (buttonPressed(gamepad.buttons[12])) {
      game.moveHero(87)
    }
    if (buttonPressed(gamepad.buttons[13])) {
      game.moveHero(83)
    }

    if (gamepad.axes[0] < -0.25) {
      game.moveHero(65);
    } 
    if (gamepad.axes[0] > 0.25) {
      game.moveHero(68);
    } 

    if (gamepad.axes[1] < -0.25) {
      game.moveHero(87);
    } 
    if (gamepad.axes[1] > 0.25) {
      game.moveHero(83);
    } 
  
    // 2nd player buttons

    if (buttonPressed(gamepad2.buttons[15])) {
      game.moveHero(39)
    }
    if (buttonPressed(gamepad2.buttons[14])) {
      game.moveHero(37)
    }
    if (buttonPressed(gamepad2.buttons[12])) {
      game.moveHero(38)
    }
    if (buttonPressed(gamepad2.buttons[13])) {
      game.moveHero(40)
    }

    if (gamepad2.axes[0] < -0.25) {
      game.moveHero(37);
    } 
    if (gamepad2.axes[0] > 0.25) {
      game.moveHero(39);
    } 

    if (gamepad2.axes[1] < -0.25) {
      game.moveHero(38);
    } 
    if (gamepad2.axes[1] > 0.25) {
      game.moveHero(40);
    }  
  }
}

// gamepad listners
window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);
