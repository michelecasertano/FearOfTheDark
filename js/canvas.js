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
			let color = ''

			// because of how this is coded, I would have to manually update each time I have
			// a new element. if I had an object with elementName, value, objectName, I could make
			// this flexible. For sake of semplicity I removed this complexity 

			switch (elementValue){
				case 1	: {height = brick.height; width = brick.width; color = brick.color; break;}
				case 3	:
				case 4	:
				case 9	:
				default	: {height = 0; width = 0; break;}
			}

			ctx.beginPath()
			ctx.rect(parseInt(column)*height,row*width,height,width)
			ctx.fillStyle = color
			ctx.fill()

		}
	}
}




