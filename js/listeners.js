$(document).on('keydown',(e) => {
	const char = e.which
	game.moveHero(char)

})

$('#gameScreen').on('click',(e) => {
	game.launch()
})