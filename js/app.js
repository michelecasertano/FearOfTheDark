// <-- STORING MAP DATA (rooms, worlds, elements) -->

// class to be usped to create a now Room.
// currently game does not have ability to create complex worlds -> enter from left, out from right.
// in the future, important to add a 'coordinate?' and a world class

// class World = {
	// height and width of the world. Each cell can be a room
	// ensure that there is door continuity between room, or that rooms can only 
	// borde with a single other room.
//}

class Room {
	// this object needs to be initiated each time that a new room is created
	constructor(inputHeight,inputWidth){
		// mapCoord leveraged to put room in the map
		this.mapCoord = [];
		// Room could be potentially of any size. To make it easier, set it to 10x10
		this.width = inputWidth
		this.height = inputHeight
		//array in which the map is stored. 
		// An empty map looks like this
		// [
		// [ , , , , , , , , , ],
		// [ , , , , , , , , , ],
		// [ , , , , , , , , , ],
		// [ , , , , , , , , , ],
		// [ , , , , , , , , , ],
		// [ , , , , , , , , , ],
		// [ , , , , , , , , , ],
		// [ , , , , , , , , , ],
		// [ , , , , , , , , , ],
		// [ , , , , , , , , , ],
		// ]
		// when walls, obstacles, enemies are added using a code as specified in dictionatry below
		// each element is also stored in separete array -> I might not need this.
		
		//this.map = [height,width]
		this.map = [];
		//map available is a map of all the available indexes.
		//it allows me to reduce computational need, by only focusing on a 
		//subset of available cells. Dimension of the arrays will change if a position is
		//removed from the array. The key of the object is the row number.
		// This allows me to remove complete rows if necessary.
		this.mapAvailable = {};
		this.doorCoord = [];
		

		// dictionary and values for the map
		this.wall = brickObj.value;
		brickObj.height = canvas.height / this.height
		brickObj.width = canvas.width / this.width

		this.trap = 2;

		this.enemy = enemyObj.value;
		enemyObj.radius = 0.6*(canvas.height / this.height)/2 

		this.door = entranceObj.value;
		entranceObj.height = canvas.height / this.height
		entranceObj.width = canvas.width / this.width

		this.exit = exitObj.value
		exitObj.height = canvas.height / this.height
		exitObj.width = canvas.width / this.width

		this.hero = heroObj.value;
		heroObj.radius = 0.5*(canvas.height / this.height)/2 		


		this.visited = 9;

		// restrictions on the map elements
		this.maxNumberWalls = 12;
		this.minNumberWalls = 8;
		this.maxWallLength = 20;
		this.maxWallCoverage = 0.8;
		this.maxNumberBricks = Math.floor(this.width * this.height * this.maxWallCoverage)

		//restrictions on enemy 
		this.maxNumberOfEnemies = 12
		this.minNumberOfEnemies = 8

		//total number of Enemies
		this.totalEnemies = 0
		this.killedEnemies = 0

	}
}


// create the elemenentDictionary object 


// game object is in charge of starting and managing the game

