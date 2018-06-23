
$( document ).ready(function() {
   // Global variables
   // The constant values are stored at the top of the file so that they can be changed easily, if need be
   const LOW_TARGET_VAL = 19;
   const HIGH_TARGET_VAL = 120;
   const LOW_CRYSTAL_VAL = 1;
   const HIGH_CRYSTAL_VAL = 12;

   const WINNING_MSG = "Congratulations, you won. A new game will start automatically in a few seconds."
   const LOSING_MSG = "Sorry, you lost this game. A new game will start automatically in a few seconds."
 

   $(".img-crystal").click(function( event ) {
        var imgNode = $(this);
        var currTotal = parseInt($("#player-number").text()) + parseInt(imgNode.attr("crystal-value"));
        var targetTotal = parseInt($("#target-number").text());

        $("#player-number").text(currTotal);


        // if game is won, do some stuff
        if (currTotal == targetTotal) {
            var winCounterNode = $("#wins-counter");

            setWinsAndLosses("wins", parseInt(winCounterNode.text()) + 1);
            flashMessage(WINNING_MSG, 4500);
            setTimeout(initUI, 4500);
            

        // if game is lost, do some stuff
        } else if (currTotal > targetTotal) {
            var lossCounterNode = $("#losses-counter");

            setWinsAndLosses("losses", parseInt(lossCounterNode.text()) + 1);
            flashMessage(LOSING_MSG, 4500);
            setTimeout(initUI, 4500);

        }
        
   });


   // will flash a message for delay milliseconds
   function flashMessage(msg, delay) {
      var msgNode = $("#messages-display");
      
      msgNode.text(msg);

      setTimeout(function(){ msgNode.html("&nbsp;")}, delay);
   }
   

// called at the beginning of the game to initialize currentTotal, targetTotal, and crystalValues,
// and to update UI appropriately
function initGame() {
   initUI();
   setWinsAndLosses();
}

// this resets everything except for the wins and losses
function initUI() {
    var currentTotal = 0;  
    var targetTotal = generateInteger(LOW_TARGET_VAL, HIGH_TARGET_VAL);
    var newNum;
    document.crystalNums = [];

    var crystalMapFunction = function () {
        newNum = generateInteger(LOW_CRYSTAL_VAL, HIGH_CRYSTAL_VAL);
        while (document.crystalNums.includes(newNum)) {
            newNum = generateInteger(LOW_CRYSTAL_VAL, HIGH_CRYSTAL_VAL);  
        }
        document.crystalNums.push(newNum);
        return newNum;
     }

    crystalValues = [-1, -1, -1, -1].map(crystalMapFunction);
    debug("The crystal values for this game are " + crystalValues);

   // iniatialize target number and current total
   $("#target-number").text(targetTotal);
   $("#player-number").text(currentTotal);
   
   // set custom values for the crystals on the "crystal-value" property
   for (var i = 0; i < 4; i++) {
       $("#crystal-" + i).attr("crystal-value", crystalValues[i]);
   }  
}

// overloaded function
// if no arguments are provided, then set each to 0
// otherwise, the first arg is what to set, and the second arg is what to set it to
function setWinsAndLosses(theType, newValue) {
   if (arguments.length === 2) {
      if (theType === "wins") {
        $("#wins-counter").text(newValue);
      } else if (theType === "losses") {
        $("#losses-counter").text(newValue);
      } else {
          debug("'theType' argument to 'setWinsAndLosses' is not valid.")
      }
   } else {
    $("#wins-counter").text("0");
    $("#losses-counter").text("0");
   }
}


// returns an integer between lowInt and highInt inclusive
function generateInteger(lowInt, highInt) {
    var range = (highInt - lowInt + 1);
    var retVal;

    if (range > 0) {
       retVal = (Math.floor(Math.random() * range)) + lowInt;
    } else {
        console.log("ERROR in generateInt, highInt must be equal to or greater than lowInt, returning 0");
        retVal = 0;
    }

    return retVal;
}


// overloaded debug function (meaning, argument types and number are flexible)
// Arguments:
// msgData: what to print in the console. Can be string, number, array, object, etc.
// debugSet: optional argument, can be 1, 2, or 3. If not given, the value is assumed to be 1. 
//           This variable allows sets of debugging messages to be turned on and off by toggling the constant variables
function debug(msgData, debugSet) {
    const IS_ON = true;
    const SET1 = true;
    const SET2 = true;
    const SET3 = true;
 
    var set = (!debugSet) ? 1 : debugSet;
    var willPrint = IS_ON && ((set === 1 && SET1) || (set === 2 && SET2) || (set === 3 && SET3));
 
    if (willPrint) {
       console.log(msgData);
    }
 }

initGame();

});