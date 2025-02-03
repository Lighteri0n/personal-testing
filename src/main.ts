import { Application, Container } from 'pixi.js';
import { Callback, setupMainMenuScene } from './scenes/main-menu-scene';
import { setupGameScene } from './scenes/game-scene';
import { setupSettingsScene } from './scenes/settings-scene';
import { setupCollectiblesScene } from './scenes/collectibles-scene';

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: '#1099bb', resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById('pixi-container')!.appendChild(app.canvas);
  
  const titleSceneContainer = new Container();
  const gameSceneContainer = new Container();
  const settingsSceneContainer = new Container();
  const collectiblesSceneContainer = new Container();

  const changeScene = (from: Container, to: Container) => {
    app.stage.removeChild(from);
    app.stage.addChild(to);
  };

  app.stage.addChild(titleSceneContainer);

  const callback = new Callback({
    goToGameScene: () => {
      setupGameScene({
        app, 
        container: gameSceneContainer,
        changeScene,
      });
      changeScene(titleSceneContainer, gameSceneContainer);
    },
    goToSettingsScene: () => { 
      setupSettingsScene({
        app, 
        container: settingsSceneContainer,
        changeScene,
      });
      changeScene(titleSceneContainer, settingsSceneContainer) 
    },
    goToCollectiblesScene: () => { 
      setupCollectiblesScene({
        app, 
        container: collectiblesSceneContainer,
      });
      changeScene(titleSceneContainer, collectiblesSceneContainer) 
    },
  });

  setupMainMenuScene({
    app, 
    container: titleSceneContainer,
    callback,
  });
})();
