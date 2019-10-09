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

function drawMap(){
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
			let radius = 0
			let color = ''
			let elementType = ''

			ctx.drawImage(pavement, x , y, pavementObj.width, pavementObj.height)

			switch (elementValue){
					case brickObj.value: {
						elementType = brickObj.elementType
						break}
					case enemyObj.value: {
					    elementType = enemyObj.elementType
					    break}
					case exitObj.value: {
						elementType = exitObj.elementType
						break}
				}

			if (elementType === 'brick'){
				const y = row*gridHeight
				ctx.drawImage(brick, x , y, brickObj.width, brickObj.height)
			}

			if (elementType === 'chest'){
				x = parseInt(column)*gridWidth + (gridWidth - enemyObj.width)/2
				const y = row*gridHeight + (gridHeight - enemyObj.width)/2
				ctx.drawImage(chest, x , y, enemyObj.width, enemyObj.height)

			}

			if (elementType === 'exit'){
				const x = column*gridWidth + (gridWidth - exitObj.width)/2
				const y = row*gridHeight + (gridHeight - exitObj.width)/2
				ctx.drawImage(exit, x, y , exitObj.width, exitObj.height)
			}

			if (game.isHero(room,parseInt(row),column)){
				x = x
				y = row*gridHeight
				ctx.drawImage(hero, x, y, heroObj.width, heroObj.height)
			}

			if (isBlockVisible === false){
				color = nightObj.color
				ctx.beginPath()
				ctx.rect( column*gridWidth , row*gridHeight, gridWidth, gridHeight)
				ctx.fillStyle = color
				ctx.fill()
			}

		}

		// makeGrid()
	}
}

function makeGrid() {
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




