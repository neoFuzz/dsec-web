/**
 * @namespace CWSYSTEM
 * @description The CWSYSTEM namespace encapsulates a collection of components and utilities
 *              for creating and managing canvas-based windowing systems in web applications.
 *              It provides a comprehensive set of tools and classes for rendering windows,
 *              handling user interactions, and managing the overall layout and behavior of
 *              canvas-based user interfaces.
 */
import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * Provides a centralized reference point for various components and managers
 * within the CWS (CWSYSTEM) framework. This class acts as a singleton instance,
 * ensuring that only one instance of each component is created and accessible
 * throughout the application's lifecycle.
 *
 * @property {CWSYSTEM.CWWindowCollection} gui - The window management component.
 * @property {CWSYSTEM.CWGraphics} graphics - The graphics component for rendering.
 * @property {CWSYSTEM.CWInterfaceProcesses} interfaceProcesses - The interface processes component.
 * @property {CWSYSTEM.AlertManager} alertManager - The alert management component.
 * @property {dsector.Renderer} renderer - The renderer component.
 * @property {CWSYSTEM.CWSound} cwSound - The sound component.
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof CWSYSTEM
 * @requires dsector.Renderer
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class CWSReference {
    /**
     * Initializes a new instance of the CWSReference class.
     *
     * @returns {CWSYSTEM.CWSReference} A new instance of the CWSReference class.
     */
    constructor() {
        CWSReference.virtualScreen = new CWSYSTEM.VirtualScreen();
        CWSReference.gui = new CWSYSTEM.CWWindowCollection(CWSReference.virtualScreen);
        CWSReference.graphics = new CWSYSTEM.CWGraphics();
        CWSReference.alertManager = new CWSYSTEM.AlertManager();
        CWSReference.cwSound = new CWSYSTEM.CWSound();
        CWSReference.mouseDrag = new CWSYSTEM.MouseDrag();
        CWSReference.interfaceProcesses = new CWSYSTEM.CWInterfaceProcesses();
    }

    /**
     * Reference to the MouseDrag instance.
     * @type {CWSYSTEM.MouseDrag}
     */
    static mouseDrag = null;
    /**
     * Reference to the VirtualScreen instance.
     * @type {CWSYSTEM.VirtualScreen}
     */
    static virtualScreen = null;
    /**
     * Reference to the CWWindowCollection instance.
     * @type {CWSYSTEM.CWWindowCollection}
     */
    static gui = null;
    /**
     * Reference to the CWGraphics instance.
     * @type {CWSYSTEM.CWGraphics}
     */
    static graphics = null;
    /**
     * Reference to the CWInterfaceProcesses instance.
     * @type {CWSYSTEM.CWInterfaceProcesses}
     */
    static interfaceProcesses = null;
    /**
     * Reference to the AlertManager instance.
     * @type {CWSYSTEM.AlertManager}
     */
    static alertManager = null;
    /**
     * Reference to the renderer instance.
     * @type {dsector.Renderer}
     */
    static renderer = null;
    /**
     * Reference to the CWSound instance.
     * @type {CWSYSTEM.CWSound}
     */
    static cwSound = null;
}