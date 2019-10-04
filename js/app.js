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
	constructor(inputWidth, inputHeight){
		// mapCoord leveraged to put room in the map
		this.mapCoord = [];
		// Room could be potentially of any size. To make it easier, set it to 10x10
		this.width = inputWidth;
		this.height = inputHeight;
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
		// when walls, obstacles, enemies are added using a code as specified in the object
		// named const elementDictionary.
		// each element is also stored in separete array -> I might not need this.
		this.map = [[]];
		this.wallCoord = [[]];
		this.trapCoord = [[]];
		this.enemyCoord = [[]];
		this.doorCoord = [[]];
	}

	// printRoom helps print a room to console to make debugging easier
// 	printRoom(){
// 		for(let j = 0; j < this.height; j++){

// 		}
// 	}
}


// create the elemenentDictionary object 


// game object is in charge of starting and managing the game

const game = {
	// map holds all the object rooms that were created, including the coordinates.
	// in the first version of the game (single room), a single row will be created.
	// map = [[{room object}, x coordinate of the room, y coordiante of the room]].
	// Because in the initial version I am only using a straght line of room,
	// I simplified it to be an array of objects.
	// map: [[{},0,0]]
	map: [],

	start(){
		mapGeneration.initiateRoom()
		console.log(this.map);
	}
}

// <-- MANIPULATING ROOM -->
// this object is in charge of creating the map.
// in the first version of the game, mapGeneration only creates a single room.

const mapGeneration = {
	// room: {}, -> i don't think I need this

	initiateRoom(){
		this.createEmptyRoom()
	},

	createEmptyRoom(){
		//initiate a room object and call it roomMap
		const room = new Room
		room.width = 10
		room.height = 10
		for (let i = 0; i < room.width; i++){
			for (let j = 0; j < room.height; j++){
				room.map[i,j] = 0
				console.log('creating a new room')
			}
		} 

		game.map.push(room)
		// assign the roomMap object to the key room in the mapGeneration object
		// create enough array of zero, as much as the max height and width specified.
		// currently hard coded
	}


}








