var request = require('request');
var util = require("util");

/*
This function should "return" the default homepage posts as an array of objects
*/

function getHomepage(callback) {
  request("https://www.reddit.com/.json", function(err, result) {
    var redditHomepage = JSON.parse(result.body);
    callback(redditHomepage.data.children)  });
}

/*
getHomepage(function(res){
  console.log(util.inspect(res, { showHidden: true, depth: null, colors: true }));
});*/



/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/


function getSortedHomepage(sortingMethod, callback) {
  var baseReddit = "https://www.reddit.com/";
  baseReddit += sortingMethod + "/.json"

  request(baseReddit, function(err, result) {
    var redditHomepage = JSON.parse(result.body);
    callback(redditHomepage.data.children);
  });

}

/*
getSortedHomepage("gilded", function(res){
  console.log(util.inspect(res, { showHidden: true, depth: null, colors: true }));
});
*/


/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
  var baseReddit = "https://www.reddit.com/r/"
  baseReddit += subreddit += "/.json"
  console.log(baseReddit)
  request(baseReddit, function(err, result) {
        var redditHomepage = JSON.parse(result.body);
        callback(redditHomepage.data.children);
  });
}
/*
getSubreddit("okcupid", function(res){
  console.log(util.inspect(res, { showHidden: true, depth: null, colors: true }));
}); */


/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/

function getSortedSubreddit(subreddit, sortingMethod, callback) {
    var baseReddit = "https://www.reddit.com/r/"
    baseReddit += subreddit + "/" + sortingMethod + "/.json";
    console.log(baseReddit);
    request(baseReddit, function(err, result) {
        var redditHomepage = JSON.parse(result.body);
        callback(redditHomepage.data.children);
  });
}
/*
getSortedSubreddit("okcupid", "gilded", function(res){
  console.log(util.inspect(res, { showHidden: true, depth: null, colors: true }));
})

*/
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods


/*
This function should "return" all the popular subreddits
*/
function getSubreddits(callback) {
  var baseReddit = "https://www.reddit.com/subreddits.json";
    request(baseReddit, function(err, result) {
        var redditHomepage = JSON.parse(result.body);
        callback(redditHomepage.data.children);
  });
  // Load reddit.com/subreddits.json and call back with an array of subreddits
}

function getUser(user, callback) {
    var baseReddit = "https://www.reddit.com/user/";
    baseReddit += user + "/" + "/.json";
    request(baseReddit, function(err, result) {
        var userPage = JSON.parse(result.body);
        callback(userPage.data.children);
  });
}

function userPosts(array){
  var postArray = [];
  array.forEach(function(each){
    postArray.push({author : each.data.author, body: each.data.body});
  });
  console.log(postArray);
}

//getUser("spez", userPosts);


/*getUser("spez", function(res){
  console.log(util.inspect(res, { showHidden: true, depth: null, colors: true }));
})*/

/*getSubreddits(function(res){
  console.log(util.inspect(res, { showHidden: true, depth: null, colors: true }));
})*/

// Export the API
module.exports = {
  getHomepage : getHomepage,
  getSortedHomepage : getSortedHomepage,
  getSubreddit : getSubreddit,
  getSortedSubreddit : getSortedSubreddit,
  getSubreddits : getSubreddits,
  getUser : getUser
};

//Again, children[0] should show the first post.
