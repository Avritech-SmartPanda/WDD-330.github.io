





window.addEventListener("keydown", playAudio);

function playAudio(e){
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    
    if (key){
        key.classList.add('playing');
        moveKey(key);
        
    }
    if(audio){
        audio.currentTime = 0;
        audio.play();
        audio.addEventListener("ended", ()=> 
        key.classList.remove("playing"));
    }
}

const keysObject = document.querySelectorAll('.key');
keysObject.forEach(keyItem => {keyItem.count = 0;});

function moveKey(key) {
    if (key.count<100){
    key.count = (key.count+10);
    key.style.transform= "translateY("+ key.count+"px)";
    }
    else {
        key.count = 0;
        key.style.transform= "translateY(0)";
    }
}
    
//Another alternative to the if statement in the moveKey function 

// function moveKey(key) {
//     key.count = (key.count+1)%10;
//     let newPosition = key.count * 10;
//     key.style.transform= "translateY("+ newPosition+"px)";
// }
        


    


