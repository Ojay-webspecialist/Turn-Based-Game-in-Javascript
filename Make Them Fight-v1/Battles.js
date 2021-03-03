
let players;
let weapon;


export class Battle{
// a class that contains the battle logic for the game
    constructor(){}

    // Panel is updated continously after each move on the board
    updatePanel(player){
        players = player;
    //function scoped variable called players being assigned the value of the function parameter player
        for(let i = 1 ; i < 3 ; i++){

            // this for loop iterates over the left pane game controller panel to change the player status, health,weapon and damage points
            $(`.player-${i}-attack-btn`).prop('disabled',true)
            $(`.player-${i}-defend-btn`).prop('disabled',true) 
            $(`.player-${i}-health`).text(`Health : ${players[i-1].health}`);
            $(`.player-${i}-damage`).text(`Damage : ${players[i-1].weapon.damagePnts}`);
            $(`.player-${i}-weapon-name`).text(`Weapon : ${players[i-1].weapon.name}`);
              
        } //end of for loop
    } //end of updatePanel function

    // Updating the panel once the battle has started


    /**
     * The begin battle function begins the battle once the proximity condition is met, that is once a player is vertically or horizontally adjacent to 
     * the other player the battle begins
     * @param {*} player 
     */
    beginBattle(player){
    
        players = player;

        for(let i = 1 ; i < 3 ; i++){


            $(`.player-${i}-health`).text(`Health : ${players[i-1].health}`);
            $(`.player-${i}-damage`).text(`Damage : ${players[i-1].weapon.damagePnts}`);
            $(`.player-${i}-weapon-name`).text(`Weapon : ${players[i-1].weapon.name}`);


            if(players[i-1].turn === true){ // 1-1 = 0 // player 1 turn
      
               
                $(`.player-${i}-attack-btn`).prop('disabled',false) 
                $(`.player-${i}-defend-btn`).prop('disabled',false) 

                $(`.player-${i}-attack-btn`).on('click',(e) => {
                    
                    for(let i = 1 ; i < 3 ; i++){
                        
                        if(players[i-1].turn === true){ 

                            players[i-1].turn = false;
                            $(`.player-${i}-attack-btn`).prop('disabled',true)
                            $(`.player-${i}-defend-btn`).prop('disabled',true)
                            $(`.player-${i}-attack-btn`).off('click')
                            $(`.player-${i}-defend-btn`).off('click')
                

                            let damage = players[i-1].weapon.damagePnts

                            if(i === 2){ // for first player
                                players[i-2].defend ? players[i-2].health = players[i-2].health - (parseInt(damage) *0.5) :
                                players[i-2].health = players[i-2].health - parseInt(damage)

                                players[i-2].defend = false;

                                players[i-2].health < 0 ? players[i-2].health = 0 : players[i-2].health

                            }
                            else{ // for second player
                                players[i].defend ? players[i].health = players[i].health - (parseInt(damage) *0.5) :
                                players[i].health = players[i].health - parseInt(damage)
                                
                                players[i].defend = false;

                                players[i].health < 0 ? players[i].health = 0 : players[i].health
                            }

                        }

                        else{
                            players[i-1].turn = true;
                        }

                    }

                    this.battleCallback()
                })

                $(`.player-${i}-defend-btn`).on('click',(e) => {

                
                    for(let i = 1 ; i < 3 ; i++){
                        if(players[i-1].turn === true){

                            players[i-1].turn = false;
                            $(`.player-${i}-attack-btn`).prop('disabled',true)
                            $(`.player-${i}-defend-btn`).prop('disabled',true)
                            $(`.player-${i}-attack-btn`).off('click')
                            $(`.player-${i}-defend-btn`).off('click')

                            player[i-1].defend = true;
                        }

                        else{
                            players[i-1].turn = true;
                        }
                    }

                    this.battleCallback()
                })
            }
        }//end of for loop that sets the current player to either defend or attack

    }

    battleCallback(){   
        for(let i = 1 ; i < 3 ; i++){
            $(`.player-${i}-health`).text(`Health : ${players[i-1].health}`);              
        }

      
        if(players[0].health === 0 ){
            $('.result-container').css('display','block')
            $('.winner-image').attr('src', './images/sahara.jpg');
            $('.win-text').text('Sahara  has Won!');


            console.log(players[0].name + 'lost');
            
        }
        else if(players[1].health === 0){
            $('.result-container').css('display','block')
            $('.winner-image').attr('src', './images/safari.jpg');

            $('.win-text').text('Safari  has won!');
            console.log(players[1].name + 'lost');

        }
        else{
            this.beginBattle(players)
        }
    }
}