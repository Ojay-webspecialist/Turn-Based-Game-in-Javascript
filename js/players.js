

export class Players{

    constructor(playerPosn,weapon,name,image,turn,health =100,defend = false){
            
            this.name =name;
            this.image = image;
            this.health = health;
            this.turn = turn;
            this.playerPosn = playerPosn;
            this.weapon = weapon;
            this.defend = false;
    }
}