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
    // where we'll put the notecard
    let noteCard = $(this).children('div.row').find('div.note-display');
    let card = $('<div class = "card">');
    let cardBody = $('<div class = "card-body">')
    card = card.append(cardBody);
    noteCard.append(card);
    
    // noteCard.append('<h2>TEST</h2>');
    // AJAX call for the article
    $.ajax({
      method: 'GET',
      url: '/articles/' + thisID
    })
      .then(function (data) {
        // console.log(data);

      
        


      })
  })
});
