const wrapper = document.querySelector('.wrapper')
musicImg = wrapper.querySelector('.img-area img')
musicName = wrapper.querySelector('.song-details .name')
musicArtist = wrapper.querySelector('.song-details .artist')
mainAudio = wrapper.querySelector('#main-audio')
playPauseBtn = wrapper.querySelector('.play-pause')
togglePlay = playPauseBtn.querySelector('#togglePlay');


let musicIndex = 2

window.addEventListener('load',()=>{
    loadMusic(musicIndex)
})

// Load music function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb -1].name
    musicArtist.innerText = allMusic[indexNumb - 1].artist
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`
}

// Music play and pause functions
function playMusic(){
    wrapper.classList.add('paused')
    mainAudio.play()
    togglePlay.innerText = 'pause'
}

function pauseMusic(){
    wrapper.classList.remove('paused')
    mainAudio.pause()
    togglePlay.innerText = 'play_arrow'
}

// Music play and pause event
playPauseBtn.addEventListener('click', ()=>{
    const isMusicPaused = wrapper.classList.contains('paused')
    isMusicPaused ? pauseMusic() : playMusic()
})