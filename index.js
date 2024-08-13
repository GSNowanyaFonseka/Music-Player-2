const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path:'media/1.mp3',
        displayName: 'See You Again',
        cover: 'images/1.jpg',
        artist: 'Wiz Khalifa ft Charlie Puth',
    },
    {
        path:'media/2.mp3',
        displayName: 'Let Her Go ',
        cover: 'images/2.jpg',
        artist: 'Passenger',
    },
    {
        path:'media/3.mp3',
        displayName: 'What Makes You Beautiful',
        cover: 'images/3.jpg',
        artist: 'One Direction',
    },
    {
        path:'media/4.mp3',
        displayName: 'Counting Starts',
        cover: 'images/4.jpg',
        artist: 'One Republic',
    },
    {
        path:'media/5.mp3',
        displayName: "Live While We're Young",
        cover: 'images/5.jpg',
        artist: 'One Direction',
    },
    {
        path:'media/6.mp3',
        displayName: 'Girls Like You',
        cover: 'images/6.jpg',
        artist: 'Maroon 5',
    },
    {
        path:'media/7.mp3',
        displayName: 'One Thing',
        cover: 'images/7.jpg',
        artist: 'One Direction',
    },
    {
        path:'media/8.mp3',
        displayName: 'Stereo Hearts',
        cover: 'images/8.jpg',
        artist: 'Gym Class Heroes',
    },
    {
        path:'media/9.mp3',
        displayName: 'I Want It That Way',
        cover: 'images/9.jpg',
        artist: 'Backstreet Boys',
    },
    {
        path:'media/10.mp3',
        displayName: 'Gotta Be you',
        cover: 'images/10.jpg',
        artist: 'One Direction',
    },
    
];

let musicIndex = 0;
let isplaying = false;

function togglePlay(){
    if(isplaying){
        pauseMusic();
    }
    else{
        playMusic()
    }
}

function playMusic(){
    isplaying = true;
    // change play button icon
    playBtn.classList.replace('fa-play','fa-pause');
    // set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play(); 
}

function pauseMusic(){
    isplaying = true;
    // change pause button icon
    playBtn.classList.replace('fa-pause','fa-play');
    // set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause(); 
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime}= music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time)=> String(Math.floor(time)).
    padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration; 
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click',setProgressBar);

loadMusic(songs[musicIndex]);
