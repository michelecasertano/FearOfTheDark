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
		// named const elementDictionary
		this.map = [[]];
		this.wallMap = [[]];
		this.trapMap = [[]];
		this.enemyMap = [[]];
		this.doorMap = [[]];
	} 
}


// create the elemenentDictionary object 


// game object is in charge of starting and managing the game

const game = {
	// map holds all the object rooms that were created, including the coordinates.
	// in the first version of the game (single room), a single row will be created.
	// map = [[{room object}, x coordinate of the room, y coordiante of the room]]
	map: [[{},0,0]],

	start(){
		mapGeneration.initiateRoom()
	}
}

// <-- MANIPULATING ROOM -->
// this object is in charge of creating the map.
// in the first version of the game, mapGeneration only creates a single room.

const mapGeneration = {
	room: {},

	initiateRoom(){
		console.log('creating a room')
	}
}








