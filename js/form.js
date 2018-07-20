'use strict';

(function () {
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MAX = 5;
  window.textHashtags = document.querySelector('.text__hashtags');
  window.textDescription = document.querySelector('.text__description');
  window.imgUploadSubmit = document.querySelector('.img-upload__submit');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadInput = document.querySelector('.img-upload__input');

  var getInvalidInput = function (inputSelector) {
    inputSelector.style.borderColor = 'red';
  };

  var getHashtagsValidation = function () {
    var hashtags = (window.textHashtags.value.split(' '));
    var hashtagComparison = [];

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
    setFormToDefault();
  };

  var onProblem = function (message) {
    var errorMessageTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    errorMessageElement.classList.remove('hidden');
    errorMessageElement.style.position = 'fixed';
    errorMessageElement.innerHTML = message + '<div class="error__links"><a class="error__link" href="#">Попробовать снова</a><a class="error__link" href="#">Загрузить другой файл</a></div>';

    var tryAgainButton = errorMessageElement.querySelector('.error__link');
    var uploadOtherButton = errorMessageElement.querySelectorAll('.error__link')[1];

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

  var setFormToDefault = function () {
    window.removeEffectClasses();
    window.closePopup(window.imgEditingPopup);
    window.textHashtags.value = '';
    window.textDescription.value = '';
    imgUploadInput.value = '';
    window.imgUploadSubmit.removeEventListener('click', getHashtagsValidation);
    window.textHashtags.removeEventListener('change', getValidHashtags);
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    window.save(new FormData(imgUploadForm), function () {
      setFormToDefault();
    }, onProblem);
    evt.preventDefault();
  });
})();
