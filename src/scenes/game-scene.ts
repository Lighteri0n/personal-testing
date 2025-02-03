import { Application, Container, Graphics, Text } from "pixi.js";
import { createButton } from "../utils";
import { setupShopScene } from "./shop-scene";

/*
*   Game Scene
*   TODO Replace the Graphics object with the Kronii sprite
*   once we have it
*/
export const setupGameScene = (params: {
  app: Application,
  container: Container,
  changeScene: (from: Container, to: Container) => void,
}) => {
  const { app, container, changeScene } = params;

  const gameBackground = new Container(); //TODO add background image

  //fishing spot object test. The circle appears out of the player's LoS (the screen)
  //and it'll start appearing once the player gets close to the circle's position.
  //Added as a child of gameBackground container, so it will move along with it
  //For now, as an unwanted behaviour, it might be loaded and drawn at all times
  const fishingSpot = new Graphics();
  fishingSpot.circle(0, 0, 50);
  fishingSpot.fill(0x000000);
  fishingSpot.x = 900;
  fishingSpot.y = 700;
  gameBackground.addChild(fishingSpot);
  container.addChild(gameBackground);
  const positionText = new Text({
    text: 'Pos - X: 0, Y: 0',
    style: {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 0xffffff,
      align: "left",
    },
  });
  positionText.anchor.set(0.5);
  positionText.x = 25;
  positionText.y = 25;
  container.addChild(positionText);


  const kroniiBody = new Graphics();
  kroniiBody.rect(0, 0, 80, 160);
  kroniiBody.fill(0x0000ff);
  kroniiBody.x = (app.screen.width / 2) - kroniiBody.height / 2;
  kroniiBody.y = (app.screen.height / 2) - kroniiBody.width / 2;
  container.addChild(kroniiBody);
  //text that appears once the player is inside a fishing spot bounds
  const fishingText = new Text({
    text: 'Fish!',
    style: {
      fontFamily: "Arial",
      fontSize: 30,
      fill: 0xffffff,
      align: "center",
    },
  });
  fishingText.anchor.set(0.5);
  fishingText.x = kroniiBody.width / 2;
  fishingText.y = -10;
  fishingText.visible = false;
  kroniiBody.addChild(fishingText);

  //Container for the inventroy HUD
  const inventoryContainer = new Container();
  inventoryContainer.x = app.screen.width;
  inventoryContainer.y = 0;
  const inventoryBackground = new Graphics();
  inventoryBackground.rect(0, 0, app.screen.width * 0.15, app.screen.height);
  inventoryBackground.fill(0x0A0AFF);
  inventoryContainer.addChild(inventoryBackground);
  container.addChild(inventoryContainer);

  let isInventoryVisible = false; //these three are for the animation
  let startTime = 0; //of the inventory menu
  let animationCooldown = false; //

  /*
  *   GAME LOOP
  *
  *
  */
  app.ticker.add(() => {
    if (container.visible) {
      movePlayer();
    }

    fishingText.visible = fishingActionAvailable();

    positionText.text = `Pos - X: ${kroniiBody.x}, Y: ${kroniiBody.y}`;
  });

  const keys: Record<string, boolean> = {};
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  // TODO Rename to playerControls or set the E key to another function
  const movePlayer = () => {
    if (keys["W"] || keys["w"]) gameBackground.y += 5;
    if (keys["D"] || keys["d"]) gameBackground.x -= 5;
    if (keys["A"] || keys["a"]) gameBackground.x += 5;
    if (keys["S"] || keys["s"]) gameBackground.y -= 5;

    if ((keys["E"] || keys["e"]) && !animationCooldown) {
      isInventoryVisible = !isInventoryVisible;
      startTime = Date.now();
      app.ticker.add(animateInventory);
      animationCooldown = true;
      setTimeout(() => {
        animationCooldown = false;
      }, 1000);
    }
  };

  const fishingActionAvailable = () => {
    //function to check if the player is inside a fishing spot bounds, to enable
    //the fishing minigame
    //TODO set all fishing spots of the map
    //TODO add fishing spots (array?) as parameter
    //Store coordinates of both the player and the fishing spot
    const playerBounds = kroniiBody.getBounds();
    const fishingSpotBounds = fishingSpot.getBounds();
    //calculate distance from the player to the fishing spot
    const distX = Math.abs(playerBounds.x + playerBounds.width / 2 - fishingSpotBounds.x - fishingSpotBounds.width / 2);
    const distY = Math.abs(playerBounds.y + playerBounds.height / 2 - fishingSpotBounds.y - fishingSpotBounds.height / 2);
    //Pythagoras theorem
    const distance = Math.sqrt(distX * distX + distY * distY);
    //We simulate that the kroniiBody has a "radius" and set the distance in which
    //both figures touch
    const contactDistance = (Math.min(playerBounds.width, playerBounds.height) / 2) + fishingSpotBounds.width / 2;

    return distance < contactDistance;
  };

  const animateInventory = () => {
    // TODO Fix cooldown and hiding animation
    const elapsedTime = (Date.now() - startTime) / 1000; //time in seconds
    const targetX = isInventoryVisible ? app.screen.width * 0.85 : app.screen.width;

    if (elapsedTime < 0.5) {
      inventoryContainer.x = app.screen.width + (targetX - app.screen.width) * (elapsedTime / 0.5);
    } else {
      inventoryContainer.x = targetX;
      app.ticker.remove(animateInventory);
      animationCooldown = false;
    }
  };

  const shopSceneContainer = new Container();
  const fishDataButton = createButton({
    label: 'Shop',
    buttonColor: 0x466494,
    x: app.screen.width - 200,
    y: 100,
    onClick: () => {
      setupShopScene({app, container: shopSceneContainer});
      changeScene(container, shopSceneContainer);
    },
  });
  container.addChild(fishDataButton);
};
