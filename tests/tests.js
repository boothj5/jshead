$(document).ready(function(){
    
module("Card");

    test("Create card", function() {
        var card = SH.card.card(SH.card.rank.QUEEN, SH.card.suit.DIAMONDS);
        var cardStr = card.toString();

        equal(cardStr, "QUEEN of DIAMONDS");
    });

    test("Two is special", function() {
        var card = SH.card.card(SH.card.rank.TWO, SH.card.suit.DIAMONDS);

        ok(card.isSpecial());
    });

    test("Seven is special", function() {
        var card = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.CLUBS);

        ok(card.isSpecial());
    });

    test("Ten is special", function() {
        var card = SH.card.card(SH.card.rank.TEN, SH.card.suit.SPADES);

        ok(card.isSpecial());
    });

    test("Seven is invisible", function() {
        var card = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.HEARTS);
        
        ok(card.isInvisible());
    });
    
    test("Three is less than nine", function() {
        var three = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var nine = SH.card.card(SH.card.rank.NINE, SH.card.suit.SPADES);

        equal(SH.card.shCompare(three, nine), -1);
    });

    test("Three is less than Four", function() {
        var three = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var four = SH.card.card(SH.card.rank.FOUR, SH.card.suit.HEARTS);

        equal(SH.card.shCompare(three, four), -1);
    });
        
    test("Three is same as Three", function() {
        var threed = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var threec = SH.card.card(SH.card.rank.THREE, SH.card.suit.CLUBS);

        equal(SH.card.shCompare(threed, threec), 0);
    });

    test("Nine is higher than Three", function() {
        var nine = SH.card.card(SH.card.rank.NINE, SH.card.suit.DIAMONDS);
        var three = SH.card.card(SH.card.rank.THREE, SH.card.suit.CLUBS);

        equal(SH.card.shCompare(nine, three), 1);
    });

    test("Special higher than not special", function() {
        var two = SH.card.card(SH.card.rank.TWO, SH.card.suit.DIAMONDS);
        var six = SH.card.card(SH.card.rank.SIX, SH.card.suit.CLUBS);

        equal(SH.card.shCompare(two, six), 1);
    });

    test("All ranks equal", function() {
        var nineh = SH.card.card(SH.card.rank.NINE, SH.card.suit.HEARTS);
        var nines = SH.card.card(SH.card.rank.NINE, SH.card.suit.SPADES);
        var nined = SH.card.card(SH.card.rank.NINE, SH.card.suit.DIAMONDS);
        var ninec = SH.card.card(SH.card.rank.NINE, SH.card.suit.CLUBS);
    
        var cards = [nineh, nines, nined, ninec];

        ok(SH.card.allRanksEqual(cards));
    });

    test("Is burn card", function() {
        var ten = SH.card.card(SH.card.rank.TEN, SH.card.suit.CLUBS);
        
        ok(ten.isBurnCard());
    });

    test("Is miss a go card", function() {
        var eight = SH.card.card(SH.card.rank.EIGHT, SH.card.suit.CLUBS);
        
        ok(eight.isMissAGoCard());
    });

    test("Three is not burn card", function() {
        var three = SH.card.card(SH.card.rank.THREE, SH.card.suit.CLUBS);
        
        ok(!three.isBurnCard());
    });

    test("Nine is not miss a go card", function() {
        var nine = SH.card.card(SH.card.rank.NINE, SH.card.suit.CLUBS);
        
        ok(!nine.isMissAGoCard());
    });

