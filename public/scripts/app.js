/*
 * Client-side JS logic
 * jQuery is already loaded
*/

$(() => {

  const $form = $('#tweet-form');
  const $errorMsg = $('.errors');
  const $tweetText = $('textarea');
  const $tweetForm = $('.new-tweet');

  // ref: https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
  function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + ' years';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
  }

  // sanitize user input
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // fetch and render tweets
  const loadTweets = function() {
    $.ajax({ url: '/tweets' })
      .then((data) => {
        renderTweets(data);
      });
  };

  // post request for #tweet-form
  $form.on('submit', (event) => {
    event.preventDefault();
    const $counter = $('.counter');
    const charMax = 140;
    const formData = $form.serialize();
    const tweetLength = $tweetText.val().length;
    // form validation
    if (tweetLength === 0 || tweetLength > charMax) {
      $errorMsg.slideDown();
    // post new tweet after validation passes
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: formData
      })
        // slide up tweet form & error message (if applicable)
        // reset form and character counter
        .then($tweetForm.slideUp())
        .then($errorMsg.slideUp())
        .then($tweetText.val(''))
        .then($counter.text(charMax))
        .then(loadTweets);
    }
  });

  // loop through tweets & append to tweet-container
  const renderTweets = function(tweets) {
    const $tweetCont = $('#tweet-container');
    $tweetCont.empty();
    for (let tweet of tweets) {
      $tweetCont.append(createTweetElement(tweet));
    }
  };

  // creates new tweet article and sanitizes tweet
  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    const createdDate = `${timeSince(tweet.created_at)} ago`;
    const markup = $(`
      <header>
        <img class="avatar" alt="avatar" src="${tweet.user.avatars}">
          <h3 class="tweet-username">${tweet.user.name}</h3>
          <h4 class="tweet-handle">${tweet.user.handle}</h4>
      </header>
      <p class="tweet-text">${escape(tweet.content.text)}</p>
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

  // menu arrow slides down compose tweet section
  $('.menu-arrow').on('click', function() {
    $tweetForm.slideToggle();
    // slide up error msg (if applicable)
    $errorMsg.slideUp();
    // enable textarea on form dropdown
    $tweetText.focus();
  });

  loadTweets();
    
});