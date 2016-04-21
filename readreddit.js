var prompt = require('prompt');
var table = require('cli-table');
var inquirer = require('inquirer');
var util = require('util');
var parseReddit = require('./reddit.js')
var Table = require('cli-table');
const imageToAscii = require('image-to-ascii')
    , stringify = require("asciify-pixel-matrix");

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
    }).then(function(answers) {
            var newQuestion = [];
            if (answers.menu === "HOMEPAGE") {
                console.log(answers)
                //parseReddit.getHomepage(parseReddit.mainDisplay); -- if we had gone with this, we would have all the non-challenge requirements done.
                parseReddit.getHomepage(function(res){
                    res.forEach(function(x){
                        if(x.data.thumbnail.charAt(0) === "h") {
                        newQuestion.push({name: x.data.title, value: parseReddit.imageParseAndDisplay(x.data.thumbnail)})}    //This breaks it completely. 
                         }
                    )
                    inquirer.prompt({
                    type: 'list',
                    name: 'choices',
                    message: 'CHOOSE',
                    choices: newQuestion
                }).then(function(answers) {
                    console.log(answers.choices)
                })
                });

            }
            
            if (answers.menu === "PRINT"){
                console.log("Placeholder text")
            }
            
            reddit();
            
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