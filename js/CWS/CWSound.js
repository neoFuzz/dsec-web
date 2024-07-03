/* Converted from Java. Re-written to use Web Audio API */
(function (CWSYSTEM) {
    /**
     * CWSound class to handle audio context and audio clips.
     * Represents a sound manager.
     * @class
     * @memberof CWSYSTEM
     */
    class CWSound {
        /**
         * Creates an instance of CWSound.
         */
        constructor() {
            /**
             * The audio context used to manage and play audio.
             * @type {AudioContext}
             */
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            /**
             * A map to cache audio clips.
             * @type {Map<string, AudioBuffer>}
             */
            this.cachedAudioClips = new Map();
            /**
             * The last sound played.
             * @type {AudioBufferSourceNode|null}
             */
            if (this.lastSoundPlayed === undefined) {
                this.lastSoundPlayed = null;
            }
        }

        /**
         * Stops playing the selected sound.
         */
        stopSound() {
            if (this.lastSoundPlayed != null) {
                let audioClip = this.cachedAudioClips.get(this.lastSoundPlayed);
                if (audioClip != null) {
                    audioClip.pause();
                    this.lastSoundPlayed = null;
                } else {
                    // nothing yet
                }
            }
        }

        /**
         * Loads a sound from the specified URL.
         * @param url
         * @returns {Promise<AudioBuffer>}
         */
        loadSound(url) {
            return fetch(url)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer));
        }

        /**
         * Play a sound using WebAudioAPI.
         * @param sound filename of the sound that was preloaded
         */
        playSound(sound) {
            const buffer = this.cachedAudioClips.get(sound);
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);
            source.start();
        }
    }

    CWSYSTEM.CWSound = CWSound;
    CWSound["__class"] = "CWSYSTEM.CWSound";
})(CWSYSTEM || (CWSYSTEM = {}));
