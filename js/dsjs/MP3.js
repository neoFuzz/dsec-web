/* Generated from ChatGPT to replace Java code */
var dsector;
(function (dsector) {
    /**
     * Represents an MP3 player for playing audio files.
     */
    class MP3 {
        /**
         * Creates an instance of the MP3 class. The constructor takes a URL parameter and creates a new Audio object with the provided URL.
         * @param {string} url - The URL of the MP3 audio file.
         */
        constructor(url) {
            if (this.filename === undefined) {
                this.filename = null;
            }
            this.filename = url;
            this.audio = new Audio(url)
        }

        /**
         * Stops the audio, clears the source URL, and prepares the object for cleanup.
         */
        close() {
            this.stop();
            this.audio.src = "";
        }

        /**
         * Starts playing the audio.
         */
        play() {
            this.audio.play();
        }

        /**
         * Sets the audio to loop continuously.
         * @param {number} [count=Infinity] - The number of times to loop the audio (default: Infinity for infinite loop).
         */
        loop(count = Infinity) {
            this.audio.loop = false;

            const onEnded = () => {
                if (count > 1 || count === Infinity) {
                    this.audio.currentTime = 0;
                    count === Infinity ? this.play() : count--;
                } else {
                    this.audio.removeEventListener('ended', onEnded);
                }
            };

            this.audio.addEventListener('ended', onEnded);
        }

        /**
         * Stops the audio playback and resets the current time to 0.
         */
        stop() {
            this.audio.pause();
            this.audio.currentTime = 0;
        }

        /**
         * Gets the current playing status of the audio.
         * @returns {boolean} - `true` if the audio is currently playing, otherwise `false`.
         */
        getPlayingStatus() {
            return !this.audio.paused;
        }

        /**
         * Sets the playing status of the audio.
         * @param {boolean} status - The desired playing status (`true` for play, `false` for stop).
         */
        setPlayingStatus(status) {
            if (status) {
                this.play();
            } else {
                this.stop();
            }
        }
    }

    dsector.MP3 = MP3;
    MP3["__class"] = "dsector.MP3";
})(dsector || (dsector = {}));
