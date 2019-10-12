window.addEventListener("gamepadconnected", function(e) {
  game.gamepadStatus = 'connected'
  const gp = navigator.getGamepads()[e.gamepad.index];
  console.log("Gamepad connected from index %d: %s",
	e.gamepad.index, e.gamepad.id);
  gamepadHandler(e,true)
});


window.addEventListener("gamepaddisconnected", function(e) {
  game.gamepadStatus = 'disconnected'
  console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);
  gamepadHandler(e,false)
});


function menuControllerTimer(){
  const intervalId = setInterval(() => {
    if(game.gamepadStatus === 'disconnected') return false
    if (game.state === 'menu' || game.state === 'gameOver') gameLoop()
    else clearInterval(intervalId)
  },100)
}

menuControllerTimer()

const gamepads = {};

function gamepadHandler(event, connecting) {
  const gamepad = event.gamepad;

  if (connecting) {
    gamepads[gamepad.index] = gamepad;
  } else {
    delete gamepads[gamepad.index];
  }
}

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

function gameLoop() {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads) {
    return;
  }

  const gamepad = gamepads[0];
  const gamepad2 = gamepads[1]


  // 1st player buttons
  if(game.state === 'menu' && buttonPressed(gamepad.buttons[16])) {
    game.launch()
  }

  if(game.state === 'gameOver' &&buttonPressed(gamepad.buttons[16])) {
    game.launch()
  }

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

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);
