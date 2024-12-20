// Referencias a elementos de HTML que se utilizan en el reproductor de musica

const image = document.getElementById('cover'), // Imagen de portada de la canción.
    title = document.getElementById('music-title'), // Título de la canción actual.
    artist = document.getElementById('music-artist'), // Artista de la canción actual.
    currentTimeEl = document.getElementById('current-time'), // Muestra el tiempo actual de reproducción.
    durationEl = document.getElementById('duration'), // Muestra la duración total de la canción.
    progress = document.getElementById('progress'), // Indicador de progreso.
    playerProgress = document.getElementById('player-progress'), // Área clicable de la barra de progreso.
    prevBtn = document.getElementById('prev'), // Botón para la canción anterior.
    nextBtn = document.getElementById('next'), // Botón para la siguiente canción.
    playBtn = document.getElementById('play'), // Botón de reproducir/pausar.
    background = document.getElementById('bg-img'); // Imagen de fondo.


const music = new Audio(); // Objeto de audio para reproducir la música


// Arrar de ojetos que van a representar las canciones, con metadatos y rutas de archivo
const songs = [
    {
        path: 'assets/Enemy.mp3', // La ruta del archivo y el nombre de la música
        displayName: 'Enemy wid JID', // Nombre para mostrar la canción
        cover: 'assets/arcane-portada.jpg', // Ruta de la imagen de portada
        artist: 'Imagine Dragons', // Nombre del artista o artistas
    },
    {
        path: 'assets/To ashes.mp3',
        displayName: 'To Ashes and Blood',
        cover: 'assets/arcane-portada.jpg',
        artist: 'WOOKID',
    },
    {
        path: 'assets/Get Jinxed.mp3',
        displayName: 'Get Jinxed',
        cover: 'assets/Jinx.jpg',
        artist: 'Djerv',
    },
    {
        path: 'assets/Sonne.mp3',
        displayName: 'Sonne',
        cover: 'assets/ram.png',
        artist: 'Rammstein',
    },
    {
        path: 'assets/Death Rattle.mp3',
        displayName: 'Death Rattle',
        cover: 'assets/death.png',
        artist: 'Miguel Angeles',
    }
    
];

let musicIndex = 0; // Indice de la cancion actual en el arrar
let isPlaying = false; // Es el estado de reproduccion

// Funcion para alternar entre los estados de reproduccion y pausa
function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

// Funcion para reproducir la cancion actual y actualiza la interfaz
function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause'); // Cambia el icono a pausa
    playBtn.setAttribute('title', 'Pausar'); // Actualiza el tooltip
    music.play(); // Reproduce la canción
}

// Funcion para pausar la cancion actual y actualiza la interfaz
function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play'); // Cambia el icono a reproducir
    playBtn.setAttribute('title', 'Reproducir'); // Actualiza el tooltip
    music.pause(); // Pausa la canción
}

// Funcion para cargar la cancion en el reproductor
function loadMusic(song){
    music.src = song.path; // Establece la fuente del audio
    title.textContent = song.displayName; // Actualiza el título mostrado
    artist.textContent = song.artist; // Actualiza el artista mostrado
    image.src = song.cover; // Actualiza la imagen de la cancion
    background.src = song.cover; // Actualiza la imagen de fondo
}

// Funcion para cambiar la cancion actual segun la direccion
// -1 para anterior, y 1 para siguiente
function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length; // Ajusta el indice dentro de los limites
    loadMusic(songs[musicIndex]); // Carga la nueva canción
    playMusic(); // Reproduce la canción
}

// Funcion para actualizar la barra de progreso y los tiempos durante la reproduccion
function updateProgressBar() {
    const { duration, currentTime } = music; // Obtiene la duración y el tiempo actual.
    const progressPercent = (currentTime / duration) * 100; // Calcula el porcentaje de progreso.
    progress.style.width = `${progressPercent}%`; // Actualiza el ancho de la barra de progreso.

    // Formatea el tiempo en formato MM:SS.
    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`; // Muestra la duración total.
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`; // Muestra el tiempo actual.
}

// Funcion para establecer la posicion de reproduccion segun la intereccion del usuario con la barra
// e es el evento CLIC
function setProgressBar(e){
    const width = playerProgress.clientWidth; // Obtiene el ancho total de la barra
    const clickX = e.offsetX; // Obtiene la posicion del clic
    music.currentTime = (clickX / width) * music.duration; // Actualiza la posicion de reproduccion
}

// Listeners para la interaccion del usuario y las actualizaciones de reproduccion
playBtn.addEventListener('click',togglePlay); // Altera entre pausa y play
prevBtn.addEventListener('click', () => changeMusic(-1)); // Es la cancion anterior
nextBtn.addEventListener('click', () => changeMusic(1)); // Es la cancion siguiente
music.addEventListener('ended', () => changeMusic(1)); // Reproduce automaticamente la siguiente cancion cuando termina la actual
music.addEventListener('timeupdate', updateProgressBar); // Actualiza la barra de progreso durante la reproduccion de la cancion
playerProgress.addEventListener('click', setProgressBar); // Permite busca dentro de la cancion

// Configurarcion inicial, cargara la primera cancion
loadMusic(songs[musicIndex]);