module("Player");

    test("Create player", function() {
        var player = SH.player.player("James", 3);

        equal(player.getName(), "James", "name set");
        equal(player.getHand().length, 0, "hand");
        equal(player.getFaceUp().length, 0, "faceup");
        equal(player.getFaceDown().length, 0, "facedown");
    });

    test("Deal card to hand", function() {
        var player = SH.player.player("James", 3);
        var card = SH.card.card(SH.card.rank.FIVE, SH.card.suit.SPADES);
        player.dealToHand(card);
        
        equal(player.getHand()[0], card);
    });

    test("Deal two cards to hand", function() {
        var player = SH.player.player("James", 3);
        var card1 = SH.card.card(SH.card.rank.FIVE, SH.card.suit.SPADES);
        var card2 = SH.card.card(SH.card.rank.ACE, SH.card.suit.DIAMONDS);
        player.dealToHand(card1);
        player.dealToHand(card2);
        
        equal(player.getHand()[0], card1);
        equal(player.getHand()[1], card2);
    });
    
    test("Deal card to faceup", function() {
        var player = SH.player.player("James", 3);
        var card = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.SPADES);
        player.dealToFaceUp(card);
        
        equal(player.getFaceUp()[0], card);
    });

    test("Deal card to facedown", function() {
        var player = SH.player.player("James", 3);
        var card = SH.card.card(SH.card.rank.JACK, SH.card.suit.HEARTS);
        player.dealToFaceDown(card);
        
        equal(player.getFaceDown()[0], card);
    });

    test("Swap first and first", function() {
        var player = SH.player.player("James", 3);

        var threed = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var sevens = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.SPADES);
        var aced = SH.card.card(SH.card.rank.ACE, SH.card.suit.DIAMONDS);
        var twoh = SH.card.card(SH.card.rank.TWO, SH.card.suit.HEARTS);
        var jackc = SH.card.card(SH.card.rank.JACK, SH.card.suit.CLUBS);
        var eights = SH.card.card(SH.card.rank.EIGHT, SH.card.suit.SPADES);
        
        player.dealToHand(threed);
        player.dealToHand(sevens);
        player.dealToHand(aced);
        player.dealToFaceUp(twoh);
        player.dealToFaceUp(jackc);
        player.dealToFaceUp(eights);

        player.swapCards(0, 0);
    
        equal(player.getHand()[0], twoh);
        equal(player.getFaceUp()[0], threed);
    });

    test("Swap first and second", function() {
        var player = SH.player.player("James", 3);

        var threed = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var sevens = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.SPADES);
        var aced = SH.card.card(SH.card.rank.ACE, SH.card.suit.DIAMONDS);
        var twoh = SH.card.card(SH.card.rank.TWO, SH.card.suit.HEARTS);
        var jackc = SH.card.card(SH.card.rank.JACK, SH.card.suit.CLUBS);
        var eights = SH.card.card(SH.card.rank.EIGHT, SH.card.suit.SPADES);
        
        player.dealToHand(threed);
        player.dealToHand(sevens);
        player.dealToHand(aced);
        player.dealToFaceUp(twoh);
        player.dealToFaceUp(jackc);
        player.dealToFaceUp(eights);

        player.swapCards(0, 1);
    
        equal(player.getHand()[0], jackc);
        equal(player.getFaceUp()[1], threed);
    });
        
    test("Swap first and third", function() {
        var player = SH.player.player("James", 3);

        var threed = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var sevens = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.SPADES);
        var aced = SH.card.card(SH.card.rank.ACE, SH.card.suit.DIAMONDS);
        var twoh = SH.card.card(SH.card.rank.TWO, SH.card.suit.HEARTS);
        var jackc = SH.card.card(SH.card.rank.JACK, SH.card.suit.CLUBS);
        var eights = SH.card.card(SH.card.rank.EIGHT, SH.card.suit.SPADES);
        
        player.dealToHand(threed);
        player.dealToHand(sevens);
        player.dealToHand(aced);
        player.dealToFaceUp(twoh);
        player.dealToFaceUp(jackc);
        player.dealToFaceUp(eights);

        player.swapCards(0, 2);
    
        equal(player.getHand()[0], eights);
        equal(player.getFaceUp()[2], threed);
    });

    test("Sort hand", function() {
        var player = SH.player.player("James", 5);

        var threed = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var fourd = SH.card.card(SH.card.rank.FOUR, SH.card.suit.DIAMONDS);
        var jacks = SH.card.card(SH.card.rank.JACK, SH.card.suit.SPADES);
        var eighth = SH.card.card(SH.card.rank.EIGHT, SH.card.suit.HEARTS);
        var twoc = SH.card.card(SH.card.rank.TWO, SH.card.suit.CLUBS);

        player.dealToHand(twoc);
        player.dealToHand(eighth);
        player.dealToHand(fourd);
        player.dealToHand(threed);
        player.dealToHand(jacks);

        player.sortHand();

        equal(player.getHand()[0], threed, "three first");
        equal(player.getHand()[1], fourd, "four second");
        equal(player.getHand()[2], eighth, "eight third");
        equal(player.getHand()[3], jacks, "jack fourth");
        equal(player.getHand()[4], twoc, "two fifth");
    });

    test("Remove one card from hand", function() {
        var player = SH.player.player("James", 3);

        var threed = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var fourd = SH.card.card(SH.card.rank.FOUR, SH.card.suit.DIAMONDS);
        var jacks = SH.card.card(SH.card.rank.JACK, SH.card.suit.SPADES);
        var eighth = SH.card.card(SH.card.rank.EIGHT, SH.card.suit.HEARTS);
        var twoc = SH.card.card(SH.card.rank.TWO, SH.card.suit.CLUBS);

        player.dealToHand(twoc);
        player.dealToHand(eighth);
        player.dealToHand(fourd);
        player.dealToHand(threed);
        player.dealToHand(jacks);

        var toRemove = [3];

        player.removeFromHand(toRemove);

        equal(player.getHand().length, 4, "correct length");
        ok(player.getHand().indexOf(twoc) != -1, "contains two of clubs");
        ok(player.getHand().indexOf(eighth) != -1, "contains eight of hearts");
        ok(player.getHand().indexOf(fourd) != -1, "contains four of diamonds");
        ok(player.getHand().indexOf(jacks) != -1, "contains jack of spades");
        ok(player.getHand().indexOf(threed) == -1, "three of diamonds removed");
    });

    test("Remove two cards from hand", function() {
        var player = SH.player.player("James", 3);

        var threed = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var fourd = SH.card.card(SH.card.rank.FOUR, SH.card.suit.DIAMONDS);
        var jacks = SH.card.card(SH.card.rank.JACK, SH.card.suit.SPADES);
        var eighth = SH.card.card(SH.card.rank.EIGHT, SH.card.suit.HEARTS);
        var twoc = SH.card.card(SH.card.rank.TWO, SH.card.suit.CLUBS);

        player.dealToHand(twoc);
        player.dealToHand(eighth);
        player.dealToHand(fourd);
        player.dealToHand(threed);
        player.dealToHand(jacks);

        var toRemove = [3, 1];

        player.removeFromHand(toRemove);

        equal(player.getHand().length, 3, "correct length");
        ok(player.getHand().indexOf(twoc) != -1, "contains two of clubs");
        ok(player.getHand().indexOf(eighth) == -1, "eight of hearts removed");
        ok(player.getHand().indexOf(fourd) != -1, "contains four of diamonds");
        ok(player.getHand().indexOf(jacks) != -1, "contains jack of spades");
        ok(player.getHand().indexOf(threed) == -1, "three of diamonds removed");
    });

    test("Has cards in hand", function() {
        var player = SH.player.player("James", 3);
        var threed = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        player.dealToHand(threed);

        ok(player.hasCardsInHand());
    });

    test("Does not have cards in hand", function() {
        var player = SH.player.player("James", 3);

        ok(!player.hasCardsInHand());
    });

    test("Has cards in faceup", function() {
        var player = SH.player.player("James", 3);
        var threed = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        player.dealToFaceUp(threed);

        ok(player.hasCardsInFaceUp());
    });

    test("Does not have cards in faceup", function() {
        var player = SH.player.player("James", 3);

        ok(!player.hasCardsInFaceUp());
    });

    test("Has cards when has hand", function() {
        var player = SH.player.player("James", 3);
        
        var card1 = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var card2 = SH.card.card(SH.card.rank.TWO, SH.card.suit.HEARTS);
        
        player.dealToHand(card1);
        player.dealToHand(card2);
        
        ok(player.hasCards());
    });

    test("Has cards when has faceup", function() {
        var player = SH.player.player("James", 3);
        var card1 = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var card2 = SH.card.card(SH.card.rank.TWO, SH.card.suit.HEARTS);
        
        player.dealToFaceUp(card1);
        player.dealToFaceUp(card2);
        
        ok(player.hasCards());
    });
    
    test("Has cards when has facedown", function() {
        var player = SH.player.player("James", 3);
        var card1 = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var card2 = SH.card.card(SH.card.rank.TWO, SH.card.suit.HEARTS);
        
        player.dealToFaceDown(card1);
        player.dealToFaceDown(card2);
        
        ok(player.hasCards());
    });

    test("Does not have cards", function() {
        var player = SH.player.player("James", 3);
        
        ok(!player.hasCards());
    });

