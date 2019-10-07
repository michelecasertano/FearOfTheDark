$(document).on('keydown',(e) => {
	const char = String.fromCharCode(e.which)
	game.moveHero(char)

	console.log(String.fromCharCode(e.which))

})


$('#start-game').on('click',(e) => {
	game.start()
})