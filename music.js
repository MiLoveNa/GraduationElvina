const songs = [
    "asset/runtuh.mp3",
    "asset/rumah.mp3",
    "asset/tanpa-pesan.mp3",
    "asset/nina.mp3",
    "asset/berlebihan.mp3",
    "asset/tuan.mp3",
    "asset/dear-diary.mp3",
    "asset/monolog.mp3"
];

// ambil data sebelumnya
let index = parseInt(localStorage.getItem("songIndex")) || 0;
let currentTime = parseFloat(localStorage.getItem("songTime")) || 0;
let isPlaying = localStorage.getItem("isPlaying") === "true";

let audio = new Audio(songs[index]);
audio.volume = 0.3;

// set posisi terakhir
audio.currentTime = currentTime;

// play kalau sebelumnya play
if (isPlaying) {
    audio.play().catch(() => {});
}

// klik pertama (biar browser izinkan)
document.addEventListener("click", () => {
    audio.play().then(() => {
        localStorage.setItem("isPlaying", "true");
    }).catch(() => {});
}, { once: true });

// simpan waktu tiap 1 detik
setInterval(() => {
    localStorage.setItem("songTime", audio.currentTime);
}, 1000);

// kalau lagu selesai
audio.addEventListener("ended", () => {
    index++;
    if (index >= songs.length) index = 0;

    localStorage.setItem("songIndex", index);
    localStorage.setItem("songTime", 0);

    audio.src = songs[index];
    audio.play();
});