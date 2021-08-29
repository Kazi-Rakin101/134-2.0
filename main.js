status = "";
objects = [];
function setup()
{
    canvas = createCanvas(500,350);
    canvas.center();
    video.hide();
}

function preload()
{
    video = createVideo("video.mp4");
}

function draw()
{
    image(video,0,0,500,350);

    if(status!="")
    {
        objectDetector.detect(video,gotResult);
        for(i = 0; i < objects.lenght; i++)
        {
            document.getElementById("status").innerHTML = "Status: Detecting";
            document.getElementById("number_of _object").innerHTML = "Objects Detected"+objects.lenght;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100); 
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill(); 
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
    }
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
        console.log(results);
        objects = results;
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}