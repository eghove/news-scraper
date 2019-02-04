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
    // build the card and card-body
    let card = $('<div class = "card">');
    let cardBody = $('<div class = "card-body">')
    // AJAX call for the article
    $.ajax({
      method: 'GET',
      url: '/articles/' + thisID
    })
      .then(function (data) {
        console.log(data);
        // an input to enter a new title for the note
        // let noteTitle = $('<input id = "title-input" name = "title" >')
        let noteTitle = $('<div class = "form-group"><label>Note Title</label><textarea class = "form-control" id = "title-input" rows = "1"></textarea></div>');
        // an input the enter the body of the note
        // let noteBody = $('<textarea id = "body-input" name = "body">')
        let noteBody = $('<div class = "form-group"><label>Note Body</label><textarea class = "form-control" id = "body-input" rows = "2"></textarea></div>');
        // a button to the submit the new note, with the id of article save to it
        let noteButton = $("<button type = 'button' class = 'btn btn-success' data-id='" + data._id + "' id='savenote'>Save Note</button>");
        // append the above three to the cardBody
        cardBody = cardBody.append(noteTitle).append(noteBody).append(noteButton);
        // append the new cardBody to card
        card = card.append(cardBody);
        // append the new card to the noteCard selector
        noteCard.append(card);

        // if there's a note in the article
        if (data.note) {
          // place the totle of the note in the title input
          $('#title-input').val(data.note.title);
          // place the body of the note in the body of the textarea
          $('#body-input').val(data.note.body);
        }
      });
  });
});

// event listener for the save note button, outside of the initial document onload
$(document).on('click', '#savenote', function () {
  // get the id associated with the note
  let thisID = $(this).attr('data-id');
  // console.log('This ID: ' + thisID);
  $.ajax({
    method: 'POST',
    url: '/articles/' + thisID,
    data: {
      title: $('#title-input').val(),
      body: $('#body-input').val()
    }
  })
    .then(function (data) {
      // log the response
      // console.log(data);
      // empty the note display
      $('.note-display').empty();
    });
  // empty the note display
  $('.note-display').empty();
});
