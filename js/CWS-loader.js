/**
 * loader.js utility script to load the CW System.
 *
 * Loads all the JS files in the order they are required.
 *
 * @name       "loader.js"
 * @since      1.0.0
 * @access     public
 * @global
 *
 * @memberof CWSYSTEM
 *
 * @author Justin Condello
 * @link https://none.yet
 * @license GPLv3
 */

/** Simple function to assist in preloading scripts
 * @param {string} url URL of the script to be loaded */
function loadScript(url) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

/* Utility Classes */
loadScript('js/CWS/Debug.js');
loadScript('js/dsjs/NumberTools.js');
loadScript('js/dsjs/ObjectPair.js');
loadScript('js/dsjs/FastColorUtilities.js');
loadScript('js/dsjs/FloatPair.js');
loadScript('js/dsjs/StringPair.js');
loadScript('js/CWS/IntegerArray.js');
loadScript('js/CWS/CWStringTools.js');
loadScript('js/CWS/CWHashtable.js');
loadScript('js/CWS/CWReflect.js');
loadScript('js/CWS/CWFileTools.js');
loadScript('js/CWS/CWColor.js');
loadScript('js/CWS/CWFontTools.js');
loadScript('js/CWS/WindowColors.js');
loadScript('js/dsjs/ScreenPosition.js');
loadScript('js/CWS/UserIOBuffer.js');

/* Game Utility Classes */
loadScript('js/CWS/CWSReference.js');
loadScript('js/dsjs/Scene.js');
loadScript('js/CWS/ScreenData.js');
loadScript('js/CWS/AlertManager.js');
loadScript('js/CWS/IOInstruction.js');
loadScript('js/CWS/MouseDrag.js');
loadScript('js/dsjs/MP3.js');
loadScript('js/CWS/CWUtils.js');

/* GUI Classes */
loadScript('js/CWS/Starfield.js');
loadScript('js/dsjs/Renderer.js');
loadScript('js/CWS/VirtualScreen.js');
loadScript('js/CWS/AlertWindow.js');
loadScript('js/CWS/FormWindow.js');
loadScript('js/CWS/FormWindowItem.js');
loadScript('js/CWS/CWButton.js');
loadScript('js/CWS/CWCharacter.js');
loadScript('js/CWS/CWCheckBox.js');
loadScript('js/CWS/CWFont.js');
loadScript('js/CWS/CWGraphics.js');
loadScript('js/CWS/CWImage.js');
loadScript('js/CWS/CWImageElement.js');
loadScript('js/CWS/CWInputBox.js');
loadScript('js/CWS/CWMenu.js');
loadScript('js/CWS/CWPopupMenu.js');
loadScript('js/CWS/CWPopupMenuItem.js');
loadScript('js/CWS/CWPulldown.js');
loadScript('js/CWS/CWScrollbar.js');
loadScript('js/CWS/CWSound.js');
loadScript('js/CWS/CWStoredLine.js');
loadScript('js/CWS/CWTextArea.js');
loadScript('js/CWS/CWTextBlock.js');
loadScript('js/CWS/CWTextElement.js');
loadScript('js/CWS/CWWindow.js');
loadScript('js/CWS/CWWindowCollection.js');
loadScript('js/CWS/CWWindowStyles.js');