import { Application, Container, Text } from "pixi.js";
import { createButton } from "../utils";
import { setupFishDataScene } from "./fish-data-scene";

/*
* Settings scene
*/
export const setupSettingsScene = (params: {
  app: Application,
  container: Container,
  changeScene: (from: Container, to: Container) => void,
}) => {
  const { app, container, changeScene } = params;

  const fishDataSceneContainer = new Container();

  const titleText = new Text({
    text: 'Settings',
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

  addButtons({ app, container, fishDataSceneContainer, changeScene });
};

const addButtons = (params : {
  app: Application,
  container: Container,
  fishDataSceneContainer: Container,
  changeScene: (from: Container, to: Container) => void,
}) => {
  const { app, container, fishDataSceneContainer, changeScene } = params;

  const fishDataButton = createButton({
    label: 'Fish Data',
    buttonColor: 0x466494,
    x: app.screen.width / 2 - 100,
    y: (container.children.length * 100) + 300,
    onClick: () => {
      setupFishDataScene(fishDataSceneContainer);
      changeScene(container, fishDataSceneContainer);
    },
  });
  container.addChild(fishDataButton);
};
