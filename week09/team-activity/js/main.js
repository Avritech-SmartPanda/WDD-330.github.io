// const audios = document.querySelector('.keys');
// console.log(audios)
let count = 10;

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    key.style.transform = `translateY(${count}px)`
    count += 10
    console.log(key.style.transform)
    if (count > 100) {
        key.style.transform = `translateY(0px)`
        count = 0
    }
    audio.currentTime = 0;
    audio.play();
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