const game = {
	// map holds all the object rooms that were created, including the coordinates.
	// in the first version of the game (single room), a single row will be created.
	// map = [[{room object}, y coordinate of the room, x coordiante of the room]].
	// Because in the initial version I am only using a straght line of room,
	// I simplified it to be an array of objects.
	// map: [[{},0,0]]
	doorsArray: [],
	gameMap:[],
	heroCoord:[],
	currentRoom: -1,
	timeLeft: 60,

	startTime(){
		const intervalId = setInterval(() => {
			console.log('timeLeft: ',this.timeLeft)
			if(this.isTimeOver()) {
				clearInterval(intervalId)
				//launchGameOver
				console.log('gameOver')
				return false 
			} else this.timeLeft --
		},1000)
	},

	isTimeOver(){
		if(this.timeLeft <= 0) return true
		return false 
	},

	start(){
		this.timeLeft = 60
		this.currentRoom++
		this.heroCoord = []
		this.startTime()
		mapGeneration.initiateRoom()
	},

	moveHero(char){
		
		if(this.isTimeOver()) return false

		const room = this.gameMap[this.currentRoom]
		let yHero = this.heroCoord[0]
		let xHero = this.heroCoord[1]
		let yHeroOld = this.heroCoord[0]
		let xHeroOld = this.heroCoord[1]

		switch(char){
			case 37: 
			case 65: {
				xHero--
				break;
			}
			case 38:
			case 87: {
				yHero--
				break;
			}
			case 39:
			case 68: {
				xHero++
				break;
			}
			case 40:
			case 83: {
				yHero++
				break;
			}
		}
			
		if(mapGeneration.outsideMap(room, yHero, xHero) === false &&
			room.map[yHero][xHero] !== 1	){
			this.heroCoord = [yHero, xHero]

			if(this.isEnemy(room, yHero, xHero)){
				room.killedEnemies++
				mapGeneration.updateMapValue(room, yHero, xHero, " ")
			}			
			
			if(this.isExit(room, yHero, xHero) && this.noMoreEnemies(room)){
				game.start()
			}

			drawMap()



		}
	},

	isVisible(y , x){
		if (Math.abs(y - this.heroCoord[0]) < 2 && Math.abs(x - this.heroCoord[1]) < 2) return true
		return false
	},

	isHero(room, y, x){
		if (this.heroCoord[0] === y && this.heroCoord[1] === x) return true
		return false
	},

	isEnemy(room, y , x){
		if (room.map[y][x] === enemyObj.value) return true
		return false 
	},

	isExit(room, y , x){
		if (room.map[y][x] === exitObj.value) return true
		return false 
	},

	noMoreEnemies(room){
		if (room.totalEnemies === room.killedEnemies) return true
		return false
	},

	printRooms(){
		this.gameMap.forEach(function(room,i){
			console.log(`---- ROOM ${i} ----`)
			console.log(`col #:  0,1,2,3,4,5,6,7,8,9`)
			console.log('       --------------------')
			for (let j = 0; j < room.height; j++)
			console.log(`row ${j}: |${room.map[j]}|`);
			console.log(`col #:  0,1,2,3,4,5,6,7,8,9`)
			console.log(`---- AVAIABLE SPOTS ROOM ${i} ----`)
			for (let row in room.mapAvailable){
				console.log(`row ${row}: |${room.mapAvailable[row]}|`)
			}

		})
	}
}

// <-- MANIPULATING ROOM -->
// this object is in charge of creating the map.
// in the first version of the game, mapGeneration only creates a single room.

