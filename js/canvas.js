// load the menu when the game starts
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const chest = new Image()
chest.src = enemyObj.src

const exit = new Image()
exit.src = exitObj.src

const brick = new Image()
brick.src = brickObj.src

const pavement = new Image()
pavement.src = pavementObj.src

const hero = new Image()
hero.src = heroObj.src

if (game.numberOfPlayers === 2 ){
	const hero2 = new Image()
	hero2.src = hero2Obj.src
}

const graphics = {
	drawMenu(){
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		setTimeout(() => {
			for (i = 0 ; i < 10 ; i ++) {
				for (j = 0; j < 10 ; j++){
					ctx.drawImage(pavement , i*60 , j*60, 60, 60)
				}
			}

		ctx.font = '80px VT323'
		ctx.fillStyle = 'white'
		ctx.textAlign = 'center'
		ctx.fillText('FEAR OF THE DARK', canvas.width/2,110)

		ctx.drawImage(hero, canvas.width/2 - 50/2, 160, 50, 50)

		ctx.font = '40px VT323'
		ctx.fillStyle = 'white'
		ctx.textAlign = 'center'
		ctx.fillText('Collect all treasures', canvas.width/2,300)
		ctx.fillText('and exit the room', canvas.width/2,350)

		ctx.font = '35px VT323'
		ctx.fillText('Use arrow keys to move', canvas.width/2,450)

		ctx.font = '55px VT323'
		ctx.fillStyle = 'white'
		ctx.fillText('Click anywhere to play', canvas.width/2,550)
		}, 50)

	},

	drawMap(){
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		const room = game.gameMap[game.gameMap.length - 1]
		const map = room.map
		const gridHeight = brickObj.height
		const gridWidth = brickObj.width
		
		//iterate on all rows
		for (let row in map){
			for (let column = 0; column < map[row].length; column++){

				const isBlockVisible = game.isVisible(parseInt(row), column) || game.isVisible2(parseInt(row), column)
				const elementValue = map[row][column]
				let width = 0
				let height = 0
				let x = parseInt(column)*gridWidth
				let y = row * gridHeight
				let color = ''
				let elementType = ''

				ctx.drawImage(pavement, x , y, pavementObj.width, pavementObj.height)

				switch (elementValue){
						case brickObj.value: {
							ctx.drawImage(brick, x , y, brickObj.width, brickObj.height)
							break}
						case enemyObj.value: {
						    elementType = enemyObj.elementType
						    break}
						case exitObj.value: {
							elementType = exitObj.elementType
							break}
					}

				if (isBlockVisible === false){
					color = nightObj.color
					ctx.beginPath()
					ctx.rect(x , y, gridWidth, gridHeight)
					ctx.fillStyle = color
					ctx.fill()
				}

				if (elementType === 'exit'){
					const xExit = x + (gridWidth - exitObj.width)/2
					const yExit = y + (gridHeight - exitObj.width)/2
					ctx.drawImage(pavement, x , y , pavementObj.width, pavementObj.height)
					ctx.drawImage(exit, xExit, yExit , exitObj.width, exitObj.height)
				}

				if (elementType === 'chest'){
					const xChest = x + (gridWidth - enemyObj.width)/2
					const yChest = y + (gridHeight - enemyObj.width)/2
					ctx.drawImage(pavement, x , y , pavementObj.width, pavementObj.height)
					ctx.drawImage(chest, xChest , yChest, enemyObj.width, enemyObj.height)
				}

				if (game.isHero(room,parseInt(row),column)){
					ctx.drawImage(hero, x, y, heroObj.width, heroObj.height)
				}

				if (game.numberOfPlayers === 2 && game.isHero2(room,parseInt(row),column)){
					ctx.drawImage(hero2, x, y, hero2Obj.width, hero2Obj.height)
				}
			}

			// makeGrid()
		}
	},

	drawGameOver() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (i = 0 ; i < 10 ; i ++) {
			for (j = 0; j < 10 ; j++){
				ctx.drawImage(pavement , i*60 , j*60, 60, 60)
			}
		}

		ctx.font = '140px VT323'
		ctx.fillStyle = 'white'
		ctx.textAlign = 'center'
		ctx.fillText('GAME OVER', canvas.width/2,canvas.height/2 + 20)


		ctx.font = '45px VT323'
		ctx.fillStyle = 'white'
		ctx.fillText('Click anywhere to play again', canvas.width/2,550)

	},
	
	makeGrid() {
		const gridHeight = brickObj.height
		const gridWidth = brickObj.width
	  
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1

	  // draw vertical lines
		for(let i = 0; i <= canvas.width; i += gridWidth) {
		  ctx.beginPath();
		  ctx.moveTo(i, 0);
		  ctx.lineTo(i, canvas.height);
		  ctx.stroke();
		}
		// draw horizontal lines
		for(let i = 0; i <= canvas.height; i += gridHeight) {
		  ctx.beginPath();
		  ctx.moveTo(0, i);
		  ctx.lineTo(canvas.width, i);
		  ctx.stroke();
		}
	}
}

graphics.drawMenu()






