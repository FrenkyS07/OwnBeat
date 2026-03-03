const importBtn = document.querySelector('.btnSubmit');

importBtn.addEventListener('click', function(){
    const linkInput = prompt("Masukkan link YouTube:");

    if (linkInput) {
        const videoId = extractYouTubeID(linkInput);

        if(videoId) {
            alert('Lagu berhasil di import!');
        } else {
            alert('link Youtube tidak valid');
        }
    }
});

function extractYouTubeID(URL) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?\s*v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}