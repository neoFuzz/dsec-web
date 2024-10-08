import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * Main class for the D-Sector application. Initializes the game, sets up event listeners, and contains the main game loop.
 *
 * @property {UserIOBuffer} userIOBuffer - Handles user input and output.
 * @property {number} interval - The ID of the main loop interval.
 * @property {boolean} discordEnabled - Indicates whether Discord integration is enabled.
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof dsector
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class DSMain {
    /**
     * Initializes the game, sets up the canvas, and starts the main loop.
     */
    constructor() {
        this.userIOBuffer = new dsector.UserIOBuffer();
        CWSYSTEM.Global.graphicsInitialized = false;
        this.interval = null;
        CWSYSTEM.Global.initialize();
        CWSYSTEM.Debug.println("adding adapters");
        this.eventMouse();
        this.eventKeyListener();
    }

    /**
     * Ends the application and clears the main loop interval.
     */
    static endApplication() {
        if (DSMain.discordEnabled) {
            // future feature implementation
        }
        clearInterval(dsector.dsMain.interval);
        dsector.DSReference.dsecSetupWindow.saveOptions();
        console.info("Application exited properly");
    }

    /**
     * Sets up Discord activity status based on the user's current state in the game.
     * @param {string} location - The screen the user is on
     * @param {string} state - The state of the user. Either, Alive or Dead
     * @param {string} assetImageName - one of the predefined names on the Discord Dev console.
     * @param {number} partySize - players still alive in the party
     * @param {number} maxPartySize - Party's maximum size
     * @param {number} gameMode - Teams 1 or Hostile 0. Shows 'Menu' by default.
     */
    static setActivity(location, state, assetImageName,
                       partySize, maxPartySize, gameMode) {
        // let gameStr
        const playerCountMode =
            dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS ?
                (dsector.DSReference.dsecGame.numberOfPlayers() / 2 | 0) :
                dsector.DSReference.dsecGame.numberOfPlayers();
        switch (gameMode) {
            case 1:
                // gameStr = "Teams"
                maxPartySize = playerCountMode;
                break;
            case 0:
                // gameStr = "Hostile | Free for All"
                maxPartySize = playerCountMode;
                break;
            default:
            // gameStr = "Menu"
        }
        const drpCall = `Discord RPC: ${location} : ${state} : ${assetImageName} : ${partySize}/${maxPartySize}`;
        if (DSMain.discordEnabled) {
            CWSYSTEM.Debug.println(drpCall);
        }
    }

    /**
     * Main function from desktop app. Used to run the game and must be set up on the hosting HTML page
     */
    main() {
        //CWSYSTEM.Environment = new CWSYSTEM.Environment();
        //new dsector.DSReference(this);
        CWSYSTEM.Global.graphicsInitialized = true;
        dsector.DSReference.virtualScreen.update();
        if (DSMain.discordEnabled) {
            CWSYSTEM.Debug.println("Discord Integration Enabled");
        }

        requestAnimationFrame(dsector.dsMain.loop);
    }

    /**
     * Updates the canvas with the current game state.
     */
    repaint() {
        let canvas = document.getElementById("3dSpace");
        let ctx = canvas.getContext("2d");
        ctx.putImageData(CWSYSTEM.CWSReference.bi, 0, 0);
    }

    /**
     * Main game loop. Processes user input, game logic, and updates the display.
     */
    loop() {
        const framePeriod = (33 / CWSYSTEM.Global.subFrames | 0);
        CWSYSTEM.Environment.advanceCycle();
        CWSYSTEM.Environment.lastFramePeriod = CWSYSTEM.Environment.currentTime() - DSMain.mainLoopStartTime;
        document.getElementById("frame-count").innerText = "" +
            Math.floor(1000 / CWSYSTEM.Environment.lastFramePeriod);
        if (CWSYSTEM.Environment.lastFramePeriod$() < (n => n < 0 ?
            Math.ceil(n) : Math.floor(n))(framePeriod)) {
            CWSYSTEM.Environment.lastFramePeriod = framePeriod;
        }
        if (DSMain.discordEnabled) {
            CWSYSTEM.Debug.println("Try Discord!");
        }
        DSMain.mainLoopStartTime = CWSYSTEM.Environment.currentTime();
        dsector.dsMain.userIOBuffer.process();
        dsector.DSReference.dsecGame.respondToGameTick();
        dsector.DSReference.gui.drawWindows();
        dsector.TimedInstruction.executeInstructionsDue();
        CWSYSTEM.Environment.processButtonsAndKeysThatAreHeld();
        dsector.DSReference.virtualScreen.update();
        if (!CWSYSTEM.Global.runState) {
            DSMain.endApplication();
        } else {
            requestAnimationFrame(dsector.dsMain.loop);
        }
    }

    /**
     * Sets up mouse event listeners on the canvas.
     */
    eventMouse() {
        const canvas = document.getElementById('3dSpace');
        canvas.addEventListener("mousedown", (event) => {
            event.preventDefault();
            dsector.dsMain.dsMouseEvent(event, "mousedown");
        });
        canvas.addEventListener("mouseup", (event) => {
            event.preventDefault();
            dsector.dsMain.dsMouseEvent(event, "mouseup");
        });
        canvas.addEventListener("mousemove", (event) => {
            event.preventDefault();
            dsector.dsMain.dsMouseEvent(event, "mousemove");
        });
        canvas.addEventListener("click", (event) => {
            event.preventDefault();
            dsector.dsMain.dsMouseEvent(event, "click");
        });
        canvas.addEventListener("touchstart", (event) => {
            event.preventDefault();
            dsector.dsMain.dsMouseEvent(event, "mousedown");
        });
        canvas.addEventListener("touchcancel", (event) => {
            event.preventDefault();
            dsector.dsMain.dsMouseEvent(event, "mouseup");
        });
        canvas.addEventListener("touchend", (event) => {
            event.preventDefault();
            dsector.dsMain.dsMouseEvent(event, "click");
        });
        canvas.addEventListener("touchmove", (event) => {
            event.preventDefault();
            dsector.dsMain.dsMouseEvent(event, "mousemove");
        });
    }

    /**
     * Sets up keyboard event listeners.
     */
    eventKeyListener() {
        const canvas = document.body;
        canvas.addEventListener("keypress", (event) => {
            event.preventDefault();
            dsector.dsMain.userIOBuffer.addKeyTypedEvent(event.key);/*char*/
        });
        canvas.addEventListener("keydown", (event) => {
            dsector.dsMain.userIOBuffer.addKeyPressedEvent(event.keyCode); /*code*/
        });
        canvas.addEventListener("keyup", (event) => {
            event.preventDefault();
            dsector.dsMain.userIOBuffer.addKeyReleasedEvent(event.keyCode);/*code*/
        });
    }

    /**
     * Processes mouse events and updates the user input buffer accordingly.
     * @param {Event} event - The mouse event.
     * @param {string} type - The type of mouse event.
     */
    dsMouseEvent(event, type) {
        event.preventDefault();
        let canvas = document.getElementById('3dSpace');
        const bounding = canvas.getBoundingClientRect();
        const x = event.clientX ? event.clientX - bounding.left :
            event.changedTouches[0].clientX - bounding.left;
        const y = event.clientY ? event.clientY - bounding.top :
            event.changedTouches[0].clientY - bounding.top;

        let mevent = new MouseEvent(type, {
            clientX: x, clientY: y, button: event.button, buttons: event.buttons,
            isTrusted: true, bubbles: true, type: type
        });

        switch (type) {
            case "mousedown":
                dsector.DSReference.mouseDrag.draging = true;
                this.userIOBuffer.addMousePressedEvent(mevent);
                break;
            case "mouseup":
                dsector.DSReference.mouseDrag.draging = false;
                this.userIOBuffer.addMouseReleasedEvent(mevent);
                break;
            case "mousemove":
                event.preventDefault();
                this.userIOBuffer.addMouseMovedEvent(mevent.x, mevent.y);
                if (dsector.DSReference.mouseDrag.draging) {
                    this.userIOBuffer.addMouseDraggedEvent(mevent.x, mevent.y)
                }
                break;
            case "click":
                this.userIOBuffer.addMouseClickedEvent(mevent);
                break;
        }
    }

    static discordEnabled = false;
    static maxPlayers = 8;
    static mainLoopStartTime = 0;
    static waitMessageBeingDisplayed = false;
    static interval = null;
}

