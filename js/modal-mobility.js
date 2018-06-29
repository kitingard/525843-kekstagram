'use strict';

(function () {
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  window.uploadingFile = document.querySelector('#upload-file');
  var imgEditingPopup = document.querySelector('.img-upload__overlay');
  var imgEditingPopupCancel = document.querySelector('.img-upload__cancel');
  window.imgUploadScale = document.querySelector('.img-upload__scale');
  window.bodyTag = document.querySelector('body');
  window.ESC_KEYCODE = 27;

  var openPopup = function (openableElement) {
    openableElement.classList.remove('hidden');
    window.bodyTag.classList.add('.modal-open');
  };

  var onEscPress = function (openableElement) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        if (window.textHashtags === evt.target || window.textDescription === evt.target) {
          return;
        } else {
          if (openableElement === imgEditingPopup) {
            window.uploadingFile.value = '';
            closePopup(openableElement);
          } else {
            closePopup(openableElement);
          }
        }
      }
    });
  };

  var closePopup = function (closingElement) {
    closingElement.classList.add('hidden');
    window.bodyTag.classList.remove('.modal-open');
    document.removeEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        closePopup(closingElement);
      }
    });
  };

  window.similarPictureElement.addEventListener('click', function () {
    var targetImg = event.target;
    if (window.bodyTag.classList.contains('.modal-open')) {
      return;
    } else if (targetImg.tagName === 'IMG') {
      window.bigPictureElement.querySelector('img').src = targetImg.src;
      openPopup(window.bigPictureElement);
      onEscPress(window.bigPictureElement);
    }
  });

  bigPictureCancel.addEventListener('click', function () {
    closePopup(window.bigPictureElement);
  });

  window.uploadingFile.addEventListener('change', function () {
    openPopup(imgEditingPopup);
    onEscPress(imgEditingPopup);
    window.imgUploadScale.classList.add('hidden');
  });

  imgEditingPopupCancel.addEventListener('click', function () {
    closePopup(imgEditingPopup);
    window.uploadingFile.value = '';
  });
})();
