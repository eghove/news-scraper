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
        // reload the page
        location.reload();
      }
    );
  })
});
