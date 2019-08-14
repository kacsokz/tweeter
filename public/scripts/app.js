/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

// ref: https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

$(() => {
  const $form = $('#tweet-form');

  // post request for #tweet-form
  $form.on('submit', (event) => {
    event.preventDefault();
    const formData = $form.serialize();
    $.ajax({
      type: 'POST',
      url: '/tweets/',
      data: formData
    });
  });

  // loop through all tweets and append to the tweet-container
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#tweet-container').append(createTweetElement(tweet));
    }
  };

  // creates new tweet article
  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    const createdDate = `${timeSince(tweet.created_at)} ago`;
    const markup = $(`
      <header>
        <img class="avatar" alt="avatar" src="${tweet.user.avatars}">
          <h3 class="tweet-username">${tweet.user.name}</h3>
          <h4 class="tweet-handle">${tweet.user.handle}</h4>
      </header>
      <p class="tweet-text">${tweet.content.text}</p>
      <footer>
        <p class="tweet-created">${createdDate}</p>
        <div class="tweet-flags">
          <i class="far fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-heart"></i>
        </div>
      </footer>
    `);

    return $tweet.append(markup);
  };

  renderTweets(data);
    
});