$(document).on('keydown',(e) => {
	const char = e.which
	game.moveHero(char)

	console.log(e.which)

})


$('#start-game').on('click',(e) => {
	game.start()
})