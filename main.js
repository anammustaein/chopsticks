import "./style.css";

console.log($);

let skinState = "gold";
let difficultyState = ""; // This is for when I decide to expand the game

$(() => {
  const main = () => {
    showMain();
    $("#start-button").on("click", showGame);
  };

  const showMain = () => {
    $("#landing-page").show();
    $("#game-page").hide();
    $("#genius").hide();
    $("#genius-unavailable").show();

    // On-click selection (skin tone)
    $(".circle").on("click", (event) => {
      $(".circle").css("border-color", "#555");
      $(event.currentTarget).css("border-color", "dodgerblue");
      if (event.currentTarget.id === "gold") {
        console.log("Default skin is selected");
      } else if (event.currentTarget.id === "navajowhite") {
        console.log("Light skin is selected");
      } else if (event.currentTarget.id === "peru") {
        console.log("Tan skin is selected");
      } else if (event.currentTarget.id === "sienna") {
        console.log("Dark skin is selected");
      }
      skinState = event.currentTarget.id;
      console.log("Skin color: " + skinState);
      // console.log(skinState);
    });

    // On-click selection (difficulty)
    $(".rectangle").on("click", (event) => {
      $(".rectangle").css("border-color", "grey");
      $(event.currentTarget).css("border-color", "dodgerblue");
      console.log(event.currentTarget.id + " opponent is selected");
      difficultyState = event.currentTarget.id;
      // console.log(difficultyState);
    });

    // On-click genius (not available)
    $("#genius-unavailable").on("click", (event) => {
      console.log("Genius mode has not been unlocked");
    });

    // On-click rules
    const showRules = () => {
      $("#rules-window").css("display", "block");
    };
    const closeRules = () => {
      $("#rules-window").css("display", "none");
    };
    $("#rules-button").on("click", showRules);
    $("span").on("click", closeRules);
  };

  const showGame = () => {
    $("#landing-page").hide();
    $("#game-page").show();
    $(".board").show();
    $("#win").hide();
    $("#lose").hide();
    $(".move").show();
    $(".move-split").hide();
    $(".move-attack-1").hide();
    $(".move-attack-2-left").hide();
    $(".move-attack-2-right").hide();
    $(".computers-turn").hide();
    $("#player-left-hand").hide();
    $("#player-right-hand").hide();
    $(".win-state").hide();
    $(".lose-state").hide();

    // initialize number of hands and fingers
    let computerLeftFingers = 1;
    let computerRightFingers = 1;
    let playerLeftFingers = 1;
    let playerRightFingers = 1;
    let playerPlayingHand;
    let computerHands = 2;
    let playerHands = 2;
    let leftInitialState; // used to compare values when splitting
    let rightInitialState; // used to compare values when splitting
    
    $("#player-left").text(playerLeftFingers);
    $("#player-right").text(playerRightFingers);
    $("#computer-left").text(computerLeftFingers);
    $("#computer-right").text(computerRightFingers);

    // Return hand border-color state to original
    $("#player-left").css("border-color", "black");
    $("#player-right").css("border-color", "black");
    $("#player-left").css("background-color", skinState);
    $("#player-right").css("background-color", skinState);

    // Move toggle – Player's hands
    $("#p-left-hand").on("mouseover", () => {
      $("#player-left").css("background-color", "dodgerblue");
    });
    $("#p-left-hand").on("mouseout", () => {
      $("#player-left").css("background-color", skinState);
    });
    $("#p-right-hand").on("mouseover", () => {
      $("#player-right").css("background-color", "dodgerblue");
    });
    $("#p-right-hand").on("mouseout", () => {
      $("#player-right").css("background-color", skinState);
    });

    // Move toggle – Attack
    $("#com-left-hand").on("mouseover", () => {
      $("#computer-left").css("background-color", "crimson");
    });
    $("#com-left-hand").on("mouseout", () => {
      $("#computer-left").css("background-color", "lightgray");
    });
    $("#com-right-hand").on("mouseover", () => {
      $("#computer-right").css("background-color", "crimson");
    });
    $("#com-right-hand").on("mouseout", () => {
      $("#computer-right").css("background-color", "lightgray");
    });
    $("#p-other-right").on("mouseover", () => {
      $("#player-right").css("background-color", "dodgerblue");
    });
    $("#p-other-right").on("mouseout", () => {
      $("#player-right").css("background-color", skinState);
    });
    $("#com-left-hand-2").on("mouseover", () => {
      $("#computer-left").css("background-color", "crimson");
    });
    $("#com-left-hand-2").on("mouseout", () => {
      $("#computer-left").css("background-color", "lightgray");
    });
    $("#com-right-hand-2").on("mouseover", () => {
      $("#computer-right").css("background-color", "crimson");
    });
    $("#com-right-hand-2").on("mouseout", () => {
      $("#computer-right").css("background-color", "lightgray");
    });
    $("#p-other-left").on("mouseover", () => {
      $("#player-left").css("background-color", "dodgerblue");
    });
    $("#p-other-left").on("mouseout", () => {
      $("#player-left").css("background-color", skinState);
    });

    // Move toggle – Split
    $("#split-left-hand").on("mouseover", () => {
      $("#player-left").css("background-color", "dodgerblue");
    });
    $("#split-left-hand").on("mouseout", () => {
      $("#player-left").css("background-color", skinState);
    });
    $("#split-right-hand").on("mouseover", () => {
      $("#player-right").css("background-color", "dodgerblue");
    });
    $("#split-right-hand").on("mouseout", () => {
      $("#player-right").css("background-color", skinState);
    });
    $("#confirm-split").on("mouseover", () => {
      $("#player-left").css("background-color", "yellowgreen");
      $("#player-right").css("background-color", "yellowgreen");
    });
    $("#confirm-split").on("mouseout", () => {
      $("#player-left").css("background-color", skinState);
      $("#player-right").css("background-color", skinState);
    });

    // Check to see if split is possible
    const checkSplit = () => {
      let totalFingers = playerLeftFingers + playerRightFingers;
      if (
        playerLeftFingers != playerRightFingers &&
        totalFingers != 1 &&
        totalFingers != 7
      ) {
        $("#split").show();
        $("#cant-split").hide();
        $("#split").on("click", split);
      } else if (totalFingers === 3) {
        if (playerLeftFingers === 1 && playerRightFingers === 2) {
          $("#cant-split").show();
          $("#split").hide();
        } else if (playerLeftFingers === 2 && playerRightFingers === 1) {
          $("#cant-split").show();
          $("#split").hide();
        } else {
          $("#split").show();
          $("#cant-split").hide();
          $("#split").on("click", split);
        }
      } else {
        $("#cant-split").show();
        $("#split").hide();
      }
    };

    // Attack function
    const attack = () => {
      console.log("Attack is selected");
      $(".move").hide();
      $(".move-attack-1").show();
    };

    // Split function
    const split = () => {
      console.log("Split is selected");
      $(".move").hide();
      $(".move-split").show();
      // This is to make sure that dead hands are resurrected when splitting
      if (playerLeftFingers === 0) {
        // Splitting value of 2 is a special case because there's only one result
        if (playerRightFingers === 2) {
          playerHands = 2;
          playerLeftFingers = 1;
          playerRightFingers = 1;
          $("#player-left").text(playerLeftFingers);
          $("#player-right").text(playerRightFingers);
        } else {
          playerHands = 2;
          playerLeftFingers = 1;
          playerRightFingers = playerRightFingers - 1;
          $("#split-left-value").text(playerLeftFingers);
          $("#split-right-value").text(playerRightFingers);
          $("#player-left").text(playerLeftFingers);
          $("#player-right").text(playerRightFingers);
        }
      } else if (playerRightFingers === 0) {
        if (playerLeftFingers === 2) {
          playerHands = 2;
          playerLeftFingers = 1;
          playerRightFingers = 1;
          $("#player-left").text(playerLeftFingers);
          $("#player-right").text(playerRightFingers);
        } else {
          playerHands = 2;
          playerRightFingers = 1;
          playerLeftFingers = playerLeftFingers - 1;
          $("#split-left-value").text(playerLeftFingers);
          $("#split-right-value").text(playerRightFingers);
          $("#player-left").text(playerLeftFingers);
          $("#player-right").text(playerRightFingers);
        }
      } else {
        leftInitialState = playerLeftFingers;
        rightInitialState = playerRightFingers;
        $("#split-left-value").text(playerLeftFingers);
        $("#split-right-value").text(playerRightFingers);
        $("#player-left").text(playerLeftFingers);
        $("#player-right").text(playerRightFingers);
      }
    };

    // Split-left function
    const splitLeft = () => {
      if (playerLeftFingers != 4 && playerRightFingers != 1) {
        console.log("Transferred finger to left hand");
        playerLeftFingers = playerLeftFingers + 1;
        playerRightFingers = playerRightFingers - 1;
        $("#player-left").text(playerLeftFingers);
        $("#player-right").text(playerRightFingers);
        $("#split-left-value").text(playerLeftFingers);
        $("#split-right-value").text(playerRightFingers);
      } else if (playerLeftFingers === 4) {
        console.log("Left hand is maxxed out");
      } else if (playerRightFingers === 1) {
        console.log("Each hand needs at least 1 finger");
      }
    };

    // Split-right function
    const splitRight = () => {
      playerHands = 2;
      if (playerRightFingers != 4 && playerLeftFingers != 1) {
        console.log("Transferred finger to left hand");
        playerRightFingers = playerRightFingers + 1;
        playerLeftFingers = playerLeftFingers - 1;
        $("#player-left").text(playerLeftFingers);
        $("#player-right").text(playerRightFingers);
        $("#split-left-value").text(playerLeftFingers);
        $("#split-right-value").text(playerRightFingers);
      } else if (playerRightFingers === 4) {
        console.log("Right hand is maxxed out");
      } else if (playerLeftFingers === 1) {
        console.log("Each hand needs at least 1 finger");
      }
    };

    // Confirm function
    const confirm = () => {
      console.log("Splitting successful");
      computersTurn();
    };

    // Left-hand function
    const leftHand = () => {
      console.log("Left hand is selected");
      $(".move-attack-1").hide();
      $(".move-attack-2-left").show();
      $("#player-left").css("border-color", "dodgerblue");
      playerPlayingHand = playerLeftFingers;
      // Conditions to ensure dead hands are not selectable
      if (
        playerRightFingers === 0 &&
        computerLeftFingers != 0 &&
        computerRightFingers != 0
      ) {
        $("#p-other-right").hide();
        $("#p-other-right-gray").show();
        $("#com-left-hand").show();
        $("#com-left-gray").hide();
        $("#com-right-hand").show();
        $("#com-right-gray").hide();
      } else if (
        playerRightFingers != 0 &&
        computerLeftFingers === 0 &&
        computerRightFingers != 0
      ) {
        $("#p-other-right").show();
        $("#p-other-right-gray").hide();
        $("#com-left-hand").hide();
        $("#com-left-gray").show();
        $("#com-right-hand").show();
        $("#com-right-gray").hide();
      } else if (
        playerRightFingers != 0 &&
        computerLeftFingers != 0 &&
        computerRightFingers === 0
      ) {
        $("#p-other-right").show();
        $("#p-other-right-gray").hide();
        $("#com-left-hand").show();
        $("#com-left-gray").hide();
        $("#com-right-hand").hide();
        $("#com-right-gray").show();
      } else if (
        playerRightFingers === 0 &&
        computerLeftFingers === 0 &&
        computerRightFingers != 0
      ) {
        $("#p-other-right").hide();
        $("#p-other-right-gray").show();
        $("#com-left-hand").hide();
        $("#com-left-gray").show();
        $("#com-right-hand").show();
        $("#com-right-gray").hide();
      } else if (
        playerRightFingers === 0 &&
        computerLeftFingers != 0 &&
        computerRightFingers === 0
      ) {
        $("#p-other-right").hide();
        $("#p-other-right-gray").show();
        $("#com-left-hand").show();
        $("#com-left-gray").hide();
        $("#com-right-hand").hide();
        $("#com-right-gray").show();
      } else {
        $("#p-other-right").show();
        $("#p-other-right-gray").hide();
        $("#com-left-hand").show();
        $("#com-left-gray").hide();
        $("#com-right-hand").show();
        $("#com-right-gray").hide();
      }
    };

    // Righthand function
    const rightHand = () => {
      console.log("Right hand is selected");
      $(".move-attack-1").hide();
      $(".move-attack-2-right").show();
      $("#player-right").css("border-color", "dodgerblue");
      playerPlayingHand = playerRightFingers;
      // Conditions to ensure dead hands are not selectable
      if (
        playerLeftFingers === 0 &&
        computerLeftFingers != 0 &&
        computerRightFingers != 0
      ) {
        $("#p-other-left").hide();
        $("#p-other-left-gray").show();
        $("#com-left-hand-2").show();
        $("#com-left-gray-2").hide();
        $("#com-right-hand-2").show();
        $("#com-right-gray-2").hide();
      } else if (
        playerLeftFingers != 0 &&
        computerLeftFingers === 0 &&
        computerRightFingers != 0
      ) {
        $("#p-other-left").show();
        $("#p-other-left-gray").hide();
        $("#com-left-hand-2").hide();
        $("#com-left-gray-2").show();
        $("#com-right-hand-2").show();
        $("#com-right-gray-2").hide();
      } else if (
        playerLeftFingers != 0 &&
        computerLeftFingers != 0 &&
        computerRightFingers === 0
      ) {
        $("#p-other-left").show();
        $("#p-other-left-gray").hide();
        $("#com-left-hand-2").show();
        $("#com-left-gray-2").hide();
        $("#com-right-hand-2").hide();
        $("#com-right-gray-2").show();
      } else if (
        playerLeftFingers === 0 &&
        computerLeftFingers === 0 &&
        computerRightFingers != 0
      ) {
        $("#p-other-left").hide();
        $("#p-other-left-gray").show();
        $("#com-left-hand-2").hide();
        $("#com-left-gray-2").show();
        $("#com-right-hand-2").show();
        $("#com-right-gray-2").hide();
      } else if (
        playerLeftFingers === 0 &&
        computerLeftFingers != 0 &&
        computerRightFingers === 0
      ) {
        $("#p-other-left").hide();
        $("#p-other-left-gray").show();
        $("#com-left-hand-2").show();
        $("#com-left-gray-2").hide();
        $("#com-right-hand-2").hide();
        $("#com-right-gray-2").show();
      } else {
        $("#p-other-left").show();
        $("#p-other-left-gray").hide();
        $("#com-left-hand-2").show();
        $("#com-left-gray-2").hide();
        $("#com-right-hand-2").show();
        $("#com-right-gray-2").hide();
      }
    };

    // // Right-hand function
    // const rightHand = () => {
    //   console.log("Right hand is selected");
    //   $(".move-attack-1").hide();
    //   $(".move-attack-2-right").show();
    //   $("#player-right").css("border-color", "dodgerblue");
    //   playerPlayingHand = playerRightFingers;
    //   // Conditions to ensure dead hands are not selectable
    //   if (computerRightFingers === 0) {
    //     $("#com-right-hand-2").hide();
    //     $("#com-right-gray-2").show();
    //     if (playerLeftFingers === 0) {
    //       $("#p-other-left").hide();
    //       $("#p-other-left-gray").show();
    //     } else {
    //       $("#p-other-left").show();
    //       $("#p-other-left-gray").hide();
    //     }
    //   } else if (computerLeftFingers === 0) {
    //     $("#com-left-hand-2").hide();
    //     $("#com-left-gray-2").show();
    //     if (playerLeftFingers === 0) {
    //       $("#p-other-left").hide();
    //       $("#p-other-left-gray").show();
    //     } else {
    //       $("#p-other-left").show();
    //       $("#p-other-left-gray").hide();
    //     }
    //   } else if (playerLeftFingers === 0) {
    //     $("#p-other-left").hide();
    //     $("#p-other-left-gray").show();
    //     if (computerRightFingers === 0 && computerLeftFingers != 0) {
    //       $("#com-right-hand-2").hide();
    //       $("#com-right-gray-2").show();
    //       $("#com-left-hand-2").show();
    //       $("#com-left-gray-2").hide();
    //     } else if (computerRightFingers != 0 && computerLeftFingers === 0) {
    //       $("#com-right-hand-2").show();
    //       $("#com-right-gray-2").hide();
    //       $("#com-left-hand-2").hide();
    //       $("#com-left-gray-2").show();
    //     } else {
    //       $("#com-right-hand-2").show();
    //       $("#com-right-gray-2").hide();
    //       $("#com-left-hand-2").show();
    //       $("#com-left-gray-2").hide();
    //     }
    //   } else {
    //     $("#com-right-hand-2").show();
    //     $("#com-right-gray-2").hide();
    //     $("#com-left-hand-2").show();
    //     $("#com-left-gray-2").hide();
    //     $("#p-other-left").show();
    //     $("#p-other-left-gray").hide();
    //   }
    // };

    // Print both player and computer active hands
    const printHands = () => {
      console.log(
        "Player Hands: " + playerHands + ". Computer Hands: " + computerHands
      );
    };

    // Move magic
    const computerLeftHand = () => {
      console.log("Attack computer's left hand");
      computerLeftFingers = computerLeftFingers + playerPlayingHand;
      console.log(computerLeftFingers);
      $("#computer-left").text(computerLeftFingers);
    };
    const computerRightHand = () => {
      console.log("Attack computer's right hand");
      computerRightFingers = computerRightFingers + playerPlayingHand;
      console.log(computerRightFingers);
      $("#computer-right").text(computerRightFingers);
    };
    const addToRightHand = () => {
      console.log("Add to right hand");
      playerRightFingers = playerRightFingers + playerPlayingHand;
      console.log(playerRightFingers);
      $("#player-right").text(playerRightFingers);
    };
    const addToLeftHand = () => {
      console.log("Add to left hand");
      playerLeftFingers = playerLeftFingers + playerPlayingHand;
      console.log(playerLeftFingers);
      $("#player-left").text(playerLeftFingers);
    };

    // Make only living hands playable
    const checkLivingHands = () => {
      if (playerLeftFingers != 0 && playerRightFingers != 0) {
        $("#p-left-hand").show();
        $("#gray-left-hand").hide();
        $("#p-right-hand").show();
        $("#gray-right-hand").hide();
      } else if (playerLeftFingers === 0 && playerRightFingers != 0) {
        $("#p-left-hand").hide();
        $("#gray-left-hand").show();
        $("#p-right-hand").show();
        $("#gray-right-hand").hide();
      } else if (playerLeftFingers != 0 && playerRightFingers === 0) {
        $("#p-left-hand").show();
        $("#gray-left-hand").hide();
        $("#p-right-hand").hide();
        $("#gray-right-hand").show();
      } else {
        console.log("Both hands are dead");
      }
    };

    // Dead hand conditions
    const deadPlayerLeftHand = () => {
      playerLeftFingers = 0;
      $("#player-left").text(playerLeftFingers);
      playerHands = playerHands - 1;
      // $("#player-left").css("background-color", "black");
    };

    const deadPlayerRightHand = () => {
      playerRightFingers = 0;
      $("#player-right").text(playerRightFingers);
      playerHands = playerHands - 1;
      // $("#player-right").css("background-color", "black");
    };

    const deadComLeftHand = () => {
      computerLeftFingers = 0;
      $("#computer-left").text(computerLeftFingers);
      computerHands = computerHands - 1;
      // $("#computer-left").css("background-color", "black");
    };

    const deadComRightHand = () => {
      computerRightFingers = 0;
      $("#computer-right").text(computerRightFingers);
      playerHands = playerHands - 1;
      // $("#computer-right").css("background-color", "black");
    };

    // Check dead hands
    const checkDeadHand = () => {
      if (playerLeftFingers > 4) {
        console.log("player left is dead");
        deadPlayerLeftHand();
      } else if (playerRightFingers > 4) {
        console.log("player right is dead");
        deadPlayerRightHand();
      } else if (computerLeftFingers > 4) {
        console.log("computer left is dead");
        deadComLeftHand();
      } else if (computerRightFingers > 4) {
        console.log("computer right is dead");
        deadComRightHand();
      } else {
        console.log("no dead hands");
      }
    };

    // Attack selected
    $("#attack").on("click", attack);
    // Left hand selected
    $("#p-left-hand").on("click", leftHand);
    // Right hand selected
    $("#p-right-hand").on("click", rightHand);
    // Attack computer's left hand
    $("#com-left-hand").on("click", (event) => {
      computerLeftHand();
      checkDeadHand();
      checkResultsOnPTurn();
    });
    // Attack computer's right hand
    $("#com-right-hand").on("click", (event) => {
      computerRightHand();
      checkDeadHand();
      checkResultsOnPTurn();
    });
    // Attack computer's left hand 2
    $("#com-left-hand-2").on("click", (event) => {
      computerLeftHand();
      checkDeadHand();
      checkResultsOnPTurn();
    });
    // Attack computer's right hand 2
    $("#com-right-hand-2").on("click", (event) => {
      computerRightHand();
      checkDeadHand();
      checkResultsOnPTurn();
    });
    // Add to left hand (other)
    $("#p-other-left").on("click", (event) => {
      addToLeftHand();
      checkDeadHand();
      checkResultsOnPTurn();
    });
    // Add to right hand (other)
    $("#p-other-right").on("click", (event) => {
      addToRightHand();
      checkDeadHand();
      checkResultsOnPTurn();
    });
    // Transfer to left hand
    $("#split-left-hand").on("click", splitLeft);
    // Transfer to right hand
    $("#split-right-hand").on("click", splitRight);
    // Confirm split
    $("#confirm-split").on("click", (event) => {
      if (playerLeftFingers === 1 && playerRightFingers === 1) {
        confirm();
      } else if (playerLeftFingers === leftInitialState || playerLeftFingers === rightInitialState) {
        console.log("Splitting does not work. Hand combination needs to be changed before splitting.");
      } else {
        confirm();
      }
    });
    // Can't split
    $("#cant-split").on("click", () => {
      $("#cant-split").css("border-color", "grey");
      console.log("Splitting current values won't make a difference");
    });

    // ------------------------- Computer's Moves -------------------------

    // Computer left hand attacks player left hand
    const comLeftAttackPLeft = () => {
      playerLeftFingers = playerLeftFingers + computerLeftFingers;
      $("#player-left").text(playerLeftFingers);
      $("#computer-left").css("border-color", "crimson");
      $("#player-left").css("border-color", "dodgerblue");
      $("#computer-text").text("Computer's left attacked player's left");
      $("#computers-move").css("background-color", "crimson");
      $("#computer-text").css("color", "whitesmoke");
    };

    // Computer left hand attacks player right hand
    const comLeftAttackPRight = () => {
      playerRightFingers = playerRightFingers + computerLeftFingers;
      $("#player-right").text(playerRightFingers);
      $("#computer-left").css("border-color", "crimson");
      $("#player-right").css("border-color", "dodgerblue");
      $("#computer-text").text("Computer's left attacked player's right");
      $("#computers-move").css("background-color", "crimson");
      $("#computer-text").css("color", "whitesmoke");
    };

    // Computer left hand attacks player left hand
    const comRightAttackPLeft = () => {
      playerLeftFingers = playerLeftFingers + computerRightFingers;
      $("#player-left").text(playerLeftFingers);
      $("#computer-right").css("border-color", "crimson");
      $("#player-left").css("border-color", "dodgerblue");
      $("#computer-text").text("Computer's right attacked player's left");
      $("#computers-move").css("background-color", "crimson");
      $("#computer-text").css("color", "whitesmoke");
    };

    // Computer left hand attacks player right hand
    const comRightAttackPRight = () => {
      playerRightFingers = playerRightFingers + computerRightFingers;
      $("#player-right").text(playerRightFingers);
      $("#computer-right").css("border-color", "crimson");
      $("#player-right").css("border-color", "dodgerblue");
      $("#computer-text").text("Computer's right attacked player's right");
      $("#computers-move").css("background-color", "crimson");
      $("#computer-text").css("color", "whitesmoke");
    };

    // Randomizes computer's moves if all hands are alive
    const randomMove = () => {
      let numberOfComputerMoves = 4;
      let randomNumber = Math.floor(Math.random() * numberOfComputerMoves);
      if (randomNumber === 0) {
        comLeftAttackPLeft();
      } else if (randomNumber === 1) {
        comLeftAttackPRight();
      } else if (randomNumber === 2) {
        comRightAttackPLeft();
      } else {
        comRightAttackPRight();
      }
    };

    // Randomizes computer's moves if player left is dead
    const randomMovePLeft = () => {
      let numberOfComputerMoves = 2;
      let randomNumber = Math.floor(Math.random() * numberOfComputerMoves);
      if (randomNumber === 0) {
        comLeftAttackPRight();
      } else {
        comRightAttackPRight();
      }
    };

    // Randomizes computer's moves if player right is dead
    const randomMovePRight = () => {
      let numberOfComputerMoves = 2;
      let randomNumber = Math.floor(Math.random() * numberOfComputerMoves);
      if (randomNumber === 0) {
        comLeftAttackPLeft();
      } else {
        comRightAttackPLeft();
      }
    };

    // Randomizes computer's moves if computer left is dead
    const randomMoveCLeft = () => {
      let numberOfComputerMoves = 2;
      let randomNumber = Math.floor(Math.random() * numberOfComputerMoves);
      if (randomNumber === 0) {
        comRightAttackPLeft();
      } else {
        comRightAttackPRight();
      }
    };

    // Randomizes computer's moves if computer right is dead
    const randomMoveCRight = () => {
      let numberOfComputerMoves = 2;
      let randomNumber = Math.floor(Math.random() * numberOfComputerMoves);
      if (randomNumber === 0) {
        comLeftAttackPLeft();
      } else {
        comLeftAttackPRight();
      }
    };

    // Computer's move
    const computerMove = () => {
      if (
        playerLeftFingers === 0 &&
        playerRightFingers != 0 &&
        computerLeftFingers != 0 &&
        computerRightFingers != 0
      ) {
        // if only player left is dead
        randomMovePLeft();
      } else if (
        playerLeftFingers != 0 &&
        playerRightFingers === 0 &&
        computerLeftFingers != 0 &&
        computerRightFingers != 0
      ) {
        // if only player right is dead
        randomMovePRight();
      } else if (
        playerLeftFingers != 0 &&
        playerRightFingers != 0 &&
        computerLeftFingers === 0 &&
        computerRightFingers != 0
      ) {
        // if only computer left is dead
        randomMoveCLeft();
      } else if (
        playerLeftFingers != 0 &&
        playerRightFingers != 0 &&
        computerLeftFingers != 0 &&
        computerRightFingers === 0
      ) {
        // if only computer right is dead
        randomMoveCRight();
      } else if (playerLeftFingers === 0 && computerLeftFingers === 0) {
        // if both player left and computer left is dead
        comRightAttackPRight();
      } else if (playerLeftFingers === 0 && computerRightFingers === 0) {
        // if both player left and computer right is dead
        comLeftAttackPRight();
      } else if (playerRightFingers === 0 && computerRightFingers === 0) {
        // if both player right and computer right is dead
        comLeftAttackPLeft();
      } else if (playerRightFingers === 0 && computerLeftFingers === 0) {
        // if both player right and computer left is dead
        comRightAttackPLeft();
      } else {
        randomMove();
      }
    };

    // Check if the player wins/loses (when boths hands are dead)
    const checkResultsOnPTurn = () => {
      if (computerLeftFingers === 0 && computerRightFingers === 0) {
        $(".board").hide();
        $("#win").show();
        $(".move-attack-2-right").hide();
        $(".move-attack-2-left").hide();
        $(".win-state").show();
        console.log("Player has won the game");
      } else if (playerLeftFingers === 0 && playerRightFingers === 0) {
        $(".board").hide();
        $("#lose").show();
        $(".move-attack-2-right").hide();
        $(".move-attack-2-left").hide();
        $(".lose-state").show();
        console.log("Player has lost to the computer");
      } else {
        console.log("Neither the Player nor the Computer has lost");
        computersTurn();
      }
    };

    const checkResultsOnCTurn = () => {
      if (computerLeftFingers === 0 && computerRightFingers === 0) {
        $(".board").hide();
        $("#win").show();
        $(".computers-turn").hide();
        $(".win-state").show();
        console.log("Player has won the game");
      } else if (playerLeftFingers === 0 && playerRightFingers === 0) {
        $(".board").hide();
        $("#lose").show();
        $(".computers-turn").hide();
        $(".lose-state").show();
        console.log("Player has lost to the computer");
      } else {
        console.log("Neither the Player nor the Computer has lost");
        playersTurn();
      }
    };

    // Player's turn
    const playersTurn = () => {
      printHands();
      // Return hand border-color state to original
      $("#computer-left").css("border-color", "black");
      $("#computer-right").css("border-color", "black");
      $("#player-left").css("border-color", "black");
      $("#player-right").css("border-color", "black");

      $(".move").show();
      $(".computers-turn").hide();

      checkSplit();
      checkLivingHands();
    };

    // Computer's turn
    const computersTurn = () => {
      printHands();
      // Return hand border-color state to original
      $("#player-left").css("border-color", "black");
      $("#player-right").css("border-color", "black");

      $(".move-attack-2-left").hide();
      $(".move-attack-2-right").hide();
      $(".move-split").hide();
      $(".computers-turn").show();

      // Return move box to original state
      $("#computer-text").text("Computer making a move...");
      $("#computers-move").css("background-color", "whitesmoke");
      $("#computer-text").css("color", "black");

      setTimeout(() => {
        computerMove();
        checkDeadHand();
      }, 2000);
      setTimeout(() => {
        checkResultsOnCTurn();
      }, 6000);
    };

    // Reset parameters
    const resetParameters = () => {
      computerLeftFingers = 1;
      computerRightFingers = 1;
      playerLeftFingers = 1;
      playerRightFingers = 1;
      playerPlayingHand;
      computerHands = 2;
      playerHands = 2;
      $("#computer-left").text(computerLeftFingers);
      $("#computer-right").text(computerRightFingers);
      $("#player-left").text(playerLeftFingers);
      $("#player-right").text(playerRightFingers);
    };

    // Return click to reset the game
    $("#return-button").on("click", (event) => {
      resetParameters();
      showMain();
    });
    $("#back").on("click", (event) => {
      resetParameters();
      showMain();
    });

    // The player always starts first
    playersTurn();
  };

  main();
});
