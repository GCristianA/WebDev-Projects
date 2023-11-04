
//declarari

let btnScreenshot=document.getElementById('btnScreenshot');
let btnVideoPlayPause=document.getElementById('btnVideoPlayPause');
let btnGrayscale=document.getElementById('btnGrayscale');
let btnNormal=document.getElementById('btnNormal');
let canvasEffects=document.getElementById('canvasEffects');
let btnEmboss=document.getElementById('btnEmboss')
let btnRotation=document.getElementById('btnRotation');
let btnBlackWhite=document.getElementById('btnBlackWhite');
let btnSephia=document.getElementById('btnSephia');
let btnMute=document.getElementById('btnMute')
let vid = document.getElementById("video");
let volumeup=document.getElementById('volumeup');
let volumedown=document.getElementById('volumedown');
let currentEffect="normal";
let link1 = document.getElementById('link1');
let video = document.getElementById("video");
let piesa=document.getElementById("piesa");
let link2=document.getElementById('link2');

// Obiecte JSON folosite pentru subtitrari

 subtitrare1={"text1":"Proiect Multimedia"}
 x=subtitrare1.text1;
 subtitrare2={"text2":"Tema 2-Video Player"}
 y=subtitrare2.text2;
 subtitrare3={"text3":"Proiect realizat de :Girvan Cristian"}
 z=subtitrare3.text3;

//button mute/unmute

btnMute.addEventListener('click',function(){
    if(vid.muted==false){
        vid.muted=true;
         } else{
             vid.muted=false;
         }
   });

//button volume up 

volumeup.addEventListener('click',function(){
if(video.volume<0.9){
    video.volume+=0.1;
}
else 
alert("Volumul este deja la 100!");

});

//button volume down

volumedown.addEventListener('click',function()
{
if(video.volume>0.1){
video.volume-=0.1;
}
else 
alert("Volumul este la 0!")
});

//realizarea subtitrari

hideTracks = function() {
for ( let i = 0; i < video.textTracks.length; i++) {
video.textTracks[i].mode = "hidden";
                }
                };
trackdisplay();
function trackdisplay(){
hideTracks();
            piesa = video.addTextTrack("captions", "English", "en");
                piesa.mode = "showing";
                piesa.addCue(new VTTCue(0, 5,x));
                piesa.addCue(new VTTCue(5, 10, y));
                piesa.addCue(new VTTCue(10, 16,z));    
        }

//butoane pentru inainte si inapoi in clip

link1.addEventListener("click", function (){

    video.currentTime =video.currentTime+ 10;}, false);

 link2.addEventListener("click", function () {
    video.currentTime = video.currentTime-10;}, false);

//butoane efecte video 

btnNormal.addEventListener('click',function(){
    currentEffect="normal";
});
btnGrayscale.addEventListener('click',function()
{
    currentEffect="grayscale";
});
btnEmboss.addEventListener('click',function()
{
currentEffect="emboss";
});
btnRotation.addEventListener('click',function()
{
currentEffect="rotation";
});
btnBlackWhite.addEventListener('click',function()
{
currentEffect="blackwhite";
});
btnSephia.addEventListener('click',function()
{
currentEffect="Sephia";
});

//button salvare imagine

btnScreenshot.addEventListener('click',function(){
    canvasScreenshot.width=video.clientWidth;
    canvasScreenshot.height=video.clientHeight;
   let context=canvasScreenshot.getContext('2d');
   context.drawImage(video,0,0);
});

//implementare diverse efecte video

function renderVideo()
{
    canvasEffects.width=video.clientWidth;
    canvasEffects.height=video.clientHeight;

    let context=canvasEffects.getContext('2d');

    context.drawImage(video,0,0);

    switch(currentEffect)
    {
        case "normal":
            break;
        case "grayscale":
          let imageData=context.getImageData(0,0,canvasEffects.width,canvasEffects.height);
          let data=imageData.data;

          for(let i=0;i<data.length;i++){
              let red=data[i];
              let green=data[i+1];
              let blue=data[i+2];
              let average=Math.round((red+green+blue)/3);
              data[i]=data[i+1]=data[i+2]=average;
              
          }
          context.putImageData(imageData,0,0);   
          break;
  

        case "rotation":
            let unghi = 3 * Math.PI / 180;
            let ct = Math.cos(unghi), st = Math.sin(unghi);
            let x = video.clientWidth / 3, y = video.clientHeight / 3;
            context.transform(ct, -st, st, ct, -x * ct - y * st + x, x * st - y * ct + y);
            context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
            break;

            case "Sephia":
          let imageDD=context.getImageData(0,0,canvasEffects.width,canvasEffects.height);
          let d=imageDD.data;

          for(let i=0;i<d.length;i++){
              let red=d[i]; 
              let green=d[i+1];
              let blue=d[i+2];
              let r= (red * .393) + (green *.769) + (blue * .189)
              let g=(red * .349) + (green *.686) + (blue * .168)
              let b=(red * .272) + (green *.534) + (blue * .131)
              d[i]=r;
              d[i+1]=g;
              d[i+2]=b;
          }
              imageDD.data=d;
              
              
          
          context.putImageData(imageDD,0,0); 


        case "emboss":
            let imageData2 = context.getImageData(0, 0, video.clientWidth, video.clientHeight);
            let pixels = imageData2.data;
            let imgDataWidth = imageData2.width;

            for (let i = 0; i < pixels.length; i++) {
                if (i % 4 != 3) {
                    pixels[i] = 127 + 2 * pixels[i] - pixels[i + 4] - pixels[i + imgDataWidth * 4];
                }
            }
            context.putImageData(imageData2, 0, 0);
         break;

        case"red":
        let imageData3=context.getImageData(0,0,canvasEffects.width,canvasEffects.height);
          let data3=imageData3.data;

          for(let i=0;i<data3.length;i++){
              let red=data3[i];
              let green=data3[i+1];
              let blue=data3[i+2];
              let rosu=1.1*red+2*green;
              data3[i]=rosu;
              data3[i+1]=rosu;
              data3[i+2]=rosu;
          }
          imageData3.data=data3;
          
          context.putImageData(imageData3,0,0); 

          case "blackwhite":
          let imageD=context.getImageData(0,0,canvasEffects.width,canvasEffects.height);
          let dat=imageD.data;

          for(let i=0;i<dat.length;i++){
              let red=dat[i]; 
              let green=dat[i+1];
              let blue=dat[i+2];
              let brightness = (3*red+4*green+blue)>>>3;
              dat[i]=brightness;
              dat[i+1]=brightness;
              dat[i+2]=brightness;
          }
              imageD.data=dat;
              
              
          
          context.putImageData(imageD,0,0); 
         
}
requestAnimationFrame(renderVideo);
}
 
requestAnimationFrame(renderVideo);

//button play/pause

btnVideoPlayPause.addEventListener('click',function(){
 if(video.paused){
     video.play();
      } else{
          video.pause();
      }
});