/* Generated from ChatGPT to replace Java code */
var dsector;
(function (dsector) {
    /**
     * Represents an MP3 player for playing audio files.
     */
    class MP3 {
        /**
         * Creates an instance of the MP3 class. The constructor takes a URL parameter and
         * creates a new Audio object with the provided URL.
         * @param {string} url - The URL of the MP3 audio file.
         */
        constructor(url) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.filename = url;
            this.audioElement = new Audio(url);
            this.audioElement.crossOrigin = "anonymous";
            this.audioSource = this.audioContext.createMediaElementSource(this.audioElement);
            this.audioSource.connect(this.audioContext.destination);
            this.isBuffered = false;

            // Ensure the audio is buffered before playing
            this.audioElement.addEventListener('canplaythrough', () => {
                this.isBuffered = true;
            });

        }

        /**
         * Plays the audio from the beginning.
         */
        play() {
            if (this.isBuffered) {
                this.audioElement.play();
            } else {
                this.audioElement.addEventListener('canplaythrough', () => {
                    this.audioElement.play();
                });
            }
        }

        /**
         * Sets the audio to loop continuously.
         * @param {number} [count=Infinity] - The number of times to loop the audio (default: Infinity for infinite loop).
         */
        loop(count = Infinity) {
            this.audioElement.loop = false;
            let playCount = 0;

            const onEnded = () => {
                if (playCount < count - 1 || count === Infinity) {
                    playCount++;
                    this.audioElement.currentTime = 0;
                    this.audioElement.play();
                } else {
                    this.audioElement.removeEventListener('ended', onEnded);
                }
            };

            this.audioElement.addEventListener('ended', onEnded);

            if (this.isBuffered) {
                this.audioElement.play();
            } else {
                this.audioElement.addEventListener('canplaythrough', () => {
                    this.audioElement.play();
                });
            }
        }

        /**
         * Stops the audio playback and resets the current time to 0.
         */
        stop() {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }

        /**
         * Closes the audio element by stopping the playback and setting the source to an empty string.
         */
        close() {
            this.stop();
            this.audioElement.src = "";
        }

        /**
         * Gets the current playing status of the audio.
         * @returns {boolean} - `true` if the audio is currently playing, otherwise `false`.
         */
        getPlayingStatus() {
            return !this.audioElement.paused;
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