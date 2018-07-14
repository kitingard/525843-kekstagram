'use strict';

(function () {
  window.ESC_KEYCODE = 27;
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  window.uploadingFile = document.querySelector('#upload-file');
  window.imgEditingPopup = document.querySelector('.img-upload__overlay');
  var imgEditingPopupCancel = document.querySelector('.img-upload__cancel');
  window.imgUploadScale = document.querySelector('.img-upload__scale');
  window.bodyTag = document.querySelector('body');
  var bigPictureElement = document.querySelector('.big-picture');

  var openPopup = function (openableElement) {
    openableElement.classList.remove('hidden');
    window.bodyTag.classList.add('modal-open');
  };

  var onEscPress = function (openableElement) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        if (window.textHashtags === evt.target || window.textDescription === evt.target) {
          return;
        } else {
          if (openableElement === window.imgEditingPopup) {
            window.uploadingFile.value = '';
            window.closePopup(openableElement);
          } else {
            window.closePopup(openableElement);
          }
        }
      }
    });
  };

  window.closePopup = function (closingElement) {
    closingElement.classList.add('hidden');
    window.bodyTag.classList.remove('modal-open');
    document.removeEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        window.closePopup(closingElement);
      }
    });
  };

  window.similarPictureElement.addEventListener('click', function () {
    var targetImg = event.target;
    if (window.bodyTag.classList.contains('modal-open')) {
      return;
    } else if (targetImg.tagName === 'IMG') {
      bigPictureElement.querySelector('img').src = targetImg.src;
      openPopup(bigPictureElement);
      onEscPress(bigPictureElement);
    }
  });

  bigPictureCancel.addEventListener('click', function () {
    window.closePopup(bigPictureElement);
  });

  window.uploadingFile.addEventListener('change', function () {
    openPopup(window.imgEditingPopup);
    onEscPress(window.imgEditingPopup);
    window.imgUploadScale.classList.add('hidden');
  });

  imgEditingPopupCancel.addEventListener('click', function () {
    window.closePopup(window.imgEditingPopup);
    window.uploadingFile.value = '';
    window.removeEffectClasses();
  });
})();
