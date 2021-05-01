const wrapper = document.querySelector('.wrapper')
musicImg = wrapper.querySelector('.img-area img')
musicName = wrapper.querySelector('.song-details .name')
musicArtist = wrapper.querySelector('.song-details .artist')
mainAudio = wrapper.querySelector('#main-audio')
playPauseBtn = wrapper.querySelector('.play-pause')
togglePlay = playPauseBtn.querySelector('#togglePlay')
prevBtn = wrapper.querySelector("#prev")
nextBtn = wrapper.querySelector("#next")
progressBar = wrapper.querySelector(".progress-bar")
progressArea = wrapper.querySelector(".progress-area")
repeatBtn = wrapper.querySelector('#repeat-plist')
expand = wrapper.querySelector('.expand');

let musicIndex = 1

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

// Music play function
function playMusic(){
    wrapper.classList.add('paused')
    mainAudio.play()
    togglePlay.innerText = 'pause'
}

// pause music function
function pauseMusic(){
    wrapper.classList.remove('paused')
    mainAudio.pause()
    togglePlay.innerText = 'play_arrow'
}

// Next music function
function nextMusic(){
    musicIndex++
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex 
    loadMusic(musicIndex)
    playMusic()
}

// prev music function
function prevMusic(){
    musicIndex--
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = 1 
    loadMusic(musicIndex)
    playMusic()
}
// Music play and pause event
playPauseBtn.addEventListener('click', ()=>{
    const isMusicPaused = wrapper.classList.contains('paused')
    isMusicPaused ? pauseMusic() : playMusic()
})

// Music next and preve btn 
nextBtn.addEventListener('click', ()=>{
    nextMusic()
})

// Music next and preve btn 
prevBtn.addEventListener('click', ()=>{
    prevMusic()
})

// Update progressbar according to the music current time
mainAudio.addEventListener('timeupdate', (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`


    let musicCurentTime = wrapper.querySelector('.current')
    let musicDuration = wrapper.querySelector('.duration')


    mainAudio.addEventListener('loadeddata', ()=>{
        // Updating song total duration
        let audioDuration = mainAudio.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if(totalSec < 10){
            totalSec = `0${totalSec}`
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`
    })

        // Update playing song current time
        let currentMin = Math.floor(currentTime / 60)
        let currentSec = Math.floor(currentTime % 60)
        if(currentSec < 10){
            currentSec = `0${currentSec}`
        }
        musicCurentTime.innerText = `${currentMin}:${currentSec}`

}) 

// Update playing song current duration after clicking progress area
progressArea.addEventListener('click', (e)=>{
    let progressWidthVal = e.target.clientWidth;
    let clickedOffsetX  = e.offsetX
    let songDuration = mainAudio.duration
    mainAudio.currentTime = (clickedOffsetX / progressWidthVal) * songDuration
    playMusic()

})

// Shuffle button functionality
repeatBtn.addEventListener('click', (e)=>{
    // Get the button innertext
    let getText = e.target.innerText
    // Changing value according button work
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute('title', 'Song Looped');
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute('title', 'Song Shuffled');
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            getText.setAttribute('title', 'Playlist Looped');
            break;
    }
})


expand.addEventListener('click', ()=>{
    document.querySelector('.music-list').classList.toggle('show')
})
document.getElementById('close').addEventListener('click', ()=>{
    document.querySelector('.music-list').classList.remove('show')
})