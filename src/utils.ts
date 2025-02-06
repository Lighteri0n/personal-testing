import { ButtonContainer } from "@pixi/ui";
import { FillInput, Graphics, Text } from "pixi.js";

export const createButton = (params: {
  label: string,
  onClick: () => void,
  buttonColor: FillInput,
  x: number,
  y: number,
}) => {
  const { label, onClick, buttonColor, x, y } = params;

  const button = new ButtonContainer();
  const graphics = new Graphics();
  graphics.roundRect(0, 0, 200, 60);
  graphics.fill(buttonColor);

  button.x = x;
  button.y = y;
  button.width = 200;
  button.height = 60;

  button.addChild(graphics);

  const text = new Text({
    text: label,
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
    },
  });
  text.anchor.set(0.5);
  text.x = 100;
  text.y = 30;

  // todo: this is deprecated
  button.addChild(text);

  button.onPress.connect(onClick);

  return button;
};

export const createInteractiveText= (params: {
  label: string,
  onClick: () => void,
  textColor: FillInput,
  x: number,
  y: number,
}) => {
  const { label, onClick, textColor, x, y } = params;

  const button = new ButtonContainer();

  button.x = x;
  button.y = y;
  button.width = 200;
  button.height = 60;

  const text = new Text({
    text: label,
    style: {
      fontFamily: "Arial",
      fontSize: 40,
      fontWeight: "bolder",
      fill: textColor,
      stroke: {width: 8},
    },
  });
  text.anchor.set(0.5);
  text.x = 100;
  text.y = 30;

  // todo: this is deprecated
  button.addChild(text);

  button.onPress.connect(onClick);

  return button;
};

export const notYetImplemented = (msg?: string) => {
  alert(`Not yet implemented${msg != null ? `: ${msg}` : ''}`);
};
