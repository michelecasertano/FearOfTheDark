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
  if (buttonPressed(gamepad.buttons[15])) {
    game.moveHero(39)
  }
  if (buttonPressed(gamepad.buttons[14])) {
    game.moveHero(65)
  }
  if (buttonPressed(gamepad.buttons[12])) {
    game.moveHero(38)
  }
  if (buttonPressed(gamepad.buttons[13])) {
    game.moveHero(40)
  }
  
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);
