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
		//subset of available cells. Dimension of the matrix will change if a position is
		//removed from the array. the first element of the array is a string with 
		//the row number in it. This allows me to remove complete rows if necessary.
		this.mapAvailable = [];
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
		testMapAvailable = this.gameMap[0].mapAvailable
	},

	printRooms(){
		this.gameMap.forEach(function(room,i){
			console.log(`---- ROOM ${i} ----`)
			for (let i = 0; i < room.height; i++)
			console.log(room.map[i]);
		})
	},

	printAvailable(){
		this.gameMap.forEach(function(room,i){
			console.log(`---- AVAILABLE SPACE IN ROOM ${i} ----`)
			for (let i = 0; i < room.height; i++)
			console.log(room.mapAvailable[i]);
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
		game.gameMap.push(room)
		console.log(game.printRooms())
		console.log(game.printAvailable())
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
			//adding the row index to the mapAvailableRow
			mapAvailableRow.unshift('row ' + i)
			room.mapAvailable.push(mapAvailableRow)
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
		room.map[yCoordEntrance][xCoordEntrance] = room.door;
		//remove the entrance coordinates from the available index map
		this.removeUsedIndex(room,yCoordEntrance,xCoordEntrance);

		//find a random spot on  the rightWall to assign a door.
		const exitDoor = this.rightWallRandom(room)
		const yCoordExit = exitDoor[0]
		const xCoordExit = exitDoor[1]
		//update the map to have the exit door
		room.map[yCoordExit][xCoordExit] = room.door;
		//remove the exit coordinates from the available index map
		this.removeUsedIndex(room,yCoordExit,xCoordExit);
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
		if (room.mapAvailable[y].length === 1) room.mapAvailable.splice[y]
	},

	// this method can be used to test that only row with no left correct indexes are removed
	// removeUsedIndexTest(mapAvailable,y,x){
	// 	const row = mapAvailable[y]
	// 	const rowIndex = row.findIndex(function(element){
	// 		return (element === x)
	// 	})
	// 	mapAvailable[y].splice(rowIndex, 1)
	// 	//if the row has a single index, it means that it's only the string 
	// 	//with the row number. Therefore remove completely the row. 
	// 	if (mapAvailable[y].length === 1) {
	// 		console.log('about to remove a row from mapAvailable')
	// 		mapAvailable.splice(y,1)}
	// },


	// select a random spot from the left wall.
	// the function return the indexes to be used in the room map.
	// random number only selects rows that are available (i.e., still have cells)
	leftWallRandom(room){
		const randomRow = Math.floor(Math.random()*room.mapAvailable.length);
		const randomRowIndexString = room.mapAvailable[randomRow][0]
		// because the row index is stored as row #, I need to select the number and convert it to int from string
		const randomRowNumber = parseInt(randomRowIndexString[randomRowIndexString.length - 1])
		console.log('value from leftWallRandom -> ', [randomRow,0])
		return [randomRowNumber,0]
	},

	// select a random spot from the left wall.
	// the function return the indexes to be used in the room map.
	// random number only selects rows that are available (i.e., still have cells)
	rightWallRandom(room){
		const randomRow = Math.floor(Math.random()*room.mapAvailable.length);
		const randomRowIndexString = room.mapAvailable[randomRow][0]
		// because the row index is stored as row #, I need to select the number and convert it to int from string
		const randomRowNumber = parseInt(randomRowIndexString[randomRowIndexString.length - 1])
		console.log('value from rightWallRandom -> ', [randomRow,room.width - 1])
		return [randomRowNumber, room.width - 1]

	},

	topWallRandom(room){

	},

	bottomWallRandom(room){

	}
}


// this testMapAvailable can be used with removeUsedIndexTest to check
// that removeUsedIndex works correctly
// let testMapAvailable = []





