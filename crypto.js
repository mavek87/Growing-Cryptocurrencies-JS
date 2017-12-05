// Author: Matteo Veroni

// WEBSITE: 
// https://coinmarketcap.com/all/views/all/

/**
 * Stampa solo le "n" criptomonete che sono cresciute di più negli ultimi 7 giorni
 */

var rows = document.querySelectorAll("table tr");

var coin = {
    construct: function Value(rank, name, percent) {
        this.rank = rank;
        this.name = name;
        this.percent = percent;
    },
    rank: null,
    name: null,
    percent: null
};

var coins = new Array();

// set to true to enable debug logging for getCoins function
var DEBUG = false;

// set true to print all coins. if set to true NMB_OF_COINS_TO_PRINT is ignored
var PRINT_ALL_COINS = true;
// set PRINT_ALL_COINS to false and NMB_OF_COINS_TO_PRINT to a number (n) to print only n coins
var NMB_OF_COINS_TO_PRINT = 100;

// retrieve all the cryptocurrencies listed in the website
function getCoins() {
    for (var i = 1; i < rows.length; i++) {

        if (DEBUG) {
            console.log("------------------------------");
        }

        var row = rows[i];

        var name = row.querySelector(".currency-name-container").textContent || "-";

        var percent = parseFloat(row.querySelector(".percent-7d") && row.querySelector(".percent-7d").getAttribute("data-usd")) || 0;

        if (DEBUG) {
            console.log("typeof name: " + typeof (name));
            console.log("typeof percent: " + typeof (percent));
        }

        coins[i - 1] = new coin.construct(i, name, percent);

        if (DEBUG) {
            console.log(coins[i]);
            console.log("------------------------------");
        }
    }
}

// order the cryptocurrencies using the week percentage of growth (from the best to the worst)
// used a simple selection sort algorithm
function sortCoins() {
    for (var i = 0; i < (coins.length - 1); i++) {

        var posmax = i;

        for (var j = i + 1; j < coins.length; j++) {
            if (coins[j].percent > coins[posmax].percent) {
                posmax = j;
            }
        }

        if (posmax !== i) {
            var app = coins[i];
            coins[i] = coins[posmax];
            coins[posmax] = app;
        }
    }
}

function printCoins(nmbOfCoinsToPrint) {
    console.log("----------------------------------------------");

    var size;
    if ((PRINT_ALL_COINS === true) || (arguments.length === 0)) {
        size = coins.length;
    } else {
        size = nmbOfCoinsToPrint;
    }
    for (var i = 0; i < size; i++) {
        console.log(coins[i]);
    }

    console.log("----------------------------------------------");
}

getCoins();
sortCoins();
printCoins(NMB_OF_COINS_TO_PRINT);