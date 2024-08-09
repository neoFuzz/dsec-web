import { ColourlessPolygon } from "./ColourlessPolygon.js";
import { DSecBackgroundConfiguration } from './DSecBackgroundConfiguration.js';
import { DSecBrain } from './DSecBrain.js';
import { DSecFadingLight } from './DSecFadingLight.js';
import { DSecGame } from './DSecGame.js';
import { DSecItemDescriptionWindow } from './DSecItemDescriptionWindow.js';
import { DSecJewel } from './DSecJewel.js';
import { DSecKeyboardLayout } from './DSecKeyboardLayout.js';
import { DSecLoadGameWindow } from './DSecLoadGameWindow.js';
import { DSecMainSetupWindow } from './DSecMainSetupWindow.js';
import { DSecMissile } from './DSecMissile.js';
import { DSecMissileManager } from './DSecMissileManager.js';
import { DSecPlayer } from './DSecPlayer.js';
import { DSecPlayWindow } from './DSecPlayWindow.js';
import { DSecRobotChooserWindow } from './DSecRobotChooserWindow.js';
import { DSecRound } from './DSecRound.js';
import { DSecSaveGameWindow } from './DSecSaveGameWindow.js';
import { DSecScoreboard } from './DSecScoreboard.js';
import { DSecSetupWindow } from './DSecSetupWindow.js';
import { DSecShoppingScreen } from './DSecShoppingScreen.js';
import { DSecSpecialEffect } from './DSecSpecialEffect.js';
import { DSecTeam } from './DSecTeam.js';
import { DSecTitlePage } from './DSecTitlePage.js';
import { DSGlobal } from './DSGlobal.js';
import { DSInterfaceProcesses } from './DSInterfaceProcesses.js';
import { DSMain } from './DSMain.js';
import { DSReference } from './DSReference.js';
import { Environment } from '../CWS/Environment.js';
import { FloatPair } from './FloatPair.js';
import { GamePadUtils } from './GamePadUtils.js';
import { InbuiltLight } from './InbuiltLight.js';
import { IntersectingDSecObject } from './IntersectingDSecObject.js';
import { Joystick } from './Joystick.js';
import { Keyboard } from './Keyboard.js';
import { LightManager } from './LightManager.js';
import { Matrix4f } from './Matrix4f.js';
import { Model3DMatrix } from './Model3DMatrix.js';
import { ModelFolder } from './ModelFolder.js';
import { ModelLoader } from './ModelLoader.js';
import { MP3 } from './MP3.js';
import { Navigation } from './Navigation.js';
import { ObjectPair } from './ObjectPair.js';
import { PlayersStatusWindow } from './PlayersStatusWindow.js';
import { Polygon } from './Polygon.js';
import { PolygonGroup } from './PolygonGroup.js';
import { PolygonGroupRepresentation } from './PolygonGroupRepresentation.js';
//import { PolygonIntersection } from './PolygonIntersection.js';
import { PolygonIntersection } from '../../pkg/index.js'
import { PolygonIterator } from './PolygonIterator.js';
import { PositionedModel } from './PositionedModel.js';
import { PreBuiltWeaponSpecifications } from './PreBuiltWeaponSpecifications.js';
import { Renderer } from './Renderer.js';
import { RobotIOWindow } from './RobotIOWindow.js';
import { RobotSensorsIllustrationWindow } from './RobotSensorsIllustrationWindow.js';
import { RobotSpecification } from './RobotSpecification.js';
import { RobotSummaryWindow } from './RobotSummaryWindow.js';
import { Scene } from './Scene.js';
import { ScreenPosition } from './ScreenPosition.js';
import { SpecialPoint } from './SpecialPoint.js';
import { Starfield } from './Starfield.js';
import { StringPair } from './StringPair.js';
import { TankSpecification } from './TankSpecification.js';
import { TimedInstruction } from './TimedInstruction.js';
import { UserIOBuffer } from './UserIOBuffer.js';
import { VectorInR3 } from './VectorInR3.js';
import { Vertex } from './Vertex.js';
import { Vertex2D } from './Vertex2D.js';
import { WeaponPort } from './WeaponPort.js';
import { WeaponSpecification } from './WeaponSpecification.js';

export const dsector = {
    ColourlessPolygon,
    DSecBackgroundConfiguration,
    DSecBrain,
    DSecFadingLight,
    DSecGame,
    DSecItemDescriptionWindow,
    DSecJewel,
    DSecKeyboardLayout,
    DSecLoadGameWindow,
    DSecMainSetupWindow,
    DSecMissile,
    DSecMissileManager,
    DSecPlayer,
    DSecPlayWindow,
    DSecRobotChooserWindow,
    DSecRound,
    DSecSaveGameWindow,
    DSecScoreboard,
    DSecSetupWindow,
    DSecShoppingScreen,
    DSecSpecialEffect,
    DSecTeam,
    DSecTitlePage,
    DSGlobal,
    DSInterfaceProcesses,
    DSMain,
    DSReference,
    Environment,
    FloatPair,
    GamePadUtils,
    InbuiltLight,
    IntersectingDSecObject,
    Joystick,
    Keyboard,
    LightManager,
    Matrix4f,
    Model3DMatrix,
    ModelFolder,
    ModelLoader,
    MP3,
    Navigation,
    ObjectPair,
    PlayersStatusWindow,
    Polygon,
    PolygonGroup,
    PolygonGroupRepresentation,
    PolygonIntersection,
    PolygonIterator,
    PositionedModel,
    PreBuiltWeaponSpecifications,
    Renderer,
    RobotIOWindow,
    RobotSensorsIllustrationWindow,
    RobotSpecification,
    RobotSummaryWindow,
    Scene,
    ScreenPosition,
    SpecialPoint,
    Starfield,
    StringPair,
    TankSpecification,
    TimedInstruction,
    UserIOBuffer,
    VectorInR3,
    Vertex,
    Vertex2D,
    WeaponPort,
    WeaponSpecification
}
let dsMain;
export { dsMain };