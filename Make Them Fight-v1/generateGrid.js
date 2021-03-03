

/**
 * A class to dynamically generate the game map
 * a battleField variable to hold the dom element with id = battleField was declared
 * looped over the grid_value variable that holds the number of grid elements to display
 * using a nested loop for the row and columns grid
 * dynamically creating the grid-item using the jquery append method to attach it to the battleField dom element
 * dynamically set the background image and border properties  for each of the grid-items just created 
 * creating the map dynamically  using grid template columns and grid template rows.
 */

  class GenerateGrid{

   constructor(){
    this.grid_value =0;
    
   } 
    
   drawBattleGrid(grid_value){
     
    this.grid_value = grid_value;
    const battleField = document.getElementById('battleField');
       
       for(let row =0; row < this.grid_value; row++){
           
           for(let column = 0 ; column <this.grid_value; column++){
               $('#battleField').append(`<div class=grid-item-${row}-${column} grid-item> </div>`);
               
               let imageUrl = "./images/battleGrnd.png";
                 $(`.grid-item-${row}-${column}`).addClass('tileImg');
               $(`.grid-item-${row}-${column}`).css("border", " 1px solid #1f5916");
           }
           
       }

    
       battleField.style.gridTemplateColumns = `repeat(${grid_value}, 1fr)`;
       battleField.style.gridTemplateRows = `repeat(${grid_value}, 1fr)`;

       
        
   };

  
 }

 export  {GenerateGrid} ;

