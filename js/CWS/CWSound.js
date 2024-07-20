(function (CWSYSTEM) {
    /**
     * The CWSound class is a JavaScript implementation of a sound manager designed
     * to handle audio playback in web applications. It leverages the Web Audio API,
     * a high-level JavaScript API for processing and synthesizing audio in web browsers.
     *
     * The primary responsibilities of this class include:
     * 1. Audio Context Management: Creates and manages an AudioContext object, which
     *    represents an audio processing graph and serves as the entry point for all
     *    Web Audio API operations.
     * 2. Audio Clip Handling: Provides functionality to load, manage, and play audio
     *    clips. Includes methods for loading audio files (e.g., MP3, WAV, OGG) from
     *    various sources, such as local files or remote URLs.
     * 3. Audio Playback: Exposes methods to control the playback of audio clips,
     *    including functions to play, pause, stop, and adjust the volume of individual
     *    clips or groups of clips.
     * 4. Audio Manipulation (optional): Depending on the implementation, it might offer
     *    additional features for manipulating audio, such as applying filters, effects,
     *    or spatial positioning (e.g., panning, 3D audio).
     * 5. Event Handling: Provides event handlers or callbacks to notify the application
     *    when specific audio events occur, such as when an audio clip finishes playing
     *    or encounters an error.
     *
     * @note
     * This class is a conversion from a Java implementation, which has been rewritten
     * to utilize the Web Audio API. The Web Audio API provides a powerful and flexible
     * way to work with audio in web browsers, enabling advanced audio processing and
     * manipulation capabilities.
     *
     * By encapsulating audio-related functionality within this class, the application
     * can benefit from a centralized and abstracted approach to sound management,
     * making it easier to integrate and control audio playback throughout the codebase.
     *
     * @property {AudioContext} audioContext - The audio context used to manage and play audio.
     * @property {Map<string, AudioBuffer>} cachedAudioClips - A map to cache audio clips.
     * @property {AudioBufferSourceNode|null} lastSoundPlayed - The last sound played.
     *
     * @since    1.0.0
     * @access   public
     * @class
     *
     * @memberof CWSYSTEM
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     * @see      Mozilla Developer Network [Web Audio API]{@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API} reference
     */
    class CWSound {
        /**
         * Creates an instance of CWSound and readies the audio context.
         */
        constructor() {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.cachedAudioClips = new Map();
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
                }
            }
        }

        /**
         * Loads a sound from the specified URL.
         *
         * @param {string|URL} url - The URL of the sound to load.
         * @returns {Promise<AudioBuffer>} A promise that resolves to the loaded audio buffer.
         */
        loadSound(url) {
            return fetch(url)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer));
        }

        /**
         * Play a sound using WebAudioAPI.
         *
         * @param {string} sound filename of the sound that was preloaded.
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