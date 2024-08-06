import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * The CWSound class is a JavaScript implementation of a sound manager designed
 * to handle audio playback in web applications. It leverages the Web Audio API,
 * a high-level JavaScript API for processing and synthesizing audio in web browsers.
 *
 * The primary responsibilities of this class include:
 * <ol>
 * <li>
 *  Audio Context Management: Creates and manages an AudioContext object, which
 *  represents an audio processing graph and serves as the entry point for all
 *  Web Audio API operations.
 * </li><li>
 *  Audio Clip Handling: Provides functionality to load, manage, and play audio
 *  clips. Includes methods for loading audio files (e.g., MP3, WAV, OGG) from
 *  various sources, such as local files or remote URLs.
 * </li><li>
 *  Audio Playback: Exposes methods to control the playback of audio clips,
 *  including functions to play, pause, stop, and adjust the volume of individual
 *  clips or groups of clips.
 * </li><li>
 *  Audio Manipulation (optional): Depending on the implementation, it might offer
 *  additional features for manipulating audio, such as applying filters, effects,
 *  or spatial positioning (e.g., panning, 3D audio).
 * </li><li>
 *  Event Handling: Provides event handlers or callbacks to notify the application
 *  when specific audio events occur, such as when an audio clip finishes playing
 *  or encounters an error.
 * </li></ol>
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
 * @property {Map<AudioBufferSourceNode, AudioBuffer>} activeSources - A map to track active sound sources.
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
export class CWSound {
    /**
     * Creates an instance of CWSound and readies the audio context.
     */
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.cachedAudioClips = new Map();
        this.lastSoundPlayed = null;
        this.activeSources = new Map(); // To keep track of active sound sources
    }

    /**
     * Stops a specific sound if it is currently playing.
     *
     * @param {string} sound - The filename of the sound to stop.
     */
    stopSound(sound) {
        const source = this.activeSources.get(sound);
        if (source) {
            source.stop();
            this.activeSources.delete(sound);
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
        if (buffer) {
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);
            source.start();

            // Track the active source
            this.activeSources.set(sound, source);

            // Remove the source from active sources when it finishes playing
            source.onended = () => this.activeSources.delete(sound);
        }
    }


    /**
     * Loop a sound for a specified number of times.
     *
     * @param {string} sound - Filename of the sound that was preloaded.
     * @param {number} loopCount - Number of times to loop the sound. 0 means infinite loop.
     */
    loopSound(sound, loopCount) {
        const buffer = this.cachedAudioClips.get(sound);
        if (!buffer) {
            CWSYSTEM.Debug.error(`Sound ${sound} not found.`);
            return;
        }

        // Stop any currently looping sound
        if (this.activeLoopSource) {
            this.activeLoopSource.stop();
            this.activeLoopSource = null;
        }

        let loops = 0;
        const loop = () => {
            if (loopCount === 0 || loops < loopCount) {
                const source = this.audioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(this.audioContext.destination);
                source.start();

                source.onended = () => {
                    loops++;
                    loop(); // Play again if loopCount has not been reached
                };

                this.activeLoopSource = source; // Track the active loop source
            } else {
                this.activeLoopSource = null; // Reset loop source when done
            }
        };

        loop(); // Start the looping process
    }
}