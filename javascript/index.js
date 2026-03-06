const buttonLink = document.getElementById('btnSubmit');
const boxMusic = document.getElementById('boxMusic');
const apiKey = 'AIzaSyA_DZA5Zcw8I4l0GxwAq-a4em7LU6DVZ_U';

buttonLink.addEventListener('click', async function () {
    const inputLink = prompt('Masukkan link Music.');

    if (inputLink) {
        const checkId = extractYouTubeID(inputLink);
        if (checkId) {
            try {
                const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${checkId}&part=snippet,contentDetails&key=${apiKey}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.items && data.items.length > 0) {
                    const videoInfo = data.items[0];

                    const judulLagu = prompt("Masukkan Judul Lagu:");
                    const tumbnail = `https://img.youtube.com/vi/${checkId}/hqdefault.jpg`;
                    const rawDuration = videoInfo.contentDetails.duration;
                    const cleanDuration = formatDuration(rawDuration);
                    boxMusic.style.display = "block";

                    const newSong = `
                    <div class="songList">
                    <img src="${tumbnail}" class="songCover" alt="songCover">
                    <div class="songInfo">
                            <span class="songTitle">${judulLagu}</span>
                            <span class="songDuration">${cleanDuration}</span>
                        </div>
                    </div>
                    `;

                    boxMusic.insertAdjacentHTML(`beforeend`, newSong);
                    alert("Lagu berhasil ditambahkan.");
                } else {
                    alert('Gagal ditambahkan!');
                }
            } catch (error) {
                console.error('Gagal mengambil APi', error);
            }
        } else {
            alert("Tidak Valid")
        }
    }
});

function extractYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?\s*v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function formatDuration(isoDuration) {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    let result = "";
    if (hours > 0) result += hours + ":";
    result += (hours > 0 ? minutes.toString().padStart(2, '0') : minutes) + ":";
    result += seconds.toString().padStart(2, '0');

    return result;
}