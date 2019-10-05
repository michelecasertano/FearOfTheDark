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
		// [0,0,0,0,0,0,0,0,0,0],
		// [0,0,0,0,0,0,0,0,0,0],
		// [0,0,0,0,0,0,0,0,0,0],
		// [0,0,0,0,0,0,0,0,0,0],
		// [0,0,0,0,0,0,0,0,0,0],
		// [0,0,0,0,0,0,0,0,0,0],
		// [0,0,0,0,0,0,0,0,0,0],
		// [0,0,0,0,0,0,0,0,0,0],
		// [0,0,0,0,0,0,0,0,0,0],
		// [0,0,0,0,0,0,0,0,0,0],
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
		this.wallCoord = [];
		this.trapCoord = [];
		this.enemyCoord = [];
		this.doorCoord = [];
		this.visited = -1;

		// dictionary of values for the map
		this.unvisited = 0;
		this.wall = 1;
		this.trap = 2;
		this.enemy = 3;
		this.door = 4;
		this.hero = 5;

		// restrictions on the map elements
		this.maxNumberWalls = 4;
		this.minNumberWalls = 2;

		this.maxWallLength = 15;
		this.minWallLength = 5;

		this.maxWallCoverage = 0.2;



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
	gameMap: [],

	start(){
		mapGeneration.initiateRoom()
	},

	printRooms(){
		this.gameMap.forEach(function(room,i){
			console.log(`---- ROOM ${i} ----`)
			console.log(`col #: 0,1,2,3,4,5,6,7,8,9`)
			for (let j = 0; j < room.height; j++)
			console.log(`row ${j}: ${room.map[j]}`);
			console.log(`---- AVAIABLE SPOTS ROOM ${i} ----`)
			for (let row in room.mapAvailable){
				console.log(`row ${row}: ${room.mapAvailable[row]}`)
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
		this.createEmptyRoom(room)

		//in this first version, doors are added to left wall and right wall.
		//in expansion could be randomized.
		this.addDoors(room)
		// this.generateWalls(room)

		game.gameMap.push(room)
		console.log(game.printRooms())
	},

	// make the room empty assiging all cells value to zero.
	// Have the dimension of the room fix to 10 and 10
	createEmptyRoom(room){
		for (let i = 0; i < room.height; i++){
			const mapRow = []
			const mapAvailableRow = []
			for (let j = 0; j < room.width; j++){
				mapRow[j]=0
				mapAvailableRow[j] = j
			}
			room.map.push(mapRow);
			room.mapAvailable[i] = mapAvailableRow
		}
	},

	// This function adds the entrance and the exit door to the room.
	// Currently the function will add the entrance room on the left wall, and the 
	// exit door in the right door. This could be expanded to be on any room.
	// Not clear if doors could be on same wall. 

	addDoors(room){

		//find a random spot on the leftWall to assign a door.
		const entranceDoor = this.leftWallRandom(room)
		const yCoordEntrance = entranceDoor[0]
		const xCoordEntrance = entranceDoor[1]
		//update the map to have the entrance door
		this.updateMapValue(room, yCoordEntrance, xCoordEntrance, room.door)
		//remove the entrance coordinates from the available index map
		this.removeUsedIndex(room,yCoordEntrance,xCoordEntrance);

		//find a random spot on  the rightWall to assign a door.
		const exitDoor = this.rightWallRandom(room)
		const yCoordExit = exitDoor[0]
		const xCoordExit = exitDoor[1]
		//update the map to have the exit door
		this.updateMapValue(room, yCoordExit, xCoordExit, room.door)
		//remove the exit coordinates from the available index map
		this.removeUsedIndex(room,yCoordExit,xCoordExit);
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
		for (i = 0; i < numberOfWallSeeds; i++){
			// conditions to each for each wall individually
			// let spaceForBrick = true
			// let bricksUsedWall = 0 //each
			// let bricksArray = []


			// for each wall, pick a side of the map where to plant the wall seed
			let wallSide = Math.floor(Math.random()*4)
			// console.log('wallSide ',wallSide)
			let seedCoordinates = []
			switch(wallSide){
				case 0: {brickCoord = this.topWallRandom(room); break}
				case 1: {brickCoord = this.rightWallRandom(room); break}
				case 2: {brickCoord = this.bottomWallRandom(room); break}
				case 3: {brickCoord = this.leftWallRandom(room); break}
			}
			
			let bricksArray = []
			bricksArray.push(brickCoord)
			const bricksArrayBuildWall = this.buildWall(bricksArray, bricksUsedMap, room)
			bricksArray = []
			bricksArray = bricksArrayBuildWall

		}
	},

	buildWall(bricksArray, bricksUsedMap, room){
		console.log('in buildWall')
		// use bircksArray to build the wall on the map
		// Do I need to check at least the seed? I think so

		const bricksUsedWall = 0 // need to check - this is zero if seed is not ok. I might want to 
		// check if I can put the seed somehere else -> or probably kill it as an edge condition
		spaceForBrick= true // for now I assume this is true, but I know I need to check for the seed.
		// if there is not space for the seed, don't even start the recursion and pop the seed and assign it a value of -1;
		const countBricksTried = 0
		//for the first cycle, the first coordiantes to try are the bricksArray[0].
		//at the end of each recursion, I add the element to the array. If it does not work,
		//I pop the element and return the popped array
		const nextCoord  = bricksArray[bricksArray.length-1]
		brincksArray = []
		bricksArray = this.buildWallRecursion(bricksArray,bricksUsedWall, bricksUsedMap,countBricksTried,nextCoord,room)[0]
		// if (recursionArray !== undefined) {
		// 	bricksArray = []
		// 	bricksArray.push(recursionArray)
		// }

		return bricksArray
	},

	buildWallRecursion(bricksArray,bricksUsedWall, bricksUsedMap,countBricksTried,nextCoord, room){
		const yCoord = nextCoord[0]
		const xCoord = nextCoord[1]

		if(this.alreadyTried(room, yCoord, xCoord) === true) { bricksArray.pop; return bricksArray}
		if(this.bricksLeftInWarehouse(bricksUsedMap, room) === false) { bricksArray.pop(); return bricksArray}
		if(this.isWallShort(bricksUsedWall, room) === false) {bricksArray.pop(); return bricksArray}
		//to keep the algorhitm easier, I can only try an additional brick.
		//In future dev of this code, I could update it so it tries 4 bricks prior to stopping the wall.
		//therefore the following condition will never be achieved. 
		if(countBricksTried >= 4) {bricksArray.pop(); return bricksArray}
		// when I place a good brick, I need to udpate bircksUsedMap++, countrBricksTried = 0


		if(this.isOkBrick(yCoord,xCoord,room)){
			bricksUsedWall++
			bricksUsedMap++
			//select a next random brick
			nextCoord = []
			nextCoord = selectNextBrick(xCoord,yCoord,room)
			if (nextCoord === undefined) {return bricksArray}
			bricksArray.push(nextCoord)
			removeUsedIndex(room, yCoord, xCoord)
			updateMapValue(room, yCoord, xCoord, room.wall)
			return buildWallRecursion(bricksArray, bricksUsedWall, bricksUsedMap, countBricksTried, nextCoord, room)
		} else {
			updateMapValue(room, yCoord, xCoord, rooom.visited)
			return bricksArray.pop()
		}

		console.log('in buildWallRecursion')
		return []
	},

	//function checks if I have already tried to put a brick there.
	// returns true if I have. 
	alreadyTried(room, yCoord, xCoord){
		if(room.map[yCoord][xCoord] !== 0) return true
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
		brickValue = this.blockValue(room, brick1yCoord, brick1xCoord)
		if(brickValue === 1) bricksAround++
		console.log('brickValue 1: ',brickValue)
		console.log('bricksAround: ',bricksAround)

		const brick2yCoord = yCoord - 1
		const brick2xCoord = xCoord + 1
		brickValue = this.blockValue(room,brick2yCoord, brick2xCoord)
		if(brickValue === 1) bricksAround++
		console.log('brickValue 2: ',brickValue)
		console.log('bricksAround: ',bricksAround)
			
		const brick3yCoord = yCoord
		const brick3xCoord = xCoord + 1
		brickValue = this.blockValue(room,brick3yCoord, brick3xCoord)
		if(brickValue === 1) bricksAround++
		console.log('brickValue 3: ',brickValue)
		console.log('bricksAround: ',bricksAround)

		const brick4yCoord = yCoord + 1
		const brick4xCoord = xCoord + 1
		brickValue = this.blockValue(room,brick4yCoord, brick4xCoord)
		if(brickValue === 1) bricksAround++
		console.log('brickValue 4: ',brickValue)
		console.log('bricksAround: ',bricksAround)

		const brick5yCoord = yCoord + 1
		const brick5xCoord = xCoord
		brickValue = this.blockValue(room,brick5yCoord, brick5xCoord)
		if(brickValue === 1) bricksAround++
		console.log('brickValue 5: ',brickValue)
		console.log('bricksAround: ',bricksAround)

		const brick6yCoord = yCoord + 1
		const brick6xCoord = xCoord - 1
		brickValue = this.blockValue(room,brick6yCoord, brick6xCoord)
		if(brickValue === 1) bricksAround++
		console.log('brickValue 6: ',brickValue)
		console.log('bricksAround: ',bricksAround)

		const brick7yCoord = yCoord
		const brick7xCoord = xCoord - 1
		brickValue = this.blockValue(room,brick7yCoord, brick7xCoord)
		if(brickValue === 1) bricksAround++
		console.log('brickValue 7: ',brickValue)
		console.log('bricksAround: ',bricksAround)

		const brick8yCoord = yCoord - 1
		const brick8xCoord = xCoord - 1
		brickValue = this.blockValue(room,brick8yCoord, brick8xCoord)
		if(brickValue === 1) bricksAround++
		console.log('brickValue 8: ',brickValue)
		console.log('bricksAround: ',bricksAround)

		if(bricksAround <= 3) return true
			else return false
	},

	blockValue(room, yCoord, xCoord){
		// the first four statements check if the brick is outisid the matrix
		// if that is a acase, return 1, as I am at checking outsie the room.
		if(yCoord < 0) return 1
		if(xCoord < 0) return 1
		if(yCoord >= room.height) return 1
		if(xCoord >= room.width) return 1
		return room.map[yCoord][xCoord]
	},

	selectNextBrick(){

	},

	updateMapValue(room, yCoord, xCoord, blockValue){
		room.map[yCoord][xCoord] = blockValue;
	},
			// bricksArray.push(brickCoord)
			// bricksArray.push(brickCoord)
			// console.log(bricksArray)
			// console.log(bricksArray[1][0])


			// insert here code to plant seed and start germinating walls
			// check if seed is valid input, if it is, plant seed, otherwise, kill seed

			// I can treat the first brick just like the other bricks.
			// there are three things that need to happen:
			// 1. each brick needs to be in a space where brick can be placed: spaceForBrick
			// 2. there must be bricksLeft, meaning that bricks are not covering more than 20% of the 
			// game space: bricksLeft
			// 3. the wall is still less than the longest wall specified: smallWall
			// I check the conditions as soon as I enter the while loop

			// while(spaceForBrick && bricksLeft && smallWall){
				// // do the stuff
				// bricksLeft = this.checkBricksWarehouse(bricksUsedMap, room)
				// smallWall = this.checkWallSize(bricksUsedWall, room)
				// spaceForBrick = this.checkBrickSurroundings(brickCoord, room)
				// console.log(`bricksLeft = ${bricksLeft}`)
				// console.log(`smallWall = ${smallWall}`)


				// if all the conditions are ok -> place the brick
				// increase used bricks s
			// }


		// }
	// },

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
		const randomIndex = Math.floor(Math.random()*(room.mapAvailable[0].length));
		// console.log('random = ',randomIndex)
		const randomColumnIndex = room.mapAvailable[0][randomIndex]
		// console.log('value from RandomColumnTop ',randomColumnIndex)
		return [0, randomColumnIndex]
	},

	//select the index of a random column for the top row.
	//because this will always be the last row, I look at mapAvailable[room.height - 1]
	bottomWallRandom(room){
		// console.log('bottomRowRandom')
		const randomIndex = Math.floor(Math.random()*room.height)
		// console.log('random = ',randomIndex)
		const randomColumnIndex = room.mapAvailable[room.height - 1][randomIndex]
		// console.log('value from RandomColumnBottom ',randomColumnIndex)
		return [room.height - 1, randomColumnIndex]
	},

	// Function checks if there are bricks left to be placed on the map.
	// if there are bricks left, returns true. It maxWallCoverage has been reached, returns false
	bricksLeftInWarehouse(bricksUsedMap, room){
		if (bricksUsedMap <= Math.floor(room.width * room.height * room.maxWallCoverage)) return true
			else return false
	},
	
	// Function checks if wall is shorter than max allowed size for wall. 
	// If wall is shorter, returns true, otherwise returns false.
	isWallShort(bricksUsedWall, room){
		if (bricksUsedWall <= room.maxWallLength) return true
			else return false
	}

}




