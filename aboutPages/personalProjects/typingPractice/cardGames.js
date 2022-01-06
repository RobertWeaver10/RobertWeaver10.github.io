/**
 * this doc creates a deck of playing cards and then depending on what game the user chooses to play
 * the deck of cards is shuffled and then the selected game starts. The games that will initially be
 * included in this doc are black jack, hearts, and solitare
 * 
 * @version 12/31/21
 * @author Robert Weaver
 */

let gameInstructions = document.querySelector(".card-game-instructions");
let gameArea = document.querySelector(".card-game-area");
/**
 * function that creates a new deck of cards unshuffled
 * @param deck is the empty deck of cards that needs to be populated
 */
function populateDeck(deck){
    //next populate the deck with the playing cards
    for (var i = 0; i < 13; i++){
        //create a card for each suit for the current value
        let diamondCard = new Object();
        let heartCard = new Object();
        let spadeCard = new Object();
        let clubCard = new Object();

        //set the suit for the cards
        diamondCard.suit = 'diamonds';
        heartCard.suit = 'hearts';
        spadeCard.suit = 'spades';
        clubCard.suit = 'clubs';

        //if i == 0 then make the value of the card an ace
        if (i == 0){
            diamondCard.value = 'Ace';
            heartCard.value = 'Ace';
            spadeCard.value = 'Ace';
            clubCard.value = 'Ace';
        }
        //if we are on the 11th iteration make the value a Jack
        else if (i == 10){
            diamondCard.value = 'Jack';
            heartCard.value = 'Jack';
            spadeCard.value = 'Jack';
            clubCard.value = 'Jack';
        }
        //if we are on the 12th iteration make the value a Queen
        else if (i == 11){
            diamondCard.value = 'Queen';
            heartCard.value = 'Queen';
            spadeCard.value = 'Queen';
            clubCard.value = 'Queen';
        }
        //if we are on the 13th iteration make the value a King
        else if (i == 12){
            diamondCard.value = 'King';
            heartCard.value = 'King';
            spadeCard.value = 'King';
            clubCard.value = 'King';
        }
        //otherwise we are not on a special value so make the value the iteration
        else {
            diamondCard.value = i+1;
            heartCard.value = i+1;
            spadeCard.value = i+1;
            clubCard.value = i+1;
        }
        //add the cards to the deck
        deck.push(diamondCard);
        deck.push(heartCard);
        deck.push(spadeCard);
        deck.push(clubCard);
    }
}

/**
 * this function takes the deck of playing cards and shuffles the order around
 * @param deck is the deck of cards that is going to get shuffled
 */
function shuffleDeck(deck){
    for (var i = 0; i < deck.length/2; i++){
        let randInd1 = Math.floor(Math.random() * 52);
        let randInd2 = Math.floor(Math.random() * 52);

        if (randInd2 == randInd1){
            randInd2 = Math.floor(Math.random() * 52);
        }

        let tempCard1 = deck[randInd1];
        let tempCard2 = deck[randInd2];

        deck[randInd1] = tempCard2;
        deck[randInd2] = tempCard1;
    } 
}

/**
 * this function creates a game of black jack where the user plays against the 
 * computer with the computer playing as the house. this function plays a game
 * of black jack by each hand
 */
function blackJack() {
    //create the initial deck
    let gameDeck = [];
    populateDeck(gameDeck);//populate with cards
    shuffleDeck(gameDeck);//shuffle deck

    //add the instructions for how to play black jack
    let instructions = "The goal of Black Jack is to have the total value of your hand be as close to 21 exceeding 21. <br/>";
    instructions += "Face cards all have a value of 10 and ace cards can be treated as either 1 or 11. <br/>";
    instructions += "Each player is dealt 2 cards face up while the house has it's first card face up and second face down. <br/>";
    instructions += "On the player's turn they can either hit, hold, or split <br/>";
    instructions += "Hit: player adds a card from the deck to their hand <br/>";
    instructions += "Hold: player ends their turn <br/>";
    instructions += "Split: if the player initially has 2 cards of the same value they can treat each card like it's own hand <br/>";
    gameInstructions.innerHTML = instructions;
    
    //add the html elements necessary to play the game
    //need a button to get new hand, hit, hold, split, and end game
    let newHand = document.createElement("input");
    newHand.type = "button";
    newHand.value = "new hand";
    gameArea.appendChild(newHand);

    let hitButton = document.createElement("input");
    hitButton.type = "button";
    hitButton.value = "hit";
    gameArea.appendChild(hitButton);

    let holdButton = document.createElement("input");
    holdButton.type = "button";
    holdButton.value = "hold";
    gameArea.appendChild(holdButton);

    let splitButton = document.createElement("input");
    splitButton.type = "button";
    splitButton.value = "split";
    gameArea.appendChild(splitButton);

    let stopButton = document.createElement("input");
    stopButton.type = "button";
    stopButton.value = "end game";
    gameArea.appendChild(stopButton);

    //add event handlers to the buttons

    //hit event handler
        //pull card from deck
        //add card to player's hand
        //if total value of player's hand is > 21 (make sure to handle aces appropriately)
            //player bust, means they lose
            //reveal the dealer's face down card
            //update html
        //
    //

    //hold event handler
        //stop the user from being able to hit
        //let the "dealer" (computer) play out their hand
            //reveal the face down card
            //if dealer's hand < 17
                //hit
            //else if dealer's hand > 21 && player hand is <= 21 dealer has bust
                //the dealer's lost the hand
                //update html to congradulate player
            //else the dealer's hand is at or greater than 17
                //stop hitting
                //compare with player's hand value
                    //if dealer's hand value > player's hand value
                        //dealer wins
                    //else if dealer's hand == player's hand 
                        //its a draw (when implementing wager feature player gets their wager back and nothing more)
                    //else the player wins
                        //player wins their wager back * 2
                    //
                //
            //
        //
    //

    //split event handler
        //if player hand has 2 cards of same value
            //allow user option to split
            //if split
                //create new hand
                //pop 1 card from initial hand
                //push card onto new hand
                //initial and new hands hit once to get second card

                //TODO: need to figure out how to handle multiple hands so that player is only playing 1 hand at a time
            //
        //
    //

    //end game event handler
        //refreshes page so no game has been chosen yet
    //

}

blackJack();