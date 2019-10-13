$(document).on('keydown',(e) => {
	const char = e.which
	game.manageKeyboard(char)
	// game.moveHero(char)

})

$('#gameScreen').on('click',(e) => {
	game.manageClick()
})



