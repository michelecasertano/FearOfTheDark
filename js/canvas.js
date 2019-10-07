const canvas = document.getElementById('my-canvas');
console.log(canvas) // cool now we have the canvas

// the "context" is what you actually draw on -- you basically always need it
const ctx = canvas.getContext('2d');
console.log(ctx); // cool, our rendering context is set up

//try to make the following work on the first row
function drawMap(){
	ctx.clearRect(0,0,canvas.width,canvas.height)
	const room = game.gameMap[game.gameMap.length - 1]
	const map = room.map
	console.log(map, 'map')
	const gridHeight = brickObj.height
	const gridWidth = brickObj.width
	//iterate on all rows
	const y = 0
	for (let row in map){
		console.log("row# ",row)
		const x = 0
		for (let column = 0; column < map[row].length; column++){
			const elementValue = map[row][column]
			console.log(elementValue," elementValue")
			let width = 0
			let height = 0
			let radius = 0
			let color = ''
			let elementType = ''

			//a square in the grid is as big as a brick

			// because of how this is coded, I would have to manually update each time I have
			// a new element. if I had an object with elementName, value, objectName, I could make
			// this flexible. For sake of semplicity I removed this complexity 

			
			switch (elementValue){
				case 1	: {height = brickObj.height; width = brickObj.width; color = brickObj.color; elementType='block'; break;}
				case 3	: {radius = enemyObj.radius; color = enemyObj.color; elementType = 'circle'; break;}
				case 4	: {height = entranceObj.height; width = entranceObj.width; color = entranceObj.color; elementType = 'block'; break;}
				case 5	: {height = exitObj.height; width = exitObj.width; color = exitObj.color; elementType = 'block'; break;}
				case 9	:
				default	: {height = 0; width = 0; break;}
			}

			if (elementType === 'block'){
				ctx.beginPath()
				ctx.rect(parseInt(column)*gridWidth,row*gridHeight,width, height)
				ctx.fillStyle = color
				ctx.fill()
			}

			if (elementType === 'circle'){
				ctx.beginPath()
				ctx.arc(parseInt(column)*gridWidth + gridWidth/2, row*gridHeight + gridHeight/2, radius, 0, Math.PI*2)
				ctx.fillStyle = color
				ctx.fill()
			}

		}
		makeGrid()
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




