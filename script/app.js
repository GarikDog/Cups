var canvas = new fabric.Canvas('c');



$("#text").on("click", function(e) {
text = new fabric.Text($("#text").val(), { left: 100, top: 100 });
	  canvas.add(text);
});
$("#rect").on("click", function(e) {
  	rect = new fabric.Rect({
    left: 40,
    top: 40,
    width: 50,
    height: 50,      
    fill: 'transparent',
    stroke: 'green',
    strokeWidth: 5,
	
			  });  
  canvas.add(rect);
});

$("#circ").on("click", function(e) {
  	rect = new fabric.Circle({
    left: 40,
    top: 40,
    radius: 50,     
    fill: 'transparent',
    stroke: 'green',
    strokeWidth: 5,})
  canvas.add(rect);
});


var frame = new fabric.Rect({
    left: 0,
    top: 0,
    width: 2402,
    height: 1062,      
    fill: 'transparent',
    stroke: 'green',
    strokeWidth: 2,
	});  

canvas.add(frame);
frame.set('selectable', false)

//canvas.setZoom(canvas.getZoom()/2.2);
canvas.zoomToPoint(new fabric.Point(canvas.width / 25, canvas.height / 25), canvas.getZoom() /2.2);

$(function(){
   
    $('#zoomIn').click(function(){
        canvas.setZoom(canvas.getZoom() * 1.1 ) ;
		canvas.renderAll();

    }) ;
    
    $('#zoomOut').click(function(){
        canvas.setZoom(canvas.getZoom() / 1.1 ) ;
		canvas.renderAll();

    }) ;
    
    $('#goRight').click(function(){
        var units = 10 ;
        var delta = new fabric.Point(units,0) ;
        canvas.relativePan(delta) ;
    }) ;
    
    $('#goLeft').click(function(){
        var units = 10 ;
        var delta = new fabric.Point(-units,0) ;
        canvas.relativePan(delta) ;
    }) ;
    $('#goUp').click(function(){
        var units = 10 ;
        var delta = new fabric.Point(0,-units) ;
        canvas.relativePan(delta) ;
    }) ;
    
    $('#goDown').click(function(){
        var units = 10 ;
        var delta = new fabric.Point(0,units) ;
        canvas.relativePan(delta) ;
    }) ;
    
}) ;

var img = getImage(document.getElementById("c"));
document.getElementById('car').appendChild(img);
var img = getImage(document.getElementById("c"));
$("#car").attr("src",'12');
function im(){
var img = getImage(document.getElementById("c"));
$("#car").attr("src",'12');
}

function getImage(canvas){
	var imageData = canvas.toDataURL();
    var image = new Image();
	image.crossOrigin = "anonymous"
    image.src = imageData;
    return image;};
function saveImage(image) {
    var link = document.createElement("a");
    link.setAttribute("href", image.src);
    link.setAttribute("download", "canvasImage");
    link.click();}
function saveCanvasAsImageFile(){
	var buf = canvas.getZoom();
	canvas.setZoom(1);
	var dot = canvas.getVpCenter();
	canvas.absolutePan(new fabric.Point(0,0));
    var image = getImage(document.getElementById("c"));
    saveImage(image);
	canvas.absolutePan(new fabric.Point(dot.x - 1200,dot.y - 530));
	
	canvas.setZoom(buf);}
	
/*function sendimageServer(){
var imageData = canvas.toDataURL();
$.ajax({
  type: "POST",
  url: "script.php",
  data: { 
     imgBase64: dataURL
  }
}).done(function(o) {
  console.log('saved'); 
  // If you want the file to be visible in the browser 
  // - please modify the callback in javascript. All you
  // need is to return the url to the file, you just saved 
  // and than put the image in your browser.
});
}*/

document.getElementById('file').addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;                    
    fabric.Image.fromURL(data, function (img) {
      var oImg = img.set({left: 0, top: 0, angle: 0,width:100, height:100}).scale(0.9);
      canvas.add(oImg).renderAll();
      var a = canvas.setActiveObject(oImg);
      var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
    });
  };
  reader.readAsDataURL(file);
});