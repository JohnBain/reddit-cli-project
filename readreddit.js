var prompt = require('prompt');
var table = require('cli-table');
var inquirer = require('inquirer');
var util = require('util');
var parseReddit = require('./reddit.js')
var Table = require('cli-table');
const imagetoAscii = require('image-to-ascii'),
    stringify = require("asciify-pixel-matrix");

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




function redditDisplay(callback) {
    var newQuestion = []
    callback(function(res) {
        res.forEach(function(post) {
                newQuestion.push({
                    name: post.data.title,
                    value: post.data
                })
            }) //End of forEach.



        inquirer.prompt({
            type: 'list',
            name: 'choices',
            message: 'CHOOSE',
            choices: newQuestion
        }).then(function(answers) {
            parseDataObject(answers.choices)
            reddit();
        });
    });
}

function parseDataObject(dataObject){
    if (dataObject.domain === "i.imgur.com" && dataObject.url.slice(-4) != "gifv" && dataObject.url.slice(-3) != "gif"){
        imagetoAscii(dataObject.thumbnail, {
        colored: true
        , bg: true
        , stringify: true
}, (err, converted) => {
    console.log(err || converted);
    
});;
    }
    else{
        console.log(dataObject) //I have absolutely no idea why this works
        
    }
}

function subredditsDisplay() {
    var newQuestion = []
    parseReddit.getSubreddits(function(res) {
        res.forEach(function(post) {
                newQuestion.push({
                    name: post.data.display_name,
                    value: post.data.url
                })
            }) //End of forEach.



        inquirer.prompt({
            type: 'list',
            name: 'choices',
            message: 'CHOOSE',
            choices: newQuestion
        }).then(function(answers) {
            subredditDisplay(answers.choices);
        });
    });
}

function subredditDisplay(subreddit) {
    console.log(subreddit)
    parseReddit.getSubreddit(subreddit, function(res) {
        var newQuestion = []
        res.forEach(function(post) {
                newQuestion.push({
                    name: post.data.title,
                    value: post.data.selftext       //This we will be where we choose to view an image instead.
                })
            }) //End of forEach.



        inquirer.prompt({
            type: 'list',
            name: 'choices',
            message: 'CHOOSE',
            choices: newQuestion
        }).then(function(answers) {
            parseDataObject(answers.choices)
            reddit();
        })

    })
}

/*
function parseImageOrBody(object, callback) {
    var promiseArray = [];
    if (object.data.thumbnail.slice(-3) === "jpg") {
        imagetoAscii(object.data.thumbnail, {
            bg: true
        }, function(err, result) { //This is a place for promises.
            promiseArray.push(new Promise(function(resolve, reject) {
                resolve(object.data.thumbnail)
            }))
        });
    }

    else {
        promiseArray.push(new Promise(function(resolve, reject) {
            resolve(object.data.selftext)
        }))
    }
}
*/

function reddit() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: menuChoices
    }).then(function(answers) {
        if (answers.menu === "HOMEPAGE") {
            redditDisplay(parseReddit.getHomepage);
        }

        if (answers.menu === "SUBREDDIT") {
            prompt.start();
            prompt.message = "What subreddit shall we look up?";
            prompt.get(['subreddit'], function(err, result) {
                subredditDisplay(result.subreddit);
            })
        }

        if (answers.menu === "SUBREDDITS") {
            subredditsDisplay();
        }


        if (answers.menu === "USER") {
            prompt.start();
            prompt.message = "What user shall we look up?";
            prompt.get(['user'], function(err, result) {
                parseReddit.getUser(result.user, function(result) {
                    var table = new Table();
                    result.forEach(function(each) {
                        table.push([each.data.subreddit, each.data.score, each.data.body])
                    });
                    console.log(table.toString());
                })
            })
        } //end of USER

        if (answers.menu === "PRINT") {
            console.log("Placeholder text")
        }




    });



}


reddit();
