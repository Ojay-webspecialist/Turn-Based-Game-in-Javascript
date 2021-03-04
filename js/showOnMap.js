/**
 * The ShowOnMap class holds the functions that renders the blocks,weapons and players to the map
 * addblocks() function adds the block elements to the map
 * addWeapons() function adds the weapons to the game board
 *
 *
 *
 */
let player;
let weapon;
let block;
let movementsArray; 
let weaponMovementsArray;
let playerPrevPosn;

import { MovementCalc } from './movementCalc.js';
import { Battle } from './Battles.js';

let movementCalculation = new MovementCalc();
let battle = new Battle();

export class ShowOnMap {
  constructor() {}
  addBlocks(blocks) {
    block = blocks;
    
    for (let i = 0; i < blocks.length; i++) {
      $(
        `.grid-item-${blocks[i].position[0]}-${blocks[i].position[1]}`
      ).removeClass('tileImg');
      $(
        `.grid-item-${blocks[i].position[0]}-${blocks[i].position[1]}`
      ).addClass('blocks');
    }
  }

  addWeapons(weapons) {
    weapon = weapons;
    
    for (let i = 0; i < weapons.length; i++) {
      $(
        `.grid-item-${weapons[i].weapnPosn[0]}-${weapons[i].weapnPosn[1]}`
      ).removeClass('tileImg');

      $(
        `.grid-item-${weapons[i].weapnPosn[0]}-${weapons[i].weapnPosn[1]}`
      ).addClass(`${weapons[i].name.toString()}`);
    }
  }
  addPlayers(players) {
    player = players;
    let playerName = ['safari', 'sahara'];
    for (let i = 0; i < 2; i++) {

      $(
        `.grid-item-${players[i].playerPosn[0]}-${players[i].playerPosn[1]}`
      ).addClass(`${playerName[i].toString()}`);
    }
  }

