object = [];
Status = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.position(380, 250);
}

function start() {
    detection = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Real Time Objects..."
}

function modelLoaded() {
    console.log("Model has Loaded");
    video.speed(1);
    video.loop();
    video.volume(0);
    Status = true;
}

function gotResults(error, results) {
if(error) {
console.log(error);
}
console.log(results);
object = results;
}
function draw() {
    image(video, 0, 0, 300, 300);
    if(Status != "") {
        detection.detect(video, gotResults);
        for(i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects are Detected";
            document.getElementById("no_objects").innerHTML = "The Number of Objects detected:" + object.length;
             fill("red");
             percentage = floor(object[i].confidence * 100);
             text(object[i].label + " " + percentage + "%", object[i].x, object[i].y);
             noFill();
             stroke("red");
             rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
    
}