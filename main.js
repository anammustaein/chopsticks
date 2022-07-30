import "./style.css";

console.log($);

let skinState = "";
let difficultyState = "";

$(() => {
  const main = () => {
    showMain();
    $("#start-button").on("click", showGame);
    $("#return-button").on("click", showMain);
  };

  const showMain = () => {
    $("#landing-page").show();
    $("#game-page").hide();

    // Skin toggle
    $("#default").on("mouseover", () => {
      $("#default").css("background-color", "dodgerblue");
    });
    $("#default").on("mouseout", () => {
      $("#default").css("background-color", "gold");
    });
    $("#light").on("mouseover", () => {
      $("#light").css("background-color", "dodgerblue");
    });
    $("#light").on("mouseout", () => {
      $("#light").css("background-color", "navajowhite");
    });
    $("#tan").on("mouseover", () => {
      $("#tan").css("background-color", "dodgerblue");
    });
    $("#tan").on("mouseout", () => {
      $("#tan").css("background-color", "peru");
    });
    $("#dark").on("mouseover", () => {
      $("#dark").css("background-color", "dodgerblue");
    });
    $("#dark").on("mouseout", () => {
      $("#dark").css("background-color", "sienna");
    });

    // Difficulty toggle
    $(".rectangle").on("mouseover", (event) => {
      $(event.currentTarget).css("background-color", "dodgerblue");
      $(event.currentTarget).children().css("color", "whitesmoke");
    });
    $(".rectangle").on("mouseout", (event) => {
      $(event.currentTarget).css("background-color", "whitesmoke");
      $(event.currentTarget).children().css("color", "black");
    });

    // On-click selection (skin tone)
    $(".circle").on("click", (event) => {
      $(".circle").css("border-color", "#555");
      $(event.currentTarget).css("border-color", "dodgerblue");
      console.log(event.currentTarget.id + " skin is selected");
      skinState = event.currentTarget.id;
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
    $(".move").show();
    $(".move-attack-1").hide();
    $(".move-attack-2-left").hide();
    $(".move-attack-2-right").hide();
    $(".computers-turn").hide();

    // initialize number of hands and fingers
    let computerLeftFingers = 1;
    let computerRightFingers = 1;
    let playerLeftFingers = 1;
    let playerRightFingers = 1;
    let playerPlayingHand;
    let computerHands = 2;
    let playerHands = 2;

    // computerTurn();

    // Return hand border-color state to original
    $("#player-left").css("border-color", "black");
    $("#player-right").css("border-color", "black");

    // Move toggle
    $("#attack").on("mouseover", () => {
      $("#attack").css("background-color", "dodgerblue");
      $("#attack").children().css("color", "whitesmoke");
    });
    $("#attack").on("mouseout", () => {
      $("#attack").css("background-color", "lightcoral");
      $("#attack").children().css("color", "black");
    });
    $("#split").on("mouseover", () => {
      $("#split").css("background-color", "dodgerblue");
      $("#split").children().css("color", "whitesmoke");
    });
    $("#split").on("mouseout", () => {
      $("#split").css("background-color", "lightgreen");
      $("#split").children().css("color", "black");
    });

    // Move toggle – Player's hands
    $("#p-left-hand").on("mouseover", () => {
      $("#p-left-hand").css("background-color", "dodgerblue");
      $("#p-left-hand").children().css("color", "whitesmoke");
      $("#player-left").css("background-color", "dodgerblue");
    });
    $("#p-left-hand").on("mouseout", () => {
      $("#p-left-hand").css("background-color", "whitesmoke");
      $("#p-left-hand").children().css("color", "black");
      $("#player-left").css("background-color", "peru");
    });
    $("#p-right-hand").on("mouseover", () => {
      $("#p-right-hand").css("background-color", "dodgerblue");
      $("#p-right-hand").children().css("color", "whitesmoke");
      $("#player-right").css("background-color", "dodgerblue");
    });
    $("#p-right-hand").on("mouseout", () => {
      $("#p-right-hand").css("background-color", "whitesmoke");
      $("#p-right-hand").children().css("color", "black");
      $("#player-right").css("background-color", "peru");
    });

    // Move toggle – Attack
    $("#com-left-hand").on("mouseover", () => {
      $("#com-left-hand").css("background-color", "crimson");
      $("#com-left-hand").children().css("color", "whitesmoke");
      $("#computer-left").css("background-color", "crimson");
    });
    $("#com-left-hand").on("mouseout", () => {
      $("#com-left-hand").css("background-color", "whitesmoke");
      $("#com-left-hand").children().css("color", "black");
      $("#computer-left").css("background-color", "lightgray");
    });
    $("#com-right-hand").on("mouseover", () => {
      $("#com-right-hand").css("background-color", "crimson");
      $("#com-right-hand").children().css("color", "whitesmoke");
      $("#computer-right").css("background-color", "crimson");
    });
    $("#com-right-hand").on("mouseout", () => {
      $("#com-right-hand").css("background-color", "whitesmoke");
      $("#com-right-hand").children().css("color", "black");
      $("#computer-right").css("background-color", "lightgray");
    });
    $("#p-other-right").on("mouseover", () => {
      $("#p-other-right").css("background-color", "dodgerblue");
      $("#p-other-right").children().css("color", "whitesmoke");
      $("#player-right").css("background-color", "dodgerblue");
    });
    $("#p-other-right").on("mouseout", () => {
      $("#p-other-right").css("background-color", "whitesmoke");
      $("#p-other-right").children().css("color", "black");
      $("#player-right").css("background-color", "peru");
    });
    $("#com-left-hand-2").on("mouseover", () => {
      $("#com-left-hand-2").css("background-color", "crimson");
      $("#com-left-hand-2").children().css("color", "whitesmoke");
      $("#computer-left").css("background-color", "crimson");
    });
    $("#com-left-hand-2").on("mouseout", () => {
      $("#com-left-hand-2").css("background-color", "whitesmoke");
      $("#com-left-hand-2").children().css("color", "black");
      $("#computer-left").css("background-color", "lightgray");
    });
    $("#com-right-hand-2").on("mouseover", () => {
      $("#com-right-hand-2").css("background-color", "crimson");
      $("#com-right-hand-2").children().css("color", "whitesmoke");
      $("#computer-right").css("background-color", "crimson");
    });
    $("#com-right-hand-2").on("mouseout", () => {
      $("#com-right-hand-2").css("background-color", "whitesmoke");
      $("#com-right-hand-2").children().css("color", "black");
      $("#computer-right").css("background-color", "lightgray");
    });
    $("#p-other-left").on("mouseover", () => {
      $("#p-other-left").css("background-color", "dodgerblue");
      $("#p-other-left").children().css("color", "whitesmoke");
      $("#player-left").css("background-color", "dodgerblue");
    });
    $("#p-other-left").on("mouseout", () => {
      $("#p-other-left").css("background-color", "whitesmoke");
      $("#p-other-left").children().css("color", "black");
      $("#player-left").css("background-color", "peru");
    });
    $("#computers-move").on("mouseover", () => {
      $("#computers-move").css("background-color", "whitesmoke");
      $("#computer-text").css("color", "black");
    });

    // Player's turn
    const playersTurn = () => {

      $(".move").show();
      $(".computers-turn").hide();

      // Attack function
      const attack = () => {
        console.log("attack is selected");
        $(".move").hide();
        $(".move-attack-1").show();
      };

      // Split function
      const split = () => {
        console.log("split is selected");
      };

      // Left-hand function
      const leftHand = () => {
        console.log("left hand is selected");
        $(".move-attack-1").hide();
        $(".move-attack-2-left").show();
        $("#player-left").css("border-color", "dodgerblue");
        playerPlayingHand = playerLeftFingers;
      };

      // Right-hand function
      const rightHand = () => {
        console.log("right hand is selected");
        $(".move-attack-1").hide();
        $(".move-attack-2-right").show();
        $("#player-right").css("border-color", "dodgerblue");
        playerPlayingHand = playerRightFingers;
      };

      // Move magic
      const computerLeftHand = () => {
        console.log("attack computer's left hand");
        computerLeftFingers = computerLeftFingers + playerPlayingHand;
        console.log(computerLeftFingers);
        $("#computer-left").text(computerLeftFingers);
        computersTurn();
      };
      const computerRightHand = () => {
        console.log("attack computer's right hand");
        computerRightFingers = computerRightFingers + playerPlayingHand;
        console.log(computerRightFingers);
        $("#computer-right").text(computerRightFingers);
        computersTurn();
      };
      const addToRightHand = () => {
        console.log("add to right hand");
        playerRightFingers = playerRightFingers + playerPlayingHand;
        console.log(playerRightFingers);
        $("#player-right").text(playerRightFingers);
        computersTurn();
      };
      const addToLeftHand = () => {
        console.log("add to left hand");
        playerLeftFingers = playerLeftFingers + playerPlayingHand;
        console.log(playerLeftFingers);
        $("#player-left").text(playerLeftFingers);
        computersTurn();
      };

      // Attack selected
      $("#attack").on("click", attack);
      // Split selected
      $("#split").on("click", split);
      // Left hand selected
      $("#p-left-hand").on("click", leftHand);
      // Right hand selected
      $("#p-right-hand").on("click", rightHand);
      // Attack computer's left hand
      $("#com-left-hand").on("click", computerLeftHand);
      // Attack computer's right hand
      $("#com-right-hand").on("click", computerRightHand);
      // Attack computer's left hand 2
      $("#com-left-hand-2").on("click", computerLeftHand);
      // Attack computer's right hand 2
      $("#com-right-hand-2").on("click", computerRightHand);
      // Add to left hand (other)
      $("#p-other-left").on("click", addToLeftHand);
      // Add to right hand (other)
      $("#p-other-right").on("click", addToRightHand);
    };

    // Computer's turn
    const computersTurn = () => {
      // Return hand border-color state to original
      $("#player-left").css("border-color", "black");
      $("#player-right").css("border-color", "black");

      $(".move-attack-2-left").hide();
      $(".move-attack-2-right").hide();
      $(".computers-turn").show();

      // Computer making a move
      setTimeout(function () {
        $("#computer-right").css("border-color", "crimson");
      }, 2000);

      setTimeout(function () {
        console.log("computer's right hand attacked player's left hand");
        playerLeftFingers = playerLeftFingers + computerRightFingers;
        $("#player-left").text(playerLeftFingers);
        $("#player-left").css("border-color", "dodgerblue");
      }, 4000);

      setTimeout(function () {
        $("#computer-text").text("Computer's Right attacked Player's Left");
        $("#computers-move").css("background-color", "crimson");
        $("#computer-text").css("color", "whitesmoke");
      },6000);

      // Back to player's turn
      setTimeout(function () {
        $("#computer-right").css("border-color", "black");
        $("#player-left").css("border-color", "black");
        playersTurn();
      }, 10000);

    };

    playersTurn();
  };

  main();
});

// Your code is logging twice for onclicks. Try adding event listeners.
// location.reload();