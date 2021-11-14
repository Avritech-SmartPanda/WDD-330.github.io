const canvasElement = document.getElementById('canvas');

const context = canvasElement.getContext('2d');
context.fillStyle = "#0c0"; // a green fill color


context.strokeStyle = "#ccc"; // a gray stroke color
context.lineWidth = 4;
//  drawing a filled-in rectangle
context.fillRect(10,10,200,100);
// drawing a rectangle that is not filled in
context.strokeRect(10,200,150,70);


/* draw a thick black T shape onto the canvas by moving to the
coordinates (130,50), then drawing a horizontal line 30 pixels long, and finally
moving to the middle of that line and drawing a vertical line 40 pixels long*/
context.beginPath();
context.moveTo(130, 50);
context.lineTo(180, 50);
context.moveTo(155, 50);
context.lineTo(155, 90);
context.strokeStyle = '#000';
context.lineWidth = 15;
context.stroke();


//  drawing a red circle of radius 40 pixels at center (300,300)
context.beginPath();
context.arc(300, 300, 40, 0, Math.PI * 2, false);
context.strokeStyle = '#f00';
context.lineWidth = 4;
context.stroke();

//  draw the text “Hello from Canvas” in blue at coordinates (20,300)
context.fillStyle = '#00c'; // a blue fill color
context.font = 'bold 26px sans-serif';
context.fillText('Hello from Canvas', 20, 300);
