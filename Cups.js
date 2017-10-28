
// register the application module
b4w.register("Cups_main", function(exports, require) {

// import modules used by the app
var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_preloader = require("preloader");
var m_ver       = require("version");
var m_scenes  = require("scenes");
var m_tex = require("textures");

// detect application mode
var DEBUG = (m_ver.type() == "DEBUG");

// automatically detect assets path
var APP_ASSETS_PATH = m_cfg.get_assets_path("Cups");

/**
 * export the method to initialize the app (called at the bottom of this file)
 */
exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: DEBUG,
        console_verbose: DEBUG,
        autoresize: true
    });
}

/**
 * callback executed when the app is initialized 
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();

    // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

/**
 * load the scene data
 */
function load() {
    m_data.load(APP_ASSETS_PATH + "Cups.json", load_cb, preloader_cb);
}

/**
 * update the app's preloader
 */
function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

/**
 * callback executed when the scene data is loaded
 */
function load_cb(data_id, success) {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();

    // place your code here
	
	canvas.on('after:render', function(options) {
  	var buf = canvas2.getZoom();
	canvas2.setZoom(1);
	var dot = canvas2.getVpCenter();
	canvas2.absolutePan(new fabric.Point(0,0));
	var image = getImage(document.getElementById("c2"));
	var cube = m_scenes.get_object_by_name("cup");
	image.onload = function() {
    m_tex.replace_image(cube, "Texture.007", image);
	canvas2.absolutePan(new fabric.Point(dot.x - 1200,dot.y - 530));
	canvas2.setZoom(buf);
}
});
	
	
	
	
	/*function s (){
		var buf = canvas.getZoom();
	canvas.setZoom(1);
	var dot = canvas.getVpCenter();
	canvas.absolutePan(new fabric.Point(0,0));
	var image = getImage(document.getElementById("c"));
	var cube = m_scenes.get_object_by_name("cup");
	image.onload = function() {
    m_tex.replace_image(cube, "Texture.007", image);
	canvas.absolutePan(new fabric.Point(dot.x - 1200,dot.y - 530));
	canvas.setZoom(buf);
}
	
	}
	setInterval(s, 100)*/
	
}


});

// import the app module and start the app by calling the init method
b4w.require("Cups_main").init();


var canvas = new fabric.Canvas('c');
var canvas2 = new fabric.Canvas('c2');
canvas2.backgroundColor="e7e7e7";
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
	var buf = canvas2.getZoom();
	canvas2.setZoom(1);
	var dot = canvas2.getVpCenter();
	canvas2.absolutePan(new fabric.Point(0,0));
    var image = getImage(document.getElementById("c2"));
    saveImage(image);
	canvas2.absolutePan(new fabric.Point(dot.x - 1200,dot.y - 530));
	
	canvas2.setZoom(buf);}
	


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



canvas.on('after:render', function (e) {
  clon_canvas();
});

// doing some stuffs on 'canvas'
$(document).ready(function() {
            
    $('#clone').click(
      function(){canvas2.loadFromJSON(JSON.stringify(canvas), function(){canvas2.renderAll()}); })
});

function clon_canvas(){
	canvas2.loadFromJSON(JSON.stringify(canvas), function(){
		canvas2.backgroundColor="#E7E7E7";
		canvas2.renderAll()});
}



function deleteObjects(){
	var activeObject = canvas.getActiveObject(),
    activeGroup = canvas.getActiveGroup();
    if (activeObject) {
        
            canvas.remove(activeObject);
        
    }
    else if (activeGroup) {
       
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
            canvas.remove(object);
            });
        
    }
}





$('html').keydown(function(eventObject){ //отлавливаем нажатие клавиш
  if (event.keyCode == 46) { //если нажали Enter, то true

	deleteObjects();
  }
});