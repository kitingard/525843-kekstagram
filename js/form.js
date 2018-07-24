'use strict';

(function () {
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MAX = 5;
  window.textHashtags = document.querySelector('.text__hashtags');
  window.textDescription = document.querySelector('.text__description');
  window.imgUploadSubmit = document.querySelector('.img-upload__submit');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var getInvalidInput = function (inputSelector) {
    inputSelector.style.borderColor = 'red';
  };

  var getHashtagsValidation = function () {
    var hashtags = window.textHashtags.value.trim();
    hashtags = window.textHashtags.value.split(' ');
    var hashtagComparison = [];
    hashtags.forEach(function (item) {
      hashtagComparison.push(item.toLowerCase());
    });

    hashtagComparison = hashtagComparison.filter(function (it, i) {
      return hashtagComparison.indexOf(it) !== i;
    });

    if (hashtags.length === 0) {
      return;
    } else {
      for (var i = 0; i < hashtags.length; i++) {
        var hashtag = hashtags[i];

        if (hashtag.length === 0) {
          return;
        } else if (hashtag.length < HASHTAG_MIN_LENGTH) {
          window.textHashtags.setCustomValidity('Имя должно состоять минимум из 2-х символов');
          getInvalidInput(window.textHashtags);
          break;
        } else if (hashtag.length > HASHTAG_MAX_LENGTH) {
          window.textHashtags.setCustomValidity('Имя не должно превышать 20-ти символов, включая #');
          getInvalidInput(window.textHashtags);
          break;
        } else if (/,/.test(hashtag) === true) {
          window.textHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
          getInvalidInput(window.textHashtags);
          break;
        } else if (hashtag.charAt(0) !== '#') {
          window.textHashtags.setCustomValidity('Хэш-тег должен начинаться со знака #');
          getInvalidInput(window.textHashtags);
          break;
        } else if (hashtags.length > HASHTAG_MAX) {
          window.textHashtags.setCustomValidity('Хэш-тегов не может быть больше пяти');
          getInvalidInput(window.textHashtags);
          break;
        } else if (hashtagComparison.length > 0) {
          window.textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          getInvalidInput(window.textHashtags);
        }
      }
    }
  };

  var getValidHashtags = function () {
    window.textHashtags.setCustomValidity('');
    window.textHashtags.style.borderColor = 'transparent';
  };

  window.imgUploadSubmit.addEventListener('click', function () {
    getHashtagsValidation();
    window.textHashtags.addEventListener('change', function () {
      getValidHashtags();
    });
  });

  var tryAgain = function (element) {
    element.parentNode.removeChild(element);
  };

  var uploadOther = function (element) {
    tryAgain(element);
    window.closePopup(window.imgEditingPopup);
  };

  var onProblem = function (message) {
    var errorMessageTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    errorMessageElement.classList.remove('hidden');
    errorMessageElement.style.position = 'fixed';
    errorMessageElement.innerHTML = message + '<div class="error__links"><a class="error__link" href="#">Попробовать снова</a><a class="error__link" href="#">Загрузить другой файл</a></div>';

    var buttonParentElement = errorMessageElement.querySelector('.error__links');
    var tryAgainButton = buttonParentElement.firstChild;
    var uploadOtherButton = buttonParentElement.lastChild;

    tryAgainButton.addEventListener('click', function () {
      tryAgain(errorMessageElement);
      tryAgainButton.removeEventListener('click', tryAgain);
    });

    uploadOtherButton.addEventListener('click', function () {
      uploadOther(errorMessageElement);
      uploadOtherButton.removeEventListener('click', uploadOther);
    });

    var errorMessageParent = document.querySelector('.img-upload__text');
    errorMessageParent.appendChild(errorMessageElement);
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    window.save(new FormData(imgUploadForm), function () {
      window.closePopup(window.imgEditingPopup);
    }, onProblem);
    evt.preventDefault();
  });
})();
