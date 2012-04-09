var SH = SH || {};

SH.gui = SH.gui || (function () {

    var numplayers = 1,
        maxplayers = 4,
        game = {},
        divmain = {},
        divgameform = {},
        divswap = {},
        divdivs = {},
        divtitle = {},
        divpile = {},
        divdeck = {},
        divburnt = {},
        divlastmove = {},
        divplayers = {},
        divswpplayer = {},
        divmessage = {},
        divmovechoice = {},
        divpickup = {},
        divbadmove = {},

    hide = function (adiv) {
        adiv.style.display="none";
        divdivs.appendChild(adiv);
    },

    appendToMain = function (adiv) {
        divmain.appendChild(adiv);
        adiv.style.display="inline"; 
    },

    tryMove = function () {
        if (game.currentPlayerCanLay()) {
            showMoveMessage();
            appendToMain(divmessage);
            hide(divpickup);
            appendToMain(divmovechoice);
        } else {
            showPickupMessage();
            appendToMain(divmessage);
            hide(divmovechoice);
            appendToMain(divpickup);
        }
    },

    showMoveMessage = function () {
        var player = game.getCurrentPlayer();
        var divcontent = player.getName();
        divmessage.innerHTML = player.getName();
        
        if (player.hasCardsInHand()) {
            divcontent += ", choose cards from hand:<br>";
        } else if (player.hasCardsInFaceUp()) {
            divcontent += ", choose cards from face up:<br>";
        } else {
            divcontent += ", choose a card from down:<br>";
        }

        divmessage.innerHTML = divcontent;
    },
    
    showPickupMessage = function () {
        var player = game.getCurrentPlayer();
        divmessage.innerHTML = 
            "OH NO! " + player.getName() + ", you must pickup.";
    },

    updateGame = function () {
        var pilecards = "";
        for (i = game.getPile().length - 1; i >= 0; i--) {
            pilecards += game.getPile()[i].toString();
            pilecards += "<br>";
        }
        
        divpile.innerHTML = game.getPile().length + 
            " on pile:<br>" + pilecards;    
        divdeck.innerHTML = game.getDeck().length + 
            " left on deck<br>";
        divburnt.innerHTML = game.getBurnt() + " burnt<br>";
        divlastmove.innerHTML = game.getLastmove() + "<br>";
    },

    updatePlayers = function () {
        var divcontent = "";
        var player;

        for (i = 0; i < game.getPlayers().length; i++) {
            player = game.getPlayers()[i];
            divcontent += player.getName() + "<br>";
            divcontent += showCards(player.getHand(), "Hand", false);
            divcontent += "<br>";
            divcontent += showCards(player.getFaceUp(), "Face up", false);        
            divcontent += "<br>";
            divcontent += showCards(player.getFaceDown(), "Face down", true);
            divcontent += "<br>";
        }

        divplayers.innerHTML = divcontent;
    },
    
    updatePlayerSwap = function () {
        var player = game.getCurrentPlayer();

        divswpplayer.innerHTML = 
            player.getName() + "<br>" + 
            showCards(player.getHand(), "Hand", false) + "<br>" + 
            showCards(player.getFaceUp(), "Face up", false) + "<br>";
    },
    
    showCards = function (cards, name, hide) {
        var content = name + ":<br>";
        for (c = 0; c < cards.length; c++) {
            content += "(" + (c+1) + ")";
            if (hide) {
                content += "****";
            } else {
                content += cards[c].toString();
            }
            if (c < cards.length-1) {
                content += ", ";
            }
        }

        return content;
    };

    return {
        init: function () {
            divmain = document.getElementById("main"),
            divgameform = document.getElementById("gameform"),
            divswap = document.getElementById("swap"),
            divdivs = document.getElementById("divs"),
            divtitle = document.getElementById("title"),
            divpile = document.getElementById("pile"),
            divdeck = document.getElementById("deck"),
            divburnt = document.getElementById("burnt"),
            divlastmove = document.getElementById("lastmove"),
            divplayers = document.getElementById("players"),
            divswpplayer = document.getElementById("swp_player"),
            divmessage = document.getElementById("message"),
            divmovechoice = document.getElementById("movechoice"),
            divpickup = document.getElementById("pickup"),
            divbadmove = document.getElementById("badmove"),
            divdivs.style.display="none";   
            divswap.style.display="none";
            divtitle.style.display="none";
            divpile.style.display="none";
            divdeck.style.display="none";
            divburnt.style.display="none";
            divlastmove.style.display="none";
            divplayers.style.display="none";
            divswpplayer.style.display="none";
            divmessage.style.display="none";
            divmovechoice.style.display="none";
            divpickup.style.display="none";
            divbadmove.style.display="none";

            appendToMain(divgameform);    
        },

        addplayer: function () {
            if (numplayers == maxplayers) {
                alert("Upto " + maxplayers + " players are allowed");
            } else {
                var newdiv = document.createElement('div');
                newdiv.id = "frm_player" + (numplayers + 1);
                newdiv.innerHTML = "Player " + (numplayers + 1) + 
                    " name: <input type='text' " + 
                    "id='frm_player" + (numplayers + 1) + "name' " + 
                    "name='frm_player" + (numplayers + 1) + "name'>";
                document.getElementById("frm_players").appendChild(newdiv);
                numplayers++;
            }
        },

        createGame: function (form) {
            hide(divgameform);
            
            var players = [];

            for (i = 0; i < numplayers; i++) {
                var name = document.getElementById("frm_player" + (i + 1) + "name").value;
                players.push(SH.player.player(name, form.numcards.value));
            }

            game = new SH.game.game(form.numcards.value, players);
            game.deal();
            
            appendToMain(divtitle);

            updateGame();
            appendToMain(divpile);
            appendToMain(divdeck);
            appendToMain(divburnt);
            appendToMain(divlastmove);

            var player = game.getCurrentPlayer();
            updatePlayerSwap(player);
            appendToMain(divswpplayer);
            appendToMain(divswap); 
        },

        swapCards: function (form) {
            var player = game.getCurrentPlayer();
            var handcard = form.handcard.value - 1;
            var faceupcard = form.faceupcard.value -1;

            player.swapCards(handcard, faceupcard);
            player.sortHand();
           
            updatePlayerSwap();
         
            form.handcard.value = "";
            form.faceupcard.value = ""; 
        },

        swapDone: function () {
            game.nextPlayer();
            if (!game.isAtFirstPlayer()) {
                updatePlayerSwap();
            } else {
                hide(divswpplayer);
                hide(divswap);
                game.firstMove();
                updateGame();
                updatePlayers();
                appendToMain(divplayers);

                tryMove();
            }
        },

        makeMove: function (form) {
            var choice = form.choice.value - 1;
            var toLay = [];

            hide(divbadmove);
            toLay.push(choice);
            if (game.validMove(toLay)) {
                game.makeMove(toLay);
                form.choice.value = "";
                updateGame();
                updatePlayers();
            } else {
                appendToMain(divbadmove);
                form.choice.value = "";
            }
           
            tryMove();
        },

        pickup: function () {
            game.pickup();
            hide(divpickup);
            updateGame();
            updatePlayers();
            tryMove();
        }
    };
}());
