var prompt = require('prompt');
var table = require('cli-table');
var inquirer = require('inquirer');
var util = require('util');
var parseReddit = require('./reddit.js')
var Table = require('cli-table');
const imageToAscii = require('image-to-ascii'),
    stringify = require("asciify-pixel-matrix");

// instantiate 

// table is an Array, so you can `push`, `unshift`, `splice` and friends 

function printTableandReturnToMenu(aTable, callback) {
    console.log(aTable.toString())

    callback();
}


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
        if (answers.menu === "HOMEPAGE") {
            var newQuestion = [];
            console.log(answers)
            parseReddit.getHomepage(function(res) {
                res.forEach(function(post) {
                        newQuestion.push({
                            name: post.data.title,
                            value: post.data.url
                        })
                    }) //End of forEach.



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

        if (answers.menu === "SUBREDDIT") {
            prompt.start();
            prompt.message = "What subreddit shall we look up?";
            prompt.get(['subreddit'], function(err, result) {
                parseReddit.getSubreddit(result.subreddit, function(res) {
                    var newQuestion = []
                    res.forEach(function(post) {
                            newQuestion.push({
                                name: post.data.title,
                                value: post.data.url        //Make this something cooler.
                            })
                        }) //End of forEach.



                    inquirer.prompt({
                        type: 'list',
                        name: 'choices',
                        message: 'CHOOSE',
                        choices: newQuestion
                    }).then(function(answers) {
                        console.log(answers.choices)
                        reddit();
                    })
                    
                })
            })
        }


        if (answers.menu === "USER") {
            prompt.start();
            prompt.message = "What user shall we look up?";
            prompt.get(['user'], function(err, result) {
                parseReddit.getUser(result.user, function(result) {
                    var table = new Table();
                    result.forEach(function(each) {
                        table.push([each.data.author, each.data.body])
                    });
                    printTableandReturnToMenu(table, reddit);
                })
            })
        } //end of USER

        if (answers.menu === "PRINT") {
            console.log("Placeholder text")
        }




    });



}


reddit();
