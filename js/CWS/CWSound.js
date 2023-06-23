/* Converted from Java. will need to re-write in to Web Audio API https://web.dev/webaudio-intro/ */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWSound {
        constructor() {
            this.cachedAudioClips = new Map();
            if (this.lastSoundPlayed === undefined) {
                this.lastSoundPlayed = null;
            }
        }

        /** Plays the specified sound from cache. If not cached, load the sound then play it.
         * @param {string} fileName The URL to get the file from
         * @param {number} status Undocumented
         */
        playSound(fileName, status) {
            if (fileName == null) {
                return;
            }
            let clip = null;
            try {
                clip = this.cachedAudioClips.get(fileName);// + "_" + status);
            } catch (e) {
                CWSYSTEM.Debug.println("Error CWSPS: " + e);
                clip = null;
            }
            if (clip == null) {
                // load sound
                clip = new Audio(fileName);
            }
            if (clip !== null) {
                clip.loop = false;
                clip.play();
                this.cachedAudioClips.set(fileName,clip);// + "_" + status, clip);
                this.lastSoundPlayed = fileName;
            } else {
                clip.loop = false;
                clip.play();
            }
        }

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
    }

    CWSYSTEM.CWSound = CWSound;
    CWSound["__class"] = "CWSYSTEM.CWSound";
})(CWSYSTEM || (CWSYSTEM = {}));
