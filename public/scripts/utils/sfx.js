// beep
const playBeepSound = () => {
    const focusAudio = new Audio('/audio/select_effect.wav');
    focusAudio.play();
};
// speel pokemon cry sfx of error sfx
const playCry = (fallback = true) => {
    let fallbackUsed = false;
    const audio = new Audio();
    audio.src = `https://play.pokemonshowdown.com/audio/cries/${window.location.pathname
        .split('/')
        .pop()}.mp3`;
    if (fallback) {
        audio.onerror = () => {
            if (fallbackUsed)
                return;
            fallbackUsed = true;
            const fallbackAudio = new Audio('/audio/whoops.wav');
            fallbackAudio.play();
        };
    }
    audio.play();
};
export { playBeepSound, playCry };
