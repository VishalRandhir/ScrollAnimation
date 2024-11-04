
const canvas = document.querySelector('canvas'); 
const context = canvas.getContext("2d"); 
const frames={
    currentIndex: 0,
    maxIndex: 142,
};

let imagesLoaded =0;
const images=[];

function preLoadImages(){
    for(var i=1;i<=frames.maxIndex;i++){
       const imageURL =`./assets/01/ezgif-frame-${i.toString().padStart(3,"0")}.jpg`;
       const img = new Image();
       img.src=imageURL;
       img.onload=()=>{
            imagesLoaded++;
            if(imagesLoaded===frames.maxIndex){
                loadImages(frames.currentIndex);
                startAnimation()
            }
       }
       images.push(img)
    }
};

function loadImages(index){
    if(index>=0 && index<frames.maxIndex){
        const img = images[index];

        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;

        const scaleX=canvas.width/img.width;
        const scaleY=canvas.height/img.height;
        const scale = Math.max(scaleX,scaleY);

        const newWidth=img.width*scale;
        const newHeight=img.height*scale;

        const offsetX=(canvas.width-newWidth)/2;
        const offsetY=(canvas.height-newHeight)/2;

        context.clearRect(0,0,canvas.width,canvas.height);
        context.imageSmoothingEnabled="true";
        context.imageSmoothingQuality="high";
        context.drawImage(img,offsetX,offsetY,newWidth,newHeight);
        frames.currentIndex=index;

    }
};

function startAnimation(){
    var tl= gsap.timeline({
        scrollTrigger:{
            trigger:'.parent',
            start:"top top",
            scrub: 2,
            end:"bottom bottom",
        }
    })
    tl.to(frames,{
        currentIndex:frames.maxIndex,
        onUpdate: function(){
            loadImages(Math.floor(frames.currentIndex))
        }
    })
}
preLoadImages()

