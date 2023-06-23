rem Use uglifyjs to compress and mangle the code and drop it in one JS file. Reserved list preserves the names used in the HTML file.
node .\node_modules\uglify-js\bin\uglifyjs -c -m reserved=['userIOBuffer','preloadImages','dsector','DSMain','addKeyReleasedEvent','addKeyPressedEvent'] --source-map -o .\out\ds.js -- ./js/dsjs/Debug.js ./js/dsjs/NumberTools.js ./js/dsjs/ObjectPair.js ./js/dsjs/FastColorUtilities.js ./js/dsjs/FloatPair.js ./js/dsjs/StringPair.js ./js/dsjs/CWStringTools.js ./js/dsjs/IntegerArray.js ./js/dsjs/CWHashtable.js ./js/dsjs/CWReflect.js ./js/dsjs/CWFileTools.js ./js/dsjs/CWColor.js ./js/dsjs/CWFontTools.js ./js/dsjs/WindowColors.js ./js/dsjs/LightManager.js ./js/dsjs/ModelLoader.js ./js/dsjs/ModelFolder.js ./js/dsjs/Matrix4f.js ./js/dsjs/Model3DMatrix.js ./js/dsjs/Navigation.js ./js/dsjs/Polygon.js ./js/dsjs/PolygonGroup.js ./js/dsjs/PolygonGroupRepresentation.js ./js/dsjs/PolygonIntersection.js ./js/dsjs/PolygonIterator.js ./js/dsjs/ColourlessPolygon.js ./js/dsjs/PositionedModel.js ./js/dsjs/ScreenPosition.js ./js/dsjs/SpecialPoint.js ./js/dsjs/VectorInR3.js ./js/dsjs/Vertex.js ./js/dsjs/Vertex2D.js ./js/dsjs/TimedInstruction.js ./js/dsjs/UserIOBuffer.js ./js/dsjs/Global.js ./js/dsjs/CWSReference.js ./js/dsjs/DSReference.js ./js/dsjs/Environment.js ./js/dsjs/Scene.js ./js/dsjs/ScreenData.js ./js/dsjs/AlertManager.js ./js/dsjs/DSecKeyboardLayout.js ./js/dsjs/Joystick.js ./js/dsjs/GamePadUtils.js ./js/dsjs/InbuiltLight.js ./js/dsjs/IOInstruction.js ./js/dsjs/CWADInterfaceProcesses.js ./js/dsjs/Keyboard.js ./js/dsjs/MouseDrag.js ./js/dsjs/MP3.js ./js/dsjs/CWUtils.js ./js/dsjs/DSecBackgroundConfiguration.js ./js/dsjs/DSecBrain.js ./js/dsjs/DSecJewel.js ./js/dsjs/DSecPlayer.js ./js/dsjs/DSecGame.js ./js/dsjs/DSecTeam.js ./js/dsjs/DSecFadingLight.js ./js/dsjs/DSecMissile.js ./js/dsjs/DSecMissileManager.js ./js/dsjs/DSecRound.js ./js/dsjs/DSecSpecialEffect.js ./js/dsjs/IntersectingDSecObject.js ./js/dsjs/WeaponPort.js ./js/dsjs/WeaponSpecification.js ./js/dsjs/PreBuiltWeaponSpecifications.js ./js/dsjs/RobotSpecification.js ./js/dsjs/TankSpecification.js ./js/dsjs/Starfield.js ./js/dsjs/Renderer.js ./js/dsjs/VirtualScreen.js ./js/dsjs/AlertWindow.js ./js/dsjs/DSecTitlePage.js ./js/dsjs/DSecLoadGameWindow.js ./js/dsjs/DSecMainSetupWindow.js ./js/dsjs/DSecPlayWindow.js ./js/dsjs/DSecRobotChooserWindow.js ./js/dsjs/DSecSaveGameWindow.js ./js/dsjs/DSecScoreboard.js ./js/dsjs/DSecSetupWindow.js ./js/dsjs/DSecShoppingScreen.js ./js/dsjs/DSecItemDescriptionWindow.js ./js/dsjs/FormWindow.js ./js/dsjs/FormWindowItem.js ./js/dsjs/CWButton.js ./js/dsjs/CWCharacter.js ./js/dsjs/CWCheckBox.js ./js/dsjs/CWFont.js ./js/dsjs/CWFont_Sans8.js ./js/dsjs/CWFont_SmallFont.js ./js/dsjs/CWGraphics.js ./js/dsjs/CWImage.js ./js/dsjs/CWImageElement.js ./js/dsjs/CWInputBox.js ./js/dsjs/CWMenu.js ./js/dsjs/CWPopupMenu.js ./js/dsjs/CWPopupMenuItem.js ./js/dsjs/CWPulldown.js ./js/dsjs/CWScrollbar.js ./js/dsjs/CWSound.js ./js/dsjs/CWStoredLine.js ./js/dsjs/CWTextArea.js ./js/dsjs/CWTextBlock.js ./js/dsjs/CWTextElement.js ./js/dsjs/CWWindow.js ./js/dsjs/CWWindowCollection.js ./js/dsjs/CWWindowStyles.js ./js/dsjs/PlayersStatusWindow.js ./js/dsjs/RobotIOWindow.js ./js/dsjs/RobotSensorsIllustrationWindow.js ./js/dsjs/RobotSummaryWindow.js ./js/dsjs/DSMain.js ./js/loader-min.js
