/* eslint-disable semi */
/* eslint-disable no-undef */
$(document).ready(function () {
  console.log('Logic.js is loaded!');

  // event listener for New Scrape button
  $('#scraper').on('click', function (event) {
    // Send the GET request to activate the scraper
    $.ajax('/scrape', {
      type: 'GET'
    }).then(
      function () {
        // reload the page (this doesn't seem to be working)
        location.reload();
      }
    );
  })

  // event listener when someone clicks on an article
  $('.article').on('click', function (event) {
    // empty the note display
    $('.note-display').empty();
    let thisID = $(this).attr('data-article-id');
    // AJAX call for the article
    $.ajax({
      method: 'GET',
      url: '/articles/' + thisID
    })
      .then(function (data) {
        // console.log(data);
        // build a card
        let card = $('.note-display').append('<div class = "card-body" >');
        let inputField = $('<input id = "title-input" name = "title" >');
        card.append(inputField);


      })
  })
});
