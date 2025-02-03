import { Application, Container, Text } from "pixi.js";
import { createButton, notYetImplemented } from "../utils";

/*
* Main menu scene
*
*
*/
export const setupMainMenuScene = (params: {
  app: Application,
  container: Container,
  callback: Callback,
}) => {
  const { app, container, callback } = params;
  const titleText = new Text({
    text: `Kronii's Ocean Odyssey`,
    style: {
      fontFamily: "Arial",
      fontSize: 50,
      align: "center",
      fill: 0xffffff,
    },
  });
  titleText.anchor.set(0.5);
  titleText.x = app.screen.width / 2;
  titleText.y = 150;
  container.addChild(titleText);

  addButtons({ app, container, callback });
};

const addButtons = (params : {
  app: Application,
  container: Container,
  callback: Callback,
}) => {
  const { app, container, callback } = params;

  addCenterButtons({app, container, callback});
  addBottomButtons(app, container);
};

const addCenterButtons = (params: {
  app: Application, 
  container: Container,
  callback: Callback,
}) => {

  const { app, container, callback } = params;
  const centerButtonsContainer = new Container();
  container.addChild(centerButtonsContainer);
  const startButton = createButton({
    label: 'Start',
    buttonColor: 0x0011ff,
    x: app.screen.width / 2 - 100,
    y: (centerButtonsContainer.children.length * 100) + 300,
    onClick: callback.goToGameScene,
  });
  centerButtonsContainer.addChild(startButton);

  const settingsButton = createButton({
    label: 'Settings',
    buttonColor: 0x466494,
    x: app.screen.width / 2 - 100,
    y: (centerButtonsContainer.children.length * 100) + 300,
    onClick: callback.goToSettingsScene,
  });
  centerButtonsContainer.addChild(settingsButton);

  const collectiblesButton = createButton({
    label: 'Collectibles',
    buttonColor: 0x466494,
    x: app.screen.width / 2 - 100,
    y: (centerButtonsContainer.children.length * 100) + 300,
    onClick: callback.goToCollectiblesScene,
  });
  centerButtonsContainer.addChild(collectiblesButton);

  const exitButton = createButton({
    label: 'Exit',
    buttonColor: 0x466494,
    x: app.screen.width / 2 - 100,
    y: (centerButtonsContainer.children.length * 100) + 300,
    onClick: () => {
      // TODO exit the game instead of showing this alert
      alert("Exiting the game... (function not added yet)");
    },
  });
  centerButtonsContainer.addChild(exitButton);
};

const addBottomButtons = (app: Application, container: Container) => {
  const bottomButtonsContainer = new Container();
  container.addChild(bottomButtonsContainer);

  const gameInfoButton = createButton({
    label: 'Game info',
    buttonColor: 0x466494,
    x: app.screen.width / 2 - 100 - 400,
    y: 600,
    onClick: () => {
      // todo
      notYetImplemented();
    },
  });
  bottomButtonsContainer.addChild(gameInfoButton);
  const howToPlayButton = createButton({
    label: 'How to play',
    buttonColor: 0x466494,
    x: app.screen.width / 2 - 100 + 400,
    y: 600,
    onClick: () => {
      // todo
      notYetImplemented();
    },
  });
  bottomButtonsContainer.addChild(howToPlayButton);
};

export class Callback {

  goToGameScene: () => void;
  goToSettingsScene: () => void;
  goToCollectiblesScene: () => void;

  constructor(params : {
    goToGameScene: () => void,
    goToSettingsScene: () => void,
    goToCollectiblesScene: () => void,
  }) {
    const { goToGameScene, goToSettingsScene, goToCollectiblesScene } = params;
    this.goToGameScene = goToGameScene;
    this.goToSettingsScene = goToSettingsScene;
    this.goToCollectiblesScene = goToCollectiblesScene;
  }
};
