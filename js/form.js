'use strict';

(function () {
  window.textHashtags = document.querySelector('.text__hashtags');
  window.textDescription = document.querySelector('.text__description');
  var imgUploadSubmit = document.querySelector('.img-upload__submit');
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MAX = 5;


  var getHashtagsValidation = function () {
    var hashtags = (window.textHashtags.value.split(' '));
    var hashtagComparison = [];
    for (window.i = 0; window.i < hashtags.length; window.i++) {
      var hashtag = hashtags[window.i];

      if (hashtag.length === 0) {
        return;
      } else if (hashtag.length < HASHTAG_MIN_LENGTH) {
        window.textHashtags.setCustomValidity('Имя должно состоять минимум из 2-х символов');
        getInvalidInput(window.textHashtags);
      } else if (hashtag.length > HASHTAG_MAX_LENGTH) {
        window.textHashtags.setCustomValidity('Имя не должно превышать 20-ти символов, включая #');
        getInvalidInput(window.textHashtags);
      } else if (/,/.test(hashtag) === true) {
        window.textHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
        getInvalidInput(window.textHashtags);
      } else if (hashtag.charAt(0) !== '#') {
        window.textHashtags.setCustomValidity('Хэш-тег должен начинаться со знака #');
        getInvalidInput(window.textHashtags);
      } else if (hashtags.length > HASHTAG_MAX) {
        window.textHashtags.setCustomValidity('Хэш-тегов не может быть больше пяти');
        getInvalidInput(window.textHashtags);
      } else if (hashtagComparison.indexOf(hashtag.toLowerCase()) === -1) {
        hashtagComparison.push(hashtag.toLowerCase());
      } else {
        window.textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        getInvalidInput(window.textHashtags);
      }
    }
  };

  var getInvalidInput = function (inputSelector) {
    inputSelector.style.borderColor = 'red';
  };

  imgUploadSubmit.addEventListener('click', function () {
    getHashtagsValidation();
    window.textHashtags.addEventListener('change', function () {
      window.textHashtags.setCustomValidity('');
      window.textHashtags.style.borderColor = 'transparent';
    });
  });
})();
