const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const chest = new Image()
chest.src = 'sprites/chest_full_open_anim_f0.png'
// chest.width = 140
// chest.height = 140

function drawMap(){
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	const room = game.gameMap[game.gameMap.length - 1]
	const map = room.map
	const gridHeight = brickObj.height
	const gridWidth = brickObj.width
	//iterate on all rows
	const y = 0

	for (let row in map){
		const x = 0
		for (let column = 0; column < map[row].length; column++){

			const isBlockVisible = game.isVisible(parseInt(row), column)
			const elementValue = map[row][column]
			let width = 0
			let height = 0
			let x = 0
			let y = 0
			let radius = 0
			let color = ''
			let elementType = ''

			//a square in the grid is as big as a brick
			if(isBlockVisible){
				switch (elementValue){
					case brickObj.value: {
						height = brickObj.height
						width = brickObj.width
						color = brickObj.color
						elementType=brickObj.elementType
						break}
					case enemyObj.value: {
						radius = enemyObj.radius
					    color = enemyObj.color;	
					    x = parseInt(column)*gridWidth + gridWidth/2
						y = row*gridHeight + gridHeight/2
					    elementType = enemyObj.elementType
					    break}
					case entranceObj.value: {
						height = entranceObj.height
						width = entranceObj.width
						color = entranceObj.color
						elementType = entranceObj.elementType
						break}
					case exitObj.value: {
						height = exitObj.height
						width = exitObj.width
						color = exitObj.color
						elementType = exitObj.elementType
						break}
					case triedForBrickObj.value	: console.log('ERRROR in map - should not be a 9')
					default	: {height = 0; width = 0; break;}
				}
			} else {
				height = gridHeight
				width = gridWidth
				color = nightObj.color
				elementType = nightObj.elementType

			}

			switch (elementValue){
					case enemyObj.value: {
						height = entranceObj.height
						width = entranceObj.width; color = enemyObj.color
						elementType = enemyObj.elementType
					    elementType = enemyObj.elementType
					    break}
					case entranceObj.value: {
						height = entranceObj.height
						width = entranceObj.width; color = entranceObj.color
						elementType = entranceObj.elementType
						break}
					case exitObj.value: {
						height = exitObj.height
						width = exitObj.width
						color = exitObj.color
						elementType = exitObj.elementType
						break}
					case triedForBrickObj.value	: console.log('ERRROR in map - should not be a 9')
				}

			// if (game.heroCoord[0] === parseInt(row) && game.heroCoord[1] === column){
			if (game.isHero(room,parseInt(row),column)){
				radius = heroObj.radius;
				color = heroObj.color;
				elementType = 'circle';

				x = parseInt(column)*gridWidth + gridWidth/2
				y = row*gridHeight + gridHeight/2
			}

			if (elementType === 'chest'){
				const x = parseInt(column)*gridWidth + (gridWidth - enemyObj.width)/2
				const y = row*gridHeight + (gridHeight - enemyObj.width)/2
				ctx.drawImage(chest, x , y, enemyObj.width, enemyObj.height)

			}

			if (elementType === 'block'){
				ctx.beginPath()
				ctx.rect(parseInt(column)*gridWidth,row*gridHeight,width, height)
				ctx.fillStyle = color
				ctx.fill()
			}

			if (elementType === 'circle'){
				ctx.beginPath()
				ctx.arc(x,y, radius, 0, Math.PI*2)
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




