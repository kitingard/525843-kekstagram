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
    var hashtags = (window.textHashtags.value.trim().split(' '));
    var hashtagComparison = [];

    if (hashtags.length === 0) {
      return;
    } else {
      for (var i = 0; i < hashtags.length; i++) {
        var hashtag = hashtags[i];

        if (hashtag.length < HASHTAG_MIN_LENGTH) {
          window.textHashtags.setCustomValidity('Имя должно состоять минимум из 2-х символов');
          getInvalidInput(window.textHashtags);
          break;
        } else if (hashtag.length > HASHTAG_MAX_LENGTH) {
          window.textHashtags.setCustomValidity('Имя не должно превышать 20-ти символов, включая #');
          getInvalidInput(window.textHashtags);
          break;
        } else if (/,/.test(hashtag) === true) {
          window.textHashtags.setCustomValidity('Хэш-теги разделяются одним пробелом');
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
        } else if (hashtagComparison.indexOf(hashtag.toLowerCase()) === -1) {
          hashtagComparison.push(hashtag.toLowerCase());
          break;
        } else {
          window.textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          getInvalidInput(window.textHashtags);
          break;
        }
      }
    }
  };

  window.textHashtags.addEventListener('input', function () {
    getHashtagsValidation();
  });

  // window.imgUploadSubmit.addEventListener('click', function () {
  //   getHashtagsValidation();
  //   window.textHashtags.addEventListener('change', function () {
  //     window.textHashtags.setCustomValidity('');
  //     window.textHashtags.style.borderColor = 'transparent';
  //   });

  //     window.imgUploadSubmit.addEventListener('click', function () {
  //       getHashtagsValidation();
  //       window.textHashtags.addEventListener('change', function () {
  //         window.textHashtags.setCustomValidity('');
  //         window.textHashtags.style.borderColor = 'transparent';
  //       });
  //     });
  // });

  var onProblem = function (message) {
    var errorMessageParent = document.querySelector('.img-upload__text');
    var div = document.createElement('div');
    div.innerHTML = message;
    div.style.textAlign = 'center';
    div.style.color = 'yellow';
    div.style.fontWeight = 'bold';
    div.style.backgroundColor = 'rgba(255, 248, 200, 0.5)';
    div.style.width = '180px';
    div.style.height = '50px';
    div.style.marginLeft = '200px';
    div.style.paddingTop = '15px';
    div.style.borderRadius = '10px';

    errorMessageParent.insertBefore(div, window.imgUploadSubmit.children[2]);

    setTimeout(function () {
      div.parentNode.removeChild(div);
    }, 10000);
  };


  imgUploadForm.addEventListener('submit', function (evt) {
    window.save(new FormData(imgUploadForm), function () {
      window.removeEffectClasses();
      window.closePopup(window.imgEditingPopup);
      window.textHashtags.value = '';
      window.textDescription.value = '';
      imgUploadInput.value = '';
    }, onProblem);
    evt.preventDefault();
  });
})();
