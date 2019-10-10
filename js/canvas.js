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

const graphics = {
	menu(){
		console.log('in drawMenu')
		for (let row in map){
			for (let column = 0; column < map[row].length; column++){
				const elementValue = map[row][column]
				let width = 0
				let height = 0
				let x = parseInt(column)*gridWidth
				let y = row * gridHeight
				let color = ''
				let elementType = ''

				ctx.drawImage(pavement, x , y, pavementObj.width, pavementObj.height)

			}
		}

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

				const isBlockVisible = game.isVisible(parseInt(row), column)
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
			}

			// makeGrid()
		}
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






