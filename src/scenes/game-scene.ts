import { Application, Container, Graphics, Text } from "pixi.js";
import { createButton } from "../utils";
import { setupShopScene } from "./shop-scene";
import { ButtonContainer } from "@pixi/ui";

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


  const kroniiBody = new Graphics();
  kroniiBody.rect(0, 0, 80, 160);
  kroniiBody.fill(0x0000ff);
  kroniiBody.x = (app.screen.width / 2) - kroniiBody.height / 2;
  kroniiBody.y = (app.screen.height / 2) - 200;
  container.addChild(kroniiBody);

  const backpackButton = new ButtonContainer()
  backpackButton
  const backpack = new Graphics()
  backpack.rect(0, 0, 60, 60);
  backpack.fill(0x5c3e0e);
  backpack.x = (app.screen.width / 2) + 100;
  backpack.y = (app.screen.height / 2) - 100;
  backpackButton.onPress.connect(()=> {
      inventoryContainer.visible=!inventoryContainer.visible;});
  backpackButton.addChild(backpack);
  container.addChild(backpackButton);

  //Container for the inventroy HUD
  const inventoryContainer = new Container();
  inventoryContainer.visible = false;
  inventoryContainer.x = app.screen.width-(app.screen.width * 0.4);
  inventoryContainer.y = 10;
  const inventoryBackground = new Graphics();
  inventoryBackground.rect(0, 0, app.screen.width * 0.40, app.screen.height *0.95);
  inventoryBackground.fill(0x0A0AFF);
  inventoryContainer.addChild(inventoryBackground);
  container.addChild(inventoryContainer);


  //test for the fishing mechanic
  const fishingStatusContainer = new Container();
  fishingStatusContainer.x = 200;
  fishingStatusContainer.y = 200;
  const fishingText = new Text({
    text: "Press Q to start fishing",
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
    },
  });
    fishingText.anchor.set(0.5);
    fishingText.x = 10;
    fishingText.y = 30;
  fishingStatusContainer.addChild(fishingText);
  const playerFishingBar = new Graphics();
  playerFishingBar.rect(0, 0, 40, 1);
  playerFishingBar.fill(0x00FF00);
  playerFishingBar.angle = 180
  fishingStatusContainer.addChild(playerFishingBar);
  
  const fishScapeBar = new Graphics();
  fishScapeBar.rect(50, 0, 40, 1);
  fishScapeBar.fill (0xFF0000);
  fishScapeBar.angle = 180;
  fishingStatusContainer.addChild(fishScapeBar);
  container.addChild(fishingStatusContainer);
  let isPlayerFishing = false;
  let elapsedTime = 0;
  let playerProgress = 0;
  let fishProgress = 0;
  /*
  *   GAME LOOP
  *
  *
  */
  app.ticker.add(() => {
    if (container.visible) {
      movePlayer();
    }
    if(isPlayerFishing){
      elapsedTime+= app.ticker.deltaMS / 1000;
      fishingText.text = fishProgress+"% - "+playerProgress+"%";
      if(elapsedTime>=0.25){
        fishScapeBar.height+=5;
        playerProgress = playerFishingBar.height;
        fishProgress = fishScapeBar.height;
        elapsedTime=0;
        if((playerProgress>=100)||(fishProgress>=100)){
          isPlayerFishing=false;
          if(playerProgress>=100){
            fishingText.text="Player wins. Press Q to restart"
          }else{
            fishingText.text= "Fish scaped. Press Q to restart";
          }
          fishScapeBar.height= 5;
          playerProgress = 0;
          fishProgress = 0;
          playerFishingBar.height = 5;
        };
      };
    };
    
  });

  const keys: Record<string, boolean> = {};
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });
  window.addEventListener("pointerdown", (e)=>{
    if(isPlayerFishing){
      playerFishingBar.height+=5;
    };
  });

  // TODO Rename to playerControls or set the E key to another function
  const movePlayer = () => {
    if (keys["D"] || keys["d"]){
      kroniiBody.x += 7;
      backpack.x += 7;
    }
    if (keys["A"] || keys["a"]){
      kroniiBody.x -= 7;
      backpack.x -= 7;
    }
    if ((keys["E"] || keys["e"])) {
      inventoryContainer.visible=!inventoryContainer.visible;
      };
      if ((keys["Q"] || keys["q"])) {
        isPlayerFishing=true;
        };
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