const mapGeneration = {
	// room: {}, -> i don't think I need this
	
	initiateRoom(){
		// initiate a room object and call it room.
		const room = new Room(10,10)
		game.gameMap.push(room)
		console.log('game.gameMap: ',game.gameMap)
		this.createEmptyRoom(room)

		//in this first version, doors are added to left wall and right wall.
		//in expansion could be randomized.
		this.addDoors(room)
		this.generateWalls(room)
		this.addEnemies(room)
		this.addHero(room)
		this.cleanRoom(room)
		drawMap()

		// game.gameMap.push(room)
		// console.log(game.printRooms())
	},

	// make the room empty assiging all cells value to -
	createEmptyRoom(room){
		for (let i = 0; i < room.height; i++){
			const mapRow = []
			const mapAvailableRow = []
			for (let j = 0; j < room.width; j++){
				mapRow[j]= ' '
				mapAvailableRow[j] = j
			}
			room.map.push(mapRow);
			room.mapAvailable[i] = mapAvailableRow
		}
	},

	cleanRoom(room){
		for (let i = 0; i < room.height; i++){
			for (let j = 0; j < room.width; j++){
				if(room.map[i][j] === triedForBrickObj.value){
					this.updateMapValue(room,i,j,emptySpotObj.value)
				}
			}
		}
	},

	// This function adds the entrance and the exit door to the room.
	// Currently the function will add the entrance room on the left wall, and the 
	// exit door in the right door. This could be expanded to be on any room.

	addDoors(room){

		//find a random spot on the leftWall to assign a door.
		let yCoordEntrance = null
		let xCoordEntrance = null 

		if(game.doorsArray.length > 0){
			yCoordEntrance = game.doorsArray[game.doorsArray.length - 1].entrance[0]
			
			//game now has entrances left and right wall. 
			// logic for continuity in doors need to change if doors can be on any side.
			xCoordEntrance = 0
			console.log('yCoordEntrance: ', yCoordEntrance)
			console.log('xCoordEntrance: ', xCoordEntrance)
		} else {
			console.log('doorsArray is zero')
			entranceDoor = this.leftWallRandom(room)
			yCoordEntrance = entranceDoor[0]
			xCoordEntrance = entranceDoor[1]
			console.log('yCoordEntrance: ', yCoordEntrance)
			console.log('xCoordEntrance: ', xCoordEntrance)
		}
		
		//update the map to have the entrance door
		this.updateMapValue(room, yCoordEntrance, xCoordEntrance, room.door)
		//remove the entrance coordinates from the available index map
		this.removeUsedIndex(room,yCoordEntrance,xCoordEntrance);

		console.log('entrance coord: ',yCoordEntrance," ",xCoordEntrance)

		//find a random spot on  the rightWall to assign a door.
		const exitDoor = this.rightWallRandom(room)
		const yCoordExit = exitDoor[0]
		const xCoordExit = exitDoor[1]

		console.log('exit coord: ',yCoordExit," ",xCoordExit)


		const doorCoord = {
			roomNumber: game.gameMap.length,
			entrance: [yCoordEntrance, xCoordEntrance],
			exit:     [yCoordExit,xCoordExit]
		}

		console.log('doorCoord:', this.doorCoord)

		game.doorsArray.push(doorCoord)

		//update the map to have the exit door
		this.updateMapValue(room, yCoordExit, xCoordExit, room.exit)
		//remove the exit coordinates from the available index map
		this.removeUsedIndex(room,yCoordExit,xCoordExit);
	},

	addEnemies(room){
		const numberOfEnemies = Math.floor(Math.random()*(room.maxNumberOfEnemies - room.minNumberOfEnemies)) + room.minNumberOfEnemies
		room.totalEnemies = numberOfEnemies
		for (let i = 0; i < numberOfEnemies; i++){
			//select a random row to place an enemy
			const availableRows = Object.keys(room.mapAvailable)
			const randomRowKeyIndex = Math.floor(Math.random()*availableRows.length)
			const randomRow = availableRows[randomRowKeyIndex]
			const yCoordEnemy = parseInt(randomRow)

			//select random column to place enemy
			const availableSpotsInRow = room.mapAvailable[randomRow]
			const randomColumnIndex = Math.floor(Math.random()*availableSpotsInRow.length)
			const xCoordEnemy = availableSpotsInRow[randomColumnIndex]

			// console.log('randomRow: ', randomRow)
			// console.log('availableSpotsInRow: ', availableSpotsInRow)
			// console.log('xCoordEnemy: ',xCoordEnemy)
			// console.log('yCoordEnemy: ',yCoordEnemy)
			// console.log('room.Enemy: ',room.enemy)

			this.updateMapValue(room, yCoordEnemy, xCoordEnemy, room.enemy)
			this.removeUsedIndex(room,yCoordEnemy,xCoordEnemy);		
		}
	},

	addHero(room){
		game.heroCoord = game.doorsArray[game.doorsArray.length - 1].entrance
		// heroObj.gridCoord = game.heroCoord
		console.log(game.heroCoord," game.heroCoord")
	},

	generateWalls(room){
		// for the while loop conditions, I need to make sure that not to much wall is 
		// on the map. I do this with a variable called wallUsedMap. This variable
		// is updated within the for loop for each wall.
		let bricksUsedMap = 0

		const numberOfWallSeeds = Math.floor(Math.random()*
			(room.maxNumberWalls - room.minNumberWalls + 1)) + room.minNumberWalls
		// console.log(numberOfWallSeeds, ' random number of wall seeds')
		// for each random wall, build the wall
		// console.log('numberOfWallSeeds: ',numberOfWallSeeds)

		for (let i = 0; i < numberOfWallSeeds; i++){

			// for each wall, pick a side of the map where to plant the wall seed
			const wallSide = Math.floor(Math.random()*4)
			switch(wallSide){
				case 0: {brickCoord = this.topWallRandom(room); break}
				case 1: {brickCoord = this.rightWallRandom(room); break}
				case 2: {brickCoord = this.bottomWallRandom(room); break}
				case 3: {brickCoord = this.leftWallRandom(room); break}
			}
			
			this.buildWall(brickCoord, bricksUsedMap, room)

		}
	},

	buildWall(brickCoord, bricksUsedMap, room){
		
		// checks to make sure that not too many bricks are used in a single wall
		// each recursion is a single wall, so no need to re-assign it to zero 
		// during the recursion
		let bricksUsedWall = 0
		const nextCoordArray  = []
		nextCoordArray.push(brickCoord)

		//the first item that is passed to this function is a wallSeed.
		//this allows me to check that the seed is not placed next to other seeds.
		//this allows fringe situations that could make the maze unsolvable.

		const seedYcoord = brickCoord[0]
		const seedXcoord = brickCoord[1]

		//make sure that the seed is not on the door
		if(room.map[seedYcoord][seedXcoord] === 4){
			return false			
		}
		if(room.map[seedYcoord][seedXcoord] === 5){
			return false			
		}

		if (this.isSoloSeed(room,seedYcoord,seedXcoord)){
			// console.log('it is a solo seed')
			this.buildWallRecursion(bricksUsedWall, bricksUsedMap,nextCoordArray,room)
		} else {
			this.updateMapValue(room, seedYcoord, seedXcoord, room.visited)
			return false
		}
	},

	buildWallRecursion(bricksUsedWall, bricksUsedMap,coordArray, room){
		// console.log('in buildWallRecursion')
		
		if(coordArray.length === 0){return false} // this condition should never happen.
		
		const coord = coordArray.shift()
		const yCoord = coord[0]
		const xCoord = coord[1]
		// console.log('yCoord: ', yCoord)
		// console.log('xCoord: ', xCoord)

		// check if the block is on the entrance door 
		if(room.map[yCoord][xCoord] === 4){
			if (coordArray.length > 0) return this.buildWallRecursion(bricksUsedWall, bricksUsedMap, coordArray, room)
			return false			
		}
		if(room.map[yCoord][xCoord] === 5){
			if (coordArray.length > 0) return this.buildWallRecursion(bricksUsedWall, bricksUsedMap, coordArray, room)
			return false			
		}

		// check if the block is outside the map
		if(this.outsideMap(room,yCoord,xCoord)) {
			if (coordArray.length > 0) return this.buildWallRecursion(bricksUsedWall, bricksUsedMap, coordArray, room)
			return false
		}

		// check if I already tried to place a brick
		if(this.alreadyTried(room, yCoord, xCoord) === true) {
			this.buildWallRecursion(bricksUsedWall, bricksUsedMap, coordArray, room)
			return false
		}

		// check if there is still space for bricks, or bricks in general
		if(this.bricksLeftInWarehouse(bricksUsedMap, room) === false) { return false}
		if(this.isWallShort(bricksUsedWall, room) === false) { return false}
		
		
		
		// check if it is a valid brick, if it: update used bricks and maps,
		// run following recursion
		if(this.isOkBrick(room, yCoord,xCoord)){
			bricksUsedWall++
			bricksUsedMap++
			this.updateMapValue(room, yCoord,xCoord,room.wall)
			this.removeUsedIndex(room, yCoord, xCoord)
			const nextCoordArray = this.selectNextBrick(room, yCoord, xCoord)
			return this.buildWallRecursion(bricksUsedWall, bricksUsedMap, nextCoordArray, room)
		// if brick is not ok, update the map and
		// check if there are other positions to try.
		// If there are, re-run recursion.
		// If all positions tried, update map and exit recursion
		} else if (coordArray.length > 0) {
			this.updateMapValue(room, yCoord, xCoord, room.visited)
			return this.buildWallRecursion(bricksUsedWall, bricksUsedMap, coordArray, room)
		} else {
			this.updateMapValue(room, yCoord, xCoord, room.visited)
			return false
		}
	},

	// check if the wall seed is solo or surrounded by other walls.
	// not checking this condition could lead to an unsolvable maze
	isSoloSeed(room, yCoord, xCoord){
		// naming convention for surrounding bricks
		// where x is the brick that I am checking
		// |8|1|2| -> yCoord - 1
		// |7|x|3| -> yCoord
		// |6|5|4| -> yCoord + 1
		// -1 0 +1 -> change in xCoord

		const yCoord1 = yCoord - 1 
		const xCoord1 = xCoord
		const block1Value = this.blockValue(room,yCoord1,xCoord1)
		// console.log('block1Value: ',block1Value)
		if (block1Value !== 0) return false

		const yCoord2 = yCoord - 1 
		const xCoord2 = xCoord + 1
		const block2Value = this.blockValue(room,yCoord2,xCoord2)
		// console.log('block2Value: ',block2Value)
		if (block2Value !== 0) return false

		const yCoord3 = yCoord 
		const xCoord3 = xCoord + 1
		const block3Value = this.blockValue(room,yCoord3,xCoord3)
		// console.log('block3Value: ',block3Value)
		if (block3Value !== 0) return false

		const yCoord4 = yCoord + 1 
		const xCoord4 = xCoord + 1
		const block4Value = this.blockValue(room,yCoord4,xCoord4)
		// console.log('block4Value: ',block4Value)
		if (block4Value !== 0) return false

		const yCoord5 = yCoord + 1
		const xCoord5 = xCoord
		const block5Value = this.blockValue(room,yCoord5,xCoord5)
		// console.log('block5Value: ',block5Value)
		if (block5Value !== 0) return false

		const yCoord6 = yCoord + 1
		const xCoord6 = xCoord - 1
		const block6Value = this.blockValue(room,yCoord6,xCoord6)
		// console.log('block6Value: ',block6Value)
		if (block6Value !== 0) return false

		const yCoord7 = yCoord 
		const xCoord7 = xCoord - 1
		const block7Value = this.blockValue(room,yCoord7,xCoord7)
		// console.log('block7Value: ',block7Value)
		if (block7Value !== 0) return false

		const yCoord8 = yCoord - 1 
		const xCoord8 = xCoord - 1
		const block8Value = this.blockValue(room,yCoord8,xCoord8)
		// console.log('block8Value: ',block8Value)
		if (block8Value !== 0) return false

		return true

	},

	// check if block is inside the map
	outsideMap(room,yCoord,xCoord){
		// console.log('in outsideMap')
		if(yCoord < 0) return true
		if(xCoord < 0) return true
		if(yCoord >= room.height) return true
		if(xCoord >= room.width) return true

		return false
	},

	//function checks if I have already tried to put a brick there.
	// returns true if I have. 
	alreadyTried(room, yCoord, xCoord){
		if(room.map[yCoord][xCoord] !== ' ' ) return true
			else return false
	},

	// function checks if this spot is ok for brick. Returns ok it brick can be placed
	isOkBrick(room, yCoord, xCoord){
		let bricksAround = 0
		let brickValue = 0
		// naming convention for surrounding bricks
		// where x is the brick that I am checking
		// |8|1|2| -> yCoord - 1
		// |7|x|3| -> yCoord
		// |6|5|4| -> yCoord + 1
		// -1 0 +1 -> change in xCoord

		// if I am building a brick on the wall, the blockValue returned will be undefined
		// undefined is set to 1, as if the wall was a brick.
		// this will allow me to avoid situation as below (x is a block, - and | are walls)
		// -----------
		// |X  -> if I didn't count undefined, the value of surrounding 
		// | x    brick would be 1, making this position ok. BUT this is a closed loop
		// |xx    which can lead to back mazes 
		// I could try to solve it to have special edge condition for wall, but simplified
		// in this version of the maze building

		const brick1yCoord = yCoord - 1
		const brick1xCoord = xCoord
		brickValue1 = this.blockValue(room, brick1yCoord, brick1xCoord)
		if(brickValue1 === 1) bricksAround++

		const brick2yCoord = yCoord - 1
		const brick2xCoord = xCoord + 1
		brickValue2 = this.blockValue(room,brick2yCoord, brick2xCoord)
		if(brickValue2 === 1) bricksAround++
			
		const brick3yCoord = yCoord
		const brick3xCoord = xCoord + 1
		brickValue3 = this.blockValue(room,brick3yCoord, brick3xCoord)
		if(brickValue3 === 1) bricksAround++


		const brick4yCoord = yCoord + 1
		const brick4xCoord = xCoord + 1
		brickValue4 = this.blockValue(room,brick4yCoord, brick4xCoord)
		if(brickValue4 === 1) bricksAround++

		const brick5yCoord = yCoord + 1
		const brick5xCoord = xCoord
		brickValue5 = this.blockValue(room,brick5yCoord, brick5xCoord)
		if(brickValue5 === 1) bricksAround++

		const brick6yCoord = yCoord + 1
		const brick6xCoord = xCoord - 1
		brickValue6 = this.blockValue(room,brick6yCoord, brick6xCoord)
		if(brickValue6 === 1) bricksAround++

		const brick7yCoord = yCoord
		const brick7xCoord = xCoord - 1
		brickValue7 = this.blockValue(room,brick7yCoord, brick7xCoord)
		if(brickValue7 === 1) bricksAround++

		const brick8yCoord = yCoord - 1
		const brick8xCoord = xCoord - 1
		brickValue8 = this.blockValue(room,brick8yCoord, brick8xCoord)
		if(brickValue8 === 1) bricksAround++

		//ensuring that there are not other bordering walls in diagonal direction
		if(brickValue2 === 1 && brickValue1 === 0 && brickValue3 === 0) return false
		if(brickValue4 === 1 && brickValue3 === 0 && brickValue5 === 0) return false
		if(brickValue6 === 1 && brickValue5 === 0 && brickValue7 === 0) return false
		if(brickValue8 === 1 && brickValue1 === 0 && brickValue7 === 0) return false

		//ensuring that the brick is not closing the connection between two different walls
		if(brickValue1 === 1 && brickValue5 === 1) return false
		if(brickValue3 === 1 && brickValue7 === 1) return false 

		//ensuring that the wall is not reconnecting to the border
		if(this.outsideMap(room,brick1yCoord,brick1xCoord) && brickValue5 === 1) return false
		if(this.outsideMap(room,brick7yCoord,brick7xCoord) && brickValue3 === 1) return false
		if(this.outsideMap(room,brick5yCoord,brick5xCoord) && brickValue1 === 1) return false
		if(this.outsideMap(room,brick3yCoord,brick3xCoord) && brickValue7 === 1) return false 

		if(bricksAround < 3) return true
			else return false
	},

	blockValue(room, yCoord, xCoord){
		// console.log('in blockValue')
		// the first four statements check if the brick is outiside the matrix
		// if that is a acase, return 1, as I am at checking outsie the room.
		if(this.outsideMap(room, yCoord, xCoord)) return 0
		// if(this.outsideMap(room, yCoord, xCoord)) return 0	
		if(room.map[yCoord][xCoord] === 9  ) return 0
		if(room.map[yCoord][xCoord] === 4  ) return 0 //doors are checked with different logic
		if(room.map[yCoord][xCoord] === 5  ) return 0 //doors are checked with different logic
		if(room.map[yCoord][xCoord] !== ' ') return 1
		if(room.map[yCoord][xCoord] === ' ') return 0
			
		return (console.log('ERROR in blockValue'))
	},

	selectNextBrick(room, yCoord, xCoord){
		// console.log('in selectNextBrick')
		// Depending where the previous brick is, I need to limit the 
	    // possibilities for the next brick
		// Next brick coded as per below
		//   |1|   -> y - 1
		//  4|x|2 
		//   |3|   -> y + 1
		// -1   +1 -> x

		//Position naming convention
		//       topLeft(0)  topWall(1) topRight(2)
		//             ---------------------
		//             |X|2   4|x|2     4|x|
		//             |3|     |3|       |3|
		//             |      center(4)    |
		//             |1|     |1|       |1|  
		// leftWall(3) |x|2   4|x|2     4|X|  rightWall(5)    
		//             |3|     |3|       |3| 
		//             |                   |
		//             |1|     |1|       |1|
		//             |X|2   4|X|2     4|X|
		//             --------------------- 
		//     bottomLeft(6) bottomWall(7)  bottomRight (8)
		
		const currentPosition = this.brickPositionString(room, yCoord, xCoord)
		// console.log('currentPosition: ',currentPosition,' ',typeof(currentPosition))
		let availablePositions = 0
		const positionsArray = []
		switch (currentPosition){
			case 0 : { availablePositions = 2 ; positionsArray.push(2,3);     break; }
			case 1 : { availablePositions = 3 ; positionsArray.push(2,3,4);   break; }
			case 2 : { availablePositions = 2 ; positionsArray.push(3,4);     break; }
			case 3 : { availablePositions = 3 ; positionsArray.push(1,2,3);   break; }
			case 4 : { availablePositions = 4 ; positionsArray.push(1,2,3,4); break; }
			case 5 : { availablePositions = 3 ; positionsArray.push(1,3,4);   break; }
			case 6 : { availablePositions = 2 ; positionsArray.push(1,2);     break; }
			case 7 : { availablePositions = 3 ; positionsArray.push(1,2,4);   break; }
			case 8 : { availablePositions = 2 ; positionsArray.push(1,4);     break; }
			default: console.log('ERROR in switch currentBrickPosition')
		}

		// console.log(availablePositions, ' availablePositions')
		// console.log(positionsArray, ' positionsArray')


		const potentialPositions = this.shuffleArray(positionsArray)
		const nextCoordArray = []
		
		for (let i = 0; i < potentialPositions.length; i++){
			const nextCoord = []
			switch (potentialPositions[i]){
				case 1: {nextCoord.push(yCoord - 1, xCoord); break;}
				case 2: {nextCoord.push(yCoord, xCoord + 1); break;}
				case 3: {nextCoord.push(yCoord + 1, xCoord); break;}
				case 4: {nextCoord.push(yCoord, xCoord -1 ); break;}
				default: console.log('ERROR in nextBrickIndex')
			}
			nextCoordArray.push(nextCoord)
		}

		// console.log('---selectNextBrick---')
		// for (i = 0 ; i < nextCoordArray.length; i++){
		// 	console.log(nextCoordArray[i])
		// }
		return nextCoordArray

	},

	// shuffleArray is based on Durstenfeld solution of the Fisher-Yates shuffle
	// For more information about the Fisher-Yates approach: https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
	// Implementation as suggested per stackOverflow thread: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

	shuffleArray(array){
	    for (let i = array.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [array[i], array[j]] = [array[j], array[i]];
	    }
		return array
	},

	brickPositionString(room, yCoord,xCoord){
	// console.log('in brickPositionString')
	// console.log('yCoord: ',yCoord)
	// console.log('xCoord: ',xCoord)
	// console.log('room.height: ',room.height)
	// console.log('room.width', room.width)
	//Position naming convention
	//       topLeft(0)  topWall(1) topRight(2)
	//             ---------------------
	//             |X|2   4|x|2     4|x|
	//             |3|     |3|       |3|
	//             |      center(4)    |
	//             |1|     |1|       |1|  
	// leftWall(3) |x|2   4|x|2     4|X|  rightWall(5)    
	//             |3|     |3|       |3| 
	//             |                   |
	//             |1|     |1|       |1|
	//             |X|2   4|X|2     4|X|
	//             --------------------- 
	//     bottomLeft(6) bottomWall(7)  bottomRight (8)

	// Coordinates cheatsheet
	// topLeft:     0,0
	// topWall:     0, 0 < x < widht - 1
	// topRight:    0, widht - 1

	// leftWall:    0 < y <= height - 1, 0
	// center:      0 < y <= height - 1, 0 < x < width - 1
	// rightWall:   0 < y <= height - 1, width - 1

	// bottomLeft:  height - 1, 0
	// bottomWall:  height - 1, 0 < x < width - 1
	// bottomRight: height - 1, width - 1  

		if (yCoord === 0 && xCoord === 0) return 0
		if (yCoord === 0 && xCoord > 0 && xCoord < room.width - 1) return 1
		if (yCoord === 0 && xCoord === room.width - 1) return 2

		if (yCoord > 0 && yCoord < room.height - 1 && xCoord === 0 ) return 3
		if (yCoord > 0 && yCoord < room.height - 1 && xCoord > 0 && xCoord < room.width - 1) return 4
		if (yCoord > 0 && yCoord < room.height - 1 && xCoord === room.width - 1) return 5

		if (yCoord === room.height - 1 && xCoord === 0) return 6
		if (yCoord === room.height - 1 && xCoord > 0 && xCoord < room.width - 1) return 7
		if (yCoord === room.height - 1 && xCoord === room.width - 1) return 8

		console.log('ERROR in brickPositionString')
		return false
	},

	updateMapValue(room, yCoord, xCoord, blockValue){
		room.map[yCoord][xCoord] = blockValue;
	},

	//this function updates the available index map, by removing indexes that were 
	//already used. It take the room object and the coordinates of the index to remove
	removeUsedIndex(room,y,x){
		const row = room.mapAvailable[y]
		const rowIndex = row.findIndex(function(element){
			return (element === x)
		})
		room.mapAvailable[y].splice(rowIndex, 1)
		//if the row has a single index, it means that it's only the string 
		//with the row number. Therefore remove completely the row. 
		if (room.mapAvailable[y].length === 0) delete room.mapAvailable[y]
	},

	// select a random spot from the left wall.
	// the function return the indexes to be used in the room map.
	// random number only selects rows that are available (i.e., still have cells)
	leftWallRandom(room){
		const availableRows = Object.keys(room.mapAvailable)
		const randomRowKeyIndex = Math.floor(Math.random()*availableRows.length)
		const randomRow = availableRows[randomRowKeyIndex]
		// console.log('randomRow ',randomRow)
		// console.log('value from leftWallRandom -> ', [parseInt(randomRow),0])
		return [parseInt(randomRow),0]
	},

	// select a random spot from the left wall.
	// the function return the indexes to be used in the room map.
	// random number only selects rows that are available (i.e., still have cells)
	rightWallRandom(room){
		const availableRows = Object.keys(room.mapAvailable)
		const randomRowKeyIndex = Math.floor(Math.random()*availableRows.length)
		const randomRow = availableRows[randomRowKeyIndex]
			// console.log('randomRow ',randomRow)
			// console.log('value from RigthWallRandom -> ', [parseInt(randomRow),room.width - 1])
		return [parseInt(randomRow),room.width - 1]
	},

	//select the index of a random column for the top row.
	//because this will always be the first row, I look at mapAvailable[0]
	topWallRandom(room){
		// console.log('topWallRandom')
		const availableRows = Object.keys(room.mapAvailable)
		if(room.mapAvailable.hasOwnProperty(0) === false) return false

		const randomIndex = Math.floor(Math.random()*(room.mapAvailable[0].length));
		// console.log('random = ',randomIndex)
		const randomColumnIndex = room.mapAvailable[0][randomIndex]
		// console.log('value from RandomColumnTop ',randomColumnIndex)
		// console.log('topWallAvailable: ',room.mapAvailable[0])
		return [0, randomColumnIndex]
	},

	//select the index of a random column for the top row.
	//because this will always be the last row, I look at mapAvailable[room.height - 1]
	bottomWallRandom(room){
		console.log('in bottomRowRandom')
		if(room.mapAvailable.hasOwnProperty(room.height - 1) === false) return false
		const availableRows = Object.keys(room.mapAvailable)
		const randomIndex = Math.floor(Math.random()*(room.mapAvailable[room.height - 1].length))
		// console.log('random = ',randomIndex)
		const randomColumnIndex = room.mapAvailable[room.height - 1][randomIndex]
		// console.log('value from RandomColumnBottom ',randomColumnIndex)
		return [room.height - 1, randomColumnIndex]
	},

	// Function checks if there are bricks left to be placed on the map.
	// if there are bricks left, returns true. It maxWallCoverage has been reached, returns false
	bricksLeftInWarehouse(bricksUsedMap, room){
		if (bricksUsedMap <= room.maxNumberBricks) return true
			else return false
	},
	
	// Function checks if wall is shorter than max allowed size for wall. 
	// If wall is shorter, returns true, otherwise returns false.
	isWallShort(bricksUsedWall, room){
		if (bricksUsedWall <= room.maxWallLength) return true
			else return false
	}
}




