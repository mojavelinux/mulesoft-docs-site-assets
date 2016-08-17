// Search field toggle.
$('.search-icon').click(function () {
  if (!$('#block-search-form .form-item.form-type-searchfield').is(":visible")) {
    $('#block-search-form .form-item.form-type-searchfield').toggle(100, function () {
      $('.search-icon').css('left', 'auto').css('background-position', '-3px -3px').css('background-size', '130%');
    });
  }
});

// Point to site logo.
$('.header__logo img').attr('src', '/img/mulesoft-dev-logo.svg');

var ratingId = Math.floor((Math.random() * 9999999999) + 1);

$('#dropdown-helpful').click(function () {
  $('.open.dropdown-menu').show();
});
$('.helpful .dismiss').click(function () {
  $('.open.dropdown-menu').hide();
});

// Star rating highlight and submit
$('.helpful li i').click(function () {
  if ($('.helpful input[type="submit"]').prop('disabled')) {
    $('.helpful .feedback-form').hide();
    $('.helpful .thankyou-message').show();
  }
  else {
    $('.helpful .feedback-form').show();
    $('.helpful .thankyou-message').hide();
  }
  $('.helpful li i').removeClass('star').addClass('star-empty');
  $(this)
    .removeClass('star-empty').addClass('star')
    .prevAll().removeClass('star-empty').addClass('star');
  var rating = $('.star').length;
  ratingPicked = rating;
  postFeedback(ratingId, "star-only", window.location.href, rating);
});
$('.helpful li i').mouseenter(function () {
  ratingPicked = $('.star').length;
  $(this)
    .removeClass('star-empty').addClass('star')
    .prevAll().removeClass('star-empty').addClass('star');
});
$('.helpful li i').mouseleave(function () {
  var i = 0;
  ratingPicked ? ratingPicked : 0;
  $('.helpful li i').removeClass('star').addClass('star-empty');
  while (i < ratingPicked) {
    $('.helpful li i')
      .eq(i).removeClass('star-empty').addClass('star');
    i++;
  }
});

$('.helpful input[type="submit"]').click(function () {
  var rating = $('.star').length;
  var comment = $('.helpful [name="feedback-textarea"]').val();
  if (rating) {
    if (comment.length > 0) {
      postFeedback(ratingId, comment, window.location.href, rating);
    }
    else {
      $('.helpful .error').html('Please write a comment.').attr('style', 'color: #D1344E;');
    }
  }
  else {
    $('.helpful .error').html('Please rate this topic.').attr('style', 'color: #D1344E;');
  }
});

function postFeedback(ratingId, comment, url, rating) {
  $.ajax({
    type: 'POST',
    url: '/rate',
    contentType: 'application/json',
    data: '{ "id": ' + ratingId + ', "comment": "' + comment + '", "url": "' + url + '", "rating": ' + rating + ' }',
    xhrFields: {
      withCredentials: false
    },
    complete: function () {
      if (comment != 'star-only') {
        $('.helpful input[type="submit"]').attr('disabled', 'disabled');
        $('.helpful .feedback-form').hide();
        $('.helpful .thankyou-message').show();
      }
    }
  });
}
