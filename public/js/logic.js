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
    // find the selector for note-display
    let noteCard = $(this).parent().parent().find('div.note-display')
    // let noteCard = $(this).children('div.row').find('div.note-display');
    // build the card and card-body
    let card = $('<div class = "card">');
    let cardBody = $('<div class = "card-body">')
    // append card-body to card
    // card = card.append(cardBody);
    // append modified card to noteCard
    // noteCard.append(card);
    
    // AJAX call for the article
    $.ajax({
      method: 'GET',
      url: '/articles/' + thisID
    })
      .then(function (data) {
        console.log(data);
        // an input to enter a new title for the note
        let noteTitle = $('<input id = "title-input" name = "title" >')
        // an input the enter the body of the note
        let noteBody = $('<textarea id = "body-input" name = "body">')
        // a button to the submit the new note, with the id of article save to it
        let noteButton = $("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        cardBody = cardBody.append(noteTitle).append(noteBody).append(noteButton);
        card = card.append(cardBody);
        noteCard.append(card);
      })
  })
});
