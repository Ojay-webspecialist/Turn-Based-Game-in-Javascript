import { GenerateGrid } from './generateGrid.js';
import { RandomPositions } from './randomPositionFile.js';
import { GenerateMap } from './generateMap.js';





let generateMap = new GenerateMap();
let generateGrid = new GenerateGrid();

$(document).ready(function () {

  
  generateGrid.drawBattleGrid(8);
  generateMap.generateRandomPositions();
  generateMap.generateBlocks();
  generateMap.generateWeapons();
  generateMap.generatePlayers();
  generateMap.addMovements();
  generateMap.addModal();

  
  
  
});