module("Game");

    test("Create game", function() {
        var player1 = SH.player.player("James", 3);
        var player2 = SH.player.player("Dave", 3);
        var players = [player1, player2];
        var game = SH.game.game(3, players);
        
        equal(game.getPlayers()[0], player1);
        equal(game.getPlayers()[1], player2);
        equal(game.getDeck().length, 52);
        equal(game.getPile().length, 0);
        equal(game.getBurnt(), 0);
        equal(game.getCurrentPlayer(), player1);
    });

    test("New game starts at first player", function() {
        var player1 = SH.player.player("James", 3);
        var player2 = SH.player.player("Dave", 3);
        var players = [player1, player2];
        var game = SH.game.game(3, players);
        var current = game.getCurrentPlayer();

        equal(current, player1);
        ok(game.isAtFirstPlayer());
    });

    test("Next player moves to next player", function() {
        var player1 = SH.player.player("James", 3);
        var card1 = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        player1.dealToHand(card1);
        var player2 = SH.player.player("Dave", 3);
        var card2 = SH.card.card(SH.card.rank.NINE, SH.card.suit.SPADES);
        player2.dealToHand(card2);
        var players = [player1, player2];
        var game = SH.game.game(3, players);
        game.nextPlayer();
        var current = game.getCurrentPlayer();

        equal(current, player2);
    });
        
    test("Next player rolls", function() {
        var player1 = SH.player.player("James", 3);
        var card1 = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        player1.dealToHand(card1);
        var player2 = SH.player.player("Dave", 3);
        var card2 = SH.card.card(SH.card.rank.NINE, SH.card.suit.SPADES);
        player2.dealToHand(card2);
        var players = [player1, player2];
        var game = SH.game.game(3, players);
        game.nextPlayer();
        game.nextPlayer();
        var current = game.getCurrentPlayer();

        equal(current, player1);
    });

    test("Next player skips when no cards", function() {
        var player1 = SH.player.player("James", 3);
        var card1 = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        player1.dealToHand(card1);
        var player2 = SH.player.player("Dave", 3);
        var card2 = SH.card.card(SH.card.rank.NINE, SH.card.suit.SPADES);
        player2.dealToHand(card2);
        var playerNoCards = SH.player.player("NoCards", 3);
        var players = [player1, playerNoCards, player2];
        var game = SH.game.game(3, players);
        game.nextPlayer();
        var current = game.getCurrentPlayer();

        equal(current, player2);
    });

    test("Can lay three on nothing", function() {
        var three = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var cards = [];

        ok(SH.game.canLay(three, cards));
    });

    test("Can lay three on three", function() {
        var three1 = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var three2 = SH.card.card(SH.card.rank.THREE, SH.card.suit.SPADES);
        var cards = [three2];

        ok(SH.game.canLay(three1, cards));
    });

    test("Can lay three on two", function() {
        var three = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var two = SH.card.card(SH.card.rank.TWO, SH.card.suit.SPADES);
        var cards = [two];

        ok(SH.game.canLay(three, cards));
    });

    test("Can lay three on invisible on nothing", function() {
        var three = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var seven = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.SPADES);
        var cards = [seven];

        ok(SH.game.canLay(three, cards));
    });
    
    test("Can lay three on invisible on three", function() {
        var three1 = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var seven = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.SPADES);
        var three2 = SH.card.card(SH.card.rank.THREE, SH.card.suit.SPADES);
        var cards = [three2, seven];

        ok(SH.game.canLay(three1, cards));
    });

    test("Cannot lay three on invisible on four", function() {
        var three = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var seven = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.HEARTS);
        var four = SH.card.card(SH.card.rank.FOUR, SH.card.suit.SPADES);
        var cards = [four, seven];

        ok(!SH.game.canLay(three, cards));
    });

    test("Can lay three on two invisibles on three", function() {
        var three1 = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var seven1 = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.HEARTS);
        var seven2 = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.SPADES);
        var three2 = SH.card.card(SH.card.rank.THREE, SH.card.suit.SPADES);
        var cards = [three2, seven2, seven1, three1];

        ok(SH.game.canLay(three1, cards));
    });

    test("Cannot lay three on four", function() {
        var three = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var four = SH.card.card(SH.card.rank.FOUR, SH.card.suit.SPADES);
        var cards = [four];

        ok(!SH.game.canLay(three, cards));
    });
    
    test("Cannot lay three on invisible on four", function() {
        var three = SH.card.card(SH.card.rank.THREE, SH.card.suit.DIAMONDS);
        var seven = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.HEARTS);
        var four = SH.card.card(SH.card.rank.FOUR, SH.card.suit.SPADES);
        var cards = [four, seven];

        ok(!SH.game.canLay(three, cards));
    });

    test("Can lay two on nine", function() {
        var two = SH.card.card(SH.card.rank.TWO, SH.card.suit.DIAMONDS);
        var nine = SH.card.card(SH.card.rank.NINE, SH.card.suit.HEARTS);
        var cards = [nine];

        ok(SH.game.canLay(two, cards));
    });

    test("Can lay seven on nine", function() {
        var seven = SH.card.card(SH.card.rank.SEVEN, SH.card.suit.DIAMONDS);
        var nine = SH.card.card(SH.card.rank.NINE, SH.card.suit.HEARTS);
        var cards = [nine];

        ok(SH.game.canLay(seven, cards));
    });
    
    test("Can lay ten on ace", function() {
        var ten = SH.card.card(SH.card.rank.TEN, SH.card.suit.DIAMONDS);
        var ace = SH.card.card(SH.card.rank.ACE, SH.card.suit.HEARTS);
        var cards = [ace];

        ok(SH.game.canLay(ten, cards));
    });
});

