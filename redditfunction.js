var request = require('request');
var util = require("util");
var Table = require('cli-table');

var table = new Table();

/* table.push(
    { 'Some key': 'Some value' }
  , { 'Another key': 'Another value' }
); */

console.log(table.toString());

//========================================

function getHomepage(callback) {
  request("https://www.reddit.com/.json", function(err, result) {
    var redditHomepage = JSON.parse(result.body);
    callback(redditHomepage.data.children);
  });
}

getHomepage(function(thing) {
  thing.forEach(function(n) {
    var x = n.data.title.substring(0, 86)
    var y = n.data.author
    table.push(
      [x, y])
    });
  console.log(table.toString())
});

//create function redditDisplay and use it as a callback ^^




/* WORKING CODE - CHANGE [0] IN CHILDREN TO RETRIEVE OTHER POSTS

function getHomepage(callback) {
  request("https://www.reddit.com/.json", function(err, result) {
    var redditHomepage = JSON.parse(result.body);
    callback(redditHomepage.data.children[0].data)  });
}

getHomepage(function(res){
  console.log(util.inspect(res, { showHidden: true, depth: null, colors: true }));
});

*/