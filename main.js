status="";
objects=[];
object_name="";

function setup(){
    canvas=createCanvas(350,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,350,420);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
       document.getElementById("status").innerHTML="Status:detetecting objects";
            fill("#E6E6FA");
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
            stroke("WHITE");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML=object_name+"Found";
                synth=window.speechSynthesis;
                utterthis=new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterthis);
            }
            else{
                document.getElementById("status").innerHTML=object_name+"Not Found"; 
            }

        }
    }

}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name=document.getElementById("object_name").value;

}

function modelLoaded(){
    console.log("Model Loaded");
   status=true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
      else{
          console.log(results);
          objects=results;
      }
   
}