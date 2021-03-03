// to generate random positions
import { Blocks } from './blocks.js';
import { RandomPositions } from './randomPositionFile.js';
import { Weapons } from './weapons.js';

import { ShowOnMap } from './showOnMap.js';
import { Players } from './players.js';

//declaring and initializing`    the variables for the GenerateMap class

let weapons = [];
let blocks = [];
let player;

let randblockPositions;
let genRandWeaponsPosition;
let randomPositions = new RandomPositions();

let weaponStore = [
  {
    weapnPosn: null,
    name: 'bow',
    damagePnts: 40,
    image: '',
  },
  {
    weapnPosn: null,
    name: 'sledge',
    damagePnts: 50,
    image: '',
  },
  {
    weapnPosn: null,
    name: 'sword',
    damagePnts: 60,
    image: '',
  },
  {
    weapnPosn: null,
    name: 'dagger',
    damagePnts: 20,
    image: '',
  },

  {
    weapnPosn: null,
    name: 'axe',
    damagePnts: 20,
    image: '',
  },
];


//the showOnMap instance displays the various elements on the map
let showOnMap = new ShowOnMap();

/**
 * The GenerateMap class , generates the random positions for the weapons,blocks and players
 *
 */

export class GenerateMap {
  constructor() {}

  
  generateRandomPositions(){
    randomPositions.genRandPositions()
  }

  generateBlocks() {
    let randBlckPosition = randomPositions.getrndBlockPosition();

    for (let i = 0; i < 10; i++) {
      blocks.push(new Blocks(randBlckPosition[i])); // array of block objects
    }
    showOnMap.addBlocks(blocks);
  }

  /* 
    blocks = [{[2,3]},{[4,5]}] it would have 10 block objects
*/
  generateWeapons() {
    let rndWeaponsPosition = randomPositions.getRandWeaponsPosition();

    for (let i = 0; i < 5; i++) {
      if (weaponStore[i].name === 'axe') {
        // axe here is my default weapon
        weapons.push(
          new Weapons([], i, weaponStore[i].name, weaponStore[i].damagePnts, '')
        ); // array of weapons objects
        weapons.push(
          new Weapons(
            [],
            i + 1,
            weaponStore[i].name,
            weaponStore[i].damagePnts,
            ''
          )
        );
      } else {
        weapons.push(
          new Weapons(
            rndWeaponsPosition[i],
            i,
            weaponStore[i].name,
            weaponStore[i].damagePnts,
            ''
          )
        ); // array of weapons objects
      }
    }
    showOnMap.addWeapons(weapons);
    'weapons', weapons;
  }
  generatePlayers() {
    let rndPlayerPosition = randomPositions.getRandPlayerPositions();
    let players = [];

    players.push(
      new Players(rndPlayerPosition[0], weapons[4], 'safari', '', true)
    );
    players.push(
      new Players(rndPlayerPosition[1], weapons[5], 'sahara', '', false)
    );

    showOnMap.addPlayers(players);

    players;
  }

  addMovements() {
    showOnMap.showPlayerMovements();
  }

  addModal(){
    showOnMap.generateModal();
  }

  
}