  showPlayerMovements() {
    

    block;
    player;

    // update the panel after each move
    
    battle.updatePanel(player);
   
    for(let i = 0; i < player.length ; i++){

      if(player[i].turn === true){
        movementsArray = movementCalculation.calculatePlayersMovements(player[i],block)
        weaponMovementsArray = movementCalculation.locationsOfWeapons(player[i],weapon)
        movementsArray = movementsArray.filter(movement => JSON.stringify(movement) !== JSON.stringify(player[i].playerPosn));
      }
    }

    for (var i = 0; i < movementsArray.length; i++) {

      $(`.grid-item-${movementsArray[i][0]}-${movementsArray[i][1]}`).removeClass('tileImg');
      $(`.grid-item-${movementsArray[i][0]}-${movementsArray[i][1]}`).addClass('showMovements'); // add your css class to show movementsArray


      // Attaching the click event listeners to each movement position


      $(`.grid-item-${movementsArray[i][0]}-${movementsArray[i][1]}`).on('click',(e) => {

        let currentClass = e.target.classList[0];
        let newPos = currentClass.split('-');
        newPos = [parseInt(newPos[2]),parseInt(newPos[3])];

        for(let i = 0; i < player.length ; i++){
          
          if(player[i].turn === true){ 

            playerPrevPosn = player[i].playerPosn;

            // if any weapon in area then this condition is true

            if(weaponMovementsArray.length > 0){
              for(let j = 0 ; j < weaponMovementsArray.length ; j++){
                
                // If player moves on weapon or on any location near the weapon

                if(JSON.stringify(weaponMovementsArray[j].positions).indexOf(JSON.stringify(newPos)) !== -1){
                  

                  if(player[i].name === 'safari'){
                    $(`.grid-item-${playerPrevPosn[0]}-${playerPrevPosn[1]}`).removeClass('safari')
                    $(`.grid-item-${playerPrevPosn[0]}-${playerPrevPosn[1]}`).addClass('tileImg') 
                  } 
                  else{
                    $(`.grid-item-${playerPrevPosn[0]}-${playerPrevPosn[1]}`).removeClass('sahara');
                    $(`.grid-item-${playerPrevPosn[0]}-${playerPrevPosn[1]}`).addClass('tileImg') 
                  }                  


                $(
                  `.grid-item-${weaponMovementsArray[j].weapon.weapnPosn[0]}-${weaponMovementsArray[j].weapon.weapnPosn[1]}`
                ).removeClass(`${weaponMovementsArray[j].weapon.name.toString()}`);
                $(
                  `.grid-item-${weaponMovementsArray[j].weapon.weapnPosn[0]}-${weaponMovementsArray[j].weapon.weapnPosn[1]}`
                ).removeClass('showMovements');

                $(
                  `.grid-item-${weaponMovementsArray[j].weapon.weapnPosn[0]}-${weaponMovementsArray[j].weapon.weapnPosn[1]}`
                ).off('click');

                  weapon.forEach((weapons) => {
                    if(player[i].weapon.id === weapons.id){
                      weapons.weapnPosn = playerPrevPosn;
                      $(
                        `.grid-item-${weapons.weapnPosn[0]}-${weapons.weapnPosn[1]}`
                      ).addClass(`${weapons.name.toString()}`);
                    }
                  })

                  weapon.forEach((weapons) => {
                    if(weapons.id === weaponMovementsArray[j].weapon.id){
                        weapons.weapnPosn = []
                        player[i].weapon = weapons

                        if(player[i].name === 'safari'){
                          $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).removeClass('safari')
                          $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).addClass('tileImg') 
                        } 
                        else{
                          $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).removeClass('sahara');
                          $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).addClass('tileImg') 
                        }  
              
        
                        $(`.${currentClass}`).removeClass('showMovements');
        
                        player[i].name === 'safari' ?
                        $(`.${currentClass}`).addClass('safari') :
        
                        $(`.${currentClass}`).addClass('sahara');
        
                        $(`.${currentClass}`).off('click');

                        movementsArray = movementsArray.filter(movement => JSON.stringify(movement) !== JSON.stringify(newPos) )

                        player[i].turn = false;
                        player[i].playerPosn = newPos;
                        
                    }
                  })

                }

                // If player does not move on the weapon

                else{

                if(player[i].name === 'safari'){
                  $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).removeClass('safari')
                  $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).addClass('tileImg') 
                } 
                else{
                  $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).removeClass('sahara');
                  $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).addClass('tileImg') 
                }  
      

                $(`.${currentClass}`).removeClass('showMovements');

                player[i].name === 'safari' ?
                $(`.${currentClass}`).addClass('safari') :

                $(`.${currentClass}`).addClass('sahara');

                $(`.${currentClass}`).off('click');

                movementsArray = movementsArray.filter(movement => JSON.stringify(movement) !== JSON.stringify(newPos) )

                player[i].turn = false;
                player[i].playerPosn = newPos;

                }
              }

            }

             // if no weapon is in the area then changing the css for the player is easier.

            else{

              if(player[i].name === 'safari'){
                $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).removeClass('safari')
                $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).addClass('tileImg') 
              } 
              else{
                $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).removeClass('sahara');
                $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).addClass('tileImg') 
              }  


              $(`.${currentClass}`).removeClass('showMovements');

              player[i].name === 'safari' ?
              $(`.${currentClass}`).addClass('safari') :

              $(`.${currentClass}`).addClass('sahara');

              $(`.${currentClass}`).off('click');

              movementsArray = movementsArray.filter(movement => JSON.stringify(movement) !== JSON.stringify(newPos) )

              player[i].turn = false;
              player[i].playerPosn = newPos;

            }



          }

          else{
            $(`.grid-item-${player[i].playerPosn[0]}-${player[i].playerPosn[1]}`).off('click');

            movementsArray = movementsArray.filter(movement => JSON.stringify(movement) !== JSON.stringify(player[i].playerPosn))

            player[i].turn = true;
          }

        }

        weapon.forEach(weapons => {
          if(JSON.stringify(movementsArray).indexOf(JSON.stringify(weapons.weapnPosn)) !== -1){
            $(`.grid-item-${weapons.weapnPosn[0]}-${weapons.weapnPosn[1]}`).off('click');
            $(`.grid-item-${weapons.weapnPosn[0]}-${weapons.weapnPosn[1]}`).removeClass('showMovements');

          }
          movementsArray = movementsArray.filter(movement => JSON.stringify(movement) !== JSON.stringify(weapons.position))
        })

        this.movementCallback();
      })

    }
    
  }

  /* This function is used as a callback to show other player movement, and also decide if player one is 
    close to player two, if so, the battle would start
  */

  movementCallback(){

    //inside of this array we store all the positions which are near to player 1

    let surroundingTiles = [];

    // Remove css of movements and also remove the click event listeners
    for(let i = 0 ; i < movementsArray.length ; i++){
      $(`.grid-item-${movementsArray[i][0]}-${movementsArray[i][1]}`).off('click')
      $(`.grid-item-${movementsArray[i][0]}-${movementsArray[i][1]}`).removeClass('showMovements');
      $(`.grid-item-${movementsArray[i][0]}-${movementsArray[i][1]}`).addClass('tileImg');
    }


    if(player[0].playerPosn[0] + 1 < 8){
      surroundingTiles.push([player[0].playerPosn[0] + 1, player[0].playerPosn[1]] )
    }

    if(player[0].playerPosn[1] + 1 < 8){
      surroundingTiles.push([player[0].playerPosn[0], player[0].playerPosn[1] + 1] )
    }

    if(player[0].playerPosn[0] - 1 > 0){
      surroundingTiles.push([player[0].playerPosn[0] - 1, player[0].playerPosn[1]] )
    }

    if(player[0].playerPosn[1] - 1 > 0){
      surroundingTiles.push([player[0].playerPosn[0], player[0].playerPosn[1] - 1] )
    }

    // if the below condition is true then battle starts

    if(JSON.stringify(surroundingTiles).indexOf(JSON.stringify(player[1].playerPosn)) !== -1){
   
      battle.beginBattle(player)
      alert('Battle Begins');
    }

    // otherwise

    else{
      this.showPlayerMovements()

    }


  }

  generateModal(){

    // Get the modal
      var modal = document.getElementById("myModal");

      // Get the button that opens the modal
      var btn = document.getElementById("myBtn");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      var exit = document.getElementsByClassName("exit")[0];

      // When the user clicks on the button, open the modal
      // btn.onclick = function() {
        modal.style.display = "block";
      // }

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }

      exit.onclick = function() {
        window.close();
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
  }


  


}
