// this file contains all the objects to be rendered on the map
// map referes to the code used in the matrix
// color is the color of the element on canvas
// height and width are the dimension of the sprite (updated depending on canvas size)
// elemenType used for visualization on canvas
// src is the sprite address for the object 

brickObj = {
	value: 1,
	color: 'coral',
	height: 0,
	width: 0,
	elementType: 'brick',
	src: 'sprites/wall_corner_front_left.png'
}

enemyObj = {
	value: 3,
	color: 'red',
	height: 0,
	width: 0,
	elementType: 'chest',
	points: 10,
	src: 'sprites/chest_full_open_anim_f0.png'
}

entranceObj = {
	value: 4,
	color: 'goldenRod',
	height: 0,
	width: 0,
	elementType: 'block'
}

exitObj = {
	value: 5,
	color: 'purple',
	height: 0,
	width: 0,
	elementType: 'exit',
	src: 'sprites/doors_leaf_closed.png'
}

heroObj = {
	value: 6,
	height: 0,
	width: 0,
	elementType: 'hero',
	src: 'sprites/knight_f_run_anim_f1.png'
}

hero2Obj = {
	value: 2,
	height: 0,
	width: 0,
	elementType: 'hero2',
	src: 'sprites/elf_f_run_anim_f1.png'
}

nightObj = {
	value: 7,
	color: 'rgba(00,00,00,0.8)',
	height: 0,
	width: 0,
	elementType: 'night'
}

triedForBrickObj = {
	value: 9
}

emptySpotObj = {
	value: " "
}

pavementObj = {
	height: 0,
	width: 0,
	src: 'sprites/floor_1.png'
}
