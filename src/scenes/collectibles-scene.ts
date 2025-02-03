import { Application, Container, Text } from 'pixi.js';

/*
*   Collectibles Scene
*/
export const setupCollectiblesScene = async (params: {
  app: Application,
  container: Container,
}) => {
  const { app, container } = params;

  const titleText = new Text({
    text: 'Collectibles',
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

  // todo
};
