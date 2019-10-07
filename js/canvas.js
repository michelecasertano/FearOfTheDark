const canvas = document.getElementById('my-canvas');
console.log(canvas) // cool now we have the canvas

// the "context" is what you actually draw on -- you basically always need it
const ctx = canvas.getContext('2d');
console.log(ctx); // cool, our rendering context is set up

function makeX() {

  // "hey i'm about to draw a new line"
  ctx.beginPath()

  // "start the line here"
  ctx.moveTo(100, 100) // pass in coords starting from top left corner: x, then y.

  // "the line should end here"
  ctx.lineTo(300, 300)

  // you could style your stroke -- any valid CSS color value can go here
  ctx.strokeStyle = "blue";

  // this will "stick" until you change it 
  ctx.lineWidth = 6

  // "actually draw the line"
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 300);
  ctx.lineTo(300, 100);
  ctx.stroke();
  
}



function makeGrid(){
	// drawColumns 
	for(let i = 0; i <= canvas.width; i += 50){
		ctx.beginPath()
		ctx.moveTo(i,0)
		ctx.lineTo(i,canvas.height)
		ctx.stroke()
	}

	// drawRow
	for(let j = 0; j <= canvas.height; j += 50 ){
		ctx.beginPath()
		ctx.moveTo(0,j)
		ctx.lineTo(canvas.width,j)
		ctx.stroke()	
	}


}


function makeRectangles() {

  // make a rectangle outline -------

  // same as before....
  ctx.beginPath();

  // this is the method for rectangles of any shape
  // it takes 4 parameters, here they are in order
  // 1. x coord of the UPPER LEFT HAND CORNER of the rectangle
  // 2. y coord of the UPPER LEFT HAND CORNER of the rectangle
  // 3. width of rect
  // 4. height of rect
  ctx.rect(300, 300, 80, 180);

  // set styles
  ctx.strokeStyle = "maroon";
  ctx.lineWidth = 4;

  // actually draw an outline of a rectangle
  ctx.stroke();


  // Make a rectangle (filled in)! -------

  ctx.beginPath();
  ctx.rect(70, 120, 170, 40);

  // set the fill color 
  ctx.fillStyle = "green";

  // use fill instead of stroke to get shape filled in
  ctx.fill()
}

function clearCanvas(){
	ctx.clearRect(0,0,canvas.height,canvas.height)
}


document.getElementById('make-x').addEventListener('click', (event) => {
	console.log('make-x')
  makeX();
})
document.getElementById('make-grid').addEventListener('click', (event) => {
  makeGrid();
})
document.getElementById('make-rect').addEventListener('click', (event) => {
  makeRectangles();
})

document.getElementById('clear-canvas').addEventListener('click', (event) => {
  clearCanvas();
})





