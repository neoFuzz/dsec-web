/**
 * Environment set up script for the dsector game.
 *
 * @name       "env-setup.js"
 * @since      1.0.0
 * @access     public
 * @global
 *
 * @memberof dsector
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */

/**
 * Simple function to assist in preloading scripts without the need for jQuery.
 *
 * @param {string} url URL of the script to be loaded
 */
function loadScript(url) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

/**
 *  Set up the dsector namespace variable.
 *
 * @type {Object} dsector
 * @memberof dsector
 */
let dsector= {};