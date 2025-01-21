import { Container, Text } from 'pixi.js';
import ConvertCsvToJson from 'convert-csv-to-json';

/*
*   Fish Data Scene
* just a scene to test csv to json library
*/
export const setupFishDataScene = async (container: Container) => {
  const csvText = await loadCSV('data/test-data.csv');

  const jsonData = ConvertCsvToJson.fieldDelimiter(',').csvStringToJson(csvText).slice(0, 5);

  const jsonText = new Text({
    text: JSON.stringify(jsonData, null, 2),
    style: {
      fontFamily: "Arial",
      fontSize: 12,
      fill: 0xffffff,
    },
  });
  //
  //
  //
  //
  interface fishData {
    fishName: string;
    scientificName: string;
    type: string;
    //the rest of the data
  };
  //indexing
  const fishes: Record<string, fishData> = {};

  jsonData.forEach((fishObject) => {
    const fishData: {[key: string]: any} = {
    scientificName: fishObject["Scientific Name"],
    type: fishObject["Type"],
    //fill other fish data
  };

    fishes[fishObject["Fish Name"]] = fishData.fishName;
  });
  //store in localforage
  //
  //
  //
  container.addChild(jsonText);
};

const loadCSV = async (url: string) => {
  const response = await fetch(url);

  return response.text();
};
