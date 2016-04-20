var prompt = require('prompt');
var image = require('image-to-ascii');
var table = require('cli-table');
var inquirer = require('inquirer');
var util = require('util');
var parseReddit = require('./reddit.js')
const imageToAscii = require('image-to-ascii')
    , stringify = require("asciify-pixel-matrix");

var Table = require('cli-table');

// instantiate 
var table = new Table({
    head: ['TH 1 label', 'TH 2 label'],
    colWidths: [100, 200]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends 



function reddit() {
    var menuChoices = [{
        name: 'Show homepage',
        value: 'HOMEPAGE'
    }, {
        name: 'Show subreddit',
        value: 'SUBREDDIT'
    }, {
        name: 'List subreddits',
        value: 'SUBREDDITS'
    }, {
        name: 'Display user history',
        value: 'USER'
    }, {
        name: 'Print images from front page',
        value: 'PRINT'
    }];


    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: menuChoices
    }).then(
        function(answers) {
            console.log(answers);
        }
    );


}

reddit();

/*
Is this a closure?
var redditVar = parseReddit.getSubreddits(function(res){
  return res;
})

console.log(redditVar)

*/