$(document).on('keydown',(e) => {
	const char = e.which
	game.moveHero(char)

})


$('#start-game').on('click',(e) => {
	game.start()
})