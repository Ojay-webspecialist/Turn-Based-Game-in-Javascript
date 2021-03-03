/**
 * These are the positons the player can movve on the tiles
 * top , bottom,left and right side this will help persist the data
 *
 */

let plyrMovDirection = {
  top: [],
  bottom: [],
  left: [],
  right: [],
};

export class MovementCalc {
  constructor() {}

  calculatePlayersMovements = (player, blocks) => {
    'CalculatePlayres Movement  fxn', blocks;

    let plyrMovArr = [];
    let movementsArray = [];

    plyrMovDirection = {
      top: [],
      bottom: [],
      left: [],
      right: [],
    };

    let restrictdBlockMoves = {
      top: 4,
      bottom: 4,
      left: 4,
      right: 4,
    };
    // the for loop decides how many positions would be blocked for the player with a max of 3 steps
    for (let j = 3; j >= 0; j--) {
      blocks.forEach((block) => {
        if (player.playerPosn[0] + j < 7 + 1) {
          if (
            JSON.stringify([player.playerPosn[0] + j, player.playerPosn[1]]) ===
            JSON.stringify(block.position)
          ) {
            restrictdBlockMoves['bottom'] = j;
          }
        }
        if (player.playerPosn[1] + j < 7 + 1) {
          if (
            JSON.stringify([player.playerPosn[0], player.playerPosn[1] + j]) ===
            JSON.stringify(block.position)
          ) {
            restrictdBlockMoves['right'] = j;
          }
        }

        if (player.playerPosn[0] - j > 0) {
          if (
            JSON.stringify([player.playerPosn[0] - j, player.playerPosn[1]]) ===
            JSON.stringify(block.position)
          ) {
            restrictdBlockMoves['top'] = j;
          }
        }
        if (player.playerPosn[1] - j > 0) {
          if (
            JSON.stringify([player.playerPosn[0], player.playerPosn[1] - j]) ===
            JSON.stringify(block.position)
          ) {
            restrictdBlockMoves['left'] = j;
          }
        }
      });
    }

    for (let j = 3; j >= 0; j--) {
      if (player.playerPosn[0] + j < 7 + 1 && j < restrictdBlockMoves.bottom) {
        plyrMovDirection['bottom'].push([
          player.playerPosn[0] + j,
          player.playerPosn[1],
        ]);
        movementsArray.push([player.playerPosn[0] + j, player.playerPosn[1]]);
      }

      if (player.playerPosn[1] + j < 7 + 1 && j < restrictdBlockMoves.right) {
        plyrMovDirection['right'].push([
          player.playerPosn[0],
          player.playerPosn[1] + j,
        ]);
        movementsArray.push([player.playerPosn[0], player.playerPosn[1] + j]);
      }

      if (player.playerPosn[0] - j > -1 && j < restrictdBlockMoves.top) {
        plyrMovDirection['top'].push([
          player.playerPosn[0] - j,
          player.playerPosn[1],
        ]);
        movementsArray.push([player.playerPosn[0] - j, player.playerPosn[1]]);
      }
      if (player.playerPosn[1] - j > -1 && j < restrictdBlockMoves.left) {
        plyrMovDirection['left'].push([
          player.playerPosn[0],
          player.playerPosn[1] - j,
        ]);
        movementsArray.push([player.playerPosn[0], player.playerPosn[1] - j]);
      }
    }

    blocks.forEach((block) => {
      // just making sure that we can't move ON the blocks

      movementsArray = movementsArray.filter(
        (movement) =>
          JSON.stringify(movement) !== JSON.stringify(block.position)
      );
    });

    return movementsArray; // [[2,3],[3,4]] // you would show these positions on the map
  };

  locationsOfWeapons = (player, weapons) => {
    let tempArr;
    let weaponLocation = [];

    weapons.forEach((weapon) => {
      if (weapon.weapnPosn.length !== 0) {
        for (let i in plyrMovDirection) {
          let restrictedWeaponLocation = [];

          if (
            JSON.stringify(plyrMovDirection[i]).indexOf(
              JSON.stringify(weapon.weapnPosn)
            ) !== -1
          ) {
            switch (i) {
              case 'top':
                if (player.playerPosn[0] - weapon.weapnPosn[0] > 1) {
                  tempArr = player.playerPosn[0] - weapon.weapnPosn[0];
                  for (let j = 1; j < tempArr; j++) {
                    restrictedWeaponLocation.push([
                      player.playerPosn[0] - j,
                      player.playerPosn[1],
                    ]);
                  }
                }

                break;
              case 'bottom':
                if (player.playerPosn[0] - weapon.weapnPosn[0] < -1) {
                  tempArr = player.playerPosn[0] - weapon.weapnPosn[0];
                  for (let j = -1; j > tempArr; j--) {
                    restrictedWeaponLocation.push([
                      player.playerPosn[0] - j,
                      player.playerPosn[1],
                    ]);
                  }
                }

                break;
              case 'left':
                if (player.playerPosn[1] - weapon.weapnPosn[1] > 1) {
                  tempArr = player.playerPosn[1] - weapon.weapnPosn[1];
                  for (let j = 1; j < tempArr; j++) {
                    restrictedWeaponLocation.push([
                      player.playerPosn[0],
                      player.playerPosn[1] - j,
                    ]);
                  }
                }

                break;
              case 'right':
                if (player.playerPosn[1] - weapon.weapnPosn[1] < -1) {
                  tempArr = player.playerPosn[1] - weapon.weapnPosn[1];
                  for (let j = -1; j > tempArr; j--) {
                    restrictedWeaponLocation.push([
                      player.playerPosn[0],
                      player.playerPosn[1] - j,
                    ]);
                  }
                }

                break;
            }

            weapons.forEach((weapon) => {
              restrictedWeaponLocation = restrictedWeaponLocation.filter(
                (restricted) =>
                  JSON.stringify(restricted) !== JSON.stringify(weapon.weapnPosn)
              );
            });

            for (var k = 0; k < restrictedWeaponLocation.length; k++) {
              plyrMovDirection[i] = plyrMovDirection[i].filter(
                (movement) =>
                  JSON.stringify(movement) !==
                  JSON.stringify(restrictedWeaponLocation[k])
              );
            }

            if (weaponLocation.length > 0) {
              weaponLocation.forEach((locatedWeapon) => {
                if (
                  JSON.stringify(locatedWeapon.positions) ===
                  JSON.stringify(plyrMovDirection[i])
                ) {
                  let tempArrPosition = locatedWeapon.positions;

                  for (var k = 0; k < tempArrPosition.length; k++) {
                    locatedWeapon['positions'] = locatedWeapon[
                      'positions'
                    ].filter(
                      (position) =>
                        JSON.stringify(position) ===
                        JSON.stringify(locatedWeapon.weapon.weapnPosn)
                    );
                  }

                  plyrMovDirection[i] = plyrMovDirection[i].filter(
                    (direction) =>
                      JSON.stringify(direction) ===
                      JSON.stringify(weapon.weapnPosn)
                  );
                }
              });
            }

            weaponLocation.push(
              new WeaponLocations(weapon, plyrMovDirection[i])
            );
          }
        }
      }
    });

    return weaponLocation;
  };
}

class WeaponLocations {
  constructor(weapon, positions) {
    (this.weapon = weapon), 
    (this.positions = positions);
  }
}
