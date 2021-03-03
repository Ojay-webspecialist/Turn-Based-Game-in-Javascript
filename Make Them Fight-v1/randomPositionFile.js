

/**
 * function to generate random Positions for weapons, walls and players
 *
 */

let rndValArr = [];
let tempArrHlder = [];

export class RandomPositions {
  constructor() {}
  /**
   * lines 26-53
   * This function generates the random positions on the game board
   * the for-loop iterates 14 times while condition true
   * 8 random values were generated and each assigned to a row and col values
   * the tempArrHlder array is populated with the random row and col valuesvalues
   * IF the position does not exist (when = -1) then add it to the array and break the loop
   * make the temporary aray holder empty
   * if does exist restart the loop by setting the temporary array holder to empty array
   *  continue to restart the loop again
   * Return the random value array to the calling object

   */

  genRandPositions() {

    for (let i = 0; i < 14; i++) {
      // iterate 14 times
      while (true) {
        let row = Math.floor(Math.random() * 8); //this is to generate eight random numbers
        let col = Math.floor(Math.random() * 8);

        tempArrHlder.push(row);
        tempArrHlder.push(col);

        if (
          JSON.stringify(rndValArr).indexOf(JSON.stringify(tempArrHlder)) === -1
        ) {
          rndValArr.push(tempArrHlder);

          tempArrHlder = [];

          break;
        } else {
          tempArrHlder = [];

          continue;
        }
      }
    }

    return rndValArr;
  }

  /**
   * lines 68-94
   * This function generates the random player position on the game board
   * first create an empty random player position array
   * 8 random values were generated and each assigned to a row and col values
   * the tempArrHlder array is populated with the random row and col valuesvalues
   * while true , IF the position does not exist (when = -1) then add it to the array and break the loop
   *
   * if position  does exist restart the loop by setting the temporary array holder to empty array
   *  continue to restart the loop again
   * Return the random player position  array to the calling object
   */
  getRandPlayerPositions() {
    let rndPlyrPositionArr = [];

    while (true) {
      let tempArr = [];
      let row = Math.floor(Math.random() * 8);
      let col = Math.floor(Math.random() * 8);

      tempArr.push(row);
      tempArr.push(col);

      if (JSON.stringify(rndValArr).indexOf(tempArr) === -1) {
        //if values does not exist inside the array , push the random number
        rndPlyrPositionArr.push(tempArr);
        rndPlyrPositionArr.push(getPlayerTwoPsn(rndPlyrPositionArr));
        tempArr = [];
        break;
      }
       else {
        continue;
      }
    }

    function getPlayerTwoPsn(rndPlyrPositionArr) {
      let plyr1postn = rndPlyrPositionArr[0]; // this is the first random position of first player
      let restrctdPostn = [];

      restrctdPostn.push(plyr1postn);

      if (plyr1postn[0] + 1 < 8) {
        restrctdPostn.push([plyr1postn[0] + 1, plyr1postn[1]]);
      }
      if (plyr1postn[1] + 1 < 8) {
        restrctdPostn.push([plyr1postn[0], plyr1postn[1] + 1]);
      }
      if (plyr1postn[0] - 1 > 0) {
        restrctdPostn.push([plyr1postn[0] - 1, plyr1postn[1]]);
      }
      if (plyr1postn[1] - 1 > 0) {
        restrctdPostn.push([plyr1postn[0], plyr1postn[1] - 1]);
      }

      'Restricted Positions', restrctdPostn;

      while (true) {
        let tempArr = [];

        let row = Math.floor(Math.random() * 8);
        let col = Math.floor(Math.random() * 8);

        tempArr.push(row);
        tempArr.push(col);

        if (
          JSON.stringify(rndValArr).indexOf(JSON.stringify(tempArr)) === -1 &&
          JSON.stringify(restrctdPostn).indexOf(JSON.stringify(tempArr)) === -1
        ) {
          // Does it not exsist inside the array? Push the random number!
          return tempArr; //return the random position for player 2 which is an array
        } else {
          continue;
        }
      }
    }
    rndPlyrPositionArr;
    return rndPlyrPositionArr;
  }

  /**
   * The randomBlockPositions function returns 10 random positions on the game board
   * a random position array was created to hold the values from getRandomPositions function
   * created a temporary array holder to hold the block positions in the interim
   * looping through the number of blocks and pushing the values of rndPositionsArr to temporary array holder
   * NOTE: refactor the loop
   * return the first ten random position stored in temporary array holder
   *
   */
  getrndBlockPosition() {
    // passed 10

    let tempArrholder = [];

    for (let i = 0; i < 10; i++) {
      tempArrholder.push(rndValArr[i]);
    }

    
    return tempArrholder; // it would return the first 10 random positions
  }

  /**
   * The function genRandWeaponsPosition generates weapons position for our board game
   * we created an array genRandWeaponsPosition to hold the randomPositions values
   * also a temporary array holder to hold this weapon positions
   * @param {*} nmbOfWeapons
   *
   */

  getRandWeaponsPosition(nmbOfWeapons) {
    let tempWepnPsnArr = [];

  

    for (let i = 10; i < 14; i++) {
      tempWepnPsnArr.push(rndValArr[i]);
      
    }

    
    return tempWepnPsnArr;
  }
}

