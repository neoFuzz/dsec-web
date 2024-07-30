/**
 * The loader.js utility script loads the dsector game in a way that facilitates debugging.
 * The production version will be minified and will not include this script.
 * Loads all the JS files in the order they are required.
 *
 * @name       "loader.js"
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

/* Utility Classes */
loadScript('js/dsjs/LightManager.js');
loadScript('js/dsjs/ModelLoader.js');
loadScript('js/dsjs/ModelFolder.js');
loadScript('js/dsjs/Matrix4f.js');
loadScript('js/dsjs/Model3DMatrix.js');
loadScript('js/dsjs/Navigation.js');
loadScript('js/dsjs/Polygon.js');
loadScript('js/dsjs/PolygonGroup.js');
loadScript('js/dsjs/PolygonGroupRepresentation.js');
loadScript('js/dsjs/PolygonIntersection.js');
loadScript('js/dsjs/PolygonIterator.js');
loadScript('js/dsjs/ColourlessPolygon.js');
loadScript('js/dsjs/PositionedModel.js');
loadScript('js/dsjs/ScreenPosition.js');
loadScript('js/dsjs/SpecialPoint.js');
loadScript('js/dsjs/VectorInR3.js');
loadScript('js/dsjs/Vertex.js');
loadScript('js/dsjs/Vertex2D.js');
loadScript('js/dsjs/TimedInstruction.js');

/* Game Utility Classes */
loadScript('js/CWS/Global.js');
loadScript('js/dsjs/DSReference.js');
loadScript('js/dsjs/Environment.js');
loadScript('js/dsjs/Scene.js');
loadScript('js/dsjs/DSecKeyboardLayout.js');
loadScript('js/dsjs/Joystick.js');
loadScript('js/dsjs/GamePadUtils.js');
loadScript('js/dsjs/InbuiltLight.js');
loadScript('js/dsjs/DSInterfaceProcesses.js');
loadScript('js/dsjs/Keyboard.js');
loadScript('js/dsjs/MP3.js');

/* Game Element Classes*/
loadScript('js/dsjs/DSecBackgroundConfiguration.js');
loadScript('js/dsjs/DSecBrain.js');
loadScript('js/dsjs/DSecJewel.js');
loadScript('js/dsjs/DSecPlayer.js');
loadScript('js/dsjs/DSecGame.js');
loadScript('js/dsjs/DSecTeam.js');
loadScript('js/dsjs/DSecFadingLight.js');
loadScript('js/dsjs/DSecMissile.js');
loadScript('js/dsjs/DSecMissileManager.js');
loadScript('js/dsjs/DSecRound.js');
loadScript('js/dsjs/DSecSpecialEffect.js');
loadScript('js/dsjs/IntersectingDSecObject.js');
loadScript('js/dsjs/WeaponPort.js');
loadScript('js/dsjs/WeaponSpecification.js');
loadScript('js/dsjs/PreBuiltWeaponSpecifications.js');
loadScript('js/dsjs/RobotSpecification.js');
loadScript('js/dsjs/TankSpecification.js');

/* GUI Classes */
loadScript('js/dsjs/Renderer.js');
loadScript('js/dsjs/DSecTitlePage.js');
loadScript('js/dsjs/DSecLoadGameWindow.js');
loadScript('js/dsjs/DSecMainSetupWindow.js');
loadScript('js/dsjs/DSecPlayWindow.js');
loadScript('js/dsjs/DSecRobotChooserWindow.js');
loadScript('js/dsjs/DSecSaveGameWindow.js');
loadScript('js/dsjs/DSecScoreboard.js');
loadScript('js/dsjs/DSecSetupWindow.js');
loadScript('js/dsjs/DSecShoppingScreen.js');
loadScript('js/dsjs/DSecItemDescriptionWindow.js');
loadScript('js/dsjs/PlayersStatusWindow.js');
loadScript('js/dsjs/RobotIOWindow.js');
loadScript('js/dsjs/RobotSensorsIllustrationWindow.js');
loadScript('js/dsjs/RobotSummaryWindow.js');

/* Load main class last */
loadScript('js/dsjs/DSMain.js');