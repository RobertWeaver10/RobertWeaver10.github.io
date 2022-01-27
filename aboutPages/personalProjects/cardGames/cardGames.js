/**
 * this doc creates a deck of playing cards and then depending on what game the user chooses to play
 * the deck of cards is shuffled and then the selected game starts. The games that will initially be
 * included in this doc are black jack, hearts, and solitare
 * 
 * @version 12/31/21
 * @author Robert Weaver
 */

let gameSelectionButton = document.querySelector("#start-game");
let gameSelection = document.querySelector(".choose-card-game");
let gameInstructions = document.querySelector(".card-game-instructions");
let gameArea = document.querySelector(".card-game-controls");
let gameVisuals = document.querySelector(".card-game-graphics");
let gameSelectionValue = "";

gameSelection.addEventListener("change", () => {
    gameSelectionValue = gameSelection.value;
});

gameSelectionButton.addEventListener("click", () => {
    if (gameSelectionValue == 'blackJack'){
        gameArea.innerHTML = "";
        gameVisuals.innerHTML = "";
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
        newHand.id = "new-hand-button";
        gameArea.appendChild(newHand);

        let hitButton = document.createElement("input");
        hitButton.type = "button";
        hitButton.value = "hit";
        hitButton.id = "hit-button";
        gameArea.appendChild(hitButton);

        let holdButton = document.createElement("input");
        holdButton.type = "button";
        holdButton.value = "hold";
        holdButton.id = "hold-button";
        gameArea.appendChild(holdButton);

        let splitButton = document.createElement("input");
        splitButton.type = "button";
        splitButton.value = "split";
        splitButton.id = "split-button";
        gameArea.appendChild(splitButton);

        let stopButton = document.createElement("input");
        stopButton.type = "button";
        stopButton.value = "end game";
        stopButton.id = "stop-button";
        gameArea.appendChild(stopButton);

        //add the divs for the dealer and player hands
        let dealerHandArea = document.createElement('div');
        dealerHandArea.id = "dealer-hand-area";
        gameVisuals.appendChild(dealerHandArea);

        let playerHandArea = document.createElement('div');
        playerHandArea.id = "player-hand-area";
        gameVisuals.appendChild(playerHandArea);
        blackJack();
    }
    else if (gameSelectionValue == 'hearts'){
        gameInstructions.innerHTML = "Coming soon";
        gameArea.innerHTML = "";
        gameVisuals.innerHTML = "";
    }
    else if (gameSelectionValue == 'solitaire'){
        gameInstructions.innerHTML = "Coming soon";
        gameArea.innerHTML = "";
        gameVisuals.innerHTML = "";
    }
    else if (gameSelectionValue == "chooseGame"){
        gameInstructions.innerHTML = `Select a game from the drop down menu above, once a game has <br/>been selected click the "Go" button to start the game.`;
        gameArea.innerHTML = "";
        gameVisuals.innerHTML = "";
    }
})

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
            diamondCard.value = 'ace';
            heartCard.value = 'ace';
            spadeCard.value = 'ace';
            clubCard.value = 'ace';
        }
        //if we are on the 11th iteration make the value a Jack
        else if (i == 10){
            diamondCard.value = 'jack';
            heartCard.value = 'jack';
            spadeCard.value = 'jack';
            clubCard.value = 'jack';
        }
        //if we are on the 12th iteration make the value a Queen
        else if (i == 11){
            diamondCard.value = 'queen';
            heartCard.value = 'queen';
            spadeCard.value = 'queen';
            clubCard.value = 'queen';
        }
        //if we are on the 13th iteration make the value a King
        else if (i == 12){
            diamondCard.value = 'king';
            heartCard.value = 'king';
            spadeCard.value = 'king';
            clubCard.value = 'king';
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

//functions for black jack functionality

/**
 * this function simulates a player "hitting". it adds a card to the specified hand
 * @param hand is the hand of the player
 * @param deck is the deck of cards that is being used in the game
 * @param area is the area where to add the card on screen (dealer vs player)
 */
function hit (hand, deck, area) {
    let playerHandArea = document.querySelector("#player-hand-area")
    let dealerHandArea = document.querySelector("#dealer-hand-area")


    hand.push(deck.pop());
    let newCard = document.createElement('img');
    newCard.src = "cards/"+hand[hand.length-1].value + "_of_" + hand[hand.length-1].suit + ".png"
 
    if (area == "player"){
        playerHandArea.appendChild(newCard);
    }
    else if (area == "dealer"){
        dealerHandArea.appendChild(newCard);
    }
        
    let totalValue = 0;
    for (var i = 0; i < hand.length; i++){
        if (hand[i].value == 'jack'){
            totalValue += 10;
        }
        else if (hand[i].value == 'queen'){
            totalValue += 10;
        }
        else if (hand[i].value == 'king'){
            totalValue += 10;
        }
        else if (hand[i].value == 'ace'){
            if (totalValue + 11 <= 21){
                totalValue += 11;
            }
            else {
                totalValue += 1;
            }
        }
        else {
            totalValue += hand[i].value;
        }
    }
    if (totalValue > 21){
        let bustText = document.createElement('p');
        bustText.id = "bust-text";
        bustText.innerHTML = "Bust!";
        //gameVisuals.innerHTML = "";
        gameVisuals.appendChild(bustText);
    }
}

/**
 * this function is called when a player chooses to hold. It reveals the dealer's face
 * down card and then has the dealer hit until the dealer's total value is equal to or
 * greater than 17
 * @param playerHand is the hand of the player
 * @param dealerHand is the hand of the dealer
 */
function hold (playerHand, dealerHand){
    //if playerhand total value > 21 then player bust
    let playerTotVal = 0;
    for (var i = 0; i < playerHand.length; i++){
        if (hand[i].value == 'jack'){
            playerTotVal += 10;
        }
        else if (hand[i].value == 'queen'){
            playerTotVal += 10;
        }
        else if (hand[i].value == 'king'){
            playerTotVal += 10;
        }
        else if (hand[i].value == 'ace'){
            if (playerTotVal + 11 <= 21){
                playerTotVal += 11;
            }
            else {
                playerTotVal += 1;
            }
        }
        else {
            playerTotVal += hand[i].value;
        }
    }
    if (playerTotVal > 21){ //if the player bust only have to reveal the dealer's card
        let dealerFDCard = document.querySelector("#dealer-face-down-card");
        dealerFDCard.src = "cards/"+dealerHand[1].value+"_of_"+dealerHand[1].suit+".png";
        let bustText = document.querySelector("#bust-text");
        bustText.innerHTML = "Player bust (" + playerTotVal + "), house wins";
    }
    else { //the player did not bust so we have to have the dealer get to at least 17

    }
        //only reveal the face down card, no need to add cards to dealer
    //flip the dealer's face down card
    //dealer hit until a total value of 17 is reached
    //compare the total value of the player's hand to the dealer's hand
    //determine who was closer to 21
    //update html to display who won
}

/**
 * this function creates a game of black jack where the user plays against the 
 * computer with the computer playing as the house. this function plays a game
 * of black jack by each hand
 */
function blackJack() {
    //query select the game buttons
    let newHandButton = document.querySelector("#new-hand-button");
    let hitButton = document.querySelector("#hit-button");
    let holdButton = document.querySelector("#hold-button");
    let splitButton = document.querySelector("#split-button");
    let stopButton = document.querySelector("#stop-button");

    //query select the player and dealer hand areas
    let dealerHandArea = document.querySelector('#dealer-hand-area');
    let playerHandArea = document.querySelector('#player-hand-area');

    //create the initial deck
    let gameDeck = [];
    populateDeck(gameDeck);//populate with cards
    shuffleDeck(gameDeck);//shuffle deck

    //create the user and dealer hands
    let playerHand = [];
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    console.log(playerHand);

    let dealerHand = [];
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    console.log("dealer hand: " + dealerHand);

    //display the cards in the player and dealer hands to the screen
    let dealerCard1 = document.createElement('img');
    dealerCard1.src = "cards/"+dealerHand[0].value+"_of_"+dealerHand[0].suit+".png";
    dealerHandArea.appendChild(dealerCard1);
    let dealerCard2 = document.createElement('img');
    dealerCard2.src = "cards/backside.jpeg";
    dealerCard2.id = "dealer-face-down-card";
    dealerHandArea.appendChild(dealerCard2);
    gameVisuals.appendChild(dealerHandArea);

    gameVisuals.appendChild(document.createElement('br'));
    gameVisuals.appendChild(document.createElement('br'));
    gameVisuals.appendChild(document.createElement('br'));

    let playerCard1 = document.createElement('img');
    playerCard1.src = "cards/"+playerHand[0].value+"_of_"+playerHand[0].suit+".png";
    playerHandArea.appendChild(playerCard1);
    let playerCard2 = document.createElement('img');
    playerCard2.src = "cards/"+playerHand[1].value+"_of_"+playerHand[1].suit+".png";
    playerHandArea.appendChild(playerCard2);
    gameVisuals.appendChild(playerHandArea);

    //add event handlers to the buttons
    //new hand event listener

    //hit event handler
    hitButton.addEventListener("click", () => {
        hit(playerHand, gameDeck, "player");
    });

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